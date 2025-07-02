import React from 'react'

//export const Leftnav = () => {
export default function Leftnav() {
  return (
    <>
        <aside className="w-[20%] bg-gray-800 text-white p-6">
            <ul className="space-y-4">
                <li className="hover:text-blue-400 cursor-pointer"><a href="/dashboard">Dashboard</a></li>
                <li className="hover:text-blue-400 cursor-pointer"><a href="/dashboard/user/management">All User List</a></li>
                <li className="hover:text-blue-400 cursor-pointer"><a href="/dashboard/user/info">Profile</a></li>
                <li className="hover:text-blue-400 cursor-pointer">Settings</li>
            </ul>
        </aside>
    </>
  )
}
