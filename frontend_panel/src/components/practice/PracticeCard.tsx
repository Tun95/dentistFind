import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
} from "lucide-react";
import { PracticeSummary, StatusType } from "../../types/practice.types";
import PracticeDetailModal from "./PracticeDetailModal";

interface PracticeCardProps {
  practice: PracticeSummary;
  index: number;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ practice, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          icon: <TrendingUp className="w-4 h-4" />,
          label: "High Performer",
        };
      case "at-risk":
        return {
          gradient: "from-red-500/20 to-rose-400/10",
          border: "border-red-200 dark:border-red-800/50",
          iconColor: "text-red-600 dark:text-red-400",
          bgColor:
            "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10",
          textColor: "text-red-800 dark:text-red-300",
          icon: <TrendingDown className="w-4 h-4" />,
          label: "At Risk",
        };
      default:
        return {
          gradient: "from-gray-500/20 to-slate-400/10",
          border: "border-gray-200 dark:border-gray-700",
          iconColor: "text-gray-600 dark:text-gray-400",
          bgColor:
            "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/30 dark:to-slate-900/10",
          textColor: "text-gray-800 dark:text-gray-300",
          icon: <Minus className="w-4 h-4" />,
          label: "Stable",
        };
    }
  };

  const status = getStatus(practice.conversionRate);
  const statusConfig = getStatusConfig(status);

  // Calculate growth from previous month
  const currentMonth = practice.monthlyTrend[practice.monthlyTrend.length - 1];
  const previousMonth =
    practice.monthlyTrend[practice.monthlyTrend.length - 2] || currentMonth;
  const growth = ((currentMonth - previousMonth) / previousMonth) * 100;
  const isGrowing = growth > 0;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className={`group relative rounded-xl overflow-hidden border ${statusConfig.border} bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${statusConfig.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Header */}
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
                {practice.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">
                  {practice.city}, {practice.country}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor} flex-shrink-0 ml-2`}
              whileHover={{ scale: 1.05 }}
            >
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </motion.div>
          </div>

          {/* Key Metrics - Compact */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              {
                icon: Users,
                value: practice.newPatientsThisMonth,
                label: "Patients",
                color: "accent",
                delay: 0.1,
              },
              {
                icon: Calendar,
                value: practice.appointmentRequests,
                label: "Requests",
                color: "blue",
                delay: 0.2,
              },
              {
                icon: null,
                value: `${practice.conversionRate}%`,
                label: "Conversion Rate",
                color: status,
                delay: 0.3,
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + metric.delay,
                  ease: "backOut",
                }}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`p-2 rounded-lg ${
                    metric.color === "accent"
                      ? "bg-accent-50 dark:bg-accent-900/20"
                      : metric.color === "blue"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : statusConfig.bgColor
                  } mb-1.5`}
                >
                  {metric.icon ? (
                    <metric.icon
                      className={`w-5 h-5 mx-auto ${
                        metric.color === "accent"
                          ? "text-accent-600 dark:text-accent-400"
                          : metric.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : statusConfig.iconColor
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-lg font-bold mx-auto block leading-none ${
                        status === "high-performer"
                          ? "text-green-600 dark:text-green-400"
                          : status === "at-risk"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {metric.value}
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {metric.icon ? metric.value : ""}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Growth Indicator */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={
              inView ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                Monthly Growth
              </span>
              <span
                className={`font-medium ${
                  isGrowing
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isGrowing ? "+" : ""}
                {Math.round(growth)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={
                  inView
                    ? { width: `${Math.min(Math.abs(growth), 100)}%` }
                    : { width: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 0.5,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${
                  isGrowing
                    ? "bg-gradient-to-r from-green-500 to-emerald-400"
                    : "bg-gradient-to-r from-red-500 to-rose-400"
                }`}
              />
            </div>
          </motion.div>

          {/* Quick Trend Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                6-Month Trend
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Last: {currentMonth}
              </span>
            </div>
            <div className="flex items-end h-8 gap-1">
              {practice.monthlyTrend.slice(-6).map((value, i) => {
                const max = Math.max(...practice.monthlyTrend);
                const height = (value / max) * 24;

                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${height}px` } : { height: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.6 + i * 0.05,
                      ease: "easeOut",
                    }}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className={`w-full rounded-t-sm ${
                        i === 5
                          ? "bg-gradient-to-t from-accent-500 to-accent-400"
                          : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500"
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
            className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Click for details
            </div>
            <motion.div
              className="flex items-center text-accent-600 dark:text-accent-400"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-medium">View Details</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <PracticeDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        practice={practice}
      />
    </>
  );
};

export default PracticeCard;
