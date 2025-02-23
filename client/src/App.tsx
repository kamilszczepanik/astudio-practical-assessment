import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UsersPage } from './pages/Users'
import Layout from './components/Layout'
import { Products } from './pages/Products'
import { ProductProvider } from './contexts/ProductContext'

function App() {
	return (
		<ProductProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Navigate to="/users" replace />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/products" element={<Products />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</ProductProvider>
	)
}

export default App
