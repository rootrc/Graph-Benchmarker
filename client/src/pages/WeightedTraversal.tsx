import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithms = [
  {
    title: "Dijkstra",
    algorithmName: "dijkstra",
    description: "Dijkstra's algorithm",
    complexity: {
      time: "O((E + V) logV)",
      space: "O(E + V)",
    },
    metricDisplay: [
      { type: "dijkstra-nodesVisited", display: "Visited Nodes" },
      { type: "dijkstra-edgesVisited", display: "Visited Edges" },
      { type: "dijkstra-maxQueueSize", display: "Max Queue Size" },
      { type: "dijkstra-averageQueueSize", display: "Average Queue Size" },
    ],
  }
];

export default function WeightedTraversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout algorithmName="dijkstra" algorithmDisplayBox={algorithms} />
    </HeaderLayout>
  )
}
