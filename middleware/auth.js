export default function({ app, route, store, redirect }) {
  app.$firebase.auth().onAuthStateChanged((user) => {
    console.log(`>>> onAuthStateChanged: ${user}`)
    store.commit('setUser', user)
    if (!store.getters.isAuthenticated) {
      if (route.name !== 'login') {
        redirect('/login')
      }
    }
  })
}
