import React from 'react';
import { 
  Users, GraduationCap, DollarSign, Award, Calendar, 
  BookMarked, Compass, CheckCircle2, AlertTriangle, ArrowUpRight, 
  ArrowDownRight, TrendingUp, Clock, FileText, CreditCard, Sparkles,
  ChevronRight, Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useApp, ActiveNavTab } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    students, 
    staff, 
    classrooms, 
    invoices, 
    expenses, 
    announcements, 
    tahfidzRecords,
    setActiveTab,
    setIsArchitectureModalOpen
  } = useApp();

  // Aggregate stats
  const totalStudents = students.length;
  const totalStaff = staff.length;
  const totalClasses = classrooms.length;
  
  const totalIncome = invoices
    .filter(i => i.status === 'Lunas')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = expenses
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingInvoices = invoices.filter(i => i.status !== 'Lunas');
  const totalUnpaidSpp = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  // Mock chart data for Attendance Trend
  const attendanceData = [
    { day: 'Sen', hadir: 98, izin: 1.5, alpa: 0.5 },
    { day: 'Sel', hadir: 97, izin: 2.0, alpa: 1.0 },
    { day: 'Rab', hadir: 99, izin: 1.0, alpa: 0.0 },
    { day: 'Kam', hadir: 96, izin: 3.0, alpa: 1.0 },
    { day: 'Jum', hadir: 98, izin: 1.5, alpa: 0.5 },
    { day: 'Sab', hadir: 95, izin: 3.5, alpa: 1.5 },
  ];

  // Financial Monthly Chart
  const financialMonthlyData = [
    { month: 'Apr', pemasukan: 145000000, pengeluaran: 82000000 },
    { month: 'Mei', pemasukan: 138000000, pengeluaran: 89000000 },
    { month: 'Jun', pemasukan: 165000000, pengeluaran: 98000000 },
    { month: 'Jul', pemasukan: 210000000, pengeluaran: 120000000 }, // PPDB Spike
    { month: 'Agu', pemasukan: 175000000, pengeluaran: 92000000 },
  ];

  // Tahfidz Distribution Data
  const tahfidzDistribution = [
    { name: '1 - 5 Juz', value: 45, color: '#10b981' },
    { name: '6 - 15 Juz', value: 35, color: '#0d9488' },
    { name: '16 - 29 Juz', value: 15, color: '#3b82f6' },
    { name: 'Khatam 30 Juz (Hafidz)', value: 5, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Sistem Terintegrasi v2.5
              </span>
              <span className="text-xs text-slate-300">Tahun Ajaran 2026/2027</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Ahlan wa Sahlan, {currentUser.name}!
            </h1>
            <p className="text-xs text-emerald-100/80 max-w-xl">
              Portal Administrasi Terpadu Madrasah Aliyah Unggulan & Pondok Pesantren Terpadu Al-Hikmah. 
              Kelola aktivitas akademik, tahfidz Al-Qur'an, presensi ibadah, dan administrasi keuangan secara efisien.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('madr_tahfidz')}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition-all"
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Setoran Tahfidz</span>
            </button>
            <button
              onClick={() => setActiveTab('fin_invoices')}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition-all"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Cek SPP Online</span>
            </button>
          </div>
        </div>

        {/* Decorative background Islamic pattern overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-center font-arabic text-9xl font-bold select-none">
          المدرسة
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Siswa Aktif */}
        <div 
          onClick={() => setActiveTab('sis_students')}
          className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Santri & Siswa</span>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {totalStudents} <span className="text-xs font-normal text-slate-400">Santri</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              <span>100% Terverifikasi EMIS & Kemenag</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pendidik & Staf */}
        <div 
          onClick={() => setActiveTab('hr_staff')}
          className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Guru & Tenaga Kependidikan</span>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {totalStaff} <span className="text-xs font-normal text-slate-400">Ustadz/Ustadzah</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-blue-600 dark:text-blue-400">
              <span>{totalClasses} Rombel Terdistribusi</span>
            </div>
          </div>
        </div>

        {/* Card 3: Rata-Rata Kehadiran */}
        <div 
          onClick={() => setActiveTab('madr_prayers')}
          className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Presensi Shalat & Kelas</span>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              97.4% <span className="text-xs font-normal text-slate-400">Hadir</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
              <span>5 Waktu Berjamaah Tertib</span>
            </div>
          </div>
        </div>

        {/* Card 4: Penerimaan SPP */}
        <div 
          onClick={() => setActiveTab('fin_invoices')}
          className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Penerimaan SPP (Bulan Ini)</span>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              Rp {(totalIncome / 1000000).toFixed(1)}M <span className="text-xs font-normal text-slate-400">Terkumpul</span>
            </div>
            <div className="mt-1 flex items-center text-xs text-amber-600 dark:text-amber-400">
              <span>{pendingInvoices.length} Tagihan Menunggu Bayar</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance & Prayer Trend Chart (2 columns) */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700/60 gap-2">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Statistik Kehadiran Harian & Kedisiplinan Santri</span>
              </h3>
              <p className="text-xs text-slate-400">Tingkat kehadiran kelas dan shalat berjamaah 6 hari terakhir</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Rata-rata: 97.2%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hadirGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[85, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="hadir" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#hadirGrad)" name="Hadir (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tahfidz Progress Distribution (1 column) */}
        <div className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <BookMarked className="w-4 h-4 text-teal-600" />
                <span>Distribusi Hafalan Tahfidz</span>
              </h3>
              <button 
                onClick={() => setActiveTab('madr_tahfidz')}
                className="text-xs text-emerald-600 hover:underline"
              >
                Detail
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">Capaian hafalan Al-Qur'an santri madrasah</p>

            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tahfidzDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {tahfidzDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}% Santri`, 'Proporsi']}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
            {tahfidzDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Announcements & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Announcements Board */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Papan Pengumuman & Agenda Terdekat</h3>
            </div>
            <button
              onClick={() => setActiveTab('fo_announcements')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-start justify-between gap-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ann.priority === 'Penting' 
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {ann.priority}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] text-slate-400 font-medium">{ann.authorRole}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Role-Adaptive Actions */}
        <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl shadow-sm border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-700/80">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm">Aksi Cepat & Operasional</h3>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Navigasi langsung ke modul operasional harian sesuai peran ({currentUser.role.replace('_', ' ').toUpperCase()}):
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setActiveTab('madr_tahfidz')}
                className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold transition-all"
              >
                <div className="flex items-center space-x-2">
                  <BookMarked className="w-4 h-4 text-emerald-400" />
                  <span>Input Setoran Hafalan Baru</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('acad_rapor')}
                className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold transition-all"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Generate e-Rapor Siswa</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('fin_invoices')}
                className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold transition-all"
              >
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Simulasi Pembayaran SPP Online</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('sis_ppdb')}
                className="w-full flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold transition-all"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Review Pendaftar PPDB</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/80">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Lihat Spesifikasi & Skema DB
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
