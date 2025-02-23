import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'
import { Product } from '../types/products'

export const useProducts = () => {
	const [loading, setLoading] = useState(true)
	const [products, setProducts] = useState<Product[]>([])
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
	const [localSearchQuery, setLocalSearchQuery] = useState('')
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [productsCount, setProductsCount] = useState(0)
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

	const fetchProducts = useCallback(async () => {
		setLoading(true)
		try {
			const skip = (currentPage - 1) * itemsPerPage
			const productsInfo = selectedCategory
				? await api.productsByCategory(selectedCategory, {
						limit: itemsPerPage,
						skip,
					})
				: await api.products({
						limit: itemsPerPage,
						skip,
					})
			setProducts(productsInfo.products)
			setProductsCount(productsInfo.total)
		} finally {
			setLoading(false)
		}
	}, [currentPage, itemsPerPage, selectedCategory])

	const handleTitleFilter = useCallback(
		async (title: string) => {
			if (!title.trim()) {
				fetchProducts()
				return
			}

			setLoading(true)
			try {
				const productsInfo = await api.filterProducts('title', title, {
					limit: itemsPerPage,
					skip: (currentPage - 1) * itemsPerPage,
				})
				setProducts(productsInfo.products)
				setProductsCount(productsInfo.total)
			} finally {
				setLoading(false)
			}
		},
		[currentPage, itemsPerPage, fetchProducts],
	)

	useEffect(() => {
		fetchProducts()
	}, [itemsPerPage, currentPage, fetchProducts])

	useEffect(() => {
		if (localSearchQuery.trim() === '') {
			setFilteredProducts(products)
			return
		}

		const query = localSearchQuery.toLowerCase()
		const filtered = products.filter(product =>
			Object.values(product).some(value =>
				String(value).toLowerCase().includes(query),
			),
		)
		setFilteredProducts(filtered)
	}, [localSearchQuery, products])

	return {
		loading,
		filteredProducts,
		localSearchQuery,
		setLocalSearchQuery,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		productsCount,
		selectedCategory,
		setSelectedCategory,
		handleTitleFilter,
	}
}
