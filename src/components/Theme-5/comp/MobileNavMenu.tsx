'use client'
import React, { useState } from 'react'
import Link from 'next/link'

interface MobileNavMenuProps {
  isOpen: boolean
  onClose: () => void
  categories?: any[]
  events?: any[]
  promotions?: any[]
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  onClose,
  categories = [],
  events = [],
  promotions = []
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const navSections = [
    {
      title: 'Main Menu',
      items: [
        { name: 'Home', href: '/' },
        { name: 'All Products', href: '/all-products' },
        { name: 'Events', href: '/events' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact', href: '/contact-us' }
      ]
    },
    {
      title: 'Categories',
      items: categories.slice(0, 8).map((cat, index) => ({
        name: cat.name || `Category ${index + 1}`,
        href: `/category/${cat.slug || 'category'}`
      }))
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {navSections.map((section) => (
              <div key={section.title} className="mb-6">
                <button
                  onClick={() => setExpandedSection(
                    expandedSection === section.title ? null : section.title
                  )}
                  className="flex items-center justify-between w-full text-left text-white font-medium mb-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {section.title}
                  {expandedSection === section.title ? (
                    <span>▼</span>
                  ) : (
                    <span>▶</span>
                  )}
                </button>

                {expandedSection === section.title && (
                  <div className="space-y-1 ml-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className="block text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="text-center text-gray-300 text-sm">
              © 2024 Your Company
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavMenu