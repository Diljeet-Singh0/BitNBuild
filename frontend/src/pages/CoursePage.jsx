import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { id } = useParams(); // course ID
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [communityMessages, setCommunityMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showCommunity, setShowCommunity] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch course details
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setReviews(data.reviews || []);
      })
      .catch(console.error);
  }, [id]);

  // ✅ Fetch community messages if course has 5+ students
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

  // ✅ Razorpay payment integration
  const handlePayment = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: id, amount: course.price }),
      });
      const order = await res.json();

      const options = {
        key: "rzp_test_RERUYJP23iHKih", // replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "EduPlatform",
        description: course.title,
        order_id: order.id,
        handler: async function (response) {
          const confirmRes = await fetch(`http://localhost:5000/api/payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ courseId: id, paymentDetails: response }),
          });
          const data = await confirmRes.json();
          if (confirmRes.ok) {
            alert("Payment successful! You are enrolled.");
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // ✅ Free course enrollment
  const handleFreeEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Enrolled successfully (free course).");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4">{course.description}</p>

      {/* ✅ Course video (from backend upload) */}
      {course.videoFile && (
        <video
          controls
          className="w-full max-w-lg mb-4"
          src={`http://localhost:5000/uploads/${course.videoFile}`}
        />
      )}

      {/* ✅ PDF material */}
      {course.pdfFile && (
        <a
          href={`http://localhost:5000/uploads/${course.pdfFile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-600 hover:underline mb-4"
        >
          View Course Material (PDF)
        </a>
      )}

      {/* ✅ Payment / Free Enroll */}
      {course.price > 0 ? (
        <button
          onClick={handlePayment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-6"
        >
          Pay & Enroll ₹{course.price}
        </button>
      ) : (
        <button
          onClick={handleFreeEnroll}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-6"
        >
          Enroll for Free
        </button>
      )}

      {/* ✅ Reviews */}
      {/* Reviews */}
<section>
  <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
  {reviews.map((rev) => (
    <div key={rev._id} className="bg-white p-2 mb-2 rounded shadow">
      <p>{rev.comment}</p>
      <p className="text-sm text-gray-500">by {rev.user.name}</p>
    </div>
  ))}
  <textarea
    className="w-full p-2 border rounded mb-2"
    placeholder="Add a review"
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />
  <button
    onClick={async () => {
      if (!comment) return;
      const res = await fetch(`http://localhost:5000/api/courses/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (res.ok) setReviews((prev) => [...prev, data]);
      setComment("");
    }}
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Submit Review
  </button>
</section>


      {/* ✅ Community */}
      {showCommunity && (
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Community</h2>
          <div className="max-h-64 overflow-y-auto border p-2 mb-2 bg-white rounded shadow">
            {communityMessages.map((msg) => (
              <div key={msg._id} className="mb-2">
                <p className="font-semibold">{msg.sender?.name || "User"}</p>
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
