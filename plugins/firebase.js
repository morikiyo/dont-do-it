import firebase from 'firebase'
import config from '@/secrets/firebase.js'

const firebaseApp = firebase.initializeApp(config)

export default (_, inject) => {
  inject('database', firebaseApp.database())
}
