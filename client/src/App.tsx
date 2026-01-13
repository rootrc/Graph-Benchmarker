import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import DFS from "./pages/DFS";

export default function App() {
  const [array, setArray] = useState([]);

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:8080/api/");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/dfs">DFS</Link>{" "}
      </nav>
      {
        array.map((fruit, index) => (
          <p key={index}>{fruit}</p>
        ))
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dfs" element={<DFS />} />
      </Routes>
    </>
  )
}
