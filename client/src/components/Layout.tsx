import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } py-4 pr-2 pl-3 border-r border-custom-grey transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4 p-2 rounded-md hover:bg-custom-grey transition-colors"
        >
          {isSidebarOpen ? "◀" : "▶"}
        </button>
        <nav>
          <ul className="space-y-2 pr-2">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-white ${
                    isActive ? "bg-custom-blue" : ""
                  } hover:bg-custom-grey`
                }
              >
                {isSidebarOpen ? "👥 Users" : <span title="Users">👥</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-white ${
                    isActive ? "bg-custom-blue" : ""
                  } hover:bg-custom-grey`
                }
              >
                {isSidebarOpen ? (
                  "📦 Products"
                ) : (
                  <span title="Products">📦</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-5 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
