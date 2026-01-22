import { Step } from './types';
import type { ElementDefinition } from 'cytoscape';
import { getAdjacencyList } from './utility.js';

export async function bfs(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void,
  delay: number
) {
  const adjList = await getAdjacencyList(nodes, edges);
  const visited: boolean[] = [];
  const queue: number[] = [];
  queue.push(1);
  visited[1] = true;

  let nodesVisited = 1;
  let edgesVisited = 0;
  let maxDequeSize = queue.length;

  while (queue.length > 0) {
    const u = queue.shift()!;
    if (maxDequeSize < queue.length) {
      maxDequeSize = queue.length;
      onStep({type: "metric-maxDequeSize", metricValue: maxDequeSize});
    }
    for (const v of adjList[u]) {
      edgesVisited++;
      onStep({type: "metric-edgesVisited", metricValue: edgesVisited});
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
        nodesVisited++;
        onStep({type: "metric-nodesVisited", metricValue: nodesVisited});
        onStep({ type: "edge", source: u.toString(), target: v.toString() });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({type: "done"});
}
