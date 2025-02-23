export const PRODUCT_FIELDS = ['title', 'price'] as const

export type ProductField = (typeof PRODUCT_FIELDS)[number]

export interface Product {
	id: number
	title: string
	price: number
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
