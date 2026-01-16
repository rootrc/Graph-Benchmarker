import type { ElementDefinition } from "cytoscape";
import Graph from "../components/Graph";

export default function GraphLayout({ elements }: { elements: ElementDefinition[] }) {
  return (
    <div className="h-screen flex flex-col">
      <Graph elements={elements} />
      <div className="flex">
        <div
        className="inline-block mt-5 px-6 py-3 text-sm sm:text-base font-semibold uppercase bg-green-600 text-white rounded-sm text-center no-underline transition-all duration-200 ease-in-out hover:bg-green-500  hover:shadow-md"
      >
        Run
      </div>
      </div>
    </div>
  );
}