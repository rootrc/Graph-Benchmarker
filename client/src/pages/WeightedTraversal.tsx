import type { AlgorithmConfig } from "../components/AlgorithmDisplayBox";
import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithmConfig : AlgorithmConfig = {
  showStartNode: true,
  algorithms: [{
    title: "Dijkstra",
    algorithmName: "dijkstra",
    description: "Dijkstra's algorithm",
    complexity: {
      time: "O((V + E) logV)",
      space: "O(V + E)",
    },
    metricDisplay: [
      { type: "dijkstra-nodesVisited", display: "Nodes Examined" },
      { type: "dijkstra-edgesVisited", display: "Edges Examined" },
      { type: "dijkstra-maxQueueSize", display: "Max Priority Queue Size" },
      { type: "dijkstra-averageQueueSize", display: "Average Priority Queue Size" },
    ],
  }]
};

export default function WeightedTraversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id={1} type="weighted" algorithmConfig={algorithmConfig} />
    </HeaderLayout>
  )
}
