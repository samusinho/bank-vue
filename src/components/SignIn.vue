<template>
    <div class="container mt-5">
        <div class="row mb-3">
            <div class="col-4">
                <label for="username" >Nombre de usuario</label>
                <div>
                    <InputText 
                    id="username" 
                    type="text" 
                    v-model="username"/>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-4">
                <label for="password">Contraseña</label>
                <div>
                    <InputText 
                    id="password" 
                    type="password" 
                    v-model="password"/>
                </div>
            </div>
        </div>
        <Button label="Iniciar sesión" @click="signIn()"/>
        <Button 
        label="No tienes usuario? Regístrate!" 
        class="p-button-text"
        v-on:click="goToSignUp()"/>
    </div>
</template>

<script>
import gql from "graphql-tag";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'SignIn',
    components: {
        InputText,
        Button
    },
    created() {
        localStorage.clear();
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            this.$apollo.mutate({
                mutation: gql`
                    mutation ($username: String!, $password: String!) {
                        login(username: $username, password: $password) {
                            access
                            refresh
                        }
                    }
                `,
                variables: {
                    username: this.username,
                    password: this.password
                }
            }).then(response => {
                this.$emit('login', {
                    access_token: response.data.login.access,
                    refresh_token: response.data.login.refresh,
                    username: this.username
                });
            }).catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        },
        goToSignUp() {
            this.$router.push({ name: 'signUp' });
        }
    }
}
</script>

<style scoped>
.p-inputtext {
    width: 100%;
}
</style>