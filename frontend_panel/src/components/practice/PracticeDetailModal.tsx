import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Calendar,
  Target,
  DollarSign,
  TrendingUp,
  Minus,
  X,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react";
import { PracticeSummary, StatusType } from "../../types/practice.types";

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
          label: "High Performer",
        };
      case "at-risk":
        return {
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-100 dark:bg-red-900/30",
          gradient: "from-red-500 to-rose-400",
          icon: <AlertCircle className="w-5 h-5" />,
          label: "At Risk",
        };
      default:
        return {
          color: "text-gray-600 dark:text-gray-400",
          bg: "bg-gray-100 dark:bg-gray-800",
          gradient: "from-gray-500 to-slate-400",
          icon: <Minus className="w-5 h-5" />,
          label: "Stable",
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

  const monthlyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "backOut" as const,
      },
    }),
  };

  const recommendationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {" "}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5,
              }}
              className="max-w-4xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="flex-1">
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    Practice Details
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-300 mt-1"
                  >
                    Comprehensive overview and analysis
                  </motion.p>
                </div>
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Practice Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start justify-between mb-8 flex-wrap gap-2"
                  >
                    <div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                      >
                        {practice.name}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>
                          {practice.city}, {practice.country}
                        </span>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3,
                        ease: "backOut",
                      }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color} font-semibold`}
                    >
                      {statusConfig.icon}
                      <span>{statusConfig.label}</span>
                    </motion.div>
                  </motion.div>

                  {/* Key Metrics */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="mb-8"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-420px:grid-cols-1">
                      {[
                        {
                          icon: Users,
                          value: practice.newPatientsThisMonth,
                          label: "New Patients",
                          color: "accent",
                          delay: 0.1,
                        },
                        {
                          icon: Calendar,
                          value: totalRequests,
                          label: "Appointments",
                          color: "blue",
                          delay: 0.2,
                        },
                        {
                          icon: Target,
                          value: `${practice.conversionRate}%`,
                          label: "Conversion Rate",
                          color: "emerald",
                          delay: 0.3,
                        },
                        ...(practice.marketingSpend
                          ? [
                              {
                                icon: DollarSign,
                                value: `$${practice.marketingSpend.toLocaleString()}`,
                                label: "Marketing",
                                color: "purple",
                                delay: 0.4,
                              },
                            ]
                          : []),
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={metricVariants}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          className={`bg-gradient-to-br from-${metric.color}-50 to-white dark:from-${metric.color}-900/10 dark:to-gray-800/50 p-4 rounded-xl border border-${metric.color}-100 dark:border-${metric.color}-800/30`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}
                            >
                              <metric.icon
                                className={`w-5 h-5 text-${metric.color}-600 dark:text-${metric.color}-400`}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {metric.label}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {metric.value}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            This month
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Conversion Analysis */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mb-8"
                  >
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
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${practice.conversionRate}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.6,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 }}
                          whileHover={{ scale: 1.02 }}
                          className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Successful Conversions
                          </p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {conversionCount}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            {practice.conversionRate}% success rate
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                          whileHover={{ scale: 1.02 }}
                          className="text-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Missed Opportunities
                          </p>
                          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            {missedOpportunities}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Potential for improvement
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Monthly Trend */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        6-Month Patient Trend
                      </h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-right"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Growth Rate
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          +
                          {Math.round(
                            ((practice.monthlyTrend[
                              practice.monthlyTrend.length - 1
                            ] -
                              practice.monthlyTrend[
                                practice.monthlyTrend.length - 2
                              ]) /
                              practice.monthlyTrend[
                                practice.monthlyTrend.length - 2
                              ]) *
                              100
                          )}
                          %
                        </p>
                      </motion.div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          New Patients per Month
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Current:{" "}
                          {
                            practice.monthlyTrend[
                              practice.monthlyTrend.length - 1
                            ]
                          }
                        </span>
                      </div>

                      <div className="flex items-end h-32 gap-2">
                        {practice.monthlyTrend.map((value, index) => {
                          const max = Math.max(...practice.monthlyTrend);
                          const height = (value / max) * 80;
                          const isLatest =
                            index === practice.monthlyTrend.length - 1;

                          return (
                            <motion.div
                              key={index}
                              custom={index}
                              initial="hidden"
                              animate="visible"
                              variants={monthlyVariants}
                              className="flex-1 flex flex-col items-center group"
                            >
                              <motion.div
                                whileHover={{
                                  scale: 1.1,
                                  transition: { duration: 0.2 },
                                }}
                                className={`w-full rounded-t-lg cursor-pointer ${
                                  isLatest
                                    ? "bg-gradient-to-t from-accent-500 to-accent-400"
                                    : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500"
                                }`}
                                style={{ height: `${height}px` }}
                              >
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                                >
                                  Month {index + 1}: {value} patients
                                </motion.div>
                              </motion.div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                M{index + 1}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Actionable Recommendations
                    </h4>
                    <div className="space-y-4">
                      {[
                        {
                          icon: TrendingUp,
                          title: "Increase Marketing Investment",
                          description:
                            "Consider increasing ad budget on top-performing channels. Based on current conversion rates, a 20% increase in marketing spend could yield approximately 8-12 additional new patients monthly.",
                          color: "accent",
                          delay: 0,
                        },
                        {
                          icon: Target,
                          title: "Optimize Conversion Funnel",
                          description:
                            "Focus on improving the appointment booking experience. Simplifying the scheduling process could improve conversion rates by 5-10% within the next quarter.",
                          color: "green",
                          delay: 1,
                        },
                        {
                          icon: BarChart3,
                          title: "Mobile Experience Enhancement",
                          description:
                            "Optimize mobile landing page layout. 68% of appointment requests come from mobile devices, and improving mobile UX could increase conversions by 15-20%.",
                          color: "blue",
                          delay: 2,
                        },
                      ].map((rec, index) => (
                        <motion.div
                          key={index}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={recommendationVariants}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          className={`bg-gradient-to-r from-${
                            rec.color
                          }-50/30 to-${
                            rec.color === "accent"
                              ? "blue"
                              : rec.color === "green"
                              ? "emerald"
                              : "cyan"
                          }-50/30 dark:from-${rec.color}-900/10 dark:to-${
                            rec.color === "accent"
                              ? "blue"
                              : rec.color === "green"
                              ? "emerald"
                              : "cyan"
                          }-900/10 p-4 rounded-xl border border-${
                            rec.color
                          }-100 dark:border-${rec.color}-800/30`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg bg-${rec.color}-100 dark:bg-${rec.color}-900/30`}
                            >
                              <rec.icon
                                className={`w-5 h-5 text-${rec.color}-600 dark:text-${rec.color}-400`}
                              />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                {rec.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {rec.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-300"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PracticeDetailModal;
