'use client'
import { motion } from 'framer-motion'

interface ChartDataItem {
  value: number
  label: string
  month?: string
}

interface GradientBarChartProps {
  data: ChartDataItem[]
  maxValue: number
  colorFrom: string
  colorTo: string
}

export const GradientBarChart = ({ data, maxValue, colorFrom, colorTo }: GradientBarChartProps) => {
  return (
    <div className="h-64 relative">
      <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2" style={{ flex: 1 }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 80}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              className="w-6 rounded-t-lg relative group cursor-pointer"
              style={{
                background: `linear-gradient(to top, ${colorFrom}, ${colorTo})`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{ 
                scale: 1.15,
                transition: { duration: 0.2 }
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-600">
                {item.label}
              </div>
            </motion.div>
            <span className="text-slate-400 text-xs">{item.month || ''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
