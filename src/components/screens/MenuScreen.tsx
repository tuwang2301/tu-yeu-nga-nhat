import {
  Heart,
  Clock,
  MessageCircleHeart,
  SparkleIcon,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default function CuteMenu() {
  const menuItems = [
    {
      title: "Đồng hồ tình iu",
      href: "/sanh-chinh",
      icon: <Clock className="w-5 h-5" />,
      color: "from-pink-300 to-rose-200",
    },
    {
      title: "Lời iu thương",
      href: "/love-note",
      icon: <MessageCircleHeart className="w-5 h-5" />,
      color: "from-purple-300 to-pink-200",
    },
    {
      title: "Phô tô bút",
      href: "/photobooth",
      icon: <Camera className="w-5 h-5" />,
      color: "from-green-300 to-green-200",
    },
    {
      title: "Coming soon...",
      href: "/sanh-chinh",
      icon: <SparkleIcon className="w-5 h-5" />,
      color: "from-blue-300 to-purple-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200">
        <div className="flex items-center justify-center mb-6">
          <Heart className="text-pink-500 mr-2 w-6 h-6" />
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600 text-center">
            Me n u
          </h1>
          <Heart className="text-pink-500 ml-2 w-6 h-6" />
        </div>

        <h2 className="text-lg md:text-xl text-center font-medium text-gray-700 mb-6">
          Dạ không biết quý khách mún order gì ạ?
        </h2>

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 
                bg-gradient-to-r ${item.color} hover:shadow-lg transform hover:-translate-y-1 scale-100 hover:scale-110`}
            >
              <span className="text-white">{item.icon}</span>
              <span className="text-white font-medium">{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-pink-500 text-sm">♡ Cảm ơn em đã ghé thăm ♡</p>
        </div>
      </div>
    </div>
  );
}
