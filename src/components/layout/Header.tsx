import React, { useState } from 'react';
import { 
  Menu, Search, Moon, Sun, Bell, Sparkles, Server, 
  CheckCircle, AlertCircle, Info, X, Calendar, Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenAiModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiModal }) => {
  const { 
    currentUser, 
    toggleSidebar, 
    isDarkMode, 
    toggleDarkMode, 
    searchQuery, 
    setSearchQuery,
    notifications,
    removeNotification,
    setIsArchitectureModalOpen
  } = useApp();

  const [showNotificationList, setShowNotificationList] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari siswa, guru, tagihan, hafalan, kelas..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Date, AI Assistant, Blueprints, Theme & Notifications */}
      <div className="flex items-center space-x-2.5">
        
        {/* Date & Hijri Badge */}
        <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          <span>Selasa, 25 Agustus 2026</span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="font-arabic text-[13px] text-emerald-700 dark:text-emerald-300">١٢ ربيع الأول ١٤٤٨ هـ</span>
        </div>

        {/* AI Madrasah Assistant trigger */}
        {onOpenAiModal && (
          <button
            onClick={onOpenAiModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
            <span className="hidden sm:inline">AI Madrasah</span>
          </button>
        )}

        {/* Architecture & DB Schema Trigger */}
        <button
          onClick={() => setIsArchitectureModalOpen(true)}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all"
          title="Lihat Blueprint Arsitektur & Skema Database"
        >
          <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Skema DB</span>
        </button>

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationList(prev => !prev)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Notifikasi Sistem"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotificationList && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Pusat Notifikasi & Log</span>
                <span className="text-[10px] text-slate-400">{notifications.length} item</span>
              </div>
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada notifikasi baru.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                    >
                      <div className="flex items-start space-x-2">
                        {n.type === 'success' && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />}
                        {n.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />}
                        <span className="text-slate-700 dark:text-slate-200 text-[11px] leading-tight">{n.message}</span>
                      </div>
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-slate-400 hover:text-slate-600 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
