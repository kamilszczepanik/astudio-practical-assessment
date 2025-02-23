import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Users } from './pages/Users'
import Layout from './components/Layout'
import { Products } from './pages/Products'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					{/* Redirect from / to /users */}
					<Route path="/" element={<Navigate to="/users" replace />} />
					<Route path="/users" element={<Users />} />
					<Route path="/products" element={<Products />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
