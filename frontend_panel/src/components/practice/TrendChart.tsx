import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TrendChartProps {
  data: number[];
  height?: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, height = 40 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  // Calculate trend direction
  const lastValue = data[data.length - 1];
  const previousValue = data[data.length - 2] || data[0];
  const isIncreasing = lastValue > previousValue;
  const changePercentage = ((lastValue - previousValue) / previousValue) * 100;

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Current: {lastValue} patients
        </span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`text-xs font-medium ${
            isIncreasing
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isIncreasing ? "↗" : "↘"} {Math.abs(Math.round(changePercentage))}%
        </motion.span>
      </div>

      <div className="flex items-end justify-between h-full w-full gap-1.5">
        {data.map((value, index) => {
          const barHeight = ((value - minValue) / range) * (height - 8) + 8;
          const isLatest = index === data.length - 1;
          const isPeak = value === maxValue;
          const isValley = value === minValue && maxValue !== minValue;
          const isGrowth = index > 0 && value > data[index - 1];

          return (
            <motion.div
              key={index}
              initial={{ height: 0, opacity: 0 }}
              animate={
                inView
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex flex-col items-center flex-1 group relative"
            >
              {/* Animated background effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-transparent via-accent-500/5 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <div className="relative w-full z-10">
                {/* Bar with animated height */}
                <motion.div
                  className={`w-full rounded-t-lg ${
                    isLatest
                      ? "bg-gradient-to-t from-accent-500 to-accent-400 dark:from-accent-600 dark:to-accent-500"
                      : isPeak
                      ? "bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500"
                      : isValley
                      ? "bg-gradient-to-t from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-400"
                      : "bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-500"
                  }`}
                  initial={{ scaleY: 0, transformOrigin: "bottom" }}
                  animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: "backOut",
                  }}
                  whileHover={{
                    scale: isGrowth ? 1.05 : 1.02,
                    boxShadow: isLatest
                      ? "0 10px 15px -3px rgba(99, 102, 241, 0.2)"
                      : isPeak
                      ? "0 10px 15px -3px rgba(59, 130, 246, 0.2)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  style={{ height: `${barHeight}px` }}
                >
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-white/30 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Value tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
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
                </motion.div>
              </div>

              {/* Month label */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300"
              >
                M{index + 1}
              </motion.span>

              {/* Connection line between bars */}
              {index < data.length - 1 && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    inView
                      ? { width: "50%", opacity: 0.5 }
                      : { width: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  className="absolute top-0 right-0 h-0.5 bg-gradient-to-r from-gray-300/50 to-transparent dark:from-gray-600/50 group-hover:from-accent-400/30"
                  style={{ top: `${barHeight / 2}px` }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Animated trend line */}
      <motion.div
        className="relative mt-2"
        initial={{ opacity: 0, width: 0 }}
        animate={
          inView ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }
        }
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            6 months ago
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Current
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default TrendChart;
