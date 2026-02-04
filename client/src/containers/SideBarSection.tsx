import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { Section } from "../App";

export default function SideBarSection({ section }: { section: Section }) {
  const location = useLocation();
  const isOnThisSection = section.links.some(
    link => location.pathname === link.to
  );

  const [isOpen, setOpen] = useLocalStorage(`sidebar-section-${section.title}`, true);

  useEffect(() => {
    if (isOnThisSection) {
      setOpen(true);
    }
  }, [isOnThisSection]);

  return (
    <div>
      <div
        onClick={() => setOpen(prev => !prev)}
        className="flex pl-3 py-2 items-center gap-2 font-semibold cursor-pointer hover:bg-slate-700 select-none"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"
            }`}
        />
        {section.title}
      </div>

      {isOpen && (
        <div className="text-slate-300">
          {section.links.map(link => {
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  block ml-8 pl-4 py-1 cursor-pointer hover:bg-slate-700 ${location.pathname === link.to ? "bg-slate-700 text-white font-medium" : ""}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}