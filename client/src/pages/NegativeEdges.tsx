import type { AlgorithmConfig } from "../components/AlgorithmDisplayBox";
import AlgorithmPageLayout from "../containers/AlgorithmPageLayout";
import HeaderLayout from "../containers/HeaderLayout";

const algorithmConfig : AlgorithmConfig = {
  showStartNode: true,
  algorithms: [{
    title: "Bellman–Ford",
    algorithmName: "bellman–ford",
    description: "Bellman–Ford Algorithm",
    complexity: {
      time: "O(VE)",
      space: "O(V)",
    },
    metricDisplay: [
     
    ],
  }]
};

export default function NegativeEdges() {
  return (
    <HeaderLayout>
      <AlgorithmPageLayout id={2} type="weighted" algorithmConfig={algorithmConfig} />
    </HeaderLayout>
  )
}
