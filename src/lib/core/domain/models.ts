export interface Category {
	id: number
	name: string
}

export interface Customer {
	username: string
	email: string
	firstName: string
	lastName: string
	address: string
	phoneNumber: string
	password: string
	isSubscribedToNewsletter: boolean
}

export interface CouponReward {
	foodPortionId: number
	count: number
}

export interface Food {
	id: number
	name: string
	description: string
	imageUrl: string
	averageRating: number
	categoryId: number
	toppings: Topping[]
}

export interface Topping {
	id: number
	name: string
	price: number
}

export interface Size {
	id: number
	name: string
}

export interface FoodPortion {
	id: number
	price: number
	discount: number
	size: Size
	foodId: number
	couponValue: number
}

export interface OrderCouponInfo {
	coupons: CouponReward[]
	earnedCoupons: number
	redeemedCoupons: number
}

export class OrderItem {
	id: number
	food: Food
	portions: FoodPortion[]
	selectedPortionId: number
	selectedQuantity: number
	selectedToppingIds: number[]
	areCouponsUsed: boolean

	constructor(
		id: number,
		food: Food,
		portions: FoodPortion[],
		selectedPortionId: number,
		selectedQuantity: number,
		selectedToppingIds: number[],
		areCouponsUsed: boolean
	) {
		this.id = id
		this.food = food
		this.portions = portions
		this.selectedPortionId = selectedPortionId
		this.selectedQuantity = selectedQuantity
		this.selectedToppingIds = selectedToppingIds
		this.areCouponsUsed = areCouponsUsed
	}

	calculateTotalPrice(): number {
		const portion = this.getSelectedPortion()
		if (this.areCouponsUsed) return 0
		const toppingsTotal: number = this.selectedToppingIds
			.map((id) => this.food.toppings.find((topping) => topping.id === id)!.price)
			.reduce((prev, curr) => prev + curr, 0)
		let price: number = this.selectedQuantity * (portion.price + toppingsTotal)
		if (portion.discount > 0) {
			price = price - price * portion.discount
		}
		return Math.ceil(price)
	}

	getSelectedPortion(): FoodPortion {
		return this.portions.find((p) => p.id === this.selectedPortionId)!
	}
}
