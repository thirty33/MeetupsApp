<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h4 class="primary--text">My Meetup</h4>
                    </v-card-title>
                    <v-card-media
                    src="https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg"
                    height="400px">

                    
                    </v-card-media>
                    <v-card-text>
                        <div>06th december 2017 - where it takes place</div>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quos dignissimos cupiditate exercitationem ipsum, odit iste necessitatibus officia veniam explicabo dicta nam pariatur illum libero quibusdam esse veritatis perspiciatis ipsa.</div>    
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>   
                        <v-btn class="primary">register</v-btn>
                    </v-card-actions>          

                    
                </v-card>
            </v-flex>

        </v-layout>

    </v-container>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style scoped>



</style>