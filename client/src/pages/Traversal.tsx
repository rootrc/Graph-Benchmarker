import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithms = [
  {
    title: "DFS",
    algorithmName: "dfs",
    description: "Depth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
    metricDisplay: [
      { type: "dfs-nodesVisited", display: "Node Visits" },
      { type: "dfs-edgesVisited", display: "Edge Visits" },
      { type: "dfs-maxStackSize", display: "Max Stack Size" },
      { type: "dfs-averageStackSize", display: "Average Stack Size" },
    ],
  },
  {
    title: "BFS",
    algorithmName: "bfs",
    description: "Breadth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
    metricDisplay: [
      { type: "bfs-nodesVisited", display: "Node Visits" },
      { type: "bfs-edgesVisited", display: "Edge Visits" },
      { type: "bfs-maxQueueSize", display: "Max Queue Size" },
      { type: "bfs-averageQueueSize", display: "Average Queue Size" },
    ],
  },
];

export default function Traversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id = {0} type="unweighted" algorithmName="dfs" algorithmName1 = "bfs" algorithmDisplayBox={algorithms} />
    </HeaderLayout>
  );
}
