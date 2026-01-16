import { Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-14 w-full items-center bg-slate-900 text-white">
      <button
        onClick={onMenuClick}
        className="p-3 hover:bg-slate-800 cursor-pointer "
      >
        <Menu size={32} />
      </button>
    </header>
  );
}