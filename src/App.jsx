import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Card from "./pages/Card";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<Card />} />
    </Routes>
  );
}
