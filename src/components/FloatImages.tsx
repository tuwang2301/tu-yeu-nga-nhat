"use client";
import supabase from "@/utils/supabase";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const FloatImages = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [shootImage, setShootImage] = React.useState<{
    url: string;
    x: number;
  } | null>(null);

  React.useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("love-img")
        .list("img", { limit: 100 });

      if (error) {
        console.error("Error fetching images:", error.message);
        return;
      }

      if (data) {
        const publicUrls = data.map(
          (file) =>
            `https://zpvrucesxlelteoydzcp.supabase.co/storage/v1/object/public/love-img/img/${file.name}`
        );
        setImages(publicUrls);
      }
    };

    fetchImages();
  }, []);

  const handleShoot = () => {
    if (images.length === 0) return;
    const randomUrl = images[Math.floor(Math.random() * images.length)];
    const randomX = Math.random() * window.innerWidth - 100; // random vị trí theo chiều ngang
    setShootImage({ url: randomUrl, x: randomX });
  };

  return (
    <div className="">
      <button onClick={handleShoot}>
        <div className="text-6xl animate-bounce">
          <FaHeart className="w-10 h-10 text-pink-600" />
        </div>
      </button>

      <AnimatePresence>
        {shootImage && (
          <motion.div
            key={shootImage.url + Date.now()} // Đảm bảo mỗi lần là unique
            className="absolute left-0 pointer-events-none z-0"
            initial={{
              opacity: 0,
              y: 0,
              scale: 0.7,
              top: `${window.innerHeight - 150}px`,
              x: shootImage.x,
              zIndex: -100,
            }}
            animate={{
              opacity: 1,
              y: -window.innerHeight * 0.6,
              scale: 1,
              x: shootImage.x,
            }}
            exit={{ opacity: 0, y: -window.innerHeight * 0.8, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {shootImage.url.toLowerCase().endsWith(".mp4") ||
            shootImage.url.toLowerCase().endsWith(".mov") ? (
              <video
                src={shootImage.url}
                autoPlay
                loop
                muted
                className="rounded-xl object-cover w-32 md:w-64 h-32 md:h-64"
              />
            ) : (
              <img
                src={shootImage.url}
                alt=""
                className="rounded-xl object-cover w-32 md:w-64 h-32 md:h-64"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatImages;
