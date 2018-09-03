<template>
  <div id="app">
    <img id="logo" src="./assets/logo.png" alt="opulo">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  export default {
    name: 'opulo-ui',
  };
</script>

<style>
    #logo {
        height: 132px;
        margin-bottom: 20px;
        width: 142px;
    }
</style>
