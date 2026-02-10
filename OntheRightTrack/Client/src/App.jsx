import { Routes, Route } from "react-router";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import HomePage from "./components/HomePage/HomePage";
import Users from "./components/Users/Users";
import Applications from "./components/Applications/Applications";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
