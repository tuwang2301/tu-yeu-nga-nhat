"use client";

import React, { useEffect, useRef, useState } from "react";
import Text from "./Text";
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";
import { ScratchToReveal } from "./magicui/scratch-to-reveal";
import { motion } from "framer-motion";
import { FlipText } from "./magicui/flip-text";

const SanhChinh = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowImage(true), 50);

    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio) {
        setProgress(audio.currentTime);
        setDuration(audio.duration || 0);
      }
    };

    audio?.addEventListener("timeupdate", updateProgress);
    return () => {
      audio?.removeEventListener("timeupdate", updateProgress);
      clearTimeout(timeout);
    };
  }, [audioRef, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const resetMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleComplete = () => {
    setShowText(true);
    setShowMusic(true);
    togglePlay();
  };

  return (
    <div className="w-full h-screen flex items-start justify-center relative px-2">
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      {!showText && (
        <div className="mt-32 md:mt-12 space-y-4 flex flex-col items-center">
          <FlipText className="text-4xl md:tracking-widest font-bold text-black dark:text-white md:text-7xl md:leading-[5rem]">
            Sratch to reveal
          </FlipText>
          <ScratchToReveal
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100 "
            width={300}
            height={300}
            onComplete={handleComplete}
          >
            {showImage && (
              <img
                src="/us.jpg"
                alt="us"
                className="w-full h-full object-cover"
              />
            )}
          </ScratchToReveal>
        </div>
      )}

      {showText && <Text />}

      <motion.div
        className="mt-12 flex items-center justify-between gap-6 fixed bottom-0 left-0 w-full bg-white shadow-md py-2 pe-4 z-50"
        animate={{ opacity: showMusic ? 1 : 0, y: showMusic ? 0 : 100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          {/* Ảnh đại diện bài hát */}
          <img
            src="/us.jpg" // Đặt ảnh bạn và người ấy tại public/us.jpg
            alt="us"
            className="w-24 h-24 rounded object-cover"
          />
          <div>
            <p className="text-2xl font-semibold text-pink-500 font-[Sansita_Swashed]">
              Bản tình ca của đôi ta
            </p>
            <p className="text-md text-gray-500 w-fit">
              {formatTime(progress)} / {formatTime(duration)}
            </p>
          </div>
        </div>

        {/* Điều khiển nhạc */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-pink-300 p-2 rounded-full hover:bg-gray-100 transition hover:cursor-pointer"
          >
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
          <button
            onClick={resetMusic}
            className="text-pink-300 p-2 rounded-full hover:bg-gray-100 transition hover:cursor-pointer"
          >
            <FaRedo size={20} />
          </button>
        </div>

        {/* Thanh progress */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-pink-500 transition-all"
            style={{ width: `${(progress / duration) * 100 || 0}%` }}
          />
        </div>

        <audio ref={audioRef} loop>
          <source src="/love-song.m4a" type="audio/mpeg" />
          Trình duyệt không hỗ trợ audio.
        </audio>
      </motion.div>
    </div>
  );
};

export default SanhChinh;
