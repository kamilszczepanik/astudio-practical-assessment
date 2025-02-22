import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Users } from "./pages/Users";
import { Products } from "./pages/Products";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
