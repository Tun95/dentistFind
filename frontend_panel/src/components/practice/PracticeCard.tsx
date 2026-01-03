import React from "react";
import TrendChart from "./TrendChart";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Users,
  Calendar,
  Target,
  DollarSign,
  Percent,
} from "lucide-react";
import { PracticeSummary, StatusType } from "../../types/practice.types";

interface PracticeCardProps {
  practice: PracticeSummary;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ practice }) => {
  const getStatus = (conversionRate: number): StatusType => {
    if (conversionRate >= 20) return "high-performer";
    if (conversionRate < 10) return "at-risk";
    return "stable";
  };

  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "high-performer":
        return {
          gradient: "from-green-500/20 to-emerald-400/10",
          border: "border-green-200 dark:border-green-800/50",
          iconColor: "text-green-600 dark:text-green-400",
          bgColor:
            "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10",
          textColor: "text-green-800 dark:text-green-300",
          icon: <TrendingUp className="w-5 h-5" />,
        };
      case "at-risk":
        return {
          gradient: "from-red-500/20 to-rose-400/10",
          border: "border-red-200 dark:border-red-800/50",
          iconColor: "text-red-600 dark:text-red-400",
          bgColor:
            "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10",
          textColor: "text-red-800 dark:text-red-300",
          icon: <TrendingDown className="w-5 h-5" />,
        };
      default:
        return {
          gradient: "from-gray-500/20 to-slate-400/10",
          border: "border-gray-200 dark:border-gray-700",
          iconColor: "text-gray-600 dark:text-gray-400",
          bgColor:
            "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/30 dark:to-slate-900/10",
          textColor: "text-gray-800 dark:text-gray-300",
          icon: <Minus className="w-5 h-5" />,
        };
    }
  };

  const getStatusText = (status: StatusType) => {
    switch (status) {
      case "high-performer":
        return "High Performer";
      case "at-risk":
        return "At Risk";
      default:
        return "Stable";
    }
  };

  const status = getStatus(practice.conversionRate);
  const statusConfig = getStatusConfig(status);

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border ${statusConfig.border} bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${statusConfig.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      />

      {/* Header with Gradient */}
      <div className="relative p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {practice.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {practice.city}, {practice.country}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} font-semibold text-sm`}
          >
            {statusConfig.icon}
            <span>{getStatusText(status)}</span>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Conversion Performance
            </span>
            <span className={`text-sm font-semibold ${statusConfig.textColor}`}>
              {practice.conversionRate}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                status === "high-performer"
                  ? "bg-gradient-to-r from-green-500 to-emerald-400"
                  : status === "at-risk"
                  ? "bg-gradient-to-r from-red-500 to-rose-400"
                  : "bg-gradient-to-r from-gray-500 to-slate-400"
              }`}
              style={{ width: `${Math.min(practice.conversionRate, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="relative p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* New Patients */}
          <div
            className={`relative p-4 rounded-xl bg-gradient-to-br from-accent-50/50 to-white dark:from-accent-900/10 dark:to-gray-800/50 border border-accent-100 dark:border-accent-800/30`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  New Patients
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {practice.newPatientsThisMonth}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This month
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Requests */}
          <div
            className={`relative p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50 border border-blue-100 dark:border-blue-800/30`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {practice.appointmentRequests}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This month
                </p>
              </div>
            </div>
          </div>

          {/* Additional Metric - Marketing Spend */}
          {practice.marketingSpend !== undefined && (
            <div
              className={`relative p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-800/50 border border-purple-100 dark:border-purple-800/30`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Marketing
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    ${practice.marketingSpend.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This month
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Metric - Show Rate */}
          {practice.showRate !== undefined && (
            <div
              className={`relative p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800/50 border border-emerald-100 dark:border-emerald-800/30`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Show Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {practice.showRate}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Attendance
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trend Visualization */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4" />
              6-Month Trend
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              New patients • Last 6 months
            </span>
          </div>
          <div className="h-16 p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-800/30 dark:to-gray-900/20 border border-gray-100 dark:border-gray-700">
            <TrendChart data={practice.monthlyTrend} />
          </div>
        </div>

        {/* Recommendations with Gradient */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent-50/30 to-blue-50/30 dark:from-accent-900/10 dark:to-blue-900/10 border border-accent-100 dark:border-accent-800/30">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            Recommendations
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-500 dark:bg-accent-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Consider increasing ad budget on top-performing channels to
                boost patient acquisition.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-500 dark:bg-accent-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Optimize mobile landing page layout for better conversion rates.
              </p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-2">
          <button className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            View Details
          </button>
          <button className="py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-sm transition-colors duration-300">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;
