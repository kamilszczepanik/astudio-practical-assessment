import { useEffect, useState } from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { User, TABLE_COLUMNS } from "../types/users";
import { Button } from "../components/ui/button";

const ENTRIES_OPTIONS = [5, 10, 20, 50];
const GENDER_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Male", value: "male" as const },
  { label: "Female", value: "female" as const },
] as const;

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

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
    setCurrentPage(1);
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

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      `<mark class="bg-yellow-200 rounded-sm">$1</mark>`
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">
        Home / <span className="font-bold">Users</span>
      </h1>
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

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </Button>
          {showSearch && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1 border rounded text-sm"
              autoFocus
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left border-b text-sm font-bold bg-blue-200"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(0, entriesPerPage).map((user) => (
              <tr key={user.username}>
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={`${user.username}-${column.key}`}
                    className="px-4 py-2 border-b text-sm"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        String(user[column.key]),
                        searchQuery
                      ),
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2 mt-16">
          <Button
            variant="link"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ←
          </Button>

          {getPageNumbers().map((pageNumber, idx) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-3 py-1">
                ...
              </span>
            ) : (
              <Button
                key={`page-${pageNumber}`}
                variant="link"
                size="sm"
                onClick={() => handlePageChange(pageNumber as number)}
                className={currentPage === pageNumber ? "pb-4" : ""}
              >
                {pageNumber}
              </Button>
            )
          )}

          <Button
            variant="link"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};
