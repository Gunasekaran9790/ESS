'use client';
import { useState, useEffect } from 'react';
import { getCookie } from "@/utils/getCookie";
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /* Pagination Start */
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* Pagination End */

  const fetchUsers = async () => {
    const userEmail = getCookie("useremail");
      if (userEmail) {
        const res = await axios.get(`/api/auth/userinfo?allemail=${userEmail}`);
        const data = res.data;
        if (data.allUsers) {
          setUsers(data.allUsers);
        }
      }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setForm({ email: user.email, password: '', role: user.role });
    setEditingUserId(user._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await axios.delete('/api/auth/userinfo', { data: { id } });
      fetchUsers();
    }
  };


const handleBlockToggle = async (user) => {

  const res = await fetch('/api/auth/userupdate', {
    method: 'POST',
  });
  const data = await res.json();
  console.log(data);

  
  const action = user.isBlocked ? 'unblock' : 'block';
  const confirmAction = confirm(`Are you sure you want to ${action} this user?`);

  if (confirmAction) {
    await axios.patch('/api/auth/userinfo', { id: user._id, isBlocked: !user.isBlocked });
      fetchUsers();
  }
};

const updateUsers = async () => {
  
};




  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.isBlocked ? (
                    <span className="text-red-500">Blocked</span>
                    ):(
                    <span className="text-green-600">Active</span>
                  )}  
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleBlockToggle(user)}
                    className="text-yellow-600 hover:underline"
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}

          </tbody>
        </table>

        <div className="flex justify-center mt-4 mb-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
