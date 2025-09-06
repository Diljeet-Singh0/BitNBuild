import { useEffect, useState } from "react";

export default function TutorDashboard() {
  const [myCourses, setMyCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [price, setPrice] = useState(0);
  const token = localStorage.getItem("token");

  // Fetch tutor's courses
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/courses/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMyCourses(data))
      .catch(console.error);
  }, [token]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title, description, previewVideoUrl, price }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Course created!");
        setMyCourses((prev) => [...prev, data]);
        setTitle(""); setDescription(""); setPreviewVideoUrl(""); setPrice(0);
      } else {
        alert(JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tutor Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Create New Course</h2>
        <form onSubmit={handleCreateCourse} className="bg-white p-4 rounded shadow-md w-full md:w-1/2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Preview Video URL"
            value={previewVideoUrl}
            onChange={(e) => setPreviewVideoUrl(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Course
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCourses.length === 0 && <p>No courses created yet.</p>}
          {myCourses.map((course) => (
            <div key={course._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: {course.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
