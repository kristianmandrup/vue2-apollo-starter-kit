<template>
  <md-tab @onClick="open()">
    Register
    <modal v-show="showModal" v-hide="close">
      <modal-Header>
        <modal-title>Register Here!</modal-title>
      <modal-Header>
      <modal-body>
        <form class="horizontal">
          <div class="row">
            <form-group ref="formRegisterEmail">
              <label>
                Email
              </label>
              <div class="control">
                <input type="email" placeholder="Email" @onChange="handleRegisterEmailChange()" />
              </div>
            </form-group>
            <form-group ref="formRegisterPassword">
              <label>
                Password
              </label>
              <div class="control">
                <input type="password" placeholder="Password" @onChange="handleRegisterPasswordChange()" />
              </div>
            </form-group>
          </div>
        </form>
        <div class="errors">{{ errors}}</div>
      </modal-body>
      <modal-footer>
        <md-button class="primary" type="submit" @onClick={this.registerUser}>Register</md-button>
        <md-button @onClick="close">Close</md-button>
      </modal-footer>
    </modal>
  </md-tab>
</template>        
<script>
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import config from './../../../config';

export default {
  props: [],
  data () {
    return {  
      showModal: false,
      registerEmail: undefined,
      registerPassword: undefined,
      errors: undefined
    }
  },
  methods: {
    close() {
      this.setState({ showModal: false });
    },
    open() {
      this.setState({ showModal: true });
    },
    registerUser() {
      this.register({
        username: this.registerEmail,
        password: this.registerPassword
      }).then(({ data }) => {
        if (!data.errors) {
          localStorage.setItem('token', data.createUser.token);
          localStorage.setItem('userId', data.createUser.changedUser.id);
          hashHistory.push('/home');
        } else {
          this.error = data.errors
        }
      }).catch((error) => {
        this.error = error;
      });
    },
    handleRegisterEmailChange(e) {
      this.registerEmail = e.target.value;
    },
    handleRegisterPasswordChange(e) {
      this.registerPassword = e.target.value;
    }    
  }
}
</script>
<style>
  .errors {
    text-align: 'center';
    color: 'red';
  }
</style>

