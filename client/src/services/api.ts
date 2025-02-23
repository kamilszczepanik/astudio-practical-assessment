import axiosInstance from '../utils/axiosInstance'
import { UsersResponse, USER_FIELDS } from '../types/users'
import { PRODUCT_FIELDS, ProductsResponse } from '../types/products'

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function post(url: string, body: object = {}): Promise<unknown> {
		try {
			const response = await axiosInstance.post(url, body, { headers })
			return response.data
		} catch (error) {
			console.error(`POST ${url} failed:`, error)
			throw error
		}
	}

	return {
		users: async (filters?: UsersFilters): Promise<UsersResponse> => {
			const params = new URLSearchParams()

			params.append('select', USER_FIELDS.join(','))

			if (filters?.limit) {
				params.append('limit', String(filters.limit))
			}
			if (filters?.skip) {
				params.append('skip', String(filters.skip))
			}

			let url = `/users?${params.toString()}`

			if (filters?.gender) {
				url = `/users/filter?key=gender&value=${
					filters.gender
				}&${params.toString()}`
			}

			const response = await get(url)

			return response as UsersResponse
		},
		products: async (filters?: ProductsFilters): Promise<ProductsResponse> => {
			const params = new URLSearchParams()

			params.append('select', PRODUCT_FIELDS.join(','))

			if (filters?.limit) {
				params.append('limit', String(filters.limit))
			}
			if (filters?.skip) {
				params.append('skip', String(filters.skip))
			}

			const url = `/products?${params.toString()}`
			const response = await get(url)

			return response as ProductsResponse
		},
	}
})()

export default api
