import React, { useState } from "react";
import { LayoutType } from "./LayoutSelector";
import { CameraIcon, Download } from "lucide-react";
import html2canvas from "html2canvas-pro";

const PhotoLayout = ({
  height = 780,
  layoutChoice,
  images,
  showOptions = false,
}: {
  height?: number;
  layoutChoice: LayoutType | null;
  images?: string[];
  showOptions?: boolean;
}) => {
  const [frameColor, setFrameColor] = useState("#f9a8d4");
  const [filter, setFilter] = useState("none");
  const [footerText, setFooterText] = useState("");

  const handleSave = async () => {
    const layout = document.getElementById("photo-layout");
    if (layout) {
      const canvas = await html2canvas(layout);
      const link = document.createElement("a");
      link.download = "photo.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const widthSize = layoutChoice == "2x6" ? height / 3 : 2 * (height / 3);

  function getTextColor(bgColor: string): string {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  const textColor = getTextColor(frameColor);

  return (
    <div className="flex gap-8 flex-wrap">
      {/* MAIN LAYOUT */}
      <div
        id="photo-layout"
        style={{
          width: `${widthSize}px`,
          height: `${height}px`,
          borderColor: frameColor,
          backgroundColor: frameColor,
        }}
        className={`border-[5px]  flex flex-col justify-between ${
          layoutChoice == "2x6" ? "flex-col-reverse" : ""
        }`}
      >
        <div className="flex justify-center items-center h-1/6">
          {footerText ? (
            <div
              style={{ color: textColor }}
              className="font-[Sansita_Swashed] italic font-bold"
            >
              {footerText}
            </div>
          ) : (
            <CameraIcon className="w-6 h-6 mx-auto" />
          )}
        </div>
        <div
          className={`grid ${
            layoutChoice == "2x6"
              ? "grid-rows-4 grid-cols-1"
              : "grid-rows-2 grid-cols-2"
          } gap-[5px] h-5/6`}
        >
          {!!images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
                style={{ filter }}
              />
            ))
          ) : (
            <>
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-white" />
            </>
          )}
        </div>
      </div>

      {/* OPTIONS PANEL */}
      {showOptions && (
        <div className="flex flex-col gap-4 justify-center text-sm">
          <div>
            <label className="block mb-1 font-semibold">🎨 Màu viền:</label>
            <input
              type="color"
              value={frameColor}
              onChange={(e) => setFrameColor(e.target.value)}
              className="w-16 h-8 cursor-pointer"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">🎛️ Filter ảnh:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="none">Không áp dụng</option>
              <option value="grayscale(100%)">Grayscale</option>
              <option value="sepia(100%)">Sepia</option>
              <option value="brightness(1.2)">Bright +20%</option>
              <option value="contrast(1.5)">Contrast +50%</option>
              <option value="blur(2px)">Blur nhẹ</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              📝 Text chân trang:
            </label>
            <input
              type="text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="Ví dụ: Happy Birthday!"
              className="border rounded px-2 py-1 w-60"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 hover:cursor-pointer transition-colors duration-300 flex items-center gap-2 mt-4"
          >
            Lưu <Download className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoLayout;
