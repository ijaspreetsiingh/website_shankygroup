'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Calendar, User, Clock, Eye, Share2, Heart, MessageCircle, 
  ArrowLeft, Tag, Facebook, Twitter, Linkedin, Link2, Bookmark,
  TrendingUp, ThumbsUp, Send
} from 'lucide-react'
import HeaderFour from '../../home/home4/HeaderFour'
import FooterFour from '../../home/home4/FooterFour'

interface Blog {
  id: number
  title: string
  content: string
  excerpt: string
  featured_image: string
  author_name: string
  author_email: string
  category: string
  tags: string
  status: string
  is_featured: boolean
  view_count: number
  reading_time: number
  published_at: string
  created_at: string
  updated_at: string
  meta_title: string
  meta_description: string
  slug: string
}

interface Comment {
  id: number
  name: string
  email: string
  content: string
  created_at: string
  replies?: Comment[]
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' })
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [commentFormOpen, setCommentFormOpen] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchBlog()
      fetchRelatedBlogs()
      fetchComments()
    }
  }, [params.slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'get_blog_by_slug',
          slug: params.slug 
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.blog) {
          setBlog(data.blog)
          incrementViewCount(data.blog.id)
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'get_related_blogs',
          slug: params.slug 
        })
      })

      if (response.ok) {
        const data = await response.json()
        setRelatedBlogs(data.blogs || [])
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'get_blog_comments',
          slug: params.slug 
        })
      })

      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const incrementViewCount = async (blogId: number) => {
    try {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'increment_view',
          blog_id: blogId 
        })
      })
    } catch (error) {
      console.error('Error incrementing view count:', error)
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blog?.title || ''
    
    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    
    setShareMenuOpen(false)
  }

  const handleLike = () => {
    setLiked(!liked)
    // TODO: Implement like functionality
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    // TODO: Implement bookmark functionality
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.name || !newComment.email || !newComment.content) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'add_comment',
          blog_id: blog?.id,
          ...newComment 
        })
      })

      if (response.ok) {
        setNewComment({ name: '', email: '', content: '' })
        setCommentFormOpen(false)
        fetchComments()
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'general': 'bg-gray-100 text-gray-800',
      'announcement': 'bg-green-100 text-green-800',
      'tutorial': 'bg-blue-100 text-blue-800',
      'news': 'bg-yellow-100 text-yellow-800',
      'product': 'bg-purple-100 text-purple-800',
      'service': 'bg-red-100 text-red-800',
      'case-study': 'bg-cyan-100 text-cyan-800',
      'industry-insights': 'bg-lime-100 text-lime-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="section-heading text-2xl font-bold text-[var(--text-primary)] mb-4">Blog Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-root min-h-screen bg-[var(--background)]">
      <HeaderFour isScrolled={false} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/blog')}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        {/* Blog Header */}
        <article className="bg-[var(--card-bg)] rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          {blog.featured_image && (
            <div className="relative h-64 sm:h-96 overflow-hidden">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              {blog.is_featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                {blog.category}
              </span>
              <div className="flex items-center text-[var(--text-secondary)] text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {blog.reading_time || 1} min read
              </div>
              <div className="flex items-center text-[var(--text-secondary)] text-sm">
                <Eye className="w-4 h-4 mr-1" />
                {blog.view_count || 0} views
              </div>
            </div>

            {/* Title */}
            <h1 className="section-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-[var(--text-primary)]">
                    {blog.author_name || 'Admin'}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {formatDate(blog.published_at || blog.created_at)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-lg transition-colors ${
                    liked ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' : 'bg-[var(--card-border)] text-[var(--text-secondary)] hover:opacity-80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarked ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-[var(--card-border)] text-[var(--text-secondary)] hover:opacity-80'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="p-2 rounded-lg bg-[var(--card-border)] text-[var(--text-secondary)] hover:opacity-80 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  {shareMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[var(--card-bg)] rounded-lg shadow-lg border border-[var(--card-border)] py-2 z-10">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-2 text-left hover:bg-[var(--card-border)] text-[var(--text-primary)] flex items-center gap-2"
                      >
                        <Facebook className="w-4 h-4 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-2 text-left hover:bg-[var(--card-border)] text-[var(--text-primary)] flex items-center gap-2"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full px-4 py-2 text-left hover:bg-[var(--card-border)] text-[var(--text-primary)] flex items-center gap-2"
                      >
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full px-4 py-2 text-left hover:bg-[var(--card-border)] text-[var(--text-primary)] flex items-center gap-2"
                      >
                        <Link2 className="w-4 h-4 text-gray-600" />
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none text-[var(--text-primary)] mb-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && (
              <div className="mb-8 pb-6 border-b border-[var(--card-border)]">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--card-border)] text-[var(--text-secondary)] rounded-full text-sm flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="bg-[var(--card-border)] rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100/90 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="section-heading font-semibold text-[var(--text-primary)] mb-1">
                    {blog.author_name || 'Admin'}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Professional writer and industry expert sharing insights on business, technology, and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12">
          <div className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading text-2xl font-bold text-[var(--text-primary)]">
                Comments ({comments.length})
              </h2>
              <button
                onClick={() => setCommentFormOpen(!commentFormOpen)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Add Comment
              </button>
            </div>

            {/* Comment Form */}
            {commentFormOpen && (
              <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-[var(--card-border)] rounded-lg border border-[var(--card-border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    className="px-4 py-2 border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                    className="px-4 py-2 border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  placeholder="Share your thoughts..."
                  value={newComment.content}
                  onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Post Comment
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentFormOpen(false)}
                    className="px-6 py-2 bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--card-border)] rounded-lg hover:opacity-80 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-[var(--text-secondary)]">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-[var(--card-border)] pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[var(--card-border)] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[var(--text-secondary)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="section-heading font-semibold text-[var(--text-primary)]">
                            {comment.name}
                          </h4>
                          <span className="text-sm text-[var(--text-secondary)]">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="mt-12">
            <h2 className="section-heading text-2xl font-bold text-[var(--text-primary)] mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  onClick={() => router.push(`/blog/${relatedBlog.slug}`)}
                  className="bg-[var(--card-bg)] rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                >
                  {relatedBlog.featured_image && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedBlog.featured_image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedBlog.category)}`}>
                      {relatedBlog.category}
                    </span>
                    <h3 className="section-heading font-semibold text-[var(--text-primary)] mt-2 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-[var(--text-secondary)]">
                      <Clock className="w-3 h-3 mr-1" />
                      {relatedBlog.reading_time || 1} min read
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterFour />
    </div>
  )
}

