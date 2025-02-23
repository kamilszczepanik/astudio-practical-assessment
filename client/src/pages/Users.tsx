import { useUsers } from '../hooks/useUsers'
import { Pagination } from '../components/Table/Pagination'
import { Table } from '../components/Table/Table'
import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchInput } from '../components/SearchInput'
import { GenderDropdown } from '../components/Filters/GenderDropdown'

export const Users = () => {
	const {
		loading,
		filteredUsers,
		searchQuery,
		setSearchQuery,
		itemsPerPage,
		setItemsPerPage,
		selectedGender,
		setSelectedGender,
		currentPage,
		setCurrentPage,
		usersCount,
	} = useUsers()

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
