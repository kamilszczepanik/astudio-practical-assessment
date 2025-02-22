import { TABLE_COLUMNS } from "../types/users";

interface TableSkeletonProps {
  rowCount: number;
}

export const TableSkeleton = ({ rowCount }: TableSkeletonProps) => (
  <div className="animate-pulse">
    <div className="min-w-full">
      <div className="flex">
        {TABLE_COLUMNS.map((column) => (
          <div
            key={column.key}
            className="text-sm font-bold bg-custom-blue/50 px-3 py-3 border-r-2 border-white text-left flex-1"
          >
            <div className="h-4 bg-custom-blue/70 rounded" />
          </div>
        ))}
      </div>
      {[...Array(rowCount)].map((_, idx) => (
        <div key={idx} className="flex">
          {TABLE_COLUMNS.map((column) => (
            <div
              key={`${idx}-${column.key}`}
              className="px-3 py-2 border-2 text-sm border-custom-grey flex-1"
            >
              <div className="h-4 bg-custom-grey/30 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
); 