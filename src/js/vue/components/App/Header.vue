<template>
  <navbar style={styles.navbar}>
    <navbar-header>
      <navbar-brand>
        <router-link :to="{ name: 'root' }">Scaphold</router-link>
      </navbar-brand>
    </navbar-header>
    <nav class="right">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'graphiql' }">GraphiQL</router-link>
      <login></login>
      <register></register>
    </nav>
  </navbar>
<template>
<script>
// load components
import Login from './Login';
import Register from './Register';
import Logout from '../Home/Logout';

export default {
  // register local components  
  components: [
    'login': Login,
    'register': Register,
    'logout': Logout
  ],  
  props: [],
  data () {
    return {
      showModal: false
    }
  }
}
</script>
<style>
navbar {
  margin-bottom: 0
}
</style>