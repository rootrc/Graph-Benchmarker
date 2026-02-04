import type { AlgorithmConfig } from "../components/AlgorithmDisplayBox";
import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithmConfig : AlgorithmConfig = {
  showStartNode: true,
  algorithms: [{
    title: "DFS",
    algorithmName: "dfs",
    description: "Depth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
    metricDisplay: [
      { type: "dfs-nodesVisited", display: "Nodes Examined" },
      { type: "dfs-edgesVisited", display: "Edges Examined" },
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
      { type: "bfs-nodesVisited", display: "Nodes Examined" },
      { type: "bfs-edgesVisited", display: "Edges Examined" },
      { type: "bfs-maxQueueSize", display: "Max Queue Size" },
      { type: "bfs-averageQueueSize", display: "Average Queue Size" },
    ],
  }]
};

export default function Traversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id={0} type="unweighted" algorithmConfig={algorithmConfig} />
    </HeaderLayout>
  );
}
