import React from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Award, GraduationCap, 
  BookOpen, Calendar, FileText, CheckSquare, Sparkles, 
  Moon, Sun, DollarSign, CreditCard, Receipt, Briefcase, 
  Clock, ShieldAlert, Volume2, UserPlus, Server, ChevronRight,
  BookMarked, Compass, HeartHandshake, Layers
} from 'lucide-react';
import { useApp, ActiveNavTab } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    activeTab, 
    setActiveTab, 
    isSidebarOpen, 
    setIsArchitectureModalOpen 
  } = useApp();

  const navItems = [
    {
      group: 'Utama',
      items: [
        { id: 'dashboard', label: 'Dashboard & Analitik', icon: LayoutDashboard, roles: ['super_admin', 'guru', 'siswa', 'orang_tua', 'keuangan_tu'] }
      ]
    },
    {
      group: 'Sistem Informasi Siswa (SIS)',
      items: [
        { id: 'sis_students', label: 'Direktori Santri & Siswa', icon: Users, roles: ['super_admin', 'guru', 'keuangan_tu'] },
        { id: 'sis_ppdb', label: 'PPDB & Penerimaan Baru', icon: UserPlus, roles: ['super_admin', 'guru', 'keuangan_tu'] },
        { id: 'sis_discipline', label: 'Kedisiplinan & Prestasi', icon: Award, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] }
      ]
    },
    {
      group: 'Manajemen Akademik',
      items: [
        { id: 'acad_classes', label: 'Kelas & Rombongan Belajar', icon: Layers, roles: ['super_admin', 'guru', 'keuangan_tu'] },
        { id: 'acad_subjects', label: 'Mata Pelajaran & Silabus', icon: BookOpen, roles: ['super_admin', 'guru'] },
        { id: 'acad_schedule', label: 'Jadwal Pelajaran', icon: Calendar, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] },
        { id: 'acad_exams', label: 'Manajemen Ujian & Kartu', icon: CheckSquare, roles: ['super_admin', 'guru', 'siswa', 'orang_tua', 'keuangan_tu'] },
        { id: 'acad_rapor', label: 'e-Rapor & Transkrip Nilai', icon: FileText, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] }
      ]
    },
    {
      group: 'Fitur Khusus Madrasah',
      items: [
        { id: 'madr_tahfidz', label: 'Pelacak Tahfidz Al-Qur\'an', icon: BookMarked, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] },
        { id: 'madr_prayers', label: 'Presensi Shalat Berjamaah', icon: Compass, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] },
        { id: 'madr_diniyah', label: 'Penilaian Bahasa Arab & Diniyah', icon: Sparkles, roles: ['super_admin', 'guru', 'siswa', 'orang_tua'] }
      ]
    },
    {
      group: 'Kepegawaian & HR',
      items: [
        { id: 'hr_staff', label: 'Direktori Dewan Guru & Staf', icon: Briefcase, roles: ['super_admin', 'keuangan_tu'] },
        { id: 'hr_leave', label: 'Presensi & Pengajuan Cuti', icon: Clock, roles: ['super_admin', 'guru', 'keuangan_tu'] },
        { id: 'hr_payroll', label: 'Manajemen Payroll & Slip Gaji', icon: DollarSign, roles: ['super_admin', 'guru', 'keuangan_tu'] }
      ]
    },
    {
      group: 'Keuangan & Akuntansi',
      items: [
        { id: 'fin_fees', label: 'Struktur Biaya & SPP', icon: Receipt, roles: ['super_admin', 'keuangan_tu'] },
        { id: 'fin_invoices', label: 'Tagihan & Payment Gateway', icon: CreditCard, roles: ['super_admin', 'siswa', 'orang_tua', 'keuangan_tu'] },
        { id: 'fin_expenses', label: 'Pengeluaran & Operasional', icon: DollarSign, roles: ['super_admin', 'keuangan_tu'] }
      ]
    },
    {
      group: 'Front Office & Komunikasi',
      items: [
        { id: 'fo_announcements', label: 'Papan Pengumuman & Broadcast', icon: Volume2, roles: ['super_admin', 'guru', 'siswa', 'orang_tua', 'keuangan_tu'] },
        { id: 'fo_guestbook', label: 'Buku Tamu Digital', icon: HeartHandshake, roles: ['super_admin', 'keuangan_tu'] }
      ]
    }
  ];

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin / Kepala Sekolah', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300' },
    guru: { label: 'Guru / Ustadz', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300' },
    siswa: { label: 'Siswa / Santri', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300' },
    orang_tua: { label: 'Orang Tua / Wali Murid', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300' },
    keuangan_tu: { label: 'Staf Keuangan / TU', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300' }
  };

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-600/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">SIAMadrasah</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[150px]">
              Madrasah Aliyah Unggulan
            </p>
          </div>
        </div>
      </div>

      {/* User Switcher Card */}
      <div className="p-3.5 mx-3 mt-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center space-x-2.5 mb-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-600"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {currentUser.title || currentUser.email}
            </p>
          </div>
        </div>

        {/* Role switcher selector */}
        <div className="mt-1">
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Ganti Peran Aktif:
          </label>
          <select
            value={currentUser.role}
            onChange={(e) => switchRole(e.target.value as UserRole)}
            className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="super_admin">👑 Super Admin / Kepala Sekolah</option>
            <option value="guru">📚 Guru / Pengajar</option>
            <option value="siswa">🎓 Siswa / Santri</option>
            <option value="orang_tua">👨‍👩‍👧 Orang Tua / Wali Murid</option>
            <option value="keuangan_tu">💼 Staf Keuangan / Tata Usaha</option>
          </select>
        </div>
      </div>

      {/* Navigation Links (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navItems.map((group, gIdx) => {
          // Filter items by current user role
          const visibleItems = group.items.filter(item => item.roles.includes(currentUser.role));
          if (visibleItems.length === 0) return null;

          return (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {group.group}
              </p>
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveNavTab)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all duration-150 group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80 shrink-0" />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Architecture & DB Blueprint button in bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
        <button
          onClick={() => setIsArchitectureModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Server className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>Arsitektur & Skema DB</span>
        </button>
      </div>
    </aside>
  );
};
