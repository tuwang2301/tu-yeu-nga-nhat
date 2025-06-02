import { Timer } from "lucide-react";
import { useState } from "react";
import { TbHandClick } from "react-icons/tb";

export type ModeType = "auto" | "manual";

export default function ModeSelector({
  value,
  onSelect,
}: {
  value: ModeType | null;
  onSelect: (layout: ModeType) => void;
}) {
  const [selected, setSelected] = useState<ModeType | null>(value);

  const handleSelect = (layout: ModeType) => {
    setSelected(layout);
    onSelect(layout);
  };

  const cardBase =
    "cursor-pointer rounded-2xl p-6 w-40 h-48 flex flex-col items-center justify-center border transition-all duration-200 shadow hover:shadow-lg bg-white";

  return (
    <div className="flex flex-col items-center space-y-10">
      <h2 className="text-xl font-semibold text-center">
        Chọn chế độ chụp nhé bé
      </h2>

      <div className="flex gap-10">
        <div
          onClick={() => handleSelect("auto")}
          className={`${cardBase} ${
            selected === "auto"
              ? " border-8 border-pink-500 scale-105"
              : " border-gray-300"
          }`}
        >
          <Timer className="w-10 h-10 text-pink-500 mb-4" />
          <span className="text-sm font-medium text-gray-700">Tự động</span>
        </div>

        <div
          onClick={() => handleSelect("manual")}
          className={`${cardBase} ${
            selected === "manual"
              ? "border-8 border-pink-500 scale-105"
              : "border-gray-300"
          }`}
        >
          <TbHandClick className="w-10 h-10 text-pink-500 mb-4" />
          <span className="text-sm font-medium text-gray-700">Thủ công</span>
        </div>
      </div>
    </div>
  );
}
