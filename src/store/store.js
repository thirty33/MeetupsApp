import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            { imageUrl: 'http://www.greycloaktech.com/wp-content/uploads/2015/07/url-small.jpg',
             id: '8282727',
             title: 'meetup en New York',
             date: new Date(),
             location:'new york',
             description: 'yeyeyeye'
            },
            { imageUrl: 'https://www.101viajes.com/sites/default/files/sky-tree-tokyo.jpg',
             id: '8282728',
             title: 'meetup en cali',
             date: new Date(),
             location:'cali',
             description: 'yeyeyeye'
            },
            { imageUrl: 'https://d16teuje7e44sv.cloudfront.net/spa/cities/spain/madrid-medium.jpg',
             id: '8282729',
             title: 'meetup en madrid',
             date: new Date(),
             location:'madrid',
             description: 'yeyeyeye'
            },
            { imageUrl: 'https://vignette.wikia.nocookie.net/stalker/images/5/58/Chernobyl-3.jpg/revision/latest?cb=20170204115502&path-prefix=es',
             id: '8282730',
             title: 'meetup en chernobyl',
             date: new Date(),
             location:'chernobyl',
             description: 'yeyeyeye'
            },
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'jsjsjsjsjs'
            }
            // reach out to firebase and store it
            commit('createMeetup', meetup)

        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                
                user => {
                        commit('setLoading',false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)

                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log('this is an error',error)
                    }
                )
        },
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
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
        clearError({commit}) {
           commit('clearError') 
        }

    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state,getters) {
            return getters.loadedMeetups.slice(0,5)
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId 
                })
            }
        },
        user (state) {
            return state.user
        },

        //errors
        error (state) {
            return state.error
        },
        loading (state) {
            return state.loading
        }


    }
})