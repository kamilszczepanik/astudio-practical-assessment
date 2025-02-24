import axiosInstance from '../utils/axiosInstance'
import { UsersResponse, USER_FIELDS } from '../types/users'
import { PRODUCT_FIELDS, ProductsResponse, Category } from '../types/products'

interface BaseFilters {
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

	const fetchData = async <T>(
		endpoint: string,
		fields: typeof USER_FIELDS | typeof PRODUCT_FIELDS,
		filters?: BaseFilters,
		queryParams?: Record<string, string | number>,
	): Promise<T> => {
		const params = new URLSearchParams()

		params.append('select', fields.join(','))

		if (filters?.limit) params.append('limit', String(filters.limit))
		if (filters?.skip) params.append('skip', String(filters.skip))
		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				params.append(key, String(value))
			})
		}

		const url = `${endpoint}?${params.toString()}`
		const response = await get(url)

		return response as T
	}

	return {
		users: async (filters?: BaseFilters): Promise<UsersResponse> =>
			fetchData<UsersResponse>('/users', USER_FIELDS, filters),
		products: async (filters?: BaseFilters): Promise<ProductsResponse> =>
			fetchData<ProductsResponse>('/products', PRODUCT_FIELDS, filters),
		productsCategories: async (): Promise<Category[]> => {
			const response = await get('/products/categories')
			return response as Category[]
		},
		productsByCategory: async (
			category: string,
			filters: BaseFilters,
		): Promise<ProductsResponse> =>
			fetchData<ProductsResponse>(
				`/products/category/${category}`,
				PRODUCT_FIELDS,
				filters,
			),
		filterUsers: async (
			key: 'email' | 'firstName' | 'birthDate' | 'gender',
			value: string,
			filters?: BaseFilters,
		): Promise<UsersResponse> =>
			fetchData<UsersResponse>('/users/filter', USER_FIELDS, filters, {
				key,
				value,
			}),
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
