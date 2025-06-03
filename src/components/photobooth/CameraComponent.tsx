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
  const [pictureCount, setPictureCount] = useState<number>(0);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (count === null || count <= 0) return;

    const countdownTimer = setTimeout(() => {
      setCount((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    if (count === 1) {
      setTimeout(() => {
        takePicture();
        setCount(null); // Reset để trigger tiếp lượt tiếp theo
      }, 1000);
    }

    return () => clearTimeout(countdownTimer);
  }, [count]);

  // Trigger countdown for each picture
  useEffect(() => {
    if (pictureCount > 0) {
      setTimeout(() => {
        setCount(3); // Start 3s countdown before each picture
      }, 500);
    }
  }, [pictureCount]);

  // After taking picture, decrease pictureCount
  useEffect(() => {
    if (count === null && pictureCount > 0) {
      setPictureCount((prev) => prev - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const takePicture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImages((prev) => [...prev, imageSrc]);
      }
    }
  };

  const capture = () => {
    if (captureMode === "auto") {
      setCapturedImages([]); // Reset trước khi chụp mới
      setPictureCount(4); // Set số ảnh cần chụp
    } else {
      if (capturedImages.length === 4) {
        setCapturedImages([]);
      }
      takePicture();
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-32">
      <div className="relative max-w-lg flex flex-col gap-4 items-center bg-white p-4 rounded-2xl">
        <div className="relative w-full h-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
            imageSmoothing={true}
            mirrored
            className="w-full h-full object-cover rounded-xl"
          />
          {count !== null && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-transparent rounded-xl">
              {count}
            </div>
          )}
        </div>
        <button
          onClick={capture}
          className="p-2 bg-pink-300 rounded-full drop-shadow-xl hover:drop-shadow-2xl hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          <Camera className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">
            {captureMode === "auto" ? "Auto Shot" : "Capture"}
          </span>
        </button>
      </div>
      <div>
        <PhotoLayout
          layoutChoice={layoutChoice}
          images={capturedImages}
          showOptions
        />
      </div>
    </div>
  );
};

export default CameraComponent;
