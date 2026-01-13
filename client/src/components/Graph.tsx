import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition } from 'cytoscape';

type GraphProps = {
  elements: ElementDefinition[];
};

export default function Graph({ elements }: GraphProps) {
  const stylesheet = [
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        'background-color': '#0074D9',
        color: '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
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

  return (
    <CytoscapeComponent
      elements={elements}
      layout={{ name: 'cose' }}
      stylesheet={stylesheet as any}
      style={{ width: '100%', height: '600px' }}
    />
  );
}