import type { AlgorithmConfig } from "../components/AlgorithmDisplayBox";
import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithmConfig : AlgorithmConfig = {
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
      { type: "kruskal-edgesExamined", display: "Edges Examined" },
      { type: "kruskal-edgesAccepted", display: "Edges Accepted" },
      { type: "kruskal-edgesRejected", display: "Edges Rejected" },
      { type: "kruskal-DSUFindCnt", display: "DSU Find Operations" },
      { type: "kruskal-DSUUnionCnt", display: "DSU Union Operations" },
    ],
  }]
};

export default function WeightedTraversal() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id = {2} type="weighted" algorithmConfig={algorithmConfig} />
    </HeaderLayout>
  )
}
