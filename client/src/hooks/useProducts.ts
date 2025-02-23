import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'
import { Product } from '../types/products'

export const useProducts = () => {
	const [loading, setLoading] = useState(true)
	const [users, setProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [productsCount, setProductsCount] = useState(0)

	const fetchProducts = useCallback(async () => {
		setLoading(true)
		try {
			const skip = (currentPage - 1) * itemsPerPage
			const productsInfo = await api.products({
				limit: itemsPerPage,
				skip,
			})
			setProducts(productsInfo.products)
			setProductsCount(productsInfo.total)
		} finally {
			setLoading(false)
		}
	}, [currentPage, itemsPerPage])

	useEffect(() => {
		fetchProducts()
	}, [itemsPerPage, currentPage, fetchProducts])

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredProducts(users)
			return
		}

		const query = searchQuery.toLowerCase()
		const filtered = users.filter(user =>
			Object.values(user).some(value =>
				String(value).toLowerCase().includes(query),
			),
		)
		setFilteredProducts(filtered)
	}, [searchQuery, users])

	return {
		loading,
		filteredProducts,
		searchQuery,
		setSearchQuery,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		productsCount,
	}
}
