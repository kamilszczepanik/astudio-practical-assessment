import { useEffect, useState } from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { User } from "../types/users";
import { Button } from "../components/ui/button";
import { Pagination } from "../components/Table/Pagination";
import { Table } from "../components/Table/Table";

const ENTRIES_OPTIONS = [5, 10, 20, 50];
const GENDER_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Male", value: "male" as const },
  { label: "Female", value: "female" as const },
] as const;

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [selectedGender, itemsPerPage, currentPage]);

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
    setLoading(true);
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const usersInfo = await api.users({
        gender: selectedGender,
        limit: itemsPerPage,
        skip,
      });
      setUsers(usersInfo.users);
      setUsersCount(usersInfo.total);
    } finally {
      setLoading(false);
    }
  };

  const handleGenderChange = (value: "male" | "female" | undefined) => {
    setSelectedGender(value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-sm">
        Home / <span className="font-bold bg-custom-yellow">Users</span>
      </h1>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 text-sm rounded hover:bg-gray-50">
              {itemsPerPage}
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
            <DropdownMenuTrigger className="px-3 py-1 text-sm hover:bg-gray-50">
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
        <Table
          loading={loading}
          itemsPerPage={itemsPerPage}
          filteredUsers={filteredUsers}
          searchQuery={searchQuery}
        />

        <Pagination
          totalItems={usersCount}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
