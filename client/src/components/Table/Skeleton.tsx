import { TABLE_COLUMNS } from '../../types/users'

interface TableSkeletonProps {
	rowCount: number
}

export const TableSkeleton = ({ rowCount }: TableSkeletonProps) => (
	<table className="mb-20 min-w-full">
		<thead>
			<tr>
				{TABLE_COLUMNS.map(column => (
					<th
						key={column.key}
						className="bg-custom-blue/50 border-r-2 border-white px-3 py-3 text-left text-sm font-bold"
					>
						<div className="bg-custom-blue/70 h-4 animate-pulse rounded" />
					</th>
				))}
			</tr>
		</thead>
		<tbody>
			{[...Array(rowCount)].map((_, idx) => (
				<tr key={idx}>
					{TABLE_COLUMNS.map(column => (
						<td
							key={`${idx}-${column.key}`}
							className="border-custom-grey border-2 px-3 py-2 text-sm"
						>
							<div className="bg-custom-grey/70 h-4 animate-pulse rounded" />
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
)
