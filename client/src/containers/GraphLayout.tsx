import { useEffect, useRef, useState } from 'react';
import type { ElementDefinition, Core } from 'cytoscape';
import Graph from '../components/Graph';
import useFileFetcher from '../hooks/useFileFetcher';

const API_URL = import.meta.env.VITE_API_URL;

export default function GraphLayout({ graphName, algorithmName }: { graphName: string; algorithmName: string; }) {
  const { data, error, loading } = useFileFetcher<ElementDefinition[]>(graphName);
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const cyRef = useRef<Core | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!runAlgorithm || !cyRef.current || eventSourceRef.current) return;

    const eventSource = new EventSource(`${API_URL}/algorithm/${algorithmName}?graphFile=${graphName}`);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const { source, target } = JSON.parse(event.data);

      const cy = cyRef.current;
      if (!cy) return;

      const targetNode = cy.$(`#${target}`);
      const edge1 = cy.$(`#${source}-${target}`);
      const edge2 = cy.$(`#${target}-${source}`);

      targetNode.addClass('highlighted');
      edge1.addClass('highlighted');
      edge2.addClass('highlighted');
    };

    eventSource.addEventListener('done', () => {
      eventSource.close();
      eventSourceRef.current = null;
    });

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [runAlgorithm, graphName]);

  const restart = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass('highlighted');
    setRunAlgorithm(false);
  };

  if (loading) return <p className="flex justify-center items-center w-full h-132 text-4xl text-gray-500">Loading graph...</p>;
  if (error) return <p className="flex justify-center items-center w-full h-132 text-4xl text-red-500">Failed to load data</p>;

  return (
    <div className="h-screen flex flex-col items-center">
      <Graph elements={data ?? []} algorithm={(cy) => { cyRef.current = cy; }} />

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => setRunAlgorithm(true)}
          disabled={runAlgorithm || !data}
          className={`px-6 py-3 font-semibold rounded  bg-green-600 text-white hover:bg-green-500 transition-opacity duration-300 ease-in-out ${runAlgorithm || !data ? 'opacity-50 cursor-not-allowed hover:bg-green-600' : 'opacity-100'}`}
        >
          Start
        </button>

        <button
          onClick={restart}
          disabled={!data || !runAlgorithm}
          className={`px-6 py-3 font-semibold rounded  bg-blue-600 text-white hover:bg-blue-500 transition-opacity duration-300 ease-in-out ${!data || !runAlgorithm ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : 'opacity-100'}`}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
