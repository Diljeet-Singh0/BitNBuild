// src/pages/WhatIsMyTeachers.jsx
import { useNavigate } from "react-router-dom";

export default function WhatIsMyTeachers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-10">
      <h2 className="text-4xl font-bold text-center mb-12 mt-6">
        What is myteachers?
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Card 1 - Student */}
        <div className="relative rounded-xl overflow-hidden group min-h-[360px] flex items-center justify-center">
          <img
            src="/kiddo.jpeg"
            alt="School Kids"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-white text-3xl font-bold mb-6 drop-shadow-lg">
              Find teacher <br /> courses
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 text-lg font-semibold rounded border border-white text-white bg-white/20 hover:bg-white/40 hover:text-black transition"
            >
              Start Learning
            </button>
          </div>
        </div>

        {/* Card 2 - Tutor */}
        <div className="relative rounded-xl overflow-hidden group min-h-[360px] flex items-center justify-center">
          <img
            src="/tut.jpeg"
            alt="Tutor"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-white text-3xl font-bold mb-6 drop-shadow-lg">
              Become a <br /> Tutor
            </span>
            <button
              onClick={() => navigate("/signup/")}
              className="px-6 py-2 text-lg font-semibold rounded border border-white text-white bg-white/20 hover:bg-white/40 hover:text-black transition"
            >
              Start Teaching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
