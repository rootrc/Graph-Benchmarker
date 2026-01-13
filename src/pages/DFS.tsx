import Graph from "../components/Graph";
import graphData from "../data/test.json";

export default function Home() {
  const elements = [...graphData.nodes, ...graphData.edges];

  return (
    <Graph elements={elements} />
  )
}
