import { Routes, Route, Outlet } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TutorDashboard from "./pages/TutorDashboard.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import Navbar from "./pages/Navbar.jsx";

// Layout with Navbar
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 p-6">
        <Outlet /> {/* renders child route */}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Landing page without Navbar */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4">
            <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-md">
              EduPlatform
            </h1>
            <p className="mb-10 max-w-md text-center text-gray-600 text-lg">
              Learn and teach courses easily! Join thousands of learners and instructors today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm">
              <a href="/login" className="w-full sm:w-auto">
                <button className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  Login
                </button>
              </a>
              <a href="/signup" className="w-full sm:w-auto">
                <button className="w-full px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                  Signup
                </button>
              </a>
            </div>
          </div>
        }
      />

      {/* All other pages with Navbar */}
      <Route element={<Layout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/tutor" element={<TutorDashboard />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Route>
    </Routes>
  );
}
