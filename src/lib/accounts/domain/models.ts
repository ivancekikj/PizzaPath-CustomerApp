export interface NewsletterPost {
	id: number
	title: string
	content: string
	date: string
}

export interface CategoryCoupons {
	categoryId: number
	categoryName: string
	coupons: DetailedCoupon[]
}

export interface DetailedCoupon {
	foodPortionId: number
	foodName: string
	sizeName: string
	couponValue: number
	count: number
}
