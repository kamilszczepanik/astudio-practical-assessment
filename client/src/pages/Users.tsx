import { useUsers } from '../hooks/useUsers'
import { Pagination } from '../components/Table/Pagination'
import { Table } from '../components/Table/Table'
import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchCurrentPageInput } from '../components/SearchInput'
import { GenderDropdown } from '../components/Filters/GenderDropdown'
import { USER_TABLE_COLUMNS } from '../types/users'
import { FilterInput } from '../components/Filters/FilterInput'
import { DateFilterInput } from '../components/Filters/DateFilterInput'

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
		handleEmailFilter,
		handleNameFilter,
		handleBirthDateFilter,
	} = useUsers()

	return (
		<div className="flex h-full flex-col">
			<PageTitle title="Users" />
			<div className="mb-1 flex items-center gap-2">
				<EntriesDropdown
					itemsPerPage={itemsPerPage}
					setItemsPerPage={setItemsPerPage}
					setCurrentPage={setCurrentPage}
				/>
				<SearchCurrentPageInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<FilterInput
					label="Filter by name"
					title="👤 Name"
					onFilter={handleNameFilter}
					placeholder="Enter name..."
				/>
				<FilterInput
					label="Filter by email"
					title="✉️ Email"
					onFilter={handleEmailFilter}
					placeholder="Enter email..."
				/>
				<GenderDropdown
					selectedGender={selectedGender}
					setSelectedGender={setSelectedGender}
					setCurrentPage={setCurrentPage}
				/>
				<DateFilterInput
					label="Filter by birth date"
					title="📅 Birth Date"
					onFilter={handleBirthDateFilter}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex-1">
					<Table
						loading={loading}
						itemsPerPage={itemsPerPage}
						columns={USER_TABLE_COLUMNS}
						items={filteredUsers}
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
