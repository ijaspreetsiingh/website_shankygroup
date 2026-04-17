import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const teamData = {
      organization: {
        name: "Shanky Group",
        description: "Shanky Group is a diversified business conglomerate with interests in metals, buildtech, financial services, and corporate training.",
        website: "https://shankygroup.com",
        owner: {
          name: "Vipin Kumar",
          position: "Managing Director/Chairmen",
          role: "Owner and Founder"
        }
      },
      leadership_team: [
        {
          id: 1,
          name: "Vipin Kumar",
          position: "Managing Director/Chairmen",
          department: "Leadership",
          category: "board",
          education: "Master's Degree in Business Administrator",
          tenure: "From 2014-Present",
          is_owner: true,
          description: "Mr. Vipin Kumar has been at helm of Shanky Group since its inception. A Chartered Accountant and MBA (Finance) with over a decade of experience in diversified businesses, he has been instrumental in Group's expansion and diversification."
        },
        {
          id: 2,
          name: "Manoj Kumar Mishra",
          position: "Executive Director",
          department: "Finance",
          category: "board",
          education: "Chartered Accountant / CPA / MBA",
          tenure: "From 2019-Present",
          description: "Mr. Mishra brings over 22 years of experience in finance, accounts, and commercial operations across manufacturing and retail sectors."
        },
        {
          id: 3,
          name: "Poonam Shah",
          position: "Vice President, Operations",
          department: "Operations",
          category: "senior",
          education: "Master's Degree in Finance",
          tenure: "From 2015-Present",
          description: "Ms. Shah oversees operational excellence and process optimization across Group's diverse businesses."
        },
        {
          id: 4,
          name: "Priyanka Girdhar",
          position: "Vice President, Admin",
          department: "Administration",
          category: "senior",
          education: "Master's Degree in Finance",
          tenure: "From 2015-Present",
          description: "Ms. Girdhar is an accomplished administrative leader with a strong track record of designs, directs, and optimizes an organisation's administrative backbone."
        },
        {
          id: 5,
          name: "Rajeev Ranjan Jha",
          position: "Finance Head",
          department: "Finance",
          category: "senior",
          education: "Master's Degree in Finance and Chartered Accountant (Intermediate)",
          tenure: "From 2020-Present",
          description: "Financial operations leader responsible for accounting, financial reporting, and compliance functions."
        },
        {
          id: 6,
          name: "Shivani Bansal",
          position: "Legal Advisor",
          department: "Legal",
          category: "senior",
          education: "B.A.LL.B",
          tenure: "From 2022-Present",
          description: "I am a legal advisor with experience in contract review, legal documentation, and dispute resolution."
        },
        {
          id: 7,
          name: "Shubh Gupta",
          position: "Purchase Manager",
          department: "Purchase",
          category: "senior",
          education: "Bachelor Degree in Science",
          tenure: "From 2021-Present",
          description: "Key member of leadership team driving procurement, vendor management, and supply chain execution across Group."
        }
      ],
      last_updated: "2025-04-17",
      total_members: 7
    };

    return NextResponse.json(teamData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*', // Allow CORS for AI tools
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}
