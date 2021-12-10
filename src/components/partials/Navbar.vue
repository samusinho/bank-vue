<template>
    <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
            <h5 class="text-white h4">Hola, {{username}}!!</h5>
            <p class="text-muted">Da click en "Cerrar sesión" si deseas salir...</p>
            <Button label="Cerrar sesión" @click="logOut()"/>
        </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
</template>

<script>
import Button from 'primevue/button';

export default {
    name: 'Navbar',
    props: ['logOut'],
    components: {
        Button
    },
    created() {
        this.username = localStorage.getItem('username') || '';
    },
    data() {
        return {
            username: ''
        }
    }
}
</script>