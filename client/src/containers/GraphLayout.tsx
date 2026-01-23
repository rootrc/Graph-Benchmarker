import Graph from "../components/Graph";
import useFileFetcher from "../hooks/useFileFetcher";
import type { ElementDefinition, Core } from 'cytoscape';
import { useEffect, useRef } from "react";

export default function GraphLayout({
  graphName, runAlgorithm, setRunAlgorithm, restart, showAlgorithm, showAlgorithm1, liveSteps }: {
    graphName: string;
    runAlgorithm: boolean;
    setRunAlgorithm: React.Dispatch<React.SetStateAction<boolean>>;
    restart: () => void;
    showAlgorithm: boolean;
    showAlgorithm1: boolean;
    liveSteps: {
      id: number;
      source: string; target: string
    }[]
  }) {
  const { data, error, loading } = useFileFetcher<ElementDefinition[]>(graphName);
  const graphRef = useRef<Core | null>(null);

  const prevStepsLength = useRef(0);

  const transformedData: ElementDefinition[] = (data ?? []).map(el => {
    return {
      ...el,
      data: {
        ...el.data,
        scaledWeight: (el.data.weight ? Math.sqrt(el.data.weight) : 3)
      }
    };
  });

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    if (liveSteps.length == 0) {
      graph.elements().removeClass('highlighted0');
      graph.elements().removeClass('highlighted1');
      prevStepsLength.current = 0;
      return;
    }

    const newSteps = liveSteps.slice(prevStepsLength.current);

    newSteps.forEach((step) => {
      if (!step) return;
      switch (step.id) {
        case 0:
          graph.$(`#${step.target}`).addClass('highlighted0');
          graph.$(`#${step.source}-${step.target}`).addClass('highlighted0');
          graph.$(`#${step.target}-${step.source}`).addClass('highlighted0');
          break;
        case 1:
          graph.$(`#${step.target}`).addClass('highlighted1');
          graph.$(`#${step.source}-${step.target}`).addClass('highlighted1');
          graph.$(`#${step.target}-${step.source}`).addClass('highlighted1');
          break;
        default:
          break;
      }
    });

    prevStepsLength.current = liveSteps.length;
  }, [liveSteps, graphRef]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    if (showAlgorithm) {
      graph.elements('.highlighted0Removed').addClass('highlighted0');
      graph.elements('.highlighted0').removeClass('highlighted0Removed');
    } else {
      graph.elements('.highlighted0').addClass('highlighted0Removed');
      graph.elements('.highlighted0Removed').removeClass('highlighted0');
    }
    if (showAlgorithm1) {
      graph.elements('.highlighted1Removed').addClass('highlighted1');
      graph.elements('.highlighted1').removeClass('highlighted1Removed');
    } else {
      graph.elements('.highlighted1').addClass('highlighted1Removed');
      graph.elements('.highlighted1Removed').removeClass('highlighted1');
    }
  }, [showAlgorithm, showAlgorithm1, liveSteps]);

  let graphDisplay;
  if (error) graphDisplay = <p className="flex justify-center items-center w-full h-132 text-4xl text-red-500">Failed to load data</p>;
  else if (loading) graphDisplay = <p className="flex justify-center items-center w-full h-132 text-4xl text-gray-500">Loading graph...</p>;
  else graphDisplay = <Graph elements={transformedData ?? []} graphRef={graphRef} />;

  return (
    <div className="ml-auto flex items-center justify-center">
      <div className="w-132 h-132 border rounded-lg">
        {graphDisplay}
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setRunAlgorithm(true)}
            disabled={runAlgorithm || !data}
            className={`px-6 py-3 font-semibold rounded bg-green-600 text-white hover:bg-green-500 transition-opacity duration-300 ease-in-out ${runAlgorithm || !data ? 'opacity-50 cursor-not-allowed hover:bg-green-600' : 'opacity-100 cursor-pointer'}`}
          >
            Start
          </button>

          <button
            onClick={restart}
            disabled={!data || !runAlgorithm}
            className={`px-6 py-3 font-semibold rounded bg-blue-600 text-white hover:bg-blue-500 transition-opacity duration-300 ease-in-out ${!data || !runAlgorithm ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : 'opacity-100 cursor-pointer'}`}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}