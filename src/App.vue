<template>
  <router-view v-on:login="completeLogin"
               v-on:logout="logOut">
  </router-view>
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    completeLogin: function (data) {
      for (let i in data) {
        localStorage.setItem(i, data[i]);
      }
      this.$router.push({ name: 'home' });
    },
    logOut: function () {
      localStorage.clear();
      this.$router.push({ name: 'signIn' });
    }
  }
}
</script>

<style>

</style>
