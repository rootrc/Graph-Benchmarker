import AlgorithmDisplay from "../components/AlgorithmDisplay";
import GraphLayout from "../containers/GraphLayout";
import HeaderLayout from "../containers/HeaderLayout";

export default function Traversal() {
  const fileName = "test.json";
  
  return (
    <HeaderLayout>
      <div className="flex flex-row gap-6 w-full items-start">
        <div className="flex flex-row gap-4 flex-wrap">
          <AlgorithmDisplay
            algorithm={{
              title: "DFS",
              description: "Depth First Search",
              complexity: {
                time: "O(V+E)",
                space: "O(V)",
              },
            }}
          />
          <AlgorithmDisplay
            algorithm={{
              title: "BFS",
              description: "Breadth First Search",
              complexity: {
                time: "O(V+E)",
                space: "O(V)",
              },
            }}
          />
        </div>

        <div className="ml-auto flex items-center justify-center">
          <div className="w-132 h-132 border rounded-lg">
            <GraphLayout graphName={fileName} algorithmName="bfs" />
          </div>
        </div>

      </div>
    </HeaderLayout>
  );
}
