import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Traversal from "./pages/Traversal";
import UnweightedSSSP from "./pages/WeightedTraversal";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/algorithms/traversal" element={<Traversal />} />
      <Route path="/algorithms/weighted-traversal" element={<UnweightedSSSP />} />
    </Routes>
  )
}
