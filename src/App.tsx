import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContext";
import Create from "./components/Create";
function App() {
  return (
    <main className="max-w-7xl mx-auto p-2.5">
      <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      <Toaster />
      </UserContextProvider>
    </main>
  );
}

export default App;
