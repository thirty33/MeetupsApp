<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
				<v-card class="info">
					<v-container fluid>
						<v-layout row>
							<v-flex xs5 sm4 md3>
								<v-card-media
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOs6sipbneDunpKDDM-k-8fNMuwD3ASC7RqpMI5HT01Y_wy-o"
								height="130px"
								
								></v-card-media>	
							</v-flex>
							<v-flex xs7 sm8 md9>
								<v-card-title primary-title>
									<div>
										<h5 class="white--text mb-0">My meetup</h5>
										<div> December 06 2017 </div>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-btn flat to="/meetups/1" color="black">
										<v-icon left light>arrow_forward</v-icon>
										View Meetup
									</v-btn>
									
								</v-card-actions>
								
							
							</v-flex> 

						</v-layout>
					</v-container>	
				</v-card>
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