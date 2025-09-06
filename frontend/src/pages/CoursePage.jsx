import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { id } = useParams(); // course ID from URL
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [communityMessages, setCommunityMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");
const [showCommunity, setShowCommunity] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch course details
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setReviews(data.reviews || []);
      })
      .catch(console.error);
  }, [id]);
useEffect(() => {
  if (!course) return;
  if (course.enrolledStudents && course.enrolledStudents.length >= 5) {
    setShowCommunity(true);
    fetch(`http://localhost:5000/api/community/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCommunityMessages(data.messages || []))
      .catch(console.error);
  }
}, [course]);

const handleSendMessage = async () => {
  if (!newMessage) return;
  try {
    const res = await fetch(`http://localhost:5000/api/community/${id}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newMessage }),
    });
    const data = await res.json();
    if (res.ok) {
      setCommunityMessages((prev) => [...prev, data]);
      setNewMessage("");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to send message");
  }
};

  const handleEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/enrollments/enroll`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ courseId: id }),
      });
      const data = await res.json();
      alert(JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    }
  };

  const handleAddReview = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/reviews`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [...prev, data]);
        setComment("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add review");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
  <div className="min-h-screen p-6 bg-gray-100">
    <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
    <p className="mb-4">{course.description}</p>

    {course.previewVideoUrl && (
      <video controls className="w-full max-w-lg mb-4">
        <source src={course.previewVideoUrl} type="video/mp4" />
      </video>
    )}

    <button
      onClick={handleEnroll}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-6"
    >
      Enroll
    </button>

    {/* Reviews Section */}
    <section>
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((rev) => (
        <div key={rev._id} className="bg-white p-2 mb-2 rounded shadow">
          <p>{rev.comment}</p>
          <p className="text-sm text-gray-500">by {rev.user.name}</p>
        </div>
      ))}

      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Add a review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleAddReview}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>
    </section>

    {/* Community Section */}
    {showCommunity && (
      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Course Community</h2>
        <div className="max-h-64 overflow-y-auto border p-2 mb-2 bg-white rounded shadow">
          {communityMessages.length === 0 && <p>No messages yet.</p>}
          {communityMessages.map((msg) => (
            <div key={msg._id} className="mb-2">
              <p className="font-semibold">{msg.sender.name}</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </section>
    )}
  </div>
);
}
