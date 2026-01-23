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
  let maxStackSize = 1;
  let stackSizeSum = 0;

  while (stack.length > 0) {
    const u = stack.pop()!;
    for (const v of adjList[u]) {
      edgesVisited++;
      onStep({ type: "dfs-edgesVisited", metricValue: edgesVisited });
      if (!visited[v]) {
        visited[v] = true;
        stack.push(v);
        nodesVisited++;
        onStep({ type: "dfs-nodesVisited", metricValue: nodesVisited });
        onStep({ type: "edge", source: u.toString(), target: v.toString() });
        stackSizeSum += stack.length;
        onStep({ type: "dfs-averageStackSize", metricValue: Math.round(stackSizeSum / nodesVisited * 100) / 100 });
        if (maxStackSize < stack.length) {
          maxStackSize = stack.length;
          onStep({ type: "dfs-maxStackSize", metricValue: maxStackSize });
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({ type: "done" });
}
