import AlgorithmDisplay from "../components/AlgorithmDisplay";
import HeaderLayout from "../containers/HeaderLayout";

export default function Traversal() {
  return (
    <HeaderLayout>
      <div className="flex flex-row gap-4">
        <AlgorithmDisplay
          algorithm={{
            title: "DFS",
            description: "Depth First Search",
            complexity: {
              time: "O(V+E)",
              space: "O(V)",
            },
          }} />
        <AlgorithmDisplay
          algorithm={{
            title: "BFS",
            description: "Breadth First Search",
            complexity: {
              time: "O(V+E)",
              space: "O(V)",
            },
          }} />
      </div>
    </HeaderLayout>
  )
}
