import { useEffect, useState } from 'react'
import api from '../services/api'
import { User } from '../types/users'
import { Pagination } from '../components/Table/Pagination'
import { Table } from '../components/Table/Table'
import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchInput } from '../components/SearchInput'
import { GenderDropdown } from '../components/Filters/GenderDropdown'

export const Users = () => {
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState<User[]>([])
	const [filteredUsers, setFilteredUsers] = useState<User[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [selectedGender, setSelectedGender] = useState<
		'male' | 'female' | undefined
	>()
	const [currentPage, setCurrentPage] = useState(1)
	const [usersCount, setUsersCount] = useState(0)

	useEffect(() => {
		fetchUsers()
	}, [selectedGender, itemsPerPage, currentPage])

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredUsers(users)
			return
		}

		const query = searchQuery.toLowerCase()
		const filtered = users.filter(user =>
			Object.values(user).some(value =>
				String(value).toLowerCase().includes(query),
			),
		)
		setFilteredUsers(filtered)
	}, [searchQuery, users])

	const fetchUsers = async () => {
		setLoading(true)
		try {
			const skip = (currentPage - 1) * itemsPerPage
			const usersInfo = await api.users({
				gender: selectedGender,
				limit: itemsPerPage,
				skip,
			})
			setUsers(usersInfo.users)
			setUsersCount(usersInfo.total)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex h-full flex-col">
			<PageTitle title="Users" />
			<div className="flex">
				<EntriesDropdown
					itemsPerPage={itemsPerPage}
					setItemsPerPage={setItemsPerPage}
					setCurrentPage={setCurrentPage}
				/>
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<GenderDropdown
					selectedGender={selectedGender}
					setSelectedGender={setSelectedGender}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex-1">
					<Table
						loading={loading}
						itemsPerPage={itemsPerPage}
						filteredUsers={filteredUsers}
						searchQuery={searchQuery}
					/>
				</div>
				<Pagination
					totalItems={usersCount}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	)
}
