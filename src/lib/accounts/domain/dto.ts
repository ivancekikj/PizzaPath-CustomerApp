export interface CustomerUpdateDto {
	username: string
	firstName: string
	lastName: string
	address: string
	phoneNumber: string
	isSubscribedToNewsletter: boolean
}

export interface CustomerLoginDto {
	username: string
	password: string
}
