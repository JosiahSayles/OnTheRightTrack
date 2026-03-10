import { Routes, Route } from "react-router";
import Register from "./components/Auth/Register";
import HomePage from "./components/HomePage/HomePage";
import Users from "./components/Users/Users";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
