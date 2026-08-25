import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, User, BookOpen, Layers, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScheduleItem } from '../../types';

export const ScheduleTimetable: React.FC = () => {
  const { schedules, classrooms, subjects, staff, addSchedule } = useApp();
  const [selectedClass, setSelectedClass] = useState<string>(classrooms[0]?.id || 'all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;

  const [form, setForm] = useState({
    classId: classrooms[0]?.id || '',
    className: classrooms[0]?.name || '',
    subjectId: subjects[0]?.id || '',
    subjectName: subjects[0]?.name || '',
    teacherId: staff[0]?.id || '',
    teacherName: staff[0]?.fullName || '',
    day: 'Senin' as ScheduleItem['day'],
    startTime: '07:30',
    endTime: '09:00',
    roomNumber: 'R.201'
  });

  const filteredSchedules = schedules.filter(sch => {
    const matchesClass = selectedClass === 'all' || sch.classId === selectedClass;
    const matchesDay = selectedDay === 'all' || sch.day === selectedDay;
    return matchesClass && matchesDay;
  });

  const handleClassSelect = (classId: string) => {
    const c = classrooms.find(cls => cls.id === classId);
    if (c) {
      setForm({ ...form, classId: c.id, className: c.name });
    }
  };

  const handleSubjectSelect = (subjectId: string) => {
    const s = subjects.find(sbj => sbj.id === subjectId);
    if (s) {
      setForm({ 
        ...form, 
        subjectId: s.id, 
        subjectName: s.name,
        teacherId: s.teacherId,
        teacherName: s.teacherName
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSchedule(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Jadwal Pelajaran & Halaqah Madrasah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pengaturan jadwal kegiatan belajar mengajar (KBM), jam halaqah tahfidz, dan laboratorium.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal KBM</span>
        </button>
      </div>

      {/* Class & Day Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Pilih Rombel:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">Semua Rombel</option>
              {classrooms.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Hari:</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="all">Semua Hari</option>
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-slate-400">
          Total <span className="font-bold text-emerald-600 dark:text-emerald-400">{filteredSchedules.length}</span> sesi pelajaran
        </span>
      </div>

      {/* Timetable Cards by Day */}
      <div className="space-y-4">
        {days.map((dayName) => {
          const dayItems = filteredSchedules.filter(s => s.day === dayName);
          if (dayItems.length === 0 && selectedDay !== 'all' && selectedDay !== dayName) return null;

          return (
            <div key={dayName} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-4 shadow-sm">
              <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-xl">
                  {dayName}
                </span>
                <span className="text-xs text-slate-400">{dayItems.length} Sesi Terjadwal</span>
              </div>

              {dayItems.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center italic">Tidak ada jadwal KBM pada hari {dayName} untuk filter ini.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dayItems.map((sch) => (
                    <div
                      key={sch.id}
                      className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-2 hover:border-emerald-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {sch.subjectName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                          {sch.startTime} - {sch.endTime}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center space-x-2 text-[11px]">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{sch.teacherName}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">{sch.className}</span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{sch.roomNumber}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Schedule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Jadwalkan Mata Pelajaran / Halaqah Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kelas / Rombel</label>
                  <select
                    value={form.classId}
                    onChange={(e) => handleClassSelect(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {classrooms.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Hari</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Mata Pelajaran</label>
                <select
                  value={form.subjectId}
                  onChange={(e) => handleSubjectSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code}) - {s.teacherName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jam Mulai</label>
                  <input
                    type="time"
                    required
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jam Selesai</label>
                  <input
                    type="time"
                    required
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ruangan / Tempat</label>
                <input
                  type="text"
                  required
                  value={form.roomNumber}
                  onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. R.201 / Musholla Lt. 2 / Lab Komputer"
                />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
