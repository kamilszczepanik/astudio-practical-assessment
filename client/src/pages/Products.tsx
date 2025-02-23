import { EntriesDropdown } from '../components/Filters/EntriesDropdown'
import { PageTitle } from '../components/PageTitle'
import { SearchCurrentPageInput } from '../components/SearchInput'
import { Pagination } from '../components/Table/Pagination'
import { Table } from '../components/Table/Table'
import { PRODUCT_TABLE_COLUMNS } from '../types/products'
import { CategoryDropdown } from '../components/Filters/CategoryDropdown'
import { FilterInput } from '../components/Filters/FilterInput'
import { ProductProvider, useProductContext } from '../contexts/ProductContext'

export const ProductsPage = () => {
	return (
		<ProductProvider>
			<Products />
		</ProductProvider>
	)
}

const Products = () => {
	const {
		loading,
		localSearchQuery,
		setLocalSearchQuery,
		itemsPerPage,
		currentPage,
		setCurrentPage,
		productsCount,
		filteredProducts,
		handleTitleFilter,
		setItemsPerPage,
	} = useProductContext()

	return (
		<div className="flex h-full flex-col">
			<PageTitle title="Products" />
			<div className="mb-1 flex items-center gap-2">
				<EntriesDropdown
					itemsPerPage={itemsPerPage}
					setItemsPerPage={setItemsPerPage}
					setCurrentPage={setCurrentPage}
				/>
				<SearchCurrentPageInput
					searchQuery={localSearchQuery}
					setSearchQuery={setLocalSearchQuery}
				/>
				<FilterInput
					label="Search all products"
					title="🔍 Search Products"
					onFilter={handleTitleFilter}
					placeholder="Search in all products..."
				/>
				<CategoryDropdown />
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex-1">
					<Table
						loading={loading}
						itemsPerPage={itemsPerPage}
						columns={PRODUCT_TABLE_COLUMNS}
						items={filteredProducts}
						localSearchQuery={localSearchQuery}
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
