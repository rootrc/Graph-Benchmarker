import { Step } from './types.js';
import { ElementDefinition } from 'cytoscape';
import { getWeightedAdjacencyList } from './utility.js';
import { PriorityQueue } from 'priority-queue-typescript';

export async function prim(
  nodes: ElementDefinition[],
  edges: ElementDefinition[],
  onStep: (step: Step) => void,
  delay: number
) {
  const adjList = await getWeightedAdjacencyList(nodes, edges);
  const visited: boolean[] = [];
  visited[1] = true;
  const pq = new PriorityQueue<[number, number, number]>(
    undefined,
    (a: [number, number, number], b: [number, number, number]) => a[0] - b[0]
  );
  pq.add([0, 1, -1]);

  let size = 0;
  let edgesAccepted = 0;
  let edgesRejected = 0;
  let maxQueueSize = 1;
  let queueSizeSum = 1;
  let queueAverageCnt = 1;

  while (pq.size() > 0) {
    const [d, u, par] = pq.poll()!;
    queueSizeSum += pq.size();
    ++queueAverageCnt;
    if (par !== -1) {
      if (visited[u]) {
        ++edgesRejected;
        continue;
      }
      visited[u] = true;
      size += Number(d);
      ++edgesAccepted;
      onStep({ type: "prim-spanningTreeSize", metricValue: size});
      onStep({ type: "prim-edgesExamined", metricValue: edgesAccepted + edgesRejected });
      onStep({ type: "prim-edgesAccepted", metricValue: edgesAccepted });
      onStep({ type: "prim-edgesRejected", metricValue: edgesRejected });
      onStep({ type: "prim-averageQueueSize", metricValue: Math.round(queueSizeSum / queueAverageCnt * 100) / 100 });
      if (maxQueueSize < pq.size()) {
        maxQueueSize = pq.size();
        onStep({ type: "prim-maxQueueSize", metricValue: maxQueueSize });
      }
      onStep({ type: "edge", source: par, target: u });
      onStep({ type: "edge", source: u, target: par });
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (edgesAccepted === nodes.length - 1) {
        break;
      }
    }
    for (const [v, w] of adjList[u]) {
      if (!visited[v]) {
        pq.add([w, v, u]);
        queueSizeSum += pq.size();
        ++queueAverageCnt;
      }
    }
  }
  onStep({ type: "done" });
}
