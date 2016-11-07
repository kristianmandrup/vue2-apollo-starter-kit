# React/Vue2 Apollo boilerplate

Fork this boilerplate code to get started with GraphQL, and Apollo with either:
- React : `localhost:3001/react.html`
- Vue2 : `localhost:3001/vue2.html`
  
**Quickstart:**

1) Go to Scaphold.io (https://scaphold.io).

2) Create an account and dataset.

3) Change the URL in the API manager (config.js) in the boilerplate to point to your unique Scaphold.io API URL.

5) Install dependencies: ```npm install```

4) Run with: ```npm start```


**Deployment:**

*Note: For development, you only need to run ```npm start```*

1) Run ```npm run build``` to transpile ES6 code from the src/ directory to JavaScript in the lib/ directory.

2) Set the environment variable ```process.env.NODE_ENV = 'production'``` to let server.js know to run the code in the lib/ directory.

## Status

### React

Should work out of the box. Src code can be found in `src/react` folder

### Vue2

Not quite working yet. Src code can be found in `src/vue` folder.
We have not tried to port the `Description` or `Hero` components as they are static and not interesting.

The main points of interest are the `vue-apollo` integrations and GraphQL queries.

#### Apollo GraphQL mutations 

All the GraphQL queries can be found in `queries.js` under `src/vue/components/App`

The mutation queries can be found in `mutations.js` which use the GraphQL mutation queries defined in `queries.js`.
- `createUser`
- `LoginWithData`

*LoginWithData*

Takes an object with `username` and `password`, then attempts to login via GraphQL API on [scaphold.io](https://scaphold.io).

*createUser*

Creates a new user (ie. Registration). We can then use this user account to login.
Takes an object with `username` and `password`

#### App component

Folder: `src/vue/components/App`

In `App.vue` we have a method `createUser()` which I'm not sure how it fits in... but this is the method used to make a 
mutation on the GraphQL backend at [scaphold.io](https://scaphold.io) to actually create a `User` object in the data store [RethinkDB](https://www.rethinkdb.com/).  

```js
methods: {
  createUser() {
    this.$apollo.mutate(mutations.createUser({
      username: this.username, 
      password: this.password
    }))
```

*subscribe to user*

There is also a `subscribeToUser` method used to subscribe to new users (via RethinkDB changefeed)

    "RethinkDB pushes JSON to your apps in realtime."  

Currently it polls every 60000 milliseconds (ie. every minute: `pollInterval: 60000`)

```js
subscribeToUser(id) {
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
      // error handling
      ...

      // save in local storage
      localStorage.setItem('currentUsername', result.data.getUser.username);

      // update component state
      that.user = result.data.getUser,
      that.loading = false,

      // redirect to home
      router.push({name: 'home'});
    }
  })      
}
```

#### Login component

Contains an apollo mutation method to perform a `loginWithData`

```
  methods: {
    login(ctx) {
      return this.$apollo.mutate(mutations.LoginWithData(ctx))
    },        
    ...
  }
```

The method `loginUser` executes `login`, passing `username` and `password`.
On login success (ie. no `errors` in returned `data`), it stores `token` and `id` in `localStorage` then redirects to `home`. 

```
loginUser() {
  this.login({
    username: this.loginEmail,
    password: this.loginPassword
  }).then(({ data }) => {
    if (!data.errors) {
      localStorage.setItem('token', data.loginUser.token);
      localStorage.setItem('userId', data.loginUser.id);
      router.push({name: 'home'});
```

## License

For you pleasure ;) 
