<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card-text>
					<v-container>
						<form @submit.prevent="onSignup">
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="email"
									label="Mail"
									id="email"
									v-model="email"
									type="email"
									required>
									</v-text-field>
									
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="password"
									label="Password"
									id="password"
									v-model="password"
									type="password"
									>
									</v-text-field>
									
								</v-flex>
							</v-layout>

							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="confirmPassword"
									label="Confirm Password"
									id="confirmPassword"
									v-model="confirmPassword"
									type="password"
									:rules="[comparePasswords]">
									</v-text-field>
									
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-btn type="submit">Sign Up</v-btn>
								</v-flex>
							</v-layout>
						</form>
					</v-container>
				</v-card-text>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data(){
			return {
				email: '',
				password: '',
				confirmPassword: '',
			}
		},
		methods: {
			onSignup () {
				this.$store.dispatch('signUserUp',{
					email: this.email,
					password: this.password
				})		
			}
		},
		computed: {
			comparePasswords () {
				return this.password !== this.confirmPassword ? 'Password do not match' : ''
			},
			user () {
				return this.$store.getters.user
			}
		
		},
		watch: {
			// si el sigUp ha sido exitoso
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		}

	}
</script>