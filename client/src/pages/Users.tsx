import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export const Users = () => {
  useEffect(() => {
    (async () => {
      const allUsers = await api.users();
      console.log(allUsers);
    })();
  }, []);
  return (
    <>
      <Link to="/">Home</Link>
      <h1>Users</h1>
    </>
  );
};
