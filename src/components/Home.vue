<template>
    <Navbar :logOut="logOut"/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6">
                <Card :style="{'width': '100%', 'height': '100%'}">
                    <template #header>
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" style="height: 15rem" />
                    </template>
                    <template #title>
                        Información del usuario
                    </template>
                    <template #subtitle>
                        Nombre de usuario: <b>{{user?.username}}</b>
                    </template>
                    <template #content>
                        <div class="row">
                            <div class="col-4">
                                <p>Nombre: </p>
                                <p>Apellido: </p>
                                <p>Email: </p>
                            </div>
                            <div class="col-8">
                                <p><b>{{user?.first_name}}</b></p>
                                <p><b>{{user?.last_name}}</b></p>
                                <p><b>{{user?.email}}</b></p>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-6">
                <Card :style="{'width': '100%', 'height': '100%'}">
                    <template #header>
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" style="height: 15rem" />
                    </template>
                    <template #title>
                        Información de la cuenta
                    </template>
                    <template #subtitle>
                        Propietario de la cuenta: <b>{{user?.username}}</b>
                    </template>
                    <template #content>
                        <div class="row">
                            <div class="col-4">
                                <p>Saldo: </p>
                                <p>Último cambio: </p>
                            </div>
                            <div class="col-8">
                                <p><b>$ {{account?.balance}} COP</b></p>
                                <p><b>{{prettyDate(account?.lastChange)}}</b></p>
                            </div>
                        </div>
                        <Button label="Nueva transacción" @click="display = true"/>
                    </template>
                </Card>
            </div>
        </div>
        <div class="mt-3">
            <div style="text-align: center;">
                <h2>Mis transacciones</h2>
            </div>
            <DataTable :value="transactions" v-if="transactions.length > 0"
                :paginator="true" :rows="5">
                <Column field="id" header="ID transacción"></Column>
                <Column field="usernameOrigin" header="Cuenta origen"></Column>
                <Column field="usernameDestiny" header="Cuenta destino"></Column>
                <Column field="value" header="Valor"></Column>
                <Column field="date" header="Fecha" :sortable="true">
                    <template #body="row">
                        {{prettyDate(row.data.date)}}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog header="Nueva transacción" v-model:visible="display"
    :style="{width: '50vw'}">
        <NewTransaction v-on:newTransaction="onNewTransaction"/>
    </Dialog>
</template>

<script>
import gql from "graphql-tag";
import Navbar from './partials/Navbar.vue';
import NewTransaction from './NewTransaction.vue';
import Card from 'primevue/card';
import moment from 'moment';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
moment.locale('es');

export default {
    name: 'Home',
    components: {
        Navbar,
        NewTransaction,
        Card,
        Button,
        Dialog,
        DataTable,
        Column
    },
    data() {
        return {
            user: null,
            account: null,
            transactions: [],
            display: false
        }
    },
    methods: {
        logOut() {
            this.$emit('logout');
        },
        prettyDate(date) {
            return date? moment(date).format('LLLL') : '--';
        },
        onNewTransaction(transaction) {
            this.account = { 
                balance: this.account.balance - transaction.value,
                lastChange: transaction.date
            };
            this.transactions = [...this.transactions, transaction];
            this.display = false;
        }
    },
    created() {
        this.$apollo.query({
            query: gql`
                query ($username: String!) {
                    userInfo {
                        first_name
                        last_name
                        username
                        email
                        id
                    }
                    transactionsByUsername(username: $username) {
                        id
                        usernameOrigin
                        usernameDestiny
                        value
                        date
                    }
                    accountByUsername(username: $username) {
                        balance
                        lastChange
                    }
                }
            `,
            variables: {
                username: localStorage.getItem('username') || ''
            }
        }).then(response => {
            console.log(response);
            this.user = response.data.userInfo;
            this.account = response.data.accountByUsername;
            this.transactions = response.data.transactionsByUsername;
        }).catch(e => {
            console.log(JSON.stringify(e, null, 2));
        });
    }
}
</script>