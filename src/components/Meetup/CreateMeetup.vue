<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h4 class="primary--text">Create a new Meetup</h4>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">


					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="title"
								label="Title"
								id="title"
								v-model="title"
								required
							></v-text-field>

						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="location"
								label="Location"
								id="location"
								v-model="location"
								required
							></v-text-field>

						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<!-- <v-text-field
							name="imageUrl"
							label="Image Url"
							id="image-url"
							v-model="imageUrl"
							required
							></v-text-field> -->

							<!-- Upload files in db firebase -->
							<v-btn raise class="primary" @click="onPickFile">Upload image</v-btn>
							<input type="file"
							 style="display:none;"
							 ref="fileInput"
							 accept="image/*"
							 @change="loadPick">

						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" alt="" height="150">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="description"
								label="Description"
								id="description"
								v-model="description"
								multi-line
								required
							></v-text-field>

						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<h4>Choose a data & Time</h4>

						</v-flex>

					</v-layout>
					<v-layout row class="mb-3">
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date"></v-date-picker>
							<!-- <p>{{ date }}</p> -->
						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-time-picker v-model="time" format="24hr">

							</v-time-picker>
							<!-- <p>{{ time }}</p> -->
						</v-flex>

					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn
								class="primary"
								:disabled="!formIsValid"
								type="submit">Create Meetup</v-btn>
						</v-flex>
					</v-layout>

				</form>
			</v-flex>
		</v-layout>
	</v-container>

</template>

<script>
	export default {

		data(){
			return {
				title: '',
				location: '',
				imageUrl: '',
				description: '',
				date: '',
				time: new Date(),
				image: null,

			}
		},
		computed: {
			formIsValid () {
				return this.title !== '' &&
				this.location !== '' &&
				this.imageUrl !== '' &&
				this.description !== ''
			},
			submittableDateTime () {
				const date = new Date(this.date)
				if (typeof this.time === 'string'){
					const hours = this.time.match(/^(\d+)/)[1]
					const minutes = this.time.match(/:(\d+)/)[1]
					date.setHours(hours)
					date.setMinutes(minutes)
				} else {
					date.setHours(this.time.getHours())
					date.setMinutes(this.time.getMinutes())

				}

				return date
			}
		},
		methods: {
			onCreateMeetup () {
				if (!this.formIsValid) {
					return
				}
				if (!this.image) {
					return
				}
				const meetupData = {
					title: this.title,
					location: this.location,
					image: this.image,
					description: this.description,
					date: this.submittableDateTime,


				}
				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/meetups')
			},
			onPickFile () {
				console.log('this is the object $refs', this.$refs)
				this.$refs.fileInput.click()
			},
			loadPick (event) {
				const files = event.target.files
				// console.log('evento', files )
				let filename = files[0].name
				if (filename.lastIndexOf('.') <= 0) {
					return alert('Please add a valid file')
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () =>{
					// console.log('this is a filereader', fileReader)
					this.imageUrl = fileReader.result
				})
				// console.log('this is file[0]', files[0])
				fileReader.readAsDataURL(files[0])
				this.image = files[0]
			}
		}
	}
</script>
