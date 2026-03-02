'use client';

import React from 'react';
import Link from 'next/link';

const CompanyPage = () => {
  const companies = [
    {
      id: 'shanky-financial-services',
      name: 'Shanky Financial Services',
      shortName: 'Financial Services through B2B',
      category: 'Financial Services',
      categoryColor: '#6B9F3E',
      description: 'The Group\'s flagship entity in the financial services sector offering comprehensive financial intermediation services.',
      image: 'https://happay.com/blog/wp-content/uploads/sites/12/2023/07/financial-assets-scaled.webp'
    },
    {
      id: 'shanky-financial-pvt-ltd',
      name: 'Shanky Financial Services Pvt Ltd',
      shortName: 'Financial Advisory',
      category: 'Financial Services',
      categoryColor: '#6B9F3E',
      description: 'Specialized financial intermediation activities including investment in securities and proprietary trading.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop'
    },
    {
      id: 'vms-hub',
      name: 'VMS Hub Pvt Ltd',
      shortName: 'Food Distribution',
      category: 'Food & Agribusiness',
      categoryColor: '#9B59B6',
      description: 'The Group\'s newest venture established to capitalize on the growing demand for food and agricultural products.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop'
    },
    {
      id: 'shanky-smart-tech',
      name: 'Shanky Smart Tech Pvt Ltd',
      shortName: 'Solar & Electronics',
      category: 'Solar & Electronics',
      categoryColor: '#9B59B6',
      description: 'Operating at the intersection of renewable energy and electronics.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop'
    },
    {
      id: 'shanky-electronics-hub',
      name: 'Shanky Electronics Hub LLP',
      shortName: 'Electronics Trading',
      category: 'Electronics Trading',
      categoryColor: '#E67E22',
      description: 'Specializes in the trading and distribution of electronic products.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop'
    },
    {
      id: 'shanky-corporate-training',
      name: 'Shanky Corporate Training Pvt Ltd',
      shortName: 'Corporate Training',
      category: 'Education & Training',
      categoryColor: '#E67E22',
      description: 'The Group\'s dedicated arm for educational services.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
          Our Companies
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Explore our diverse portfolio of companies spanning multiple industries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/company/${company.id}`}
            className="group block bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--card-border)] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={company.image}
                alt={company.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold"
                style={{ backgroundColor: company.categoryColor }}
              >
                {company.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#e63a27] transition-colors">
                {company.shortName}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
                {company.description}
              </p>
              <div className="flex items-center text-[#e63a27] font-medium text-sm group-hover:translate-x-2 transition-transform">
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;
