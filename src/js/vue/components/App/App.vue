<template>
  <div>
    <header />
    <hero />
    <description />
    <router-view />
    <footer />
  </div>
</template>

<script>
// import { graphql } from 'vue-apollo';  ???
import gql from 'graphql-tag';
import client from '../../../apollo';
import { createFragment } from 'apollo-client';
import config from '../../../config';
import { hashHistory } from 'react-router';

// load components
import Header from './Header';
import Footer from './Footer';

import { * as mutations } from './mutations'

function createNewUsername () {
  return 'new-user'
}

export default {
  // register local components
  components: [
    'header': Header,
    'footer': Footer
  ],
  props: [],
  data () {
    return {
      loading: true,
      username: createNewUsername(),
      password: 'password'
    }
  },
  mounted() {
    this.$nextTick(() => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        // If we are logged in subscribe to the user and render the app.
        this.subscribeToUser(userId);
      } else {
        // We are not logged in so stop loading and render the landing page.
        this.loading: false,
      }
    })
  },

  methods: {
    createUser() {
      // We save the user input in case of an error
      // const newUser = this.newUser;
      // We clear it early to give the UI a snappy feel
      // this.newUser = '';

      // Call to the graphql mutation
      this.$apollo.mutate(mutations.createUser({
        username: this.username, 
        password: this.password
      }))
        .then((data) => {
          // Result
          console.log(data);
        }).catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
          // this.newUser = newUser;
        });
    },        
    subscribeToUser(id) {
      const that = this;
      const observable = client.watchQuery({
        query: userQuery,
        fragments: createFragment(FragmentDoc),
        pollInterval: 60000,
        forceFetch: true,
        variables: {
          id,
        },
      })

      const subscription = observable.subscribe({
        next(result) {
          if (result && result.errors) {
            const unauthed = result.errors.reduce((acc, err) => (
              acc || err.status === 401
            ), false);
            if (unauthed) {
              localStorage.clear();

              // update component state
              that.user = result.data.getUser;
              that.loading = false
            }
          } else {
            localStorage.setItem('currentUsername', result.data.getUser.username);

            // update component state
            that.user = result.data.getUser,
            that.loading = false,

            hashHistory.push('/home');
          }
        },
        error(error) {
          console.log(`Error subscribing to user: ${error.toString()}`);
          that.loading = false,
        }, 
        // Network error, etc.
        complete() {
          console.log(`Subscription complete`);
        },
      });

      // update component state
      this.userSubscription = subscription,
    }
  }
}
<script>