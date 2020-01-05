import Vue from 'vue'
import firebase from 'firebase'
import config from '@/secrets/firebase.js'

const firebaseApp = firebase.initializeApp(config)

Vue.prototype.$firebase = firebaseApp

export default (_, inject) => {
  inject('firebase', firebaseApp)
  // TODO: remove $database
  inject('database', firebaseApp.database())
}
