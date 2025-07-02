'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Expire cookies by setting max-age to 0
    document.cookie = "token=; max-age=0; path=/";
    document.cookie = "useremail=; max-age=0; path=/";
    router.push('/login');
  };

  return (
    <>
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Admin Panel</div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-gray-700 focus:outline-none"
        >
          <FaUserCircle className="text-2xl" />
          <span className="ml-2">Admin</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
