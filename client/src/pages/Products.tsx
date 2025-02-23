import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchInput } from '../components/SearchInput'
import { useProducts } from '../hooks/useProducts'

export const Products = () => {
	const {
		searchQuery,
		setSearchQuery,
		itemsPerPage,
		setItemsPerPage,
		setCurrentPage,
	} = useProducts()

	return (
		<div className="flex h-full flex-col">
			<PageTitle title="Products" />
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
			</div>
			{/* <div className="flex flex-1 flex-col">
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
			</div> */}
		</div>
	)
}
