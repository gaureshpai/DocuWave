"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gradient-to-r from-primary-color to-secondary-color shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              <Image src="/pdf-reader.png" alt="DocuWave Logo" width={32} height={32} />
              <span>DocuWave</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              href="https://gauresh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors font-medium"
            >
              Website
            </Link>
            <Link
              href="https://twitter.com/hseruag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors font-medium"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/gaureshpai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors font-medium"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/gaureshpai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors font-medium"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="https://gauresh.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-3 rounded-md hover:bg-white/20 transition-colors font-medium text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Website
              </Link>
              <Link
                href="https://twitter.com/hseruag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-3 rounded-md hover:bg-white/20 transition-colors font-medium text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/gaureshpai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-3 rounded-md hover:bg-white/20 transition-colors font-medium text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/gaureshpai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white px-4 py-3 rounded-md hover:bg-white/20 transition-colors font-medium text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                LinkedIn
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}