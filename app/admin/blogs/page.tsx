'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, Search, Filter, 
  Calendar, User, Tag, TrendingUp, Clock, CheckCircle,
  AlertCircle, Archive, Star, MoreVertical, X, Save,
  Bold, Italic, Link, Image, AlignLeft, AlignCenter, AlignRight,
  Upload, Camera, Hash, Globe, BarChart3, Share2, Download,
  Copy, ExternalLink, Settings, RefreshCw, Zap, Award, MessageCircle
} from 'lucide-react';

// Simple Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder, onImageUpload }: any) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: any = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/50">
      {/* Toolbar */}
      <div className="bg-gray-900/50 border-b border-gray-700/50 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Underline"
        >
          <u className="w-4 h-4 font-bold">U</u>
        </button>
        <div className="w-px bg-gray-600/50" />
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <div className="w-px bg-gray-600/50" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Numbered List"
        >
          1.
        </button>
        <div className="w-px bg-gray-600/50" />
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) execCommand('createLink', url);
          }}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onImageUpload}
          className="p-2 hover:bg-gray-700/50 rounded border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
          title="Insert Image"
        >
          <Image className="w-4 h-4" />
        </button>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        className="min-h-[400px] p-4 focus:outline-none text-white"
        style={{ minHeight: '400px' }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentStats, setCommentStats] = useState({
    totalComments: 0,
    pendingComments: 0,
    approvedComments: 0,
    rejectedComments: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: 'general',
    tags: '',
    status: 'draft',
    is_featured: false,
    meta_title: '',
    meta_description: '',
    slug: '',
    published_at: null,
    reading_time: 0
  });

  const categories = [
    { value: 'general', label: 'General', color: '#6B7280' },
    { value: 'announcement', label: 'Announcement', color: '#10B981' },
    { value: 'tutorial', label: 'Tutorial', color: '#3B82F6' },
    { value: 'news', label: 'News', color: '#F59E0B' },
    { value: 'product', label: 'Product', color: '#8B5CF6' },
    { value: 'service', label: 'Service', color: '#EF4444' },
    { value: 'case-study', label: 'Case Study', color: '#06B6D4' },
    { value: 'industry-insights', label: 'Industry Insights', color: '#84CC16' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: '#6B7280', icon: Clock },
    { value: 'published', label: 'Published', color: '#10B981', icon: CheckCircle },
    { value: 'scheduled', label: 'Scheduled', color: '#3B82F6', icon: Calendar },
    { value: 'archived', label: 'Archived', color: '#EF4444', icon: Archive }
  ];

  const popularTags = [
    'Technology', 'Business', 'Innovation', 'Digital', 'Strategy', 
    'Marketing', 'Leadership', 'Growth', 'Analytics', 'AI',
    'Cloud', 'Security', 'Mobile', 'Web', 'Design'
  ];

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        setUploadingImage(true);
        try {
          // For now, just create a placeholder URL
          // In a real implementation, you'd upload to your server
          const imageUrl = URL.createObjectURL(file);
          const newContent = formData.content + `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`;
          setFormData(prev => ({ ...prev, content: newContent }));
        } catch (error) {
          console.error('Error uploading image:', error);
        } finally {
          setUploadingImage(false);
        }
      }
    };
  };

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, [filterStatus, filterCategory, searchTerm]);

  // Fetch comments when comments panel is opened
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filterStatus !== 'all') queryParams.append('status', filterStatus);
      if (filterCategory !== 'all') queryParams.append('category', filterCategory);
      if (searchTerm) queryParams.append('search', searchTerm);

      const url = `/admin/api/blogs${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('Fetching blogs from:', url);

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log('Blogs fetched successfully:', data);
        setBlogs(data.blogs || []);
      } else {
        const errorData = await response.json();
        console.error('Error fetching blogs:', errorData);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    setSaving(true);
    try {
      const blogData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        reading_time: calculateReadingTime(formData.content)
      };

      console.log('Creating blog with data:', blogData);

      const response = await fetch('/admin/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Blog created successfully:', result);
        setShowCreateModal(false);
        resetForm();
        fetchBlogs();
      } else {
        const errorData = await response.json();
        console.error('Error creating blog:', errorData);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBlog = async () => {
    setSaving(true);
    try {
      const blogData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        reading_time: calculateReadingTime(formData.content)
      };

      console.log('Updating blog with data:', blogData);

      const response = await fetch('/admin/api/blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Blog updated successfully:', result);
        setShowEditModal(false);
        setSelectedBlog(null);
        resetForm();
        fetchBlogs();
      } else {
        const errorData = await response.json();
        console.error('Error updating blog:', errorData);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;

    try {
      const response = await fetch('/admin/api/blogs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: blogId })
      });

      if (response.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Comment management functions
  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await fetch('/admin/api/blog-comments');

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
        setCommentStats(data.stats || commentStats);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const updateCommentStatus = async (commentId: number, status: string) => {
    try {
      const response = await fetch('/admin/api/blog-comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: commentId, status })
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error updating comment status:', error);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) return;

    try {
      const response = await fetch('/admin/api/blog-comments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: commentId })
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const duplicateBlog = (blog: any) => {
    setFormData({
      ...blog,
      title: `${blog.title} (Copy)`,
      slug: '',
      status: 'draft',
      id: undefined
    });
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featured_image: '',
      category: 'general',
      tags: '',
      status: 'draft',
      is_featured: false,
      meta_title: '',
      meta_description: '',
      slug: '',
      published_at: null,
      reading_time: 0
    });
  };

  const openEditModal = (blog: any) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      featured_image: blog.featured_image || '',
      category: blog.category || 'general',
      tags: blog.tags || '',
      status: blog.status || 'draft',
      is_featured: blog.is_featured || false,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      slug: blog.slug || '',
      published_at: blog.published_at || null,
      reading_time: blog.reading_time || 0
    });
    setShowEditModal(true);
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : '#6B7280';
  };

  const getStatusIcon = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.icon : Clock;
  };

  const getCategoryColor = (category: string) => {
    const categoryOption = categories.find(opt => opt.value === category);
    return categoryOption ? categoryOption.color : '#6B7280';
  };

  const getBlogStats = () => {
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.view_count || 0), 0);
    const publishedCount = blogs.filter(blog => blog.status === 'published').length;
    const draftCount = blogs.filter(blog => blog.status === 'draft').length;
    const featuredCount = blogs.filter(blog => blog.is_featured).length;

    return {
      total: blogs.length,
      published: publishedCount,
      drafts: draftCount,
      featured: featuredCount,
      totalViews
    };
  };

  const stats = getBlogStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6 max-w-7xl mx-auto">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Professional Blog Manager</h1>
          <p className="text-gray-400">Create, manage, and optimize your blog content with advanced tools</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-500/25 ring-1 ring-purple-500/20"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg shadow-orange-500/25 ring-1 ring-orange-500/20 relative"
          >
            <MessageCircle className="w-4 h-4" />
            Comments
            {commentStats.pendingComments > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-red-500/50">
                {commentStats.pendingComments}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Blogs</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Published</p>
                <p className="text-2xl font-bold text-green-400">{stats.published}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.drafts}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Featured</p>
                <p className="text-2xl font-bold text-purple-400">{stats.featured}</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
        </div>
      )}

      {/* Comments Management Section */}
      {showComments && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 mb-6 ring-1 ring-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Comments Management</h2>
            <button
              onClick={fetchComments}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/20"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Comment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Comments</p>
                  <p className="text-2xl font-bold text-white">{commentStats.totalComments}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{commentStats.pendingComments}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400">Approved</p>
                  <p className="text-2xl font-bold text-green-400">{commentStats.approvedComments}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-red-900/20 rounded-lg p-4 border border-red-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-400">{commentStats.rejectedComments}</p>
                </div>
                <X className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No comments found</h3>
              <p className="text-gray-400">No comments have been posted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-900/50 rounded-full flex items-center justify-center ring-1 ring-blue-700/50">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{comment.name}</h4>
                          <p className="text-sm text-gray-400">{comment.email}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          comment.status === 'approved' ? 'bg-green-900/30 text-green-400 border border-green-700/30' :
                          comment.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30' :
                          'bg-red-900/30 text-red-400 border border-red-700/30'
                        }`}>
                          {comment.status}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{comment.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>On: <a href={`/blog/${comment.blog_slug}`} className="text-blue-400 hover:text-blue-300">{comment.blog_title}</a></span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {comment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateCommentStatus(comment.id, 'approved')}
                            className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors border border-green-700/30"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateCommentStatus(comment.id, 'rejected')}
                            className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors border border-red-700/30"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Advanced Filters */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 p-6 mb-6 ring-1 ring-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-800/50 overflow-hidden ring-1 ring-gray-700/50">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700/50">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Blog Post
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900/30 divide-y divide-gray-700/50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {blog.featured_image && (
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3 ring-1 ring-gray-700/50"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-white truncate max-w-xs">
                          {blog.title}
                          {blog.is_featured && (
                            <Star className="inline w-3 h-3 text-yellow-400 ml-1" fill="currentColor" />
                          )}
                        </div>
                        {blog.excerpt && (
                          <div className="text-xs text-gray-400 truncate max-w-xs">
                            {blog.excerpt}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-300">
                      <User className="w-4 h-4 mr-1 text-gray-500" />
                      {blog.author_name || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: getCategoryColor(blog.category) + '20',
                        color: getCategoryColor(blog.category)
                      }}
                    >
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const IconComponent = getStatusIcon(blog.status);
                        return <IconComponent className="w-4 h-4" style={{ color: getStatusColor(blog.status) }} />;
                      })()}
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{ 
                          backgroundColor: getStatusColor(blog.status) + '20',
                          color: getStatusColor(blog.status)
                        }}
                      >
                        {blog.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-500" />
                        {blog.view_count || 0}
                      </div>
                      <div className="text-xs text-gray-500">
                        {blog.reading_time || 0} min read
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateBlog(blog)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No blogs found</h3>
            <p className="text-gray-400 mb-4">Get started by creating your first blog post</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/20"
            >
              Create Blog
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl ring-1 ring-gray-700/50">
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {showCreateModal ? 'Create Blog' : 'Edit Blog'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                    setSelectedBlog(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Content *
                    </label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value: string) => setFormData({...formData, content: value})}
                      placeholder="Write your blog content here..."
                      onImageUpload={handleImageUpload}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="Brief description of your blog"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="tag1, tag2, tag3"
                    />
                    <div className="mt-2 flex flex-wrap gap-1">
                      {popularTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            const currentTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
                            if (!currentTags.includes(tag)) {
                              setFormData({...formData, tags: [...currentTags, tag].join(', ')});
                            }
                          }}
                          className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded hover:bg-gray-700/50 border border-gray-600/50"
                        >
                          +{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.featured_image}
                      onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                      className="w-4 h-4 text-blue-600 bg-gray-800/50 border-gray-600/50 rounded focus:ring-2 focus:ring-blue-500/50"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                      Featured Blog
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="SEO title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="SEO description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                      placeholder="url-friendly-slug"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-800/50">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                    setSelectedBlog(null);
                  }}
                  className="px-4 py-2 text-gray-300 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-600/50"
                >
                  Cancel
                </button>
                <button
                  onClick={showCreateModal ? handleCreateBlog : handleUpdateBlog}
                  disabled={saving}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 ring-1 ring-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : (showCreateModal ? 'Create Blog' : 'Update Blog')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}