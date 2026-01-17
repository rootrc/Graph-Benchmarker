import AlgorithmDisplay from "../components/AlgorithmDisplay";
import GraphLayout from "../containers/GraphLayout";
import HeaderLayout from "../containers/HeaderLayout";
import useFileFetcher from "../hooks/useFileFetcher";
import type { ElementDefinition } from 'cytoscape';

export default function Traversal() {
  const { data, error, loading } = useFileFetcher<ElementDefinition[]>("test.json");
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
            {loading ? (
              <p className="flex justify-center items-center w-full h-132 text-4xl text-gray-500">Loading graph...</p>
            ) : error ? (
              <p className="flex justify-center items-center w-full h-132 text-4xl text-red-500">Failed to load data</p>
            ) : (
              <GraphLayout elements={data ?? []} />
            )}
          </div>
        </div>

      </div>
    </HeaderLayout>
  );
}
