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
  let maxQueueSize = 1;
  let queueSizeSum = 1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    if (maxQueueSize < queue.length) {
      maxQueueSize = queue.length;
      onStep({type: "bfs-maxQueueSize", metricValue: maxQueueSize});
    }
    for (const v of adjList[u]) {
      edgesVisited++;
      onStep({type: "bfs-edgesVisited", metricValue: edgesVisited});
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
        nodesVisited++;
        onStep({type: "bfs-nodesVisited", metricValue: nodesVisited});
        onStep({ type: "edge", source: u.toString(), target: v.toString() });
        queueSizeSum += queue.length;
        onStep({type: "bfs-averageQueueSize", metricValue: Math.round(queueSizeSum / nodesVisited * 100) / 100});
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({type: "done"});
}
