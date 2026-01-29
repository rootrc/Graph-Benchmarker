import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Slider({id, onChange, min = 0, max = 100, disabled = false }: {
  id: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  disabled?: boolean;
}) {
  const [value, setValue] = useLocalStorage(`section-slider${id}`, (min + max) / 2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setValue(val);
    onChange(val);
  };

  return (
    <div className="w-40">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
        <span>Speed</span>
        <span>{value}ms</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-40 appearance-none rounded-lg h-2 bg-slate-200 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600
        `}
      />
      <div className="w-40 text-xs text-slate-600 grid grid-cols-3">
        <span className="text-left">{min}</span>
        <span className="text-center">{(min + max) / 2}</span>
        <span className="text-right">{max}</span>
      </div>
    </div>
  );
}