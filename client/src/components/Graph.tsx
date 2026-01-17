import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition } from 'cytoscape';

const stylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': '#0074D9',
      color: '#fff',
      'text-valign': 'center',
      'text-halign': 'center',
    },
  },
  {
    selector: 'node.start-node',
    style: {
      'background-color': '#FF4136',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 2,
      'line-color': '#aaa',
      'target-arrow-color': '#aaa',
      'target-arrow-shape': 'triangle',
    },
  },
];

export default function Graph({ elements }: { elements: ElementDefinition[] }) {
  return (
    <CytoscapeComponent
      elements={elements}
      layout={{ name: 'cose' }}
      stylesheet={stylesheet as any}
      style={{ width: '100%', height: '528px', }}
    />
  );
}