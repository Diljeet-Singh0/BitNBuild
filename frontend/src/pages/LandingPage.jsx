import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-800 drop-shadow-md">
          Learn, Teach & Grow
        </h1>
        <p className="text-gray-700 mb-8 text-lg max-w-xl mx-auto">
          Join thousands of learners and top tutors. Paid or free courses, community chats, and more.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/signup">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
            <p>Learn from top instructors with real-world experience.</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Paid & Free Courses</h3>
            <p>Flexible learning with courses for every budget.</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Community Chat</h3>
            <p>Interact with fellow learners and discuss course topics.</p>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Courses</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="font-semibold mb-2">{course.price === 0 ? "Free" : `₹${course.price}`}</p>
              <button
                onClick={() => navigate(`/course/${course._id}`)}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
