import { useEffect, useState } from "react";
import api from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface User {
  [key: string]: string;
}

const ENTRIES_OPTIONS = [5, 10, 20, 50];
const GENDER_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [columns, setColumns] = useState<Set<string>>(new Set());
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | undefined
  >();

  useEffect(() => {
    fetchUsers();
  }, [selectedGender]);

  const fetchUsers = async () => {
    const usersInfo = await api.users({ gender: selectedGender });
    setUsers(usersInfo.users);

    if (usersInfo.users.length > 0) {
      const allColumns = new Set<string>();
      Object.keys(usersInfo.users[0]).forEach((key) => {
        allColumns.add(key);
      });
      setColumns(allColumns);
    }
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
                  onClick={() => setEntriesPerPage(option)}
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
                  onClick={() => setSelectedGender(option.value)}
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
              {Array.from(columns).map((column) => (
                <th
                  key={column}
                  className="px-4 py-2 text-left border-b text-sm font-semibold text-gray-600"
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.slice(0, entriesPerPage).map((user) => {
              return (
                <tr key={user.id}>
                  {Array.from(columns).map((column) => (
                    <td
                      key={`${user.id}-${column}`}
                      className="px-4 py-2 border-b text-sm"
                    >
                      {String(user[column])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
