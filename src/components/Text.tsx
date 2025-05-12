"use client";
import React, { useEffect, useState } from "react";
import { TypingAnimation } from "./magicui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatImages from "./FloatImages";
import Countdown from "./Countdown";

const Text = () => {
  const [showText2, setShowText2] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  const confettiSetup = () => {
    confetti({
      particleCount: 150,
      spread: 130,
      origin: { y: 0.6, x: 0.5 },
    });
  };

  useEffect(() => {
    // Delay từng giai đoạn
    setTimeout(() => setShowText2(true), 1500);
    setTimeout(() => setShowTime(true), 4500);
    setTimeout(() => setShowFinalText(true), 5500);
    setTimeout(() => setShowAvatars(true), 7500);
    setTimeout(() => confettiSetup(), 8000);
  }, []);

  return (
    <div className="text-center font-[Sansita_Swashed] text-white z-0 mt-6 md:mt-16">
      <TypingAnimation className="font-semibold" style={{ lineHeight: 1.5 }}>
        Hi công chúa,
      </TypingAnimation>
      {showText2 && (
        <TypingAnimation className="font-semibold" style={{ lineHeight: 1.5 }}>
          Vậy là chúng mình đã bên nhau được
        </TypingAnimation>
      )}

      <div className="flex flex-wrap gap-3 justify-center text-4xl my-4 font-semibold text-pink-950">
        <AnimatePresence>{showTime && <Countdown />}</AnimatePresence>
      </div>

      {showFinalText && (
        <TypingAnimation className="font-semibold" style={{ lineHeight: 1.5 }}>
          rồi đấy tình yêu ạ.
        </TypingAnimation>
      )}

      {showAvatars && (
        <motion.div
          className="mt-4 md:mt-12 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-20 md:w-30 h-20 md:h-30 rounded-full border-2 border-white overflow-hidden">
              <img
                src="/ava1.jpg"
                alt="Người 1"
                className="object-cover scale-200 -translate-y-1 rotate-y-180"
              />
            </div>
            <span className="mt-2 text-xl font-bold">Anh Béo 🤵</span>
          </div>

          <FloatImages />

          <div className="flex flex-col items-center">
            <div className="relative w-20 md:w-30 h-20 md:h-30 rounded-full border-2 border-white overflow-hidden">
              <img
                src="/ava2.png"
                alt="Người 2"
                className="object-cover scale-120"
              />
            </div>
            <span className="mt-2 text-xl font-bold">Em Ngố 👰</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Text;
