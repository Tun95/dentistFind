export type PracticeSummary = {
  id: string;
  name: string;
  city: string;
  country: string;
  newPatientsThisMonth: number;
  appointmentRequests: number;
  conversionRate: number;
  monthlyTrend: number[];

  // added optional field for extra metric
  marketingSpend?: number;
  showRate?: number;
};

export type StatusType = "high-performer" | "stable" | "at-risk";
