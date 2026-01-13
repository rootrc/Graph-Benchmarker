import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DFS from "./pages/DFS";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/dfs">DFS</Link>{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dfs" element={<DFS />} />
      </Routes>
    </>
  )
}
