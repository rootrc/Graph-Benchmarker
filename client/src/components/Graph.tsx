import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';

export default function Graph({ elements, graphRef }: { elements: ElementDefinition[]; graphRef?: React.RefObject<Core | null>; }) {
  return (
    <CytoscapeComponent
      elements={elements}
      layout={{ name: 'cose' }}
      stylesheet={[
        { selector: 'node', style: { 'background-color': '#aaa', color: '#fff', 'text-valign': 'center', 'text-halign': 'center' } },
        { selector: 'node.start-node', style: { 'background-color': '#008000' } },
        { selector: 'node.highlighted0', style: { 'background-color': '#3B82F6' } },
        { selector: 'node.highlighted1', style: { 'background-color': '#EF4444' } },
        { selector: 'node.highlighted0.highlighted1', style: { 'background-color': '#8B5CF6' } },
        { selector: 'edge', style: { width: 2, 'line-color': '#aaa' } },
        { selector: 'edge.highlighted0', style: { width: 3, 'line-color': '#3B82F6' } },
        { selector: 'edge.highlighted1', style: { width: 3, 'line-color': '#EF4444' } },
        { selector: 'edge.highlighted0.highlighted1', style: { width: 3, 'line-color': '#8B5CF6' } },
      ]}
      style={{ width: '528px', height: '528px' }}
      cy={(graph) => {
        if (graphRef) graphRef.current = graph;
      }}
    />
  );
}