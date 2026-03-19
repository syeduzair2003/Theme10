'use client'
import React, { useState } from 'react'

interface SocialMediaShareProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out this amazing deal!',
  description = 'Save money with this exclusive offer',
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description)
  }

  const socialPlatforms = [
    {
        name: 'Facebook',
        icon: 'facebook.png',
        href: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    },
    {
        name: 'Twitter',
        icon: 'twitter.png',
        href: `https://x.com/intent/tweet?url=${shareData.url}&text=${shareData.title}`,
    },
    {
        name: 'WhatsApp',
        icon: 'whatsapp.png',
        href: `https://api.whatsapp.com/send?text=${shareData.title}%20${shareData.url}`,
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin.png',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    },
    {
        name: 'Telegram',
        icon: 'telegram.png',
        href: `https://t.me/share/url?url=${shareData.url}&text=${shareData.title}`,
    },
];
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Share Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        <span className="mr-2">🔗</span>
        <span>Share</span>
      </button> */}

      {/* Share Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-full mb-2 left-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this deal</h3>

            {/* Social Platforms */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => openShareWindow(platform.href)}
                  className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  title={`Share on ${platform.name}`}
                >
                  <span className="text-2xl mb-1">{platform.icon}</span>
                  <span className="text-xs font-medium">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                  title="Copy link"
                >
                  {copied ? (
                    <span>✓</span>
                  ) : (
                    <span>📋</span>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1">Link copied to clipboard!</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SocialMediaShare