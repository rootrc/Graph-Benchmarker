import type { JSX } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Traversal from "./pages/Traversal";
import UnweightedSSSP from "./pages/WeightedTraversal";
import MinimumSpanningTree from "./pages/MinimumSpanningTree";


export type Section = {
  title: string;
  links: { name: string; to: string, element: JSX.Element}[];
};

export const menuSections = [
  {
    title: "Simple Algorithms",
    links: [
      { name: "Traversal", to: "/algorithms/traversal", element: <Traversal />},
      { name: "Weighted Traversal", to: "/algorithms/weighted-traversal", element: <UnweightedSSSP /> },
      { name: "Minimum-Spanning-Tree", to: "/algorithms/minimum-spanning-tree", element: <MinimumSpanningTree /> },
    ],
  },
];

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {menuSections.map((section) => {
        return (
          section.links.map((route) => {
            return (
              <Route path={route.to} element={route.element} />
            )
          })
        );
      })}
    </Routes>
  )
}
