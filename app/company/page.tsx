'use client';

import React from 'react';
import Link from 'next/link';

const CompanyPage = () => {
  const companies = [
    {
      id: 1,
      name: "SHANKY FINANCIAL SERVICES PVT LTD",
      shortName: "SHANKY FINANCIAL SERVICES PVT LTD",
      category: "Financial Services",
      categoryColor: "#6B9F3E",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Operating alongside its namesake, Shanky Financial Services Pvt Ltd focuses on specialized financial intermediation activities, including investment in securities and proprietary trading. The company's operations are aligned with the Group's broader financial services strategy, enabling cross-selling opportunities and operational efficiencies.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop&q=80",
      link: "/company/shanky-financial-pvt-ltd"
    },
    {
      id: 2,
      name: "VMS HUB PVT LTD",
      shortName: "VMS HUB PVT LTD",
      category: "Agro Products",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "VMS Hub Pvt Ltd is the Group's newest venture focused on food and agricultural products distribution with strong supply chain and quality assurance systems.",
      image: "/images/agro.webp",
      link: "/company/vms-hub"
    },
    {
      id: 3,
      name: "SHANKY SMART TECH PVT LTD",
      shortName: "SHANKY SMART TECH PVT LTD",
      category: "Solar EPC and Electronics",
      categoryColor: "#9B59B6",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Shanky Smart Tech Pvt Ltd delivers solar EPC solutions and smart electronics integration using IoT and AI technologies.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop&q=80",
      link: "/company/shanky-smart-tech"
    },
    {
      id: 4,
      name: "SHANKY CORPORATE TRAINING PVT LTD",
      shortName: "SHANKY CORPORATE TRAINING PVT LTD",
      category: "Corporate Trainings",
      categoryColor: "#E67E22",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Provides corporate and educational training programs including leadership, soft skills, and technical development.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=80",
      link: "/company/shanky-corporate-training"
    },
    {
      id: 5,
      name: "SHANKY BUILDTECH PVT LTD",
      shortName: "SHANKY BUILDTECH PVT LTD",
      category: "Infrastructure and Construction",
      categoryColor: "#3498DB",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Focused on residential, commercial, and industrial construction with smart and sustainable building practices.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&q=80",
      link: "/company/shanky-buildtech-pvt-ltd"
    },
    {
      id: 6,
      name: "SHANKY METALS PVT LTD",
      shortName: "SHANKY METALS PVT LTD",
      category: "Metal Trade Services",
      categoryColor: "#7F8C8D",
      legalStructure: "Private Limited Company",
      keyPeople: "Directors: Vipin Kumar, Manoj Kumar Mishra",
      description: "Deals in procurement, processing, and trading of metals like aluminium, copper, steel with strong export operations.",
      image: "/images/metal.webp",
      link: "/company/shanky-metals-pvt-ltd"
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
            href={company.link}
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

              <p className="text-xs text-gray-500 mb-2">
                {company.legalStructure}
              </p>

              <p className="text-xs text-gray-400 mb-3">
                {company.keyPeople}
              </p>

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