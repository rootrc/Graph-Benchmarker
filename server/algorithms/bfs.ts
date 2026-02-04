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
  let queueAverageCnt = 1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    queueSizeSum += queue.length;
    ++queueAverageCnt;
    for (const v of adjList[u]) {
      ++edgesVisited;
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
        onStep({ type: "bfs-edgesVisited", metricValue: edgesVisited });
        ++nodesVisited;
        onStep({ type: "bfs-nodesVisited", metricValue: nodesVisited });
        queueSizeSum += queue.length;
        ++queueAverageCnt;
        onStep({ type: "bfs-averageQueueSize", metricValue: Math.round(queueSizeSum / queueAverageCnt * 100) / 100 });
        if (maxQueueSize < queue.length) {
          maxQueueSize = queue.length;
          onStep({ type: "bfs-maxQueueSize", metricValue: maxQueueSize });
        }
        onStep({ type: "edge", source: u.toString(), target: v.toString() });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({ type: "done" });
}
