<template>
    <div class="mb-3">
        <label for="accounts">Cuentas bancarias</label>
        <Dropdown 
        v-model="selected" 
        :options="accounts" 
        optionLabel="label" 
        placeholder="Seleccione una cuenta"
        inputId="accounts" />
    </div>
    <div class="mb-3">
        <label for="value">Valor a transferir</label>
        <InputNumber 
        v-model="value" 
        mode="currency" 
        currency="COP" 
        locale="es-CO"/>
    </div>
    <div class="mb-3" style="text-align: center;">
        <Button label="Realizar transacción" @click="newTransaction()"/>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

export default {
    name: 'NewTransaction',
    components: {
        Dropdown,
        Button,
        InputNumber
    },
    created() {
        this.$apollo.query({
            query: gql`
                query {
                    accounts {
                        username
                    }
                }
            `
        }).then(response => {
            this.accounts = response.data.accounts.map(account => {
                return {
                    label: `Cuenta de ${account.username}`,
                    username: account.username
                }
            }).filter(account => account.username != this.usernameOrigin);
        }).catch(e => {
            console.log(JSON.stringify(e, null, 2));
        });
    },
    data() {
        return {
            selected: null,
            accounts: [],
            value: 0,
            usernameOrigin: localStorage.getItem('username') || ''
        }
    },
    methods: {
        newTransaction() {
            console.log(this.selected.username, this.value);
            this.$apollo.mutate({
                mutation: gql`
                    mutation Mutation($usernameOrigin: String!, $usernameDestiny: String!, $value: Int!) {
                        newTransaction(usernameOrigin: $usernameOrigin, usernameDestiny: $usernameDestiny, value: $value) {
                            id
                            usernameOrigin
                            usernameDestiny
                            value
                            date
                        }
                    }
                `,
                variables: {
                    usernameOrigin: this.usernameOrigin,
                    usernameDestiny: this.selected.username,
                    value: this.value
                }
            }).then(response => {
                console.log(response.data);
                this.$emit('newTransaction', response.data.newTransaction);
            }).catch(e => {
                console.log(e);
                console.log(JSON.stringify(e, null, 2));
            });
        }
    }
}
</script>

<style scoped>
.p-dropdown,
.p-inputnumber {
    width: 100%;
}
</style>