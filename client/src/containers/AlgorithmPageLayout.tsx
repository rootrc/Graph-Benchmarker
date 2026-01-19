import { useEffect, useState } from 'react';
import AlgorithmDisplayBox from '../components/AlgorithmDisplayBox';
import GraphLayout from './GraphLayout';
import type { Algorithm } from '../components/AlgorithmDisplayBox';

const API_URL = import.meta.env.VITE_API_URL;

export default function AlgorithmPageLayout({ algorithmName, algorithmDisplayBox }: { algorithmName: string; algorithmDisplayBox: Algorithm[] }) {
  const graphName = "test.json";
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [graphSteps, setGraphSteps] = useState<{ source: string; target: string }[]>([]);

  useEffect(() => {
    if (!runAlgorithm) return;
    const eventSource = new EventSource(`${API_URL}/algorithm/${algorithmName}?graphFile=${graphName}`);
    eventSource.onmessage = (event) => {
      const { source, target } = JSON.parse(event.data);
      setGraphSteps(prev => [...prev, { source, target }]);
    };

    eventSource.addEventListener('done', () => {
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [runAlgorithm, graphName, algorithmName]);

  const restart = () => {
    setGraphSteps([]);
    setRunAlgorithm(false);
  };

  return (
    <div className="flex flex-row gap-6 w-full items-start">
      <div className="flex flex-row gap-4 flex-wrap">
        {algorithmDisplayBox.map((algorithm, index) => (
          <AlgorithmDisplayBox
            key={index}
            algorithm={algorithm}
            liveSteps={graphSteps}
          />
        ))}
      </div>
      <GraphLayout
        graphName={graphName}
        runAlgorithm={runAlgorithm}
        setRunAlgorithm={setRunAlgorithm}
        restart={restart}
        liveSteps={graphSteps}
      />
    </div>
  );
}
