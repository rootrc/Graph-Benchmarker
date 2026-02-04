import { PriorityQueue } from 'priority-queue-typescript';
import { Step } from './types.js';
import type { ElementDefinition } from 'cytoscape';
import { DSU  } from './utility.js';

export async function kruskal(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void,
  delay: number
) {
  const dsu = new DSU(nodes.length);  
  const sortedEdges = [...edges].sort(
    (a, b) => a.data.weight - b.data.weight
  );

  for (const edge of sortedEdges) {
    const u = Number(edge.data.source);
    const v = Number(edge.data.target);
    if (!dsu.isConnected(u, v)) {
      console.log(u, v);
      dsu.union(u, v);
      onStep({ type: "edge", source: u.toString(), target: v.toString() });
      onStep({ type: "edge", source: v.toString(), target: u.toString() });
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  onStep({ type: "done" });
}
