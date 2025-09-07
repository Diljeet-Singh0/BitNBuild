import { useState, useEffect } from "react";

export default function TutorDashboard() {
  const [activeTab, setActiveTab] = useState("view"); // view | add | update
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 0,
    videoFile: null,
    pdfFile: null,
  });

  // ✅ Fetch tutor's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) setCourses(data);
        else console.error(data.error);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [activeTab]);

  // ✅ Handle add course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    formData.append("price", newCourse.price);
    if (newCourse.videoFile) formData.append("video", newCourse.videoFile);
    if (newCourse.pdfFile) formData.append("pdf", newCourse.pdfFile);

    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Course added!");
      setActiveTab("view"); // go back to view tab
      setCourses((prev) => [...prev, data.course]); // update UI instantly
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tutor Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "view" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setActiveTab("view")}
        >
          View Courses
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "add" ? "bg-green-600 text-white" : "bg-white border"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Course
        </button>
      </div>

      {/* View Courses */}
      {activeTab === "view" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.length === 0 && <p>No courses added yet.</p>}
          {courses.map((course) => (
            <div key={course._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold text-lg">{course.title}</h3>
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
            </div>
          ))}
        </div>
      )}

      {/* Add Course */}
      {activeTab === "add" && (
        <form
          onSubmit={handleAddCourse}
          className="bg-white p-6 rounded shadow-md w-full md:w-1/2"
        >
          <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="w-full p-2 border mb-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) =>
              setNewCourse({ ...newCourse, price: e.target.value })
            }
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              setNewCourse({ ...newCourse, videoFile: e.target.files[0] })
            }
            className="w-full mb-2"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setNewCourse({ ...newCourse, pdfFile: e.target.files[0] })
            }
            className="w-full mb-2"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Course
          </button>
        </form>
      )}
    </div>
  );
}
