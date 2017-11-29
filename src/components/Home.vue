<template>
	<v-container>
		<v-layout row wrap class="first">
			<v-flex xs12 sm6 class="text-xs-center text-sm-right">
				<v-btn large router to="/meetups " class="mt-0 primary">Explore Meetups</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class="text-xs-center text-sm-left">
				<v-btn large router to="/meetup/new" class="mt-0 primary">Organize Meetup</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data(){
			return {

			}
		}
	}
</script>

<style>
	.first {
		position: absolute;
		top: 73px;
	}
</style>