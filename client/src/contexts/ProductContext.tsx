import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from 'react'
import { Product } from '../types/products'
import api from '../services/api'

interface ProductContextValue {
	loading: boolean
	products: Product[]
	filteredProducts: Product[]
	localSearchQuery: string
	itemsPerPage: number
	currentPage: number
	productsCount: number
	selectedCategory?: string

	// Actions
	setLocalSearchQuery: (query: string) => void
	setItemsPerPage: (count: number) => void
	setCurrentPage: (page: number) => void
	setSelectedCategory: (category?: string) => void
	handleTitleFilter: (title: string) => Promise<void>
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined)

interface ProductProviderProps {
	children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
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
	}, [itemsPerPage, currentPage, selectedCategory, fetchProducts])

	useEffect(() => {
		if (!localSearchQuery.trim()) return

		const query = localSearchQuery.toLowerCase()
		const filtered = products.filter(product =>
			Object.values(product).some(value =>
				String(value).toLowerCase().includes(query),
			),
		)
		setFilteredProducts(filtered)
	}, [localSearchQuery, products])

	const value = {
		loading,
		products,
		filteredProducts,
		localSearchQuery,
		itemsPerPage,
		currentPage,
		productsCount,
		selectedCategory,
		setLocalSearchQuery,
		setItemsPerPage,
		setCurrentPage,
		setSelectedCategory,
		handleTitleFilter,
	}

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	)
}

export const useProductContext = () => {
	const context = useContext(ProductContext)
	if (!context) {
		throw new Error('useProductContext must be used within ProductProvider')
	}
	return context
}
