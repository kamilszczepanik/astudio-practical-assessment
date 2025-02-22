import axiosInstance from '../utils/axiosInstance'
import { UsersResponse, USER_FIELDS } from '../types/users'
import { PRODUCT_FIELDS, ProductsResponse, Category } from '../types/products'

interface UsersFilters {
	gender?: 'male' | 'female'
	limit?: number
	skip?: number
}
interface ProductsFilters {
	limit?: number
	skip?: number
}

const api = (() => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}

	async function get(url: string): Promise<unknown> {
		try {
			const response = await axiosInstance.get(url, { headers })
			return response.data
		} catch (error) {
			console.error(`GET ${url} failed:`, error)
			throw error
		}
	}

	return {
		users: async (filters?: UsersFilters): Promise<UsersResponse> => {
			const params = new URLSearchParams()

			params.append('select', USER_FIELDS.join(','))

			if (filters?.limit) params.append('limit', String(filters.limit))
			if (filters?.skip) params.append('skip', String(filters.skip))

			let url = `/users?${params.toString()}`

			if (filters?.gender)
				url = `/users/filter?key=gender&value=${
					filters.gender
				}&${params.toString()}`

			const response = await get(url)

			return response as UsersResponse
		},
		products: async (filters?: ProductsFilters): Promise<ProductsResponse> => {
			const params = new URLSearchParams()

			params.append('select', PRODUCT_FIELDS.join(','))

			if (filters?.limit) params.append('limit', String(filters.limit))
			if (filters?.skip) params.append('skip', String(filters.skip))

			const url = `/products?${params.toString()}`
			const response = await get(url)

			return response as ProductsResponse
		},
		productsCategories: async (): Promise<Category[]> => {
			const response = await get('/products/categories')
			return response as Category[]
		},
		productsByCategory: async (
			category: string,
			{ limit, skip }: { limit: number; skip: number },
		): Promise<ProductsResponse> => {
			const params = new URLSearchParams()
			if (limit) params.append('limit', String(limit))
			if (skip) params.append('skip', String(skip))

			const response = await get(`/products/category/${category}?${params}`)
			return response as ProductsResponse
		},
		filterUsers: async (
			key: 'email' | 'firstName' | 'birthDate' | 'gender',
			value: string,
			filters?: { limit?: number; skip?: number },
		): Promise<UsersResponse> => {
			const params = new URLSearchParams()

			if (filters?.limit) params.append('limit', String(filters.limit))
			if (filters?.skip) params.append('skip', String(filters.skip))

			const url = `/users/filter?key=${key}&value=${value}&${params.toString()}`
			const response = await get(url)

			return response as UsersResponse
		},
		filterProducts: async (
			value: string,
			filters?: { limit?: number; skip?: number },
		): Promise<ProductsResponse> => {
			const params = new URLSearchParams()

			if (filters?.limit) params.append('limit', String(filters.limit))
			if (filters?.skip) params.append('skip', String(filters.skip))

			const url = `/products/search?q=${value}&${params.toString()}`
			const response = await get(url)
			return response as ProductsResponse
		},
	}
})()

export default api
