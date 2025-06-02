"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BackToMenu = () => {
  const path = usePathname();

  if (path === "/menu" || path === "/") {
    return null;
  }
  return (
    <div className="fixed top-4 left-4 z-50 text-pink-500">
      <Link
        href="/menu"
        className="flex items-center gap-2 opacity-50 hover:opacity-100 transition ease-in-out duration-300 group font-normal"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition ease-in-out duration-300" />
        Trở về me n u
      </Link>
    </div>
  );
};

export default BackToMenu;
