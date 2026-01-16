
type Algorithm = {
  title: string;
  description: string;
  complexity: Complexity;
};

type Complexity = {
  time: string;
  space: string;
};

export default function AlgorithmDisplay({ algorithm }: { algorithm: Algorithm }) {
  const { title, description, complexity } = algorithm;
  const getComplexityClass = (complexity: string) => {
    const c = complexity;

    if (c.includes("2") || c.includes("!") || c.includes("³")) {
      return "text-red-500";
    }

    if (c.includes("²") || c.includes("Vlog(E)") || c.includes("Vlog(V)") || c.includes("Elog(E)") || c.includes("Elog(V)")) {
      return "text-orange-500";
    }

    return "text-green-500";
  };

  return (
    <div className="p-4 flex flex-col gap-3 w-80 bg-slate-900 text-white rounded-lg">
      <h1 className="text-2xl font-bold">{title}</h1>
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
      </div>
    </div>
  );
}