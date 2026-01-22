import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithms = [
  {
    title: "DFS",
    description: "Depth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
    metricDisplay: [
      { type: "metric-nodesVisited", display: "Visited Nodes" },
      { type: "metric-edgesVisited", display: "Visited Edges" },
      { type: "metric-maxDequeSize", display: "Max Stack Size" },
    ],
  },
  {
    title: "BFS",
    description: "Breadth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
    metricDisplay: [
      { type: "metric-nodesVisited", display: "Visited Nodes" },
      { type: "metric-edgesVisited", display: "Visited Edges" },
      { type: "metric-maxDequeSize", display: "Max Queue Size" },
    ],
  },
];

export default function Traversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout algorithmName="bfs" algorithmDisplayBox={algorithms} />
    </HeaderLayout>
  );
}
