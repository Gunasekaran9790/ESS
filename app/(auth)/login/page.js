'use client';
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear old message
    setMessageType("");

    // Validate fields
    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    //setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setToken(res.data.token);
      //setMessage("Login successful!");
      if(res.status === 200){
        //localStorage.setItem('token', res.data.token);
        const token = res.data.token;
        /*const expiryTime = Date.now() + 60 * 1000; //Date.now() + 60 * 60 * 1000; // 1 hour from now
        const tokenData = {
          value: token,
          expiry: expiryTime,
        };
        
        localStorage.setItem('token', JSON.stringify(tokenData));*/

        document.cookie = `token=${token}; max-age=60 path=/`;
        document.cookie = `useremail=${res.data.email}; max-age=60 path=/;`;

        router.push('/dashboard'); // replace with your path
      }
      setMessageType("success");
    } catch (err) {
      // Handle 401 or 500 errors
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");
    }   

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          className="w-full p-2 border rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          
        />
        {errors.email && <p className="mb-4 text-red-500">{errors.email}</p>}

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          
        />
        {errors.password && <p className="mb-4 text-red-500">{errors.password}</p>}

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
        {/*token && <p className="text-sm text-green-500 mt-3">Token: {token.substring(0, 25)}...</p> */}
        {message && (
          <p className={`mt-3 text-sm text-center ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        </form>
    </div>
  );
}
