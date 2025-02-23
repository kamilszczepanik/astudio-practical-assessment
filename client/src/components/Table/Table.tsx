import { TABLE_COLUMNS, User } from '../../types/users'
import { highlightText } from '../../utils/helpers'
import { TableSkeleton } from './Skeleton'

interface Props {
	loading: boolean
	itemsPerPage: number
	filteredUsers: User[]
	searchQuery: string
}

export const Table = ({
	loading,
	itemsPerPage,
	filteredUsers,
	searchQuery,
}: Props) => {
	return (
		<>
			{loading ? (
				<TableSkeleton rowCount={itemsPerPage} />
			) : (
				<table className="min-w-full">
					<thead>
						<tr>
							{/* todo: change to be dynamic and have users or products */}
							{TABLE_COLUMNS.map(column => (
								<th
									key={column.key}
									className="bg-custom-blue border-r-2 border-white px-3 py-3 text-left text-sm font-bold"
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredUsers.slice(0, itemsPerPage).map(user => (
							<tr key={user.username} className="hover:bg-custom-grey">
								{TABLE_COLUMNS.map(column => (
									<td
										key={`${user.username}-${column.key}`}
										className="border-custom-grey border-2 px-3 py-2 text-sm"
										dangerouslySetInnerHTML={{
											__html: highlightText(
												String(user[column.key]),
												searchQuery,
											),
										}}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	)
}
