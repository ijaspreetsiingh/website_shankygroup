'use client';

import React from 'react';
import Link from 'next/link';

const CompanyNav = () => {
  const companies = [
    { id: 'shanky-financial-services', name: 'Shanky Financial Services' },
    { id: 'shanky-financial-pvt-ltd', name: 'Shanky Financial Services Pvt Ltd' },
    { id: 'vms-hub', name: 'VMS Hub Pvt Ltd' },
    { id: 'shanky-smart-tech', name: 'Shanky Smart Tech Pvt Ltd' },
    { id: 'shanky-electronics-hub', name: 'Shanky Electronics Hub LLP' },
    { id: 'shanky-corporate-training', name: 'Shanky Corporate Training Pvt Ltd' },
  ];

  return (
    <div className="bg-[var(--card-bg)] border-b border-[var(--card-border)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-[var(--text-primary)] hover:text-[#e63a27] transition-colors duration-300 font-medium"
          >
            ← Back to Home
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {companies.map((company) => (
              <Link
                key={company.id}
                href={`/company/${company.id}`}
                className="text-[var(--text-secondary)] hover:text-[#e63a27] transition-colors duration-300 text-sm font-medium"
              >
                {company.name}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <select 
              className="bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--card-border)] rounded px-3 py-1 text-sm"
              onChange={(e) => {
                window.location.href = `/company/${e.target.value}`;
              }}
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyNav;
