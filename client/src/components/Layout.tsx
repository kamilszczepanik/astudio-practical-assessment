import React from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-5 border-r border-gray-200">
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-white ${
                    isActive ? "bg-blue-600" : ""
                  } hover:bg-gray-200`
                }
              >
                Users 
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-white ${
                    isActive ? "bg-blue-600" : ""
                  } hover:bg-gray-200`
                }
              >
                Products
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
