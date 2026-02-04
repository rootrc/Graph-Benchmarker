import { Step } from './types.js';
import type { ElementDefinition } from 'cytoscape';
import { DSU } from './utility.js';

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

  let edgesAccepted = 0;
  let edgesRejected = 0;

  for (const edge of sortedEdges) {
    const u = Number(edge.data.source);
    const v = Number(edge.data.target);
    if (!dsu.isConnected(u, v)) {
      dsu.union(u, v);
      ++edgesAccepted;
      onStep({ type: "kruskal-edgesExamined", metricValue: edgesAccepted + edgesRejected});
      onStep({ type: "kruskal-edgesAccepted", metricValue: edgesAccepted });
      onStep({ type: "kruskal-edgesRejected", metricValue: edgesRejected });
      onStep({ type: "kruskal-DSUFindCnt", metricValue: dsu.getFindCnt() });
      onStep({ type: "kruskal-DSUUnionCnt", metricValue: dsu.getUnionCnt() });
      onStep({ type: "edge", source: u.toString(), target: v.toString() });
      onStep({ type: "edge", source: v.toString(), target: u.toString() });
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (edgesAccepted === nodes.length - 1) {
        break;
      }
    } else {
      ++edgesRejected;
    }
  }
  onStep({ type: "done" });
}
