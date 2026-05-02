'use client';

interface TurnoverData {
  sno: number;
  companyName: string;
  turnover2024_25: string;
  turnover2025_26: string;
}

const turnoverData: TurnoverData[] = [
  {
    sno: 1,
    companyName: "VMS HUB PVT LTD",
    turnover2024_25: "-",
    turnover2025_26: "245 Cr"
  },
  {
    sno: 2,
    companyName: "SHANKY METAL PVT LTD",
    turnover2024_25: "3.62 Cr",
    turnover2025_26: "14 Cr"
  },
  {
    sno: 3,
    companyName: "SHANKY SMART TECH PVT LTD",
    turnover2024_25: "-",
    turnover2025_26: "14 Cr"
  },
  {
    sno: 4,
    companyName: "SHANKY BUILDTECH PVT LTD",
    turnover2024_25: "2.12 Cr",
    turnover2025_26: "8 Cr"
  },
  {
    sno: 5,
    companyName: "SHANKY CORPORATE TRAINING",
    turnover2024_25: "0",
    turnover2025_26: "50 Lakh"
  },
  {
    sno: 6,
    companyName: "SHANKY FINANCIAL SERVICES PVT LTD",
    turnover2024_25: "1.45 Cr",
    turnover2025_26: "26.50 Cr"
  }
];

export default turnoverData;
export type { TurnoverData };