import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchInput } from '../components/SearchInput'
import { Pagination } from '../components/Table/Pagination'
import { Table } from '../components/Table/Table'
import { useProducts } from '../hooks/useProducts'
import { PRODUCT_TABLE_COLUMNS } from '../types/products'
import { CategoryDropdown } from '../components/Filters/CategoryDropdown'

export const Products = () => {
	const {
		loading,
		searchQuery,
		setSearchQuery,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		productsCount,
		filteredProducts,
		selectedCategory,
		setSelectedCategory,
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
				<CategoryDropdown
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex-1">
					<Table
						loading={loading}
						itemsPerPage={itemsPerPage}
						columns={PRODUCT_TABLE_COLUMNS}
						items={filteredProducts}
						searchQuery={searchQuery}
					/>
				</div>
				<Pagination
					totalItems={productsCount}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	)
}
