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
  },
  {
    title: "BFS",
    description: "Breadth First Search",
    complexity: {
      time: "O(V+E)",
      space: "O(V)",
    },
  },
];

export default function Traversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout algorithmName="bfs" algorithmDisplayBox={algorithms} />
    </HeaderLayout>
  );
}
