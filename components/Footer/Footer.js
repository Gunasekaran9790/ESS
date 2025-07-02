'use client';
import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="w-full bg-gray-300 text-center py-4 bg-gray-100 text-gray-600 text-sm">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
        </footer>
    </>
  )
}

export default Footer;