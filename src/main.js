// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import { store } from './store/store.js'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alerts.vue'
import EditMeetup from './components/Meetup/edit/EditMeetup.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('modal-modif', EditMeetup)  

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDId785y_2c1hda5E8Kksv2og0PCDtf3kI",
      authDomain: "yt-meetup-project.firebaseapp.com",
      databaseURL: "https://yt-meetup-project.firebaseio.com",
      projectId: "yt-meetup-project",
      storageBucket: "gs://yt-meetup-project.appspot.com",
      messagingSenderId: "455242454525"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('este usuario',user)
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})

