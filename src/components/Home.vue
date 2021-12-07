<template>
    <Navbar :logOut="logOut"/>
    <div class="container">
        <p>Componente home</p>
    </div>
</template>

<script>
import Navbar from './partials/Navbar.vue';

export default {
    name: 'Home',
    components: {
        Navbar
    },
    methods: {
        logOut() {
            this.$emit('logout');
        }
    }
}
</script>