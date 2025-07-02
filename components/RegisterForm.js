'use client';
import { useState } from "react";
import axios from "axios";

export default function RegisterForm({ role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear old message
    setMessageType("");

    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // prevent form submission
    }

    const endpoint = role === 'super-admin' ? '/api/auth/register' : '/api/auth/register';

    try {
      const res = await axios.post(endpoint, {
        email,
        password,
        role: role, // Set explicitly in backend too
      });
      setMessage(res.data.message);
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setMessageType("error");
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

  if (name === "email") setEmail(value);
  if (name === "password") setPassword(value);

  setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
        {role === 'super-admin' ? 'Super Admin' : 'User'} Registration
      </h2>
        <input
          className="w-full p-2 border rounded mb-4"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-600 text-sm mb-4">{errors.email}</p>}

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-600 text-sm mb-4">{errors.password}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        {message && <p className={`mt-3 text-sm text-center ${ messageType === "success" ? "text-green-600" : "text-red-600" }`}>{message}</p>}
      </form>
    </div>
  );
}
