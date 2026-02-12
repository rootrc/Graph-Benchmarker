import { useEffect, useState } from 'react';
import AlgorithmDisplayBox from '../components/AlgorithmDisplayBox';
import GraphLayout from './GraphLayout';
import type { AlgorithmConfig } from '../components/AlgorithmDisplayBox';
import { useLocalStorage } from '@uidotdev/usehooks';

const API_URL = import.meta.env.VITE_API_URL;

export default function AlgorithmPageLayout({ id, type, algorithmConfig: algorithmConfig }: { id: number, type: string; algorithmConfig: AlgorithmConfig }) {
  let graphId = 0;
  if (type === "unweighted") {
    graphId = 1;
  } else if (type === "weighted") {
    graphId = 2;
  } else {
    graphId = 1;
  }
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useLocalStorage(`show-algorithm-${id}`, true);
  const [showAlgorithm1, setShowAlgorithm1] = useLocalStorage(`show-algorithm1-${id}`, true);
  const [delay, setDelay] = useLocalStorage(`delay-${id}`, 50);
  const setters: boolean[] = [showAlgorithm, showAlgorithm1];
  const setters1: React.Dispatch<React.SetStateAction<boolean>>[] = [setShowAlgorithm, setShowAlgorithm1];
  const [graphSteps, setGraphSteps] = useState<{ id: number; source: string; target: string }[]>([]);
  const [metricSteps, setMetricSteps] = useState<{ type: string; metricValue: number }[]>([]);

  useEffect(() => {
    if (!runAlgorithm) return;
    const eventSource = new EventSource(`${API_URL}/algorithm/${algorithmConfig.algorithms[0].algorithmName}?graphId=${graphId}&delay=${delay}`);
    eventSource.onmessage = (event) => {
      const { type, source, target, metricValue } = JSON.parse(event.data);
      if (type === "done") {
        eventSource.close();
        return;
      } else if (type === "edge") {
        setGraphSteps(prev => [...prev, { id: 0, source, target }]);
      } else {
        setMetricSteps(prev => [...prev, { type, metricValue }]);
      }
    };

    return () => {
      eventSource.close();
    };

  }, [runAlgorithm, graphId]);
  if (algorithmConfig.algorithms[1]) {
    useEffect(() => {
      if (!runAlgorithm) return;
      const eventSource = new EventSource(`${API_URL}/algorithm/${algorithmConfig.algorithms[1].algorithmName}?graphId=${graphId}&delay=${delay}`);
      eventSource.onmessage = (event) => {
        const { type, source, target, metricValue } = JSON.parse(event.data);
        if (type === "done") {
          eventSource.close();
          return;
        } else if (type === "edge") {
          setGraphSteps(prev => [...prev, { id: 1, source, target }]);
        } else {
          setMetricSteps(prev => [...prev, { type, metricValue }]);
        }
      };

      return () => {
        eventSource.close();
      };

    }, [runAlgorithm, graphId]);
  }
  
  const restart = () => {
    setGraphSteps([]);
    setMetricSteps([]);
    setRunAlgorithm(false);
  };

  return (
    <div className="flex flex-row gap-6 w-full items-start">
      <div className="flex flex-row gap-4 flex-wrap">
        {algorithmConfig.algorithms.map((algorithm, index) => (
          <AlgorithmDisplayBox
            key={index}
            index={index}
            algorithm={algorithm}
            showAlgorithm={setters[index]}
            setShowAlgorithm={setters1[index]}
            liveSteps={metricSteps}
            showHide={algorithmConfig.algorithms[1] !== undefined}
            />
          ))}
      </div>
      <GraphLayout
        id={id}
        graphId={graphId}
        runAlgorithm={runAlgorithm}
        showStartNode={algorithmConfig.showStartNode}
        setRunAlgorithm={setRunAlgorithm}
        restart={restart}
        setDelay={setDelay}
        showAlgorithm={showAlgorithm}
        showAlgorithm1={showAlgorithm1}
        liveSteps={graphSteps}
        />
    </div>
  );
}