import React from 'react';
import Pagination from './Pagination';
import Filters from './Filters';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onSort?: (key: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onSort, onFilter }) => {
  return (
    <div className="data-table-container">
      <Filters onFilter={onFilter} />
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                onClick={() => onSort?.(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${column.key}`}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default DataTable; 