import { useEffect, useRef, useState } from 'react';
import type { ElementDefinition, Core } from 'cytoscape';
import Graph from '../components/Graph';
import useFileFetcher from '../hooks/useFileFetcher';

const API_URL = import.meta.env.VITE_API_URL;

export default function GraphLayout({ graphName, algorithmName }: { graphName: string; algorithmName: string; }) {
  const { data, error, loading } = useFileFetcher<ElementDefinition[]>(graphName);
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const graphRef = useRef<Core | null>(null);

  useEffect(() => {
    if (!runAlgorithm || !graphRef.current) return;

    const eventSource = new EventSource(`${API_URL}/algorithm/${algorithmName}?graphFile=${graphName}`);

    eventSource.onmessage = (event) => {
      const { source, target } = JSON.parse(event.data);
      const graph = graphRef.current;
      if (!graph) return;

      graph.$(`#${target}`).addClass('highlighted');
      graph.$(`#${source}-${target}`).addClass('highlighted');
      graph.$(`#${target}-${source}`).addClass('highlighted');
    };

    eventSource.addEventListener('done', () => {
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [runAlgorithm, graphName, algorithmName]);

  const restart = () => {
    const cy = graphRef.current;
    if (!cy) return;
    cy.elements().removeClass('highlighted');
    setRunAlgorithm(false);
  };

  let graph;
  if (error) graph = <p className="flex justify-center items-center w-full h-132 text-4xl text-red-500">Failed to load data</p>;
  if (loading) graph = <p className="flex justify-center items-center w-full h-132 text-4xl text-gray-500">Loading graph...</p>;
  if (data) graph = <Graph elements={data ?? []} graphRef={graphRef} />;
  return (
    <div className="h-screen flex flex-col items-center">
      {graph}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => setRunAlgorithm(true)}
          disabled={runAlgorithm || !data}
          className={`px-6 py-3 font-semibold rounded bg-green-600 text-white hover:bg-green-500 transition-opacity duration-300 ease-in-out ${runAlgorithm || !data ? 'opacity-50 cursor-not-allowed hover:bg-green-600' : 'opacity-100'}`}
        >
          Start
        </button>

        <button
          onClick={restart}
          disabled={!data || !runAlgorithm}
          className={`px-6 py-3 font-semibold rounded bg-blue-600 text-white hover:bg-blue-500 transition-opacity duration-300 ease-in-out ${!data || !runAlgorithm ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : 'opacity-100'}`}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
