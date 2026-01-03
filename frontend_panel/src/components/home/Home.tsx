import PracticeCard from "../practice/PracticeCard";
import { mockPractices } from "../../data/mockData";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

function Home() {
  const highPerformers = mockPractices.filter((p) => p.conversionRate >= 20).length;
  const avgConversionRate = Math.round(
    mockPractices.reduce((acc, p) => acc + p.conversionRate, 0) /
      mockPractices.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Gradient */}
        <div className="mb-10 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-blue-600 dark:from-white dark:via-accent-400 dark:to-blue-400 bg-clip-text text-transparent">
              Dental Practice Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg max-w-2xl">
              Monitor performance metrics, track trends, and get actionable insights for your dental practices
            </p>
          </div>
        </div>

        {/* Stats Summary Cards with Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-accent-50 dark:from-gray-800 dark:to-accent-900/20 p-6 shadow-lg border border-accent-100 dark:border-accent-800/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent-100 dark:bg-accent-900/30">
                <Users className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Practices</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockPractices.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 p-6 shadow-lg border border-green-100 dark:border-green-800/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Performers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {highPerformers}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {Math.round((highPerformers / mockPractices.length) * 100)}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 shadow-lg border border-blue-100 dark:border-blue-800/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {avgConversionRate}%
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Across all practices
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Practice Overview
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {mockPractices.length} practices • Updated today
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPractices.map((practice) => (
              <PracticeCard key={practice.id} practice={practice} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-8">
          <p>Data refreshes automatically every 24 hours</p>
          <p className="mt-1">Last updated: Today, 11:45 AM</p>
        </div>
      </div>
    </div>
  );
}

export default Home;