import { useState } from "react";

export function TeacherSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-cyan-600">
          Teacher Registration
        </h2>
        <form className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-md border border-cyan-300 focus:ring-2 focus:ring-cyan-200 outline-none"
            type="text"
            placeholder="Full Name"
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-cyan-300 focus:ring-2 focus:ring-cyan-200 outline-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-cyan-300 focus:ring-2 focus:ring-cyan-200 outline-none"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="showPasswordTeacher"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="accent-cyan-500"
            />
            <label htmlFor="showPasswordTeacher">Show Password</label>
          </div>
          <input
            className="w-full px-4 py-3 rounded-md border border-cyan-300 focus:ring-2 focus:ring-cyan-200 outline-none"
            type="text"
            placeholder="Subject Expertise"
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-cyan-300 focus:ring-2 focus:ring-cyan-200 outline-none"
            type="text"
            placeholder="Years of Experience"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-cyan-400 text-white font-semibold shadow hover:bg-cyan-500 transition"
          >
            Sign Up as Teacher
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-cyan-500 font-semibold hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}