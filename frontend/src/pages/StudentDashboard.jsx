import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // ✅ Fetch all courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        if (res.ok) setCourses(data);
        else console.error(data.error);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (course) => {
    try {
      // 1️⃣ Create order on backend
      const res = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: course.price }),
      });

      const order = await res.json();

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: "rzp_test_RERUYJP23iHKih", // from Razorpay dashboard
        amount: order.amount,
        currency: order.currency,
        name: "Course Payment",
        description: `Payment for ${course.title}`,
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ Verify signature with backend
          const verifyRes = await fetch("http://localhost:5000/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const data = await verifyRes.json();
          if (data.success) {
            alert(`Payment successful! Enrolled in ${course.title}`);
            setEnrolledCourses((prev) => [...prev, course]);
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

      {/* Available Courses */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: ₹{course.price}</p>
              {course.videoFile && (
                <video
                  controls
                  className="w-full max-w-lg my-2"
                  src={`http://localhost:5000/uploads/${course.videoFile}`}
                />
              )}
              {course.pdfFile && (
                <a
                  href={`http://localhost:5000/uploads/${course.pdfFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline my-1"
                >
                  View PDF
                </a>
              )}

              {/* 🔹 Pay & Enroll Button */}
              <button
                onClick={() => handleEnroll(course)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2 mr-2"
              >
                Pay & Enroll ₹{course.price}
              </button>

              {/* 🔹 View Course Button (navigates to CoursePage.jsx) */}
              <Link
                to={`/course/${course._id}`}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2 inline-block"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">My Enrolled Courses</h2>
        {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description}</p>
              {course.videoFile && (
                <video
                  controls
                  className="w-full max-w-lg my-2"
                  src={`http://localhost:5000/uploads/${course.videoFile}`}
                />
              )}
              {course.pdfFile && (
                <a
                  href={`http://localhost:5000/uploads/${course.pdfFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline my-1"
                >
                  View PDF
                </a>
              )}

              {/* 🔹 Direct View Course for enrolled ones */}
              <Link
                to={`/course/${course._id}`}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2 inline-block"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
