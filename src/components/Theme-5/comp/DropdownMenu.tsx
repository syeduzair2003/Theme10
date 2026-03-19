'use client'
import React, { useState, useRef, useEffect } from 'react'

interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  position?: 'left' | 'right' | 'center'
  className?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  position = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick()
    }
    setIsOpen(false)
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'right':
        return 'right-0'
      case 'center':
        return 'left-1/2 transform -translate-x-1/2'
      default:
        return 'left-0'
    }
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        {trigger}
        <span
          className={`text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute z-50 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 ${getPositionClasses()}`}>
          {items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all duration-200 text-left"
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu