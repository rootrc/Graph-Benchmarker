import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Traversal from "./pages/Traversal";
import UnweightedSSSP from "./pages/UnweightedSSSP";


export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traversal" element={<Traversal />} />
        <Route path="/unweighted-sssp" element={<UnweightedSSSP />} />
      </Routes>
    </>
  )
}
