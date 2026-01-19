import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';
import { useRef, useEffect } from 'react';

export default function Graph({ elements, algorithm}: {
  elements: ElementDefinition[]; algorithm?: (cy: Core) => void;
}) {
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (cyRef.current && algorithm) {
      algorithm(cyRef.current);
    }
  }, [algorithm]);

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