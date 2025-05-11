"use client";
import Lottie from "lottie-react";
import heartLoader from "./loader.json";

const Loader = () => (
  <div className="flex justify-center items-center">
    <Lottie animationData={heartLoader} loop={true} style={{ height: 150 }} />
  </div>
);

export default Loader;
