import { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';

const API_URL = import.meta.env.VITE_API_URL;

export default function Graph({ graphName, elements }: { graphName: string; elements: ElementDefinition[] }) {
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/algorithm/bfs?graphFile=${graphName}`);
    eventSource.onmessage = (event) => {
      const step = JSON.parse(event.data);

      if (cyRef.current) {
        const { source, target } = step;

        cyRef.current.$(`#${target}`).addClass('highlighted');
        cyRef.current.$(`#${source}-${target}`).addClass('highlighted');
        cyRef.current.$(`#${target}-${source}`).addClass('highlighted');
      }
    };

    eventSource.addEventListener('done', () => {
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, []);

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
