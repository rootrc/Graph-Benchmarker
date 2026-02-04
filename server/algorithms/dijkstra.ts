import { Step } from './types';
import type { ElementDefinition } from 'cytoscape';
import { getWeightedAdjacencyList } from './utility.js';
import { PriorityQueue } from 'priority-queue-typescript';

export async function dijkstra(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void,
  delay: number
) {
  const adjList = await getWeightedAdjacencyList(nodes, edges);
  const dist: number[] = Array(nodes.length + 1).fill(1e18);
  dist[1] = 0;
  const pq = new PriorityQueue<[number, number]>(
    undefined,
    (a: [number, number], b: [number, number]) => a[0] - b[0]
  );
  pq.add([0, 1]);

  let nodesVisited = 1;
  let edgesVisited = 0;
  let maxQueueSize = 1;
  let queueSizeSum = 1;
  let queueAverageCnt = 1;

  while (pq.size() > 0) {
    const [d, u] = pq.poll()!;
    queueSizeSum += pq.size();
    ++queueAverageCnt;
    if (d > dist[u]) continue;
    for (const [v, w] of adjList[u]) {
      edgesVisited++;
      if (dist[v] > dist[u] + Number(w)) {
        dist[v] = dist[u] + Number(w)
        pq.add([dist[v], v]);
        onStep({ type: "dijkstra-edgesVisited", metricValue: edgesVisited });
        nodesVisited++;
        onStep({ type: "dijkstra-nodesVisited", metricValue: nodesVisited });
        queueSizeSum += pq.size();
        ++queueAverageCnt;
        onStep({ type: "dijkstra-averageQueueSize", metricValue: Math.round(queueSizeSum / queueAverageCnt * 100) / 100 });
        if (maxQueueSize < pq.size()) {
          maxQueueSize = pq.size();
          onStep({ type: "dijkstra-maxQueueSize", metricValue: maxQueueSize });
        }
        onStep({ type: "edge", source: u, target: v });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  onStep({ type: "done" });
}
