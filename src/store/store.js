import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            // { imageUrl: 'http://www.greycloaktech.com/wp-content/uploads/2015/07/url-small.jpg',
            //  id: '8282727',
            //  title: 'meetup en New York',
            //  date: new Date(),
            //  location:'new york',
            //  description: 'yeyeyeye'
            // },
            // { imageUrl: 'https://www.101viajes.com/sites/default/files/sky-tree-tokyo.jpg',
            //  id: '8282728',
            //  title: 'meetup en cali',
            //  date: new Date(),
            //  location:'cali',
            //  description: 'yeyeyeye'
            // },
            // { imageUrl: 'https://d16teuje7e44sv.cloudfront.net/spa/cities/spain/madrid-medium.jpg',
            //  id: '8282729',
            //  title: 'meetup en madrid',
            //  date: new Date(),
            //  location:'madrid',
            //  description: 'yeyeyeye'
            // },
            // { imageUrl: 'https://vignette.wikia.nocookie.net/stalker/images/5/58/Chernobyl-3.jpg/revision/latest?cb=20170204115502&path-prefix=es',
            //  id: '8282730',
            //  title: 'meetup en chernobyl',
            //  date: new Date(),
            //  location:'chernobyl',
            //  description: 'yeyeyeye'
            // },
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
        },
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(
                    (data) => {
                        const meetups = []
                        const obj = data.val()
                        for (let key in obj) {
                            meetups.push({
                                id: key,
                                title: obj[key].title,
                                description: obj[key].description,
                                description: obj[key].description,
                                imageUrl: obj[key].imageUrl,
                                date: obj[key].date,
                                creatorId: obj[key].creatorId
                            })
                        }
                        commit('setLoadedMeetups', meetups)
                        commit('setLoading', false)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)  
                        commit('setLoading', false)
                    }
                )
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
                
            }
            // reach out to firebase and store it
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })

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
        },
        autoSignIn({commit}, payload) {
            commit('setUser', {
                id: payload.uid,
                registeredMeetups: []
            })
        },
        onLogout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
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