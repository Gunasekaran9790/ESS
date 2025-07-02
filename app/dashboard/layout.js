'use client';
//import React from 'react'
import Footer from "@/components/Footer/Footer";
import NavBar from '@/components/Header/NavBar';
import Leftnav from "@/components/Leftnav/Leftnav";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <>
        <main>
          <NavBar />
          
          <div className="min-h-screen flex">
              {/* Sidebar */}
              <Leftnav/>
              {/* Main content */}
              <main className="w-[80%] bg-gray-100 p-8">
               { children }
              </main>
          </div>

          <Footer />
          </main>
    </>
  )
}
