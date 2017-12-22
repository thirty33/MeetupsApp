import Vue from 'vue'
import * as firebase from 'firebase'




export default {
  state: {

    user: null,

  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbkeys[id] = payload.fbkey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups

      registeredMeetups.splice(registeredMeetups.findIndex(meetup =>
        meetup.id === payload),1)

      Reflect.deleteProperty(state.user.fbkeys, payload)
    },


    setUser (state, payload) {
      state.user = payload
    }

  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then( data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {
            id: payload,
            fbkey: data.key
          })
        })
        .catch( error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if(!user.fbkeys) {
        return
      }
      const fbkey = user.fbkeys[payload]
      console.log('esta es la fbkey', fbkey)
      console.log('this is payload', payload)
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbkey)
        .remove(error => {
          if(!error){
            console.log('ha sido removido')
          }
          else {
            console.log('nada')
          }
        })
        .then(data => {
          console.log('this is data', data)
          commit('setLoading', false)
          commit('unregisterUserFromMeetup',payload)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)

        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbkeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbkeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbkeys: {}
      })
    },
    fetchUserData({commit, getters}){
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/')
        .once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbkeys: swappedPairs
          }
          // console.log('registeredMeetups', registeredMeetups)
          // console.log('fbkeys', swappedPairs)
          commit('setLoading', false)
          commit('setUser', updateUser)

        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    onLogout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },

  },
  getters: {

    user (state) {
      return state.user
    },

  }
}
