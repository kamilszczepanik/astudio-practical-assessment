import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UsersPage } from './pages/Users'
import Layout from './components/Layout'
import { ProductsPage } from './pages/Products'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/users" replace />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/products" element={<ProductsPage />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
