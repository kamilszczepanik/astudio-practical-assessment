export const PRODUCT_FIELDS = ['title', 'price'] as const

export type ProductField = (typeof PRODUCT_FIELDS)[number]

export interface Product {
	title: string
	price: number
}

export interface ProductsResponse {
	products: Product[]
	total: number
	skip: number
	limit: number
}
