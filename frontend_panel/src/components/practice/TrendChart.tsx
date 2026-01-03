import React from "react";

interface TrendChartProps {
  data: number[];
  height?: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, height = 40 }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  // Calculate trend direction
  const lastValue = data[data.length - 1];
  const previousValue = data[data.length - 2] || data[0];
  const isIncreasing = lastValue > previousValue;
  const changePercentage = ((lastValue - previousValue) / previousValue) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Current: {lastValue} patients
        </span>
        <span
          className={`text-xs font-medium ${
            isIncreasing
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isIncreasing ? "↗" : "↘"} {Math.abs(Math.round(changePercentage))}%
        </span>
      </div>

      <div className="flex items-end justify-between h-full w-full gap-1.5">
        {data.map((value, index) => {
          const barHeight = ((value - minValue) / range) * (height - 8) + 8;
          const isLatest = index === data.length - 1;
          const isPeak = value === maxValue;
          const isValley = value === minValue && maxValue !== minValue;
          const isGrowth = index > 0 && value > data[index - 1];

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 group relative"
            >
              {/* Animated background effect on hover */}
              <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-transparent via-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative w-full z-10">
                {/* Bar with animated height */}
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ease-out ${
                    isLatest
                      ? "bg-gradient-to-t from-accent-500 to-accent-400 dark:from-accent-600 dark:to-accent-500 group-hover:shadow-lg group-hover:shadow-accent-500/20"
                      : isPeak
                      ? "bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                      : isValley
                      ? "bg-gradient-to-t from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-400 group-hover:shadow group-hover:shadow-gray-500/10"
                      : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500 group-hover:shadow group-hover:shadow-gray-500/10"
                  } ${
                    isGrowth ? "group-hover:scale-105" : "group-hover:scale-102"
                  } transform-gpu transition-transform duration-300`}
                  style={{ height: `${barHeight}px` }}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Growth indicator line */}
                  {isGrowth && index > 0 && (
                    <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>

                {/* Value tooltip with animation */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Month {index + 1}</span>
                      {isPeak && <span className="text-yellow-400">⭐</span>}
                      {isValley && <span className="text-gray-400">▼</span>}
                    </div>
                    <div className="text-center font-bold mt-0.5">
                      {value} patients
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-gray-900 dark:bg-gray-800 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b border-gray-700" />
                </div>
              </div>

              {/* Month label with hover effect */}
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
                M{index + 1}
              </span>

              {/* Connection line between bars */}
              {index < data.length - 1 && (
                <div
                  className="absolute top-0 right-0 w-1/2 h-0.5 bg-gradient-to-r from-gray-300/50 to-transparent dark:from-gray-600/50 group-hover:from-accent-400/30 transition-all duration-300"
                  style={{ top: `${barHeight / 2}px` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Animated trend line */}
      <div className="relative mt-2">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent group-hover:via-accent-400/50 transition-all duration-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
          <span className="transition-colors duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400">
            6 months ago
          </span>
          <span className="transition-colors duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400">
            Current
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
