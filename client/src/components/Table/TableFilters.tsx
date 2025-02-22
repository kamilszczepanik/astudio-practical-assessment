import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTable } from "../../context/TableContext";

interface FilterOption {
  label: string;
  value: any;
}

interface TableFiltersProps {
  entriesOptions?: number[];
  filters?: {
    options: FilterOption[];
    value: any;
    onChange: (value: any) => void;
    label: string;
  }[];
  children?: ReactNode;
}

export const TableFilters = ({
  entriesOptions = [5, 10, 20, 50],
  filters = [],
  children,
}: TableFiltersProps) => {
  const { entriesPerPage, setEntriesPerPage, setCurrentPage } = useTable();

  const handleEntriesChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center gap-4 mb-2">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-1 text-sm rounded hover:bg-gray-50">
            {entriesPerPage}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {entriesOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleEntriesChange(option)}
                className="cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-sm">Entries</span>
      </div>

      {filters.map((filter, index) => (
        <div key={index} className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm hover:bg-gray-50">
              {filter.options.find((opt) => opt.value === filter.value)?.label ||
                filter.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filter.options.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => filter.onChange(option.value)}
                  className="cursor-pointer"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}

      <div className="ml-auto">{children}</div>
    </div>
  );
}; 