import { TABLE_COLUMNS, User } from "../../types/users";
import { highlightText } from "../../utils/helpers";
import { TableSkeleton } from "./Skeleton";

interface Props {
  loading: boolean;
  itemsPerPage: number;
  filteredUsers: User[];
  searchQuery: string;
}

export const Table = ({ loading, itemsPerPage, filteredUsers, searchQuery }: Props) => {
  return (
    <>
      {loading ? (
        <TableSkeleton rowCount={itemsPerPage} />
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              {/* todo: change to be dynamic and have users or products */}
              {TABLE_COLUMNS.map((column) => (
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
            {filteredUsers.slice(0, itemsPerPage).map((user) => (
              <tr key={user.username} className="hover:bg-custom-grey">
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={`${user.username}-${column.key}`}
                    className="px-3 py-2 border-2 text-sm border-custom-grey"
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
      )}
    </>
  );
};
