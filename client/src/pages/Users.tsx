import { useEffect, useState } from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { User } from "../types/users";
import { Pagination } from "../components/Table/Pagination";
import { Table } from "../components/Table/Table";
import { EntriesDropdown } from "../components/EntriesDropdown";
import { PageTitle } from "../components/PageTitle";
import { SearchInput } from "../components/SearchInput";

const GENDER_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Male", value: "male" as const },
  { label: "Female", value: "female" as const },
] as const;

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
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

  return (
    <div className="p-4">
      <PageTitle title="Users" />
      <div className="flex items-center gap-4 mb-2">
        <EntriesDropdown
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-1 text-sm hover:bg-gray-50">
            {selectedGender
              ? selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
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
