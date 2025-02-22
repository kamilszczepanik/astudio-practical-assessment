import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav>
          <ul>
            <li><a href="/users">Users</a></li>
            <li><a href="/products">Products</a></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© 2024 Your Application</p>
      </footer>
    </div>
  );
};

export default Layout; 