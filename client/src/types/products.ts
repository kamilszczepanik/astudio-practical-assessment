export const PRODUCT_FIELDS = [
	'title',
	'category',
	'price',
	'rating',
	'stock',
	'brand',
	'warrantyInformation',
	'shippingInformation',
	'availabilityStatus',
	'returnPolicy',
	'minimumOrderQuantity',
] as const

export type ProductField = (typeof PRODUCT_FIELDS)[number]

export interface Product {
	id: number
	title: string
	category: string
	price: number
	rating: number
	stock: number
	brand: string
	warrantyInformation: string
	shippingInformation: string
	availabilityStatus: string
	returnPolicy: string
	minimumOrderQuantity: number
}

export const PRODUCT_TABLE_COLUMNS = PRODUCT_FIELDS.map(field => ({
	key: field,
	label: field.replace(/([A-Z])/g, ' $1').toUpperCase(),
}))

export interface ProductsResponse {
	products: Product[]
	total: number
	skip: number
	limit: number
}

export interface Category {
	slug: string
	name: string
	url: string
}
