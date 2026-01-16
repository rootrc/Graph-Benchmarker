import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Section = {
  title: string;
  links: { name: string; to: string }[];
};

export default function SideBarSection({ section }: { section: Section }) {
  const storageKey = `sidebar-section-${section.title}`;

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOpen));
  }, [isOpen, storageKey]);

  return (
    <div>
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="flex pl-3 py-2 items-center gap-2 font-semibold cursor-pointer hover:bg-slate-700 select-none"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
        {section.title}
      </div>

      {isOpen && (
        <div className="text-slate-300">
          {section.links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="ml-8 pl-4 py-1 block hover:bg-slate-700 cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}