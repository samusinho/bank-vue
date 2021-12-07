<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="first_name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="first_name" v-model="first_name">
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="last_name" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="last_name" v-model="last_name">
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
        </div>
        <button 
        type="button" 
        class="btn btn-primary"
        v-on:click="signUp()">Registrarme</button>
        <div style="text-align: right;">
            <a class="link" v-on:click="goToSignIn()">Tienes usuario? Inicia sesión!</a>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Swal from "sweetalert2";

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            Swal.fire({
                title: 'Creando usuario',
                html: 'Espera un momento mientras creamos tu cuenta...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }   
            });
            this.$apollo.mutate({
                mutation: gql`
                    mutation NewUserWithAccount(
                        $username: String!,
                        $firstName: String!, 
                        $lastName: String!, 
                        $email: String!, 
                        $password: String!, 
                        $balance: Int!) {
                        newUserWithAccount(
                            username: $username, 
                            first_name: $firstName, 
                            last_name: $lastName, 
                            email: $email, 
                            password: $password, 
                            balance: $balance) {
                                id
                                username
                        }
                    }
                `,
                variables: {
                    username: this.username,
                    password: this.password,
                    firstName: this.first_name,
                    lastName: this.last_name,
                    email: this.email,
                    balance: 0
                }
            }).then(response => {
                Swal.close();
                Swal.fire(
                'Usuario creado',
                `El usuario ${response.data.newUserWithAccount.username} ha sido creado satisfactoriamente`,
                'success'
                )
                this.goToSignIn();
            }).catch(e => {
                Swal.close();
                console.log(JSON.stringify(e, null, 2));
            });
        },
        goToSignIn() {
            this.$router.push({ name: 'signIn' });
        }
    }
}
</script>

<style scoped>
.link {
    cursor: pointer;
}
</style>