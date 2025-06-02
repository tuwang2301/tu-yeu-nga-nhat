import React from "react";
import { LayoutType } from "./LayoutSelector";
import { CameraIcon } from "lucide-react";

const PhotoLayout = ({
  layoutChoice,
  images,
}: {
  layoutChoice: LayoutType | null;
  images?: string[];
}) => {
  return (
    <div
      className={`${
        layoutChoice == "2x6" ? "w-32" : "w-64"
      } h-96 border-[5px] border-pink-300 bg-pink-300 flex flex-col justify-between ${
        layoutChoice == "2x6" && "flex-col-reverse"
      }`}
    >
      <div>
        <CameraIcon className="w-6 h-6 mx-auto" />
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
  );
};

export default PhotoLayout;
