// import { PriorityQueue } from 'priority-queue-typescript';
// import { Step } from './types';
// import type { ElementDefinition } from 'cytoscape';
// import { getAdjacencyList } from './utility.js';

// export async function bfs(
//   nodes: ElementDefinition[],
//   edges: ElementDefinition[],
//   onStep: (step: Step) => void,
//   delay: number
// ) {
//   const adjList = await getAdjacencyList(nodes, edges);
//   const dist: number[] = Array(nodes.length + 1).fill(1e18);
//   dist[1] = 0;
//   const pq = new PriorityQueue<[number, number]>(
//   undefined,
//     (a:[number, number], b:[number, number]) => a[0] - b[0]
//   );
//   pq.add([0, 1]);

//   let nodesVisited = 1;
//   let edgesVisited = 0;
//   let maxQueueSize = 1;
//   let queueSizeSum = 1;

//   while (pq.size() > 0) {
//     const [d, u] = pq.poll()!;
//     if (d > dist[u]) continue;
//     if (maxQueueSize < pq.size()) {
//       maxQueueSize = pq.size();
//       onStep({type: "dijkstra-maxQueueSize", metricValue: maxQueueSize});
//     }
//     for (const [v, w] of adjList[u]) {
//       edgesVisited++;
//       onStep({type: "dijkstra-edgesVisited", metricValue: edgesVisited});
//       if (dist[v] > dist[u] + w) {
//         dist[v] = dist[u] + w
//         pq.add([dist[v], v]);
//         nodesVisited++;
//         onStep({type: "dijkstra-nodesVisited", metricValue: nodesVisited});
//         onStep({ type: "edge", source: u.toString(), target: v.toString() });
//         queueSizeSum += pq.size();
//         onStep({type: "dijkstra-averageQueueSize", metricValue: Math.round(queueSizeSum / nodesVisited * 100) / 100});
//         await new Promise((resolve) => setTimeout(resolve, delay));
//       }
//     }
//   }
//   onStep({type: "done"});
// }
