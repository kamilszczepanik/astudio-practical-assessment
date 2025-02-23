import { useLocation } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { useProductContext } from '../contexts/ProductContext'

export const useDynamicContext = () => {
	const location = useLocation()
	const userContext = useUserContext()
	const productContext = useProductContext()

	const isProductsPage = location.pathname === '/products'

	return isProductsPage ? productContext : userContext
}
