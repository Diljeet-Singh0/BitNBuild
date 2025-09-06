import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
    

export default function StudentDashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch enrolled courses
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:5000/api/enrollments/my", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setEnrolledCourses(data))
            .catch(console.error);
    }, [token]);

    // Fetch all courses
    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) => setAllCourses(data))
            .catch(console.error);
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const res = await fetch("http://localhost:5000/api/enrollments/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ courseId }),
            });
            const data = await res.json();
            alert(JSON.stringify(data));
            if (res.ok) setEnrolledCourses((prev) => [...prev, { course: data.enrollment.course }]);
        } catch (err) {
            console.error(err);
            alert("Enrollment failed");
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
                    {enrolledCourses.map((enrollment) => (
                        <div key={enrollment._id || enrollment.course._id} className="p-4 bg-white rounded shadow">
                            <h3 className="font-bold">{enrollment.course.title}</h3>
                            <p>{enrollment.course.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">All Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allCourses.map((course) => (
                        <div key={course._id} className="p-4 bg-white rounded shadow">
                            <Link to={`/course/${course._id}`} className="font-bold text-blue-600 hover:underline">
                                {course.title}
                            </Link>
                            <p>{course.description}</p>
                            <button
                                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleEnroll(course._id)}
                            >
                                Enroll
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
