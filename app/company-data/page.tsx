'use client';

import { TurnoverData } from '@/app/components/TurnoverData';
import { metadata } from './metadata';

const companyData = [
  {
    name: 'SHANKY METALS PRIVATE LIMITED',
    establishmentDate: '08/08/2011',
    turnover: '14 Cr',
    description: 'Metal procurement, Processing, Trading, Export operations',
    sector: 'Metals & Trading'
  },
  {
    name: 'SHANKY FINANCIAL SERVICES PRIVATE LIMITED',
    establishmentDate: '17/10/2018',
    turnover: '26.50 Cr',
    description: 'Financial intermediation, Investment in securities, Proprietary trading',
    sector: 'Financial Services'
  },
  {
    name: 'SHANKY CORPORATE TRAINING PRIVATE LIMITED',
    establishmentDate: '30/01/2019',
    turnover: '50 Lakh',
    description: 'Corporate & Educational training, Leadership development',
    sector: 'Education & Training'
  },
  {
    name: 'Shanky Buildtech',
    establishmentDate: '22/07/2014',
    turnover: '8 Cr',
    description: 'Infrastructure & Construction, Residential/Commercial/Industrial projects',
    sector: 'Construction'
  },
  {
    name: 'VMS HUB PRIVATE LIMITED',
    establishmentDate: '05/08/2025',
    turnover: '245 Cr',
    description: 'Food & Agriculture distribution, Supply chain management',
    sector: 'Food & Agriculture'
  },
  {
    name: 'SHANKY SMART TECH PRIVATE LIMITED',
    establishmentDate: '06/08/2025',
    turnover: '14 Cr',
    description: 'Solar EPC solutions, Smart electronics, IoT & AI integration',
    sector: 'Solar & Technology'
  }
];

export default function CompanyDataPage() {
  const totalTurnover = companyData.reduce((sum, company) => {
    const turnover = parseFloat(company.turnover.replace(/[^0-9.]/g, ''));
    const multiplier = company.turnover.includes('Lakh') ? 0.01 : 1;
    return sum + (turnover * multiplier);
  }, 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shanky Group",
    "url": "https://shankygroup.com",
    "logo": "https://shankygroup.com/logo.png",
    "description": "A premier Indian conglomerate with 6 companies across Finance, Food, Solar, Construction, Metals, and Education sectors",
    "foundingDate": "2011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "D Mall, NSP, Pitampura",
      "addressLocality": "Delhi",
      "postalCode": "110034",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+011-47586938",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/shanky-group",
      "https://www.facebook.com/ShankyGroup"
    ],
    "subOrganization": companyData.map(company => ({
      "@type": "Organization",
      "name": company.name,
      "foundingDate": company.establishmentDate,
      "description": company.description,
      "industry": company.sector
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shanky Group Company Data
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Official information about Shanky Group companies, turnover data for FY 2025-26, and establishment dates
            </p>
          </div>

          {/* Group Overview */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Group Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">₹{totalTurnover.toFixed(2)} Cr+</div>
                <div className="text-gray-600">Group Turnover (FY 2025-26)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">6</div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Employees</div>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Establishment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Turnover (FY 2025-26)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companyData.map((company, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{company.establishmentDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{company.turnover}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {company.sector}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is Shanky Group's total turnover?
                </h3>
                <p className="text-gray-600">
                  Shanky Group's total turnover for FY 2025-26 is ₹{totalTurnover.toFixed(2)} Cr+, with VMS Hub contributing the highest at ₹245 Cr.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  When was Shanky Metals Private Limited established?
                </h3>
                <p className="text-gray-600">
                  Shanky Metals Private Limited was established on 08/08/2011, making it the oldest company in the Shanky Group.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Which company has the highest turnover in FY 2025-26?
                </h3>
                <p className="text-gray-600">
                  VMS Hub Private Limited has the highest turnover at ₹245 Cr in FY 2025-26, followed by Shanky Financial Services at ₹26.50 Cr.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What sectors does Shanky Group operate in?
                </h3>
                <p className="text-gray-600">
                  Shanky Group operates in 6 major sectors: Financial Services, Food & Agriculture, Solar & Technology, Construction, Metals & Trading, and Education & Training.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  When were the latest companies established?
                </h3>
                <p className="text-gray-600">
                  VMS Hub Private Limited was established on 05/08/2025 and SHANKY SMART TECH PRIVATE LIMITED on 06/08/2025, making them the newest additions to the group.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
