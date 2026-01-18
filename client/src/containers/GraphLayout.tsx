import { useState } from 'react';
import type { ElementDefinition } from 'cytoscape';
import Graph from '../components/Graph';

export default function GraphLayout({ graphName, elements }: { graphName: string; elements: ElementDefinition[] }) {
  const [runAlgorithm, setRunAlgorithm] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center">
      <Graph graphName={graphName} elements={elements} runAlgorithm={runAlgorithm} />

      <button
        onClick={() => setRunAlgorithm(true)}
        className="mt-5 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-500"
      >
        Start
      </button>
    </div>
  );
}