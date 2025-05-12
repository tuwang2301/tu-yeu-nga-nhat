"use client";
import React, { useEffect, useState } from "react";
import { TypingAnimation } from "./magicui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "./magicui/sparkles-text";
import confetti from "canvas-confetti";
import { HeartIcon } from "lucide-react";

const startDate = new Date("2025-04-12T00:00:00");

const Text = () => {
  const [timeDiff, setTimeDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showText2, setShowText2] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        ).getDate();
        days += prevMonth;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const timeUnits = [
    { label: "năm", value: timeDiff.years },
    { label: "tháng", value: timeDiff.months },
    { label: "ngày", value: timeDiff.days },
    { label: "giờ", value: timeDiff.hours },
    { label: "phút", value: timeDiff.minutes },
    { label: "giây", value: timeDiff.seconds },
  ];

  return (
    <div className="text-center font-[Sansita_Swashed] text-white z-10">
      <TypingAnimation className="font-semibold">Hi công chúa,</TypingAnimation>
      {showText2 && (
        <TypingAnimation className="font-semibold">
          Vậy là chúng mình đã bên nhau được
        </TypingAnimation>
      )}

      <div className="flex flex-wrap gap-3 justify-center text-4xl my-4 font-semibold text-pink-950">
        <AnimatePresence>
          {showTime &&
            timeUnits.map(
              (unit, index) =>
                (unit.value > 0 || unit.label === "giây") && (
                  <motion.span
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="inline-block text-5xl font-extrabold"
                  >
                    <SparklesText sparklesCount={2}>
                      {unit.value} {unit.label}
                    </SparklesText>
                  </motion.span>
                )
            )}
        </AnimatePresence>
      </div>

      {showFinalText && (
        <TypingAnimation className="font-semibold">
          rồi đấy tình yêu ạ.
        </TypingAnimation>
      )}

      {showAvatars && (
        <motion.div
          className="mt-12 flex items-center justify-center gap-6"
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

          <div className="text-6xl animate-bounce">
            <HeartIcon className="w-10 h-10 text-pink-950" />
          </div>

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
