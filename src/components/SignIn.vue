<template>
    <div class="container mt-5">
        <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button 
        type="button" 
        class="btn btn-primary"
        v-on:click="signIn()">Iniciar sesión</button>
        <div style="text-align: right;">
            <a class="link" v-on:click="goToSignUp()">No tienes usuario? Regístrate!</a>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: 'SignIn',
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
.link {
    cursor: pointer;
}
</style>