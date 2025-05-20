"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";

const LoveMessageModal = ({
  isOpen,
  onClose,
  loveMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  loveMessage: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl p-8 max-w-sm w-full mx-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-4">
              <Heart className="text-pink-500 w-8 h-8" fill="#ec4899" />
            </div>

            <div className="p-8 min-h-[200px] flex items-center justify-center">
              <div
                className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 
  p-6 rounded-xl shadow-md w-full max-w-xs border border-pink-200"
              >
                <TypingAnimation
                  duration={50}
                  className="text-center text-lg font-[Sansita] font-normal text-gray-800 leading-tight"
                >
                  {loveMessage}
                </TypingAnimation>
              </div>
            </div>

            <p className="text-center text-gray-500 mt-4 text-xs">
              Made by Anh béo ❤️
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoveMessageModal;
