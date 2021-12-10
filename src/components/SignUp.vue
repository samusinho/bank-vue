<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="first_name" >Nombre</label>
                <div>
                    <InputText 
                    id="first_name" 
                    type="text" 
                    v-model="first_name"/>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="last_name" >Apellido</label>
                <div>
                    <InputText 
                    id="last_name" 
                    type="text" 
                    v-model="last_name"/>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="username" >Nombre de usuario</label>
                <div>
                    <InputText 
                    id="username" 
                    type="text" 
                    v-model="username"/>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="email">Correo electrónico</label>
                <div>
                    <InputText 
                    id="email" 
                    type="email" 
                    v-model="email"/>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mb-2">
                <label for="password">Contraseña</label>
                <div>
                    <InputText 
                    id="password" 
                    type="password" 
                    v-model="password"/>
                </div>
            </div>
        </div>
        <Button label="Registrarme" @click="signUp()"/>
        <Button 
        label="Tienes usuario? Inicia sesión!" 
        class="p-button-text"
        v-on:click="goToSignIn()"/>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Swal from "sweetalert2";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'SignUp',
    components: {
        InputText,
        Button
    },
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
.p-inputtext {
    width: 100%;
}
</style>