import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition, Core } from 'cytoscape';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

cytoscape.use(fcose);

export default function Graph({ elements, graphRef }: { elements: ElementDefinition[]; graphRef?: React.RefObject<Core | null>; }) {
  return (
    <CytoscapeComponent
      elements={elements}
      layout={{
        name: 'fcose',
        quality: 'proof',
        randomize: true,
        nodeRepulsion: 10000,
        idealEdgeLength: 60,
        nodeOverlap: 40,
        gravity: 0.2,
        gravityRangeCompound: 1.5,
        packComponents: true,
        componentSpacing: 100,
        numIter: 4000,
        padding: 5
      } as any}
      stylesheet={[
        { selector: 'node', style: { 'background-color': '#aaa', color: '#fff', width: '16px', height: '16px' } },
        { selector: 'node.start-node', style: { width: '20px', height: '20px', 'background-color': '#008000' } },
        { selector: 'node.highlighted0', style: { 'background-color': '#3B82F6' } },
        { selector: 'node.highlighted1', style: { 'background-color': '#EF4444' } },
        { selector: 'node.highlighted0.highlighted1', style: { 'background-color': '#8B5CF6' } },

        { selector: 'edge', style: { 'width': 'mapData(scaledWeight, 1, 5, 0, 6)', 'opacity': 0.4, 'curve-style': 'bezier', 'line-color': '#aaa' } },
        { selector: 'edge.highlighted0', style: { 'width': 'mapData(scaledWeight, 1, 5, 1, 7)', 'opacity': 0.6, 'line-color': '#3B82F6' } },
        { selector: 'edge.highlighted1', style: { 'width': 'mapData(scaledWeight, 1, 5, 1, 7)', 'opacity': 0.6, 'line-color': '#EF4444' } },
        { selector: 'edge.highlighted0.highlighted1', style: { 'line-color': '#8B5CF6' } },
      ]}
      style={{ width: '528px', height: '528px' }}
      cy={(graph) => {
        if (graphRef) graphRef.current = graph;
      }}
    />
  );
}