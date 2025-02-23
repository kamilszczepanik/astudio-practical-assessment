import { TableSkeleton } from './Skeleton'
import { highlightText } from '../../utils/helpers'

interface Column<T> {
	key: keyof T
	label: string
}

interface BaseItem {
	id: string | number
}

interface TableProps<T extends BaseItem> {
	loading: boolean
	itemsPerPage: number
	columns: Column<T>[]
	items: T[]
	searchQuery: string
}

export function Table<T extends BaseItem>({
	loading,
	itemsPerPage,
	columns,
	items,
	searchQuery,
}: TableProps<T>) {
	if (loading) {
		return <TableSkeleton rowCount={itemsPerPage} columns={columns} />
	}

	return (
		<table className="min-w-full">
			<thead>
				<tr>
					{columns.map(column => (
						<th
							key={String(column.key)}
							className="bg-custom-blue border-r-2 border-white px-3 py-3 text-left text-sm font-bold"
						>
							{column.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{items.slice(0, itemsPerPage).map(item => (
					<tr key={item.id} className="hover:bg-custom-grey">
						{columns.map(column => (
							<td
								key={`${item.id}-${String(column.key)}`}
								className="border-custom-grey border-2 px-3 py-2 text-sm"
								dangerouslySetInnerHTML={{
									__html: highlightText(String(item[column.key]), searchQuery),
								}}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
