'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search, Eye, Star, FileText, X, Rss } from 'lucide-react';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';

// Blog type interface
interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  category: string;
  tags: string;
  status: string;
  is_featured: boolean;
  view_count: number;
  published_at: string;
  created_at: string;
  slug?: string;
}

// Resolve blog image URL: backend uploads are at BACKEND_URL/uploads/... (set NEXT_PUBLIC_BACKEND_URL in .env)
function getBlogImageUrl(featuredImage: string | null | undefined): string {
  if (!featuredImage || typeof featuredImage !== 'string') return '';
  const trimmed = featuredImage.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const base = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, '')
    : '';
  return base ? `${base}${trimmed.startsWith('/') ? '' : '/'}${trimmed}` : trimmed;
}

export default function BlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('published_at');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [failedImageIds, setFailedImageIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchBlogs();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs || []);
        
        // Extract unique categories
        const uniqueCategories = [...new Set((data.blogs as Blog[] || []).map((blog: Blog) => blog.category).filter((cat: string) => Boolean(cat)))];
        setCategories(uniqueCategories);
        
        // Extract all unique tags
        const allBlogTags = (data.blogs as Blog[] || []).flatMap((blog: Blog) => 
          blog.tags ? blog.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => Boolean(tag)) : []
        );
        const uniqueTags = [...new Set(allBlogTags)];
        setAllTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs
    .filter((blog: Blog) => {
      const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || (blog.tags && blog.tags.split(',').map(tag => tag.trim()).includes(selectedTag));
      return matchesSearch && matchesCategory && matchesTag;
    })
    .sort((a: Blog, b: Blog) => {
      switch (sortBy) {
        case 'published_at':
          return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
        case 'view_count':
          return (b.view_count || 0) - (a.view_count || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBlogClick = (blog: Blog) => {
    if (blog.slug) {
      router.push(`/blog/${blog.slug}`)
    } else {
      // Fallback for blogs without slug
      setSelectedBlog(blog)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--card-border)] border-t-[#e63a27]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]" style={{ ['--accent' as string]: '#e63a27', ['--accent-hover' as string]: '#c93222' }}>
      <HeaderFour isScrolled={isScrolled} />

      {/* Hero Section – reference: leadership + compliance style */}
      <section className="relative w-full pt-4 md:pt-6 lg:pt-8 px-4 md:px-8 lg:px-12 pb-0 bg-[var(--background)]">
        <div className="relative h-[58vh] min-h-[320px] md:h-[62vh] lg:h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
            alt="Blog insights and stories"
            fill
            className="object-cover brightness-[0.72]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col z-30">
            <div className="flex-1 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-10 lg:py-14">
              <div className="w-full max-w-2xl lg:max-w-3xl text-left">
                <nav className="flex items-center text-xs sm:text-sm text-white/90 mb-5 lg:mb-6 flex-wrap gap-x-2 gap-y-1">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="opacity-70">/</span>
                  <span className="text-white font-medium">Blog</span>
                </nav>
                <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 bg-[#e63a27] text-white text-xs lg:text-sm font-semibold tracking-widest rounded-full uppercase mb-4 lg:mb-5">
                  Insights & Updates
                </span>
                <h1 className="section-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-4 lg:mb-5">
                  Our <span className="text-[#e63a27]">Blog</span>
                  <br />
                  <span className="text-white/95">Ideas That Matter</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl max-w-xl text-white/90 leading-relaxed mb-6 lg:mb-8">
                  Discover insights, industry trends, and stories from our team. Stay updated with thought leadership and innovations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/api/rss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-all text-sm lg:text-base shadow-lg hover:shadow-xl"
                  >
                    <Rss className="w-5 h-5" />
                    Subscribe to RSS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar – search + Filter: All Categories, All Tags, Latest First, Clear */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-[var(--card-border)] bg-[var(--card-bg)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center">
            <label htmlFor="blog-search" className="sr-only">Search blog posts</label>
            <div className="relative flex-1 min-w-[180px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#e63a27] focus:border-[#e63a27]"
              />
            </div>
            <span className="text-[var(--text-secondary)] font-medium text-sm hidden sm:inline">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#e63a27] focus:border-[#e63a27]"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#e63a27] focus:border-[#e63a27]"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#e63a27] focus:border-[#e63a27]"
            >
              <option value="published_at">Latest First</option>
              <option value="view_count">Most Popular</option>
              <option value="title">Title A–Z</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTag('all');
                setSortBy('published_at');
              }}
              className="px-4 py-2.5 bg-[var(--text-primary)] text-[var(--background)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
          {(searchTerm || selectedCategory !== 'all' || selectedTag !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
              <span className="text-[var(--text-secondary)] text-xs sm:text-sm">Active:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-[#e63a27]/15 text-[#e63a27] rounded-full text-xs font-medium">
                  Search: &quot;{searchTerm}&quot;
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-3 py-1 bg-[#e63a27]/15 text-[#e63a27] rounded-full text-xs font-medium">
                  {selectedCategory}
                </span>
              )}
              {selectedTag !== 'all' && (
                <span className="px-3 py-1 bg-[#e63a27]/15 text-[#e63a27] rounded-full text-xs font-medium">
                  #{selectedTag}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid – professional cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-2xl border-2 border-dashed border-[var(--card-border)] bg-[var(--card-bg)]/50">
              <FileText className="w-16 h-16 mx-auto text-[var(--text-secondary)]/50 mb-4" />
              <h3 className="section-heading text-xl font-semibold text-[var(--text-primary)] mb-2">No posts found</h3>
              <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
                No blog posts match your filters. Try clearing filters or a different search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                  setSortBy('published_at');
                }}
                className="px-6 py-3 bg-[#e63a27] hover:bg-[#c93222] text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--card-border)] hover:border-[#e63a27]/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleBlogClick(blog)}
                >
                  {/* Featured Image – resolved URL so backend uploads load */}
                  {blog.featured_image && !failedImageIds.has(blog.id) ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={getBlogImageUrl(blog.featured_image)}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setFailedImageIds((prev) => new Set(prev).add(blog.id))}
                      />
                      {blog.is_featured && (
                        <div className="absolute top-3 right-3 bg-[#e63a27] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#e63a27]/20 to-[#e63a27]/5 flex items-center justify-center border-b border-[var(--card-border)]">
                      <div className="text-center p-4">
                        <FileText className="w-14 h-14 mx-auto text-[#e63a27]/60 mb-2" />
                        <p className="text-sm font-medium text-[var(--text-secondary)]">Blog Post</p>
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#e63a27]/15 text-[#e63a27] rounded-lg text-xs font-semibold capitalize">
                        {blog.category || 'Uncategorized'}
                      </span>
                      <div className="flex items-center text-[var(--text-secondary)] text-xs">
                        <Eye className="w-4 h-4 mr-1 flex-shrink-0" />
                        {blog.view_count || 0}
                      </div>
                    </div>

                    <h3 className="section-heading text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[#e63a27] transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt || truncateText(blog.content?.replace(/<[^>]*>/g, ''), 150)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-4">
                      <div className="flex items-center min-w-0">
                        <User className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{blog.author_name || 'Admin'}</span>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.published_at || blog.created_at)}
                      </div>
                    </div>

                    {blog.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {blog.tags.split(',').slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-[var(--background)] text-[var(--text-secondary)] rounded-md text-xs border border-[var(--card-border)]"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="inline-flex items-center text-[#e63a27] font-semibold text-sm group-hover:gap-2 transition-all gap-1">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <div 
            className="bg-[var(--card-bg)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[var(--card-border)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[var(--card-bg)] border-b border-[var(--card-border)] p-6 z-10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="section-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)] pr-8">
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-6 right-6 p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedBlog.featured_image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-[var(--card-border)]">
                  <img
                    src={getBlogImageUrl(selectedBlog.featured_image)}
                    alt={selectedBlog.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      const wrap = el.closest('div');
                      if (wrap) {
                        const place = document.createElement('div');
                        place.className = 'w-full h-64 bg-[var(--card-bg)] flex items-center justify-center';
                        place.innerHTML = '<span class="text-[var(--text-secondary)]">Image unavailable</span>';
                        wrap.appendChild(place);
                      }
                    }}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--card-border)]">
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1.5" />
                    {selectedBlog.author_name || 'Admin'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {formatDate(selectedBlog.published_at || selectedBlog.created_at)}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1.5" />
                    {selectedBlog.view_count || 0} views
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.is_featured && (
                    <span className="px-3 py-1 bg-[#e63a27] text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                  <span className="px-3 py-1 bg-[#e63a27]/15 text-[#e63a27] rounded-lg text-xs font-medium capitalize">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none text-[var(--text-primary)] prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-a:text-[#e63a27]"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />

              {selectedBlog.tags && (
                <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--background)] text-[var(--text-secondary)] rounded-lg text-sm border border-[var(--card-border)]"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <FooterFour />
    </div>
  );
}
