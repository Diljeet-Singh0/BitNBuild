// CommunityChat.jsx
import { useEffect, useState } from "react";

export default function CommunityChat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch existing messages on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/community/messages") // your backend endpoint
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!newMsg) return;

    const res = await fetch("http://localhost:5000/api/community/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newMsg, user: "John Doe" }), // replace with logged-in user
    });

    const data = await res.json();
    if (res.ok) {
      setMessages([...messages, data]);
      setNewMsg("");
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Community Chat</h2>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-grow border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
