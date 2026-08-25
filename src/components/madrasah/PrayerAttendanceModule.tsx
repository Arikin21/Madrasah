import React, { useState } from 'react';
import { 
  Sun, Moon, Sunrise, Sunset, Clock, CheckCircle2, 
  Users, Filter, Sparkles, ShieldCheck, Heart 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrayerAttendance, PrayerStatus, Student } from '../../types';

export const PrayerAttendanceModule: React.FC = () => {
  const { students, prayerLogs, classrooms, addPrayerAttendance, addNotification } = useApp();
  
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerAttendance['prayerName']>('Dzuhur');
  const [selectedClass, setSelectedClass] = useState<string>(classrooms[0]?.id || 'cls-1');

  // Filter students by selected classroom
  const classStudents = students.filter(s => s.currentClassId === selectedClass);

  const prayers = [
    { name: 'Subuh' as const, icon: Sunrise, time: '04:25 WIB', bg: 'from-indigo-900 to-slate-900' },
    { name: 'Dhuha' as const, icon: Sun, time: '07:15 WIB', bg: 'from-amber-600 to-orange-700' },
    { name: 'Dzuhur' as const, icon: Sun, time: '11:45 WIB', bg: 'from-emerald-700 to-teal-800' },
    { name: 'Ashar' as const, icon: Sunset, time: '15:10 WIB', bg: 'from-orange-700 to-red-800' },
    { name: 'Maghrib' as const, icon: Sunset, time: '17:45 WIB', bg: 'from-purple-900 to-indigo-950' },
    { name: 'Isya' as const, icon: Moon, time: '19:00 WIB', bg: 'from-slate-900 to-black' },
  ];

  // Helper to find log for a student
  const getStudentStatus = (studentId: string): PrayerStatus => {
    const log = prayerLogs.find(
      l => l.studentId === studentId && l.date === selectedDate && l.prayerName === selectedPrayer
    );
    return log ? log.status : 'Berjamaah di Masjid';
  };

  const handleUpdateStatus = (student: Student, status: PrayerStatus) => {
    addPrayerAttendance({
      studentId: student.id,
      studentName: student.fullName,
      className: student.className,
      date: selectedDate,
      prayerName: selectedPrayer,
      status: status,
      location: 'Masjid Jami\' Al-Hikmah'
    });
  };

  const handleMarkAllCongregational = () => {
    classStudents.forEach(std => {
      addPrayerAttendance({
        studentId: std.id,
        studentName: std.fullName,
        className: std.className,
        date: selectedDate,
        prayerName: selectedPrayer,
        status: 'Berjamaah di Masjid',
        location: 'Masjid Jami\' Al-Hikmah'
      });
    });
    addNotification(`Semua santri rombel ditandai "Berjamaah di Masjid" untuk shalat ${selectedPrayer}!`);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Sunrise className="w-5 h-5 text-emerald-600" />
            <span>e-Presensi Shalat Fardhu Berjamaah & Dhuha</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitoring disiplin ibadah santri (Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya di Masjid).
          </p>
        </div>

        <button
          onClick={handleMarkAllCongregational}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Semua Berjamaah</span>
        </button>
      </div>

      {/* Prayer Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {prayers.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedPrayer === p.name;
          return (
            <button
              key={p.name}
              onClick={() => setSelectedPrayer(p.name)}
              className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between h-24 ${
                isSelected
                  ? `bg-gradient-to-br ${p.bg} text-white border-transparent shadow-lg scale-[1.02]`
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {p.time}
                </span>
              </div>
              <div>
                <p className="font-bold text-sm">{p.name}</p>
                <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {isSelected ? 'Sedang Dipilih' : 'Presensi'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Tanggal:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Rombel:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              {classrooms.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-slate-400">
          Shalat <strong className="text-emerald-600 dark:text-emerald-400">{selectedPrayer}</strong> ({classStudents.length} Santri)
        </span>
      </div>

      {/* Attendance List */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Santri / Rombel</th>
                <th className="p-3.5">NISN</th>
                <th className="p-3.5">Status Presensi Shalat</th>
                <th className="p-3.5 text-center">Tindakan Cepat (Ubah Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {classStudents.map((std) => {
                const currentStatus = getStudentStatus(std.id);
                return (
                  <tr key={std.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={std.avatar}
                          alt={std.fullName}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{std.fullName}</p>
                          <p className="text-[11px] text-slate-400">{std.className}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">{std.nisn}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        currentStatus === 'Berjamaah di Masjid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        currentStatus === 'Munfarid (Sendiri)' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        currentStatus === 'Masbuq' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {currentStatus}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center justify-center space-x-1">
                        {(['Berjamaah di Masjid', 'Munfarid (Sendiri)', 'Masbuq', 'Udzur Syar\'i / Sakit'] as PrayerStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(std, st)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                              currentStatus === st
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {st === 'Berjamaah di Masjid' ? 'Berjamaah' :
                             st === 'Munfarid (Sendiri)' ? 'Munfarid' :
                             st === 'Masbuq' ? 'Masbuq' : 'Udzur'}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
