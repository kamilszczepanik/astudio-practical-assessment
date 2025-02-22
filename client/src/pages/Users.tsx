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

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [columns, setColumns] = useState<Set<string>>(new Set());
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      const usersInfo = await api.users();
      setUsers(usersInfo.users);

      if (usersInfo.users.length > 0) {
        const allColumns = new Set<string>();
        Object.keys(usersInfo.users[0]).forEach((key) => {
          allColumns.add(key);
        });
        setColumns(allColumns);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">Show</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            {entriesPerPage} entries
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {ENTRIES_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setEntriesPerPage(option)}
                className="cursor-pointer"
              >
                {option} entries
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
