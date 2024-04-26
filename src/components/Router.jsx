import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":ouid" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
