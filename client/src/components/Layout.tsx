import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className="flex min-h-screen">
			<aside
				className={`${
					isSidebarOpen ? 'w-64' : 'w-20'
				} border-custom-grey border-r py-4 pr-2 pl-3 transition-all duration-300 ease-in-out`}
			>
				<Button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					variant="ghost"
					className="hover:bg-custom-grey mb-4 cursor-pointer rounded-md p-2 transition-colors"
				>
					{isSidebarOpen ? '◀' : '▶'}
				</Button>
				<nav>
					<ul className="space-y-2 pr-2">
						<li>
							<NavLink
								to="/users"
								className={({ isActive }) =>
									`text-custom-black hover:bg-custom-grey block rounded-md px-4 py-2 ${
										isActive ? 'bg-custom-blue' : ''
									}`
								}
							>
								{isSidebarOpen ? (
									<span className="text-custom-black">👥 Users</span>
								) : (
									<span title="Users">👥</span>
								)}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/products"
								className={({ isActive }) =>
									`text-custom-black hover:bg-custom-grey block rounded-md px-4 py-2 ${
										isActive ? 'bg-custom-blue' : ''
									}`
								}
							>
								{isSidebarOpen ? (
									<span className="text-custom-black">📦 Products</span>
								) : (
									<span title="Products">📦</span>
								)}
							</NavLink>
						</li>
					</ul>
				</nav>
			</aside>
			<main className="flex-1 p-4">{children}</main>
		</div>
	)
}

export default Layout
