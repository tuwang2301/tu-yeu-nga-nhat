"use client";
import React, { useCallback, useState } from "react";
import LayoutSelector, { LayoutType } from "../photobooth/LayoutSelector";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ModeSelector, { ModeType } from "../photobooth/ModeSelector";
import CameraComponent from "../photobooth/CameraComponent";

const Photobooth = () => {
  const [step, setStep] = useState(1);
  const [layoutChoice, setLayoutChoice] = useState<LayoutType | null>(null);
  const [captureMode, setCaptureMode] = useState<ModeType | null>(null);

  const checkEnabledNextStep = useCallback(() => {
    switch (step) {
      case 1:
        if (layoutChoice) {
          return true;
        }
        break;
      case 2:
        if (captureMode) {
          return true;
        }
        break;
      default:
        return false;
    }
  }, [captureMode, layoutChoice, step]);

  const RenderComponent = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <LayoutSelector
            value={layoutChoice}
            onSelect={(layoutType: LayoutType) => setLayoutChoice(layoutType)}
          />
        );
      case 2:
        return (
          <ModeSelector
            value={captureMode}
            onSelect={(ModeType: ModeType) => setCaptureMode(ModeType)}
          />
        );
      case 3:
        return (
          <CameraComponent
            layoutChoice={layoutChoice}
            captureMode={captureMode}
          />
        );
      default:
        return null;
    }
  }, [captureMode, layoutChoice, step]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center">
      <RenderComponent />
      <div>
        {step > 1 && (
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="absolute left-32 bottom-32 bg-white text-black px-4 py-2 rounded-2xl flex disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:shadow-2xl hover:opacity-80 transition ease-in duration-200 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition ease-in-out duration-300" />
            Em mún đổi ý
          </button>
        )}
      </div>
      <div>
        {step < 3 && (
          <button
            className="absolute right-32 bottom-32 bg-black text-white px-4 py-2 rounded-2xl flex disabled: disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:shadow-2xl hover:opacity-80 transition ease-in duration-200 group"
            disabled={!checkEnabledNextStep()}
            onClick={() => setStep(step + 1)}
          >
            Típ
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition ease-in-out duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Photobooth;
