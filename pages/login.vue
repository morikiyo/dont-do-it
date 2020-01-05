<template>
  <div>
    <div v-if="isAuthenticated">
      <b-card title="Account">
        <b-card-text> email: {{ user.email }} </b-card-text>
        <b-button v-on:click="logout" variant="warning">logout</b-button>
      </b-card>
    </div>
    <div v-else>
      <b-card>
        <b-card-body>
          <b-alert :show="isError" dismissible variant="danger" fade>
            {{ errorMessage }}
          </b-alert>
          <b-form v-on:submit.prevent="login">
            <b-form-group label="Email:" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="sample@example.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="********"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null
    }
  },
  computed: {
    isAuthenticated() {
      const user = this.$store.state.user
      console.log('>>> user')
      console.log(user)
      console.log(this.$store.getters.isAuthenticated)
      return this.$store.getters.isAuthenticated
    },
    user() {
      return this.$store.state.user
    },
    isError() {
      return !!this.errorMessage
    }
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = error.message
        })
    },
    logout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('setUser', null)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
