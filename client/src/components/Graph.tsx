import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';

export default function Graph({ elements, cyRef: graphRef }: { elements: ElementDefinition[]; cyRef?: React.RefObject<Core | null>; }) {
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
      cy={(cy) => {
        if (graphRef) graphRef.current = cy;
      }}
    />
  );
}