import React from "react";
import heroImage from "../../../assets/Home/HeroImage.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-100">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto h-full flex items-center px-6 md:px-12">
        <div className="max-w-lg mt-24 md:mt-52">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Understanding your reports <br />
            <span className="text-blue-600">made simpler.</span>
          </h1>

          <p className="mt-6 text-lg md:text-md text-gray-700 leading-relaxed font-medium">
            Upload your lab report and get instant, easy-to-understand
            explanations in your language.
          </p>

          <div className="mt-10">
            <button onClick={()=>navigate('/report')} className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg">
              Analyze Your Report
            </button>
            <p className="mt-3 text-sm text-gray-600 ml-4 font-medium">
              Free to use • Secure & Private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
