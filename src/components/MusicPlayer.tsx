"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const autoPlay = () => {
      if (audio && !isPlaying) {
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    document.addEventListener("click", autoPlay, { once: true });

    const updateProgress = () => {
      if (audio) {
        setProgress(audio.currentTime);
        setDuration(audio.duration || 0);
      }
    };

    audio?.addEventListener("timeupdate", updateProgress);
    return () => {
      document.removeEventListener("click", autoPlay);
      audio?.removeEventListener("timeupdate", updateProgress);
    };
  }, [isPlaying]);

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

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md px-4 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        {/* Ảnh đại diện bài hát */}
        <img
          src="/us.jpg" // Đặt ảnh bạn và người ấy tại public/us.jpg
          alt="us"
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <p className="text-xl font-semibold text-pink-500">
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
    </div>
  );
};

export default MusicPlayer;
