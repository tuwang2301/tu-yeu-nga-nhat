"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("./Loader"), {
  ssr: false, // Không render trên server
});

const PasscodeScreen = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const correctPasscode = "1204";

  const handlePress = (num: string) => {
    if (input.length < 4) setInput((prev) => prev + num);
  };

  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

  useEffect(() => {
    if (input.length === 0) {
      setMessage("");
      return;
    }

    if (correctPasscode.startsWith(input)) {
      setIsCorrect(true);
      setMessage("Gần đúng rùi emiuu 💓");

      if (input.length === 4 && correctPasscode === input) {
        setMessage("Em mở được trái tim cụa anh rùii 💓");
        setIsLoading(true);

        setTimeout(() => {
          localStorage.setItem("auth", "true");
          router.push("/sanh-chinh");
        }, 1200);

        return;
      }
    } else {
      setIsCorrect(false);
      setMessage("Em hết iu anh rùii 😇");
    }
  }, [input, router]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-4/5 max-w-sm bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black opacity-10 rounded-2xl">
            <Loader />
          </div>
        )}

        {/* Title */}
        <h2 className="text-center text-pink-500 font-semibold text-xl mb-4">
          Nhập mật mã tình yêu 💕
        </h2>

        {/* Passcode Dots */}
        <div className="flex justify-center gap-3 mb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                input[i] ? "bg-pink-500 border-pink-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              isCorrect ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="grid grid-cols-3 gap-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "←"].map(
            (key, idx) => {
              if (key === "") return <div key={idx} />;
              return (
                <button
                  key={idx}
                  onClick={key === "←" ? handleDelete : () => handlePress(key)}
                  className="bg-pink-100 text-pink-600 font-semibold py-3 rounded-xl hover:bg-pink-200 transition hover:cursor-pointer"
                >
                  {key === "←" ? "⌫" : key}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default PasscodeScreen;
