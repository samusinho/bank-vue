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
      console.log(data);
    },
    logOut: function () {
      
    }
  }
}
</script>

<style>

</style>
