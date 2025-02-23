import { TABLE_COLUMNS } from '../../types/users'

interface TableSkeletonProps {
	rowCount: number
}

export const TableSkeleton = ({ rowCount }: TableSkeletonProps) => (
	<div className="animate-pulse">
		<div className="min-w-full">
			<div className="flex">
				{TABLE_COLUMNS.map(column => (
					<div
						key={column.key}
						className="bg-custom-blue/50 flex-1 border-r-2 border-white px-3 py-3 text-left text-sm font-bold"
					>
						<div className="bg-custom-blue/70 h-4 rounded" />
					</div>
				))}
			</div>
			{[...Array(rowCount)].map((_, idx) => (
				<div key={idx} className="flex">
					{TABLE_COLUMNS.map(column => (
						<div
							key={`${idx}-${column.key}`}
							className="border-custom-grey flex-1 border-2 px-3 py-2 text-sm"
						>
							<div className="bg-custom-grey/30 h-4 rounded" />
						</div>
					))}
				</div>
			))}
		</div>
	</div>
)
