import { Step } from './types';
import type { ElementDefinition } from 'cytoscape';
import { getAdjacencyList } from './utility.js';

export async function bfs(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void, delay: number
) {
  const adjList = await getAdjacencyList(nodes, edges);
  const visited: boolean[] = [];
  const queue: number[] = [1];
  visited[1] = true;

  while (queue.length > 0) {
    const u = queue.shift()!;
    for (const v of adjList[u]) {
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
        onStep({ source: u.toString(), target: v.toString() });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
