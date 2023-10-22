import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pet from "./pages/Pet";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets/:id" element={<Pet />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
