import { useEffect, useRef, useState } from "react";

export type Algorithm = {
  title: string;
  description: string;
  complexity: Complexity;
  metricDisplay: MetricDisplay[];
};

type Complexity = {
  time: string;
  space: string;
};

export type MetricDisplay = {
  type: string;
  display: string;
};

export default function AlgorithmDisplayBox({
  index, algorithm, showAlgorithm, setShowAlgorithm, liveSteps }: {
    index: number;
    algorithm: Algorithm;
    showAlgorithm: boolean;
    setShowAlgorithm: React.Dispatch<React.SetStateAction<boolean>>;
    liveSteps: { type: string; metricValue: number }[]
  }) {
  const { title, description, complexity } = algorithm;
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const getComplexityClass = (complexity: string) => {
    const c = complexity;
    if (c.includes("2") || c.includes("!") || c.includes("³")) {
      return "text-red-500";
    }
    if (c.includes("²") || c.includes("V logE") || c.includes("V logV") || c.includes("E logE") || c.includes("E logV")
      || c.includes("V) logE") || c.includes("V) logV") || c.includes("E) logE") || c.includes("E) logV")) {
      return "text-orange-500";
    }
    return "text-green-500";
  };

  const lastStepIndex = useRef(0);

  useEffect(() => {
    if (liveSteps.length === 0) {
      lastStepIndex.current = 0;
      setMetrics({});
      return;
    }

    if (lastStepIndex.current >= liveSteps.length) return;

    const newSteps = liveSteps.slice(lastStepIndex.current);

    setMetrics(prevMetrics => {
      const updatedMetrics = { ...prevMetrics };
      for (const step of newSteps) {
        updatedMetrics[step.type] = step.metricValue;
      }
      return updatedMetrics;
    });

    lastStepIndex.current = liveSteps.length;
  }, [liveSteps]);


  return (
    <div className="p-4 flex flex-col gap-2 w-82 bg-slate-900 text-white rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-2xl font-bold">
          {title}
          <span
            className={`ml-2 mt-1 w-4 h-4 transition-all duration-300 ${showAlgorithm ? (index === 0 ? "bg-blue-500" : "bg-red-500") : "bg-gray-500"} rounded-full`}
          />
        </h1>
        <button
          onClick={() => setShowAlgorithm(prev => !prev)}
          className={`px-3 py-1.5 rounded-md bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition-all duration-300 ease-in-out cursor-pointer
          ${!showAlgorithm ? 'opacity-40' : 'hover:opacity-70'}`}
          aria-label="Hide algorithm"
        >
          Hide
        </button>
      </div>
      <p className="text-slate-300">{description}</p>

      <div className="border border-slate-700 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 bg-slate-800 text-sm font-semibold">
          <div className="p-2 text-center">Time Complexity</div>
          <div className="p-2 text-center">Space Complexity</div>
        </div>

        <div className="grid grid-cols-2 text-sm">
          <div className={`p-2 text-center ${getComplexityClass(complexity.time)}`}>
            {complexity.time}
          </div>
          <div className={`p-2 text-center ${getComplexityClass(complexity.space)}`}>
            {complexity.space}
          </div>
        </div>
        <div className="border border-slate-700 rounded-md">
          <div className="bg-slate-800 p-2 text-sm font-semibold text-center">
            Metrics
          </div>

          <div className="flex flex-col p-2">
            {algorithm.metricDisplay.map((metric) => (
              <div
                key={metric.type}
                className="flex justify-between text-sm"
              >
                <span className="text-slate-300">
                  {metric.display}
                </span>
                <span className="font-mono">
                  {metrics[metric.type] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}