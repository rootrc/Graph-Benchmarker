import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithms = [
  {
    title: "Kruskal's",
    algorithmName: "kruskal",
    description: "Kruskal's Algorithm",
    complexity: {
      time: "O(E log(E))",
      space: "O(V + E)",
    },
    metricDisplay: [
      // { type: "dijkstra-nodesVisited", display: "Node Visits" },
      // { type: "dijkstra-edgesVisited", display: "Edge Visits" },
      // { type: "dijkstra-maxQueueSize", display: "Max Queue Size" },
      // { type: "dijkstra-averageQueueSize", display: "Average Queue Size" },
    ],
  }
];

export default function WeightedTraversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id = {2} type="weighted" algorithmDisplayBox={algorithms} />
    </HeaderLayout>
  )
}
