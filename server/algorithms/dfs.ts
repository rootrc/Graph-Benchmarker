import { Step } from './types';
import type { ElementDefinition } from 'cytoscape';
import { getAdjacencyList } from './utility.js';

export async function dfs(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void,
  delay: number
) {
  const adjList = await getAdjacencyList(nodes, edges);
  const visited: boolean[] = [];
  const stack: number[] = [];
  stack.push(1);
  visited[1] = true;

  let nodesVisited = 1;
  let edgesVisited = 0;
  let maxDequeSize = stack.length;

  while (stack.length > 0) {
    const u = stack.pop()!;
    if (maxDequeSize < stack.length) {
      maxDequeSize = stack.length;
      onStep({type: "dfs-maxDequeSize", metricValue: maxDequeSize});
    }
    for (const v of adjList[u]) {
      edgesVisited++;
      onStep({type: "dfs-edgesVisited", metricValue: edgesVisited});
      if (!visited[v]) {
        visited[v] = true;
        stack.push(v);
        nodesVisited++;
        onStep({type: "dfs-nodesVisited", metricValue: nodesVisited});
        onStep({ type: "edge", source: u.toString(), target: v.toString() });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({type: "done"});
}
