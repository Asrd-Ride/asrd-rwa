// ... existing imports ...

export default function Dashboard() {
  // ... existing state and logic ...

  return (
    // ... existing JSX structure ...
    
    {/* Enhanced Tabs with Mobile Optimization */}
    <div className="glass-3d p-1 rounded-2xl mb-8 overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 py-3 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center min-w-0 ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <PieChart className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Asset Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 py-3 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center min-w-0 ${
            activeTab === 'analytics'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex items-center space-x-2 py-3 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center min-w-0 ${
            activeTab === 'performance'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <BarChart3 className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Performance</span>
        </button>
      </div>
    </div>

    // ... rest of JSX
  )
}
