import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            { imageUrl: 'http://www.greycloaktech.com/wp-content/uploads/2015/07/url-small.jpg', id: '8282727', title: 'meetup en New York', date: '2017-12-07'},
            { imageUrl: 'https://www.101viajes.com/sites/default/files/sky-tree-tokyo.jpg', id: '8282728', title: 'meetup en cali', date: '2017-12-15'},
            { imageUrl: 'https://d16teuje7e44sv.cloudfront.net/spa/cities/spain/madrid-medium.jpg', id: '8282729', title: 'meetup en madrid', date: '2017-12-07'},
            { imageUrl: 'https://vignette.wikia.nocookie.net/stalker/images/5/58/Chernobyl-3.jpg/revision/latest?cb=20170204115502&path-prefix=es', id: '8282730', title: 'meetup en chernobyl', date: '2017-12-09'},
        ],
        user: {
            id: 'jajaja',
            registeredMeetups: ['ssssss'],

        }
    },
    mutations: {},
    actions: {},
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
        }
    }
})