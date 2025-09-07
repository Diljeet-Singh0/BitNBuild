    import { useNavigate } from "react-router-dom";
    import React, { useState } from "react";

    export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // <- add this

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.token) {
  localStorage.setItem("token", data.token);
  const payload = JSON.parse(atob(data.token.split(".")[1]));
  if (payload.role === "student") navigate("/student");
  else if (payload.role === "tutor") navigate("/teacher");
}
 else {
            alert(JSON.stringify(data));
        }
        } catch (err) {
        console.error(err);
        alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-80"
        >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
            required
            />
            <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
            Login
            </button>
        </form>
        </div>
    );
    }
