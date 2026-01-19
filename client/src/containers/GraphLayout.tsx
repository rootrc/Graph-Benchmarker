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

  if (loading) return <p className="flex justify-center items-center w-full h-132 text-4xl text-gray-500">Loading graph...</p>;
  if (error) return <p className="flex justify-center items-center w-full h-132 text-4xl text-red-500">Failed to load data</p>;

  return (
    <div className="h-screen flex flex-col items-center">
      <Graph elements={data ?? []} algorithm={(cy) => { cyRef.current = cy; }} />

      <button
        onClick={() => setRunAlgorithm(true)}
        className="mt-5 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-500"
      >
        Start
      </button>
    </div>
  );
}