import type { AlgorithmConfig } from "../components/AlgorithmDisplayBox";
import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithmConfig: AlgorithmConfig = {
  showStartNode: false,
  algorithms: [{
    title: "Kruskal's",
    algorithmName: "kruskal",
    description: "Kruskal's Algorithm",
    complexity: {
      time: "O(E logE)",
      space: "O(V + E)",
    },
    metricDisplay: [
      { type: "kruskal-spanningTreeSize", display: "Spanning Tree Size"},
      { type: "kruskal-edgesExamined", display: "Edges Examined" },
      { type: "kruskal-edgesAccepted", display: "Edges Accepted" },
      { type: "kruskal-edgesRejected", display: "Edges Rejected" },
      { type: "kruskal-DSUFindCnt", display: "DSU Find Operations" },
      { type: "kruskal-DSUUnionCnt", display: "DSU Union Operations" }
    ],
  },
  {
    title: "Prim's",
    algorithmName: "prim",
    description: "Prim's Algorithm",
    complexity: {
      time: "O((V + E) logV)",
      space: "O(V + E)",
    },
    metricDisplay: [
      { type: "prim-spanningTreeSize", display: "Spanning Tree Size"},
      { type: "prim-edgesExamined", display: "Edges Examined" },
      { type: "prim-edgesAccepted", display: "Edges Accepted" },
      { type: "prim-edgesRejected", display: "Edges Rejected" },
      { type: "prim-maxQueueSize", display: "Max Priority Queue Size" },
      { type: "prim-averageQueueSize", display: "Average Priority Queue Size" }
    ],
  }]
};

export default function WeightedTraversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id={2} type="weighted" algorithmConfig={algorithmConfig} />
    </HeaderLayout>
  )
}
