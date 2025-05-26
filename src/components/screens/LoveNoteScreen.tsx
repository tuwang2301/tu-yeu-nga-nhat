"use client";
import { useEffect, useRef, useState } from "react";
import { Camera, Heart, Loader, Plus, RefreshCw, Send, X } from "lucide-react";
import Image from "next/image";
import Webcam from "react-webcam";
import supabase from "@/utils/supabase";
import LoveMessageModal from "../LoveMessageModal";
import { motion, AnimatePresence } from "framer-motion";

export default function LoiIuThuong() {
  const [remainingMessages, setRemainingMessages] = useState(0); // Số lượt xem còn lại
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loveMessage, setLoveMessage] = useState<string>("");

  useEffect(() => {
    const numMessages = localStorage.getItem("remainingMessages");
    if (numMessages) {
      setRemainingMessages(parseInt(numMessages));
    } else {
      localStorage.setItem("remainingMessages", "1");
      setRemainingMessages(1);
    }
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const sendPhoto = async () => {
    if (!capturedImage) return;

    // Convert base64 về Blob
    const response = await fetch(capturedImage);
    const blob = await response.blob();

    // Tạo file name
    const fileName = `photo-${Date.now()}.png`;

    // Upload lên Supabase Storage
    const { data, error } = await supabase.storage
      .from("babi-photos") // Bucket name trong Supabase
      .upload(fileName, blob, {
        contentType: "image/png",
      });

    if (error) {
      console.error("Upload thất bại:", error.message);
      alert("Lỗi khi upload ảnh 😢");
      return;
    }

    // Nếu thành công
    console.log("Ảnh đã upload:", data);
    alert("Đã upload ảnh và nhận 1 lượt xem ❤️");
    localStorage.setItem(
      "remainingMessages",
      (remainingMessages + 1).toString()
    );
    setRemainingMessages(remainingMessages + 1);
    setOpenCamera(false);
    setCapturedImage(null);
  };

  const handleOpenMessage = async () => {
    await getLoveMessage();
    setRemainingMessages(remainingMessages - 1);
    localStorage.setItem(
      "remainingMessages",
      (remainingMessages - 1).toString()
    );
  };

  const getLoveMessage = async () => {
    setLoading(true);
    const res = await fetch("/api/love-message", {
      method: "POST",
    });
    const data = await res.json();
    setLoveMessage(data.message);
    setLoading(false);
    setOpenMessage(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Ảnh trai thủy tinh */}
        <div className="w-64 h-64 mb-6 relative">
          <Image
            src="/love-notes.jfif"
            fill
            alt="Trai thủy tinh"
            className="rounded-full object-cover w-full h-full shadow-lg border-4 border-white"
          />
          <div className="absolute -bottom-2 -right-2 bg-pink-500 rounded-full p-2">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-2xl md:text-3xl font-bold text-pink-600 text-center mb-8">
          Lời Yêu Thương Của Ngày
        </h1>

        {/* Thông tin lượt còn lại */}
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl py-2 px-4 mb-6">
          <p className="text-pink-600">
            Lượt nhận lời yêu thương còn lại:{" "}
            <span className="font-bold">{remainingMessages}</span>
          </p>
        </div>

        {/* Các nút */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {remainingMessages > 0 && (
            <button
              onClick={handleOpenMessage}
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-xl
                  font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:cursor-pointer transition-all
                  flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Heart className="w-5 h-5 mr-2" />
              )}

              <span>{loading ? "Đang nhận..." : "Nhận lời yêu thương"}</span>
            </button>
          )}

          <LoveMessageModal
            isOpen={openMessage}
            onClose={() => setOpenMessage(false)}
            loveMessage={loveMessage}
          />

          <button
            onClick={() => setOpenCamera(true)}
            className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 px-6 rounded-xl
              font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:cursor-pointer transition-all
              flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm lượt
          </button>
          {openCamera && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-2xl p-8 max-w-sm w-full mx-4"
                >
                  <button
                    onClick={() => setOpenCamera(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-medium mb-3">
                    Chụp hình để nhận thêm lượt
                  </h3>
                  <div className="bg-black rounded-lg overflow-hidden mb-4 h-64">
                    {!capturedImage ? (
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          facingMode: "user",
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col space-y-3">
                    {!capturedImage ? (
                      <button
                        onClick={capture}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl
                    font-medium flex items-center justify-center"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Chụp hình
                      </button>
                    ) : (
                      <div>
                        <div className="flex space-x-3">
                          <button
                            onClick={retakePhoto}
                            className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 rounded-xl
                        font-medium flex items-center justify-center"
                          >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Chụp lại
                          </button>

                          <button
                            onClick={sendPhoto}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl
                        font-medium flex items-center justify-center"
                          >
                            <Send className="w-5 h-5 mr-2" />
                            Gửi ảnh
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs text-center mt-3">
                    Hình ảnh của bạn sẽ được xử lý an toàn và bảo mật
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
