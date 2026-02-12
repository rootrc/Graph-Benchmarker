import { Link } from "react-router-dom";
import HeaderLayout from "../containers/HeaderLayout";

export default function Home() {
  return (
    <HeaderLayout>
      <div className="min-h-screen">
        <section className="bg-linear-to-r from-slate-700 to-slate-600 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Graph Algorithm Benchmarks
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Analyze speed, space, and traversal behavior in interactive graphs.
          </p>
          <Link
            to="/algorithms/traversal"            
            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-500 font-semibold rounded shadowtransition"
          >
            Get Started
          </Link>
        </section>
        <section className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Work In Progress 🔧
          </h1>
        </section>
      </div>
    </HeaderLayout>
  );
};