import { useState } from "react";
import PhotoLayout from "./PhotoLayout";

export type LayoutType = "2x6" | "4x6";

export default function LayoutSelector({
  value,
  onSelect,
}: {
  value: LayoutType | null;
  onSelect: (layout: LayoutType) => void;
}) {
  const [selected, setSelected] = useState<LayoutType | null>(value);

  const handleSelect = (layout: LayoutType) => {
    setSelected(layout);
    onSelect(layout);
  };

  console.log(selected, value);

  const cardBase =
    "cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-center border transition-all duration-200 shadow hover:shadow-lg bg-white";

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold text-center mb-16">
        Chọn Layout chụp nhé bé
      </h2>
      <div className="flex gap-32">
        <div
          onClick={() => handleSelect("2x6")}
          className={`${cardBase} ${
            selected === "2x6"
              ? " border-8 border-pink-500 scale-105"
              : " border-gray-300"
          }`}
        >
          <PhotoLayout height={504} layoutChoice={"2x6"} />
          <p className="text-center text-sm mt-2">Mini</p>
        </div>

        <div
          onClick={() => handleSelect("4x6")}
          className={`${cardBase} ${
            selected === "4x6"
              ? " border-8 border-pink-500 scale-105"
              : " border-gray-300"
          }`}
        >
          <PhotoLayout height={504} layoutChoice={"4x6"} />
          <p className="text-center text-sm mt-2">Hong mini</p>
        </div>
      </div>
    </div>
  );
}
