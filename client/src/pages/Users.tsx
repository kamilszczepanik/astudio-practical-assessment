import { useEffect, useState } from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { User, TABLE_COLUMNS } from "../types/users";

const ENTRIES_OPTIONS = [5, 10, 20, 50];
const GENDER_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPages = Math.min(Math.ceil(totalUsers / entriesPerPage));

  useEffect(() => {
    fetchUsers();
  }, [selectedGender, entriesPerPage, currentPage]);

  const fetchUsers = async () => {
    const skip = (currentPage - 1) * entriesPerPage;
    const usersInfo = await api.users({
      gender: selectedGender,
      limit: entriesPerPage,
      skip,
    });
    setUsers(usersInfo.users);
    setTotalUsers(usersInfo.total);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGenderChange = (value: "male" | "female" | undefined) => {
    setSelectedGender(value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(totalUsers / entriesPerPage);
    const maxVisibleButtons = 5;
    const array = [];

    if (totalPageCount <= maxVisibleButtons) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPageCount);
    } else if (currentPage >= totalPageCount - 2) {
      array.push(1);
      array.push("...");
      for (let i = totalPageCount - 3; i <= totalPageCount; i++) {
        array.push(i);
      }
    } else {
      array.push(1);
      array.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPageCount);
    }

    return array;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              {entriesPerPage}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {ENTRIES_OPTIONS.map((option) => (
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

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
              {selectedGender
                ? selectedGender.charAt(0).toUpperCase() +
                  selectedGender.slice(1)
                : "Gender"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {GENDER_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => handleGenderChange(option.value)}
                  className="cursor-pointer"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left border-b text-sm font-semibold text-gray-600"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.slice(0, entriesPerPage).map((user) => (
              <tr key={user.username}>
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={`${user.username}-${column.key}`}
                    className="px-4 py-2 border-b text-sm"
                  >
                    {String(user[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
          >
            ←
          </button>

          {getPageNumbers().map((pageNumber, idx) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={`page-${pageNumber}`}
                onClick={() => handlePageChange(pageNumber as number)}
                className={`px-3 py-1 rounded border transition-colors ${
                  currentPage === pageNumber ? "text-blue-500" : ""
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
