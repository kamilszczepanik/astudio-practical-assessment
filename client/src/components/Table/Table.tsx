import { ReactNode } from "react";
import { TableSkeleton } from "../TableSkeleton";
import { useTable } from "../../context/TableContext";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  renderCell?: (row: any, column: Column) => ReactNode;
}

export const Table = ({ columns, data, onRowClick, renderCell }: TableProps) => {
  const { loading, entriesPerPage } = useTable();

  if (loading) {
    return <TableSkeleton rowCount={entriesPerPage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-sm font-bold bg-custom-blue px-3 py-3 border-r-2 border-white text-left"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, entriesPerPage).map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-custom-grey cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className="px-3 py-2 border-2 text-sm border-custom-grey"
                >
                  {renderCell ? renderCell(row, column) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 