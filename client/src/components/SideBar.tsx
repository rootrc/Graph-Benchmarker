import { Link } from "react-router-dom";
import SideBarSection from "../containers/SideBarSection";
import { useServerConnectionStatus } from "../containers/useServerConnectionStatus";

const menuSections = [
  {
    title: "Simple Algorithms",
    links: [
      { name: "Traversal", to: "/traversal" },
      { name: "Unweighted SSSP", to: "/unweighted-sssp" },
    ],
  },
];

export default function SideBar({ open }: { open: boolean }) {
  const isConnected = useServerConnectionStatus();

  return (
    <>
      <div
        className={`fixed inset-x-0 top-14 bottom-0 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />
      <aside
        className={`fixed left-0 top-14 h-[calc(100vh-56px)] w-64 bg-slate-800 text-slate-100 transform transition-transform duration-300 border-t-2 border-slate-700 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="overflow-y-auto h-full relative">
          <Link
            key="/"
            to="/"
            className="block pl-6 pt-1 pb-2 font-medium hover:bg-slate-700"
          >
            Home
          </Link>
          {menuSections.map((section) => {
            return (
              <SideBarSection key={section.title} section={section} />
            );
          })}

          <div
            className={`pl-6 flex items-center gap-2 font-medium select-none ${isConnected ? "text-white" : "text-gray-400"} absolute bottom-0 left-0 w-full pb-3`}
          >
            <span
              className={`w-3 h-3 rounded-full inline-block ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            />
            {isConnected ? "Connected" : "Disconnected"}
          </div>
        </nav>
      </aside>
    </>
  );
}
