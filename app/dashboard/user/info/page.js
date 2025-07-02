'use client';
import { useEffect, useState } from 'react';
import { getCookie } from "@/utils/getCookie";
import axios from "axios";

export default function UserDetailsForm() {

  const [email, setEmail] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'
  
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', dob: '', gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Clear old message
    setStatusType("");

    try {
      const respost = await axios.post("/api/auth/userinfo", 
        { ...formData, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Axios auto-parses JSON
      const data = respost.data;
      setUserInfos([data.userInfo || data.updatedUserInfo]);
      setStatusMessage(data.message || "User info saved successfully");
      setStatusType("success");

    } catch (err) {
      // Show backend error message if available
      //alert(err.response?.data?.message || "Something went wrong");
      setStatusMessage(err.response?.data?.message || "Something went wrong");
      setStatusType("error");
    }

  };

  useEffect(() => {
    const userEmail = getCookie("useremail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  // Fetch user info on page load
  useEffect(() => {
  if (email) {
    fetch(`/api/auth/userinfo?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userInfo) {
          const info = data.userInfo;
          setUserInfos([info]);
          setFormData({
            name: info.name,
            address: info.address,
            phone: info.phone,
            gender: info.gender,
            dob: new Date(info.dob).toISOString().split("T")[0],
          });
        }
      });
  }
}, [email]);

let getAddr;

  return (
    <>
    <h1 className="text-2xl font-bold">Personal Details</h1>
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          </tr>
          </thead>
        <tbody>

          {userInfos.map((info, i) => {
             getAddr = info.address; 
             return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{info.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{info.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{info.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{new Date(info.dob).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{info.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{info.role}</td>
              </tr>
             );
            }
          )}
          
        </tbody>
      </table>

      <table className="min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg mt-8">
        <thead className="bg-gray-100">
          <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th></tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{getAddr}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-4 mt-[30px]">
      
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={email}
        required
        className="w-full border p-2 rounded"
        readOnly
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
        Submit
      </button>

      {statusMessage && (
        <div
          className={`p-3 mb-4 rounded text-center ${
            statusType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {statusMessage}
        </div>
      )}

    </form>
    </>
  );
}
