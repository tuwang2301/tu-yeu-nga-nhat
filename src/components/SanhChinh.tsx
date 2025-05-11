"use client";

import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import confetti from "canvas-confetti";

const startDate = new Date("2025-04-12T00:00:00"); // Ngày bắt đầu yêu nhau

const SanhChinh = () => {
  const [timeDiff, setTimeDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [calculating, setCalculating] = useState(true);
  //   const [bgIndex, setBgIndex] = useState(0);

  //   const backgrounds = [
  //     "/bg1.jpg",
  //     "/bg2.jpg",
  //     "/bg3.jpg", // Đổi ảnh theo nhu cầu (nên để trong public folder)
  //   ];

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
      setCalculating(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 130,
      origin: { y: 0.6, x: 0.5 },
    });
  }, []);

  //   // Tự động đổi nền mỗi 10 giây
  //   useEffect(() => {
  //     const change = setInterval(() => {
  //       setBgIndex((prev) => (prev + 1) % backgrounds.length);
  //     }, 10000);
  //     return () => clearInterval(change);
  //   }, [backgrounds.length]);

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      //   style={{
      //     backgroundImage: `url(${backgrounds[bgIndex]})`,
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //     transition: "background-image 1s ease-in-out",
      //   }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Chúng mình đã bên nhau được</h1>
        <div className="flex flex-wrap gap-3 justify-center text-4xl my-4 font-semibold">
          {calculating ? (
            <span className="text-md">(đợi anh tính xíuu...)</span>
          ) : (
            <>
              {timeDiff.years > 0 && <span>{timeDiff.years} năm</span>}
              {timeDiff.months > 0 && <span>{timeDiff.months} tháng</span>}
              <span>{timeDiff.days} ngày</span>
              <span>{timeDiff.hours} giờ</span>
              <span>{timeDiff.minutes} phút</span>
              <span>{timeDiff.seconds} giây</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4">rùi đấyyy 🥰</h1>

        <div className="mt-12 flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-20 md:w-30 h-20 md:h-30 rounded-full border-2 border-white overflow-hidden">
              <img
                src="/ava1.jpg"
                alt="Người 1"
                className="object-cover scale-200 -translate-y-1 rotate-y-180"
              />
            </div>
            <span className="mt-2 text-xl font-bold">Béo 🤵</span>
          </div>

          <div className="text-6xl animate-bounce">❤️</div>

          <div className="flex flex-col items-center">
            <div className="relative w-20 md:w-30 h-20 md:h-30 rounded-full border-2 border-white overflow-hidden">
              <img
                src="/ava2.png"
                alt="Người 1"
                className="object-cover scale-120"
              />
            </div>
            <span className="mt-2 text-xl font-bold">Ngố 👰</span>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default SanhChinh;
