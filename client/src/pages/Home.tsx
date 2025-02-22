import { Link } from "react-router-dom";

export const Home = () => (
  <div className="users-page">
    <Link to="/users">Users</Link>
    <Link to="/products">Products</Link>
  </div>
);
