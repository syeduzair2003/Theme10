import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  author: string
}

interface Props {
  post?: BlogPost
}

const BlogShow: React.FC<Props> = ({
  post = {
    id: '1',
    title: 'How to Save Money Online',
    slug: 'save-money-online',
    excerpt: 'Learn the best strategies to save money while shopping online.',
    image: '/blog/post1.jpg',
    date: '2024-01-15',
    author: 'Admin'
  }
}) => {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Blog`
          }}
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  )
}

export default BlogShow