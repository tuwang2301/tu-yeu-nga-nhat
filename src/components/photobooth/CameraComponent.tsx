"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { LayoutType } from "./LayoutSelector";
import { ModeType } from "./ModeSelector";
import { Camera } from "lucide-react";
import PhotoLayout from "./PhotoLayout";

const CameraComponent = ({
  layoutChoice,
  captureMode,
}: {
  layoutChoice: LayoutType | null;
  captureMode: ModeType | null;
}) => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (count === null || count <= 0) return;

    const timer = setTimeout(() => {
      setCount((prev) => (prev ? prev - 1 : null));
    }, 1000);

    if (count === 1) {
      setTimeout(() => {
        takePicture();
        setCount(null); // Reset
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [count]);

  const takePicture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages((prev) => (prev ? [...prev, imageSrc!] : [imageSrc!]));
    }
  };

  const capture = async () => {
    if (captureMode === "auto") {
      setCount(3);
    } else {
      takePicture();
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-md flex flex-col gap-4 items-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
          imageSmoothing={true}
          mirrored
          className="w-full h-full object-cover"
        />
        <button onClick={capture} className="p-2 bg-white rounded-full">
          <Camera className="w-5 h-5" /> {count}
        </button>
      </div>
      <div>
        <PhotoLayout layoutChoice={layoutChoice} images={capturedImages} />
      </div>
    </div>
  );
};

export default CameraComponent;
