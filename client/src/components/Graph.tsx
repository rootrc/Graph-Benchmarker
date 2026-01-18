import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';

const API_URL = import.meta.env.VITE_API_URL;

export default function Graph({ graphName, elements, runAlgorithm }: {
  graphName: string; elements: ElementDefinition[]; runAlgorithm: boolean;
}) {
  const cyRef = useRef<Core | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!runAlgorithm) return;
    if (eventSourceRef.current) return;

    const eventSource = new EventSource(
      `${API_URL}/algorithm/bfs?graphFile=${graphName}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const { source, target } = JSON.parse(event.data);

      if (cyRef.current) {
        cyRef.current.$(`#${target}`).addClass('highlighted');
        cyRef.current.$(`#${source}-${target}`).addClass('highlighted');
        cyRef.current.$(`#${target}-${source}`).addClass('highlighted');
      }
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

  return (
    <CytoscapeComponent
      elements={elements}
      layout={{ name: 'cose' }}
      stylesheet={[
        { selector: 'node', style: { 'background-color': '#0074D9', color: '#fff', 'text-valign': 'center', 'text-halign': 'center' } },
        { selector: 'node.start-node', style: { 'background-color': '#008000' } },
        { selector: 'node.highlighted', style: { 'background-color': '#FF4136' } },
        { selector: 'edge', style: { width: 2, 'line-color': '#aaa' } },
        { selector: 'edge.highlighted', style: { width: 3, 'line-color': '#FF4136' } },
      ]}
      style={{ width: '528px', height: '528px' }}
      cy={(cy) => { cyRef.current = cy; }}
    />
  );
}