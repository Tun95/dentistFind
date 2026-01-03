import React from "react";
import { PracticeSummary, StatusType } from "../../types/practice.types";
import {
  MapPin,
  Users,
  Calendar,
  Target,
  DollarSign,
  TrendingUp,
  Minus,
  BarChart3,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Modal from "../../common/modals/Modal";

interface PracticeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  practice: PracticeSummary;
}

const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({
  isOpen,
  onClose,
  practice,
}) => {
  const getStatus = (conversionRate: number): StatusType => {
    if (conversionRate >= 20) return "high-performer";
    if (conversionRate < 10) return "at-risk";
    return "stable";
  };

  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "high-performer":
        return {
          color: "text-green-600 dark:text-green-400",
          bg: "bg-green-100 dark:bg-green-900/30",
          gradient: "from-green-500 to-emerald-400",
          icon: <CheckCircle className="w-5 h-5" />,
        };
      case "at-risk":
        return {
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-100 dark:bg-red-900/30",
          gradient: "from-red-500 to-rose-400",
          icon: <AlertCircle className="w-5 h-5" />,
        };
      default:
        return {
          color: "text-gray-600 dark:text-gray-400",
          bg: "bg-gray-100 dark:bg-gray-800",
          gradient: "from-gray-500 to-slate-400",
          icon: <Minus className="w-5 h-5" />,
        };
    }
  };

  const status = getStatus(practice.conversionRate);
  const statusConfig = getStatusConfig(status);

  const totalRequests = practice.appointmentRequests;
  const conversionCount = Math.round(
    (practice.conversionRate / 100) * totalRequests
  );
  const missedOpportunities = totalRequests - conversionCount;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Practice Details" size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {practice.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {practice.city}, {practice.country}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color} font-semibold`}
          >
            {statusConfig.icon}
            <span>
              {status === "high-performer"
                ? "High Performer"
                : status === "at-risk"
                ? "At Risk"
                : "Stable"}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-accent-50 to-white dark:from-accent-900/10 dark:to-gray-800/50 p-4 rounded-xl border border-accent-100 dark:border-accent-800/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                  <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    New Patients
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {practice.newPatientsThisMonth}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This month
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800/50 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Appointments
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalRequests}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This month
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-gray-800/50 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {practice.conversionRate}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {conversionCount} converted
              </p>
            </div>

            {practice.marketingSpend && (
              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-800/50 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Marketing
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${practice.marketingSpend.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This month
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Conversion Analysis */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Conversion Analysis
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Appointment Requests</span>
                <span>{totalRequests}</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  style={{ width: `${practice.conversionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Successful Conversions
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {conversionCount}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Missed Opportunities
                </p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {missedOpportunities}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            6-Month Patient Trend
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  New Patients per Month
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  Current:{" "}
                  {practice.monthlyTrend[practice.monthlyTrend.length - 1]}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Growth
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  +
                  {Math.round(
                    ((practice.monthlyTrend[practice.monthlyTrend.length - 1] -
                      practice.monthlyTrend[practice.monthlyTrend.length - 2]) /
                      practice.monthlyTrend[practice.monthlyTrend.length - 2]) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>

            <div className="flex items-end h-32 gap-2">
              {practice.monthlyTrend.map((value, index) => {
                const max = Math.max(...practice.monthlyTrend);
                const height = (value / max) * 80;
                const isLatest = index === practice.monthlyTrend.length - 1;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isLatest
                          ? "bg-gradient-to-t from-accent-500 to-accent-400"
                          : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500"
                      }`}
                      style={{ height: `${height}px` }}
                      title={`Month ${index + 1}: ${value} patients`}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      M{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actionable Recommendations
          </h4>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-accent-50/30 to-blue-50/30 dark:from-accent-900/10 dark:to-blue-900/10 p-4 rounded-xl border border-accent-100 dark:border-accent-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/30">
                  <TrendingUp className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    Increase Marketing Investment
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Consider increasing ad budget on top-performing channels.
                    Based on current conversion rates, a 20% increase in
                    marketing spend could yield approximately 8-12 additional
                    new patients monthly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50/30 to-emerald-50/30 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    Optimize Conversion Funnel
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Focus on improving the appointment booking experience.
                    Simplifying the scheduling process could improve conversion
                    rates by 5-10% within the next quarter.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50/30 to-cyan-50/30 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    Mobile Experience Enhancement
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Optimize mobile landing page layout. 68% of appointment
                    requests come from mobile devices, and improving mobile UX
                    could increase conversions by 15-20%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
        >
          Export Report
        </button>
        <button
          onClick={onClose}
          className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PracticeDetailModal;
