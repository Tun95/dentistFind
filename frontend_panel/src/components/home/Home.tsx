import { motion } from "framer-motion";
import PracticeCard from "../practice/PracticeCard";
import { mockPractices } from "../../data/mockData";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

function Home() {
  const highPerformers = mockPractices.filter(
    (p) => p.conversionRate >= 20
  ).length;
  const avgConversionRate = Math.round(
    mockPractices.reduce((acc, p) => acc + p.conversionRate, 0) /
      mockPractices.length
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-4 -left-4 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          />

          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-blue-600 dark:from-white dark:via-accent-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Dental Practice Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 dark:text-gray-300 mt-3 text-lg max-w-2xl"
            >
              Monitor performance metrics, track trends, and get actionable
              insights for your dental practices
            </motion.p>
          </div>
        </motion.div>

        {/* Stats Summary Cards with Gradients */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {[
            {
              icon: Users,
              label: "Total Practices",
              value: mockPractices.length,
              color: "accent",
              gradient: "from-accent-500/5",
              border: "border-accent-100 dark:border-accent-800/30",
              bg: "from-accent-50 dark:from-accent-900/10",
              delay: 0,
            },
            {
              icon: TrendingUp,
              label: "High Performers",
              value: highPerformers,
              percentage: Math.round(
                (highPerformers / mockPractices.length) * 100
              ),
              color: "green",
              gradient: "from-green-500/5",
              border: "border-green-100 dark:border-green-800/30",
              bg: "from-green-50 dark:from-green-900/10",
              delay: 0.1,
            },
            {
              icon: BarChart3,
              label: "Avg. Conversion Rate",
              value: `${avgConversionRate}%`,
              subtitle: "Across all practices",
              color: "blue",
              gradient: "from-blue-500/5",
              border: "border-blue-100 dark:border-blue-800/30",
              bg: "from-blue-50 dark:from-blue-900/10",
              delay: 0.2,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bg} to-white dark:to-gray-800/50 p-6 shadow-lg border ${stat.border}`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full -translate-y-8 translate-x-8`}
              />
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: "backOut",
                  }}
                  className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}
                >
                  <stat.icon
                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p
                    className={`text-3xl font-bold text-gray-900 dark:text-white mt-1`}
                  >
                    {stat.value}
                  </p>
                  {stat.percentage && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`text-xs text-${stat.color}-600 dark:text-${stat.color}-400 mt-1`}
                    >
                      {stat.percentage}% of total
                    </motion.p>
                  )}
                  {stat.subtitle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-xs text-blue-600 dark:text-blue-400 mt-1"
                    >
                      {stat.subtitle}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap 2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Practice Overview
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {mockPractices.length} practices • Updated today
            </motion.span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {mockPractices.map((practice, index) => (
              <PracticeCard
                key={practice.id}
                practice={practice}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-8"
        >
          <p>Data refreshes automatically every 24 hours</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-1"
          >
            Last updated: Today, 11:45 AM
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
