import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import DFS from "./pages/DFS";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function App() {
  const [array, setArray] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/`);
      setArray(response.data.fruits || []);
      console.log(response.data.fruits);
    } catch (e) {
      console.warn('api fetch failed', e);
    }
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
