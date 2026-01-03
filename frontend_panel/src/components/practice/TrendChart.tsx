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

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 group"
            >
              <div className="relative w-full">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ease-out group-hover:opacity-90 ${
                    isLatest
                      ? "bg-gradient-to-t from-accent-500 to-accent-400 dark:from-accent-600 dark:to-accent-500"
                      : isPeak
                      ? "bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500"
                      : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500"
                  }`}
                  style={{ height: `${barHeight}px` }}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                </div>

                {/* Value tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Month {index + 1}: {value}
                    {isPeak && " ⭐"}
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
              </div>

              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                M{index + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Trend line */}
      <div className="relative mt-2">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>6 months ago</span>
          <span>Current</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
