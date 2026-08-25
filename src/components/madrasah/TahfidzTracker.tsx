import React, { useState } from 'react';
import { 
  BookMarked, Plus, Search, Award, CheckCircle2, 
  Calendar, Star, User, BookOpen, Clock, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TahfidzRecord, Student } from '../../types';

export const TahfidzTracker: React.FC = () => {
  const { tahfidzRecords, students, staff, addTahfidzRecord } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [form, setForm] = useState<Omit<TahfidzRecord, 'id'>>({
    studentId: students[0]?.id || '',
    studentName: students[0]?.fullName || '',
    className: students[0]?.className || '',
    date: new Date().toISOString().split('T')[0],
    type: 'Ziyadah',
    surahName: 'Al-Baqarah',
    juz: 1,
    startAyah: 1,
    endAyah: 25,
    fluencyGrade: 'Mumtaz (Sangat Lancar)',
    tajweedGrade: 'A',
    teacherId: staff[0]?.id || '',
    teacherName: staff[0]?.fullName || '',
    notes: 'Makhraj huruf shad dan tha sudah sangat bagus'
  });

  const filteredRecords = tahfidzRecords.filter(rec => {
    const matchesStudent = selectedStudentId === 'all' || rec.studentId === selectedStudentId;
    const matchesType = selectedType === 'all' || rec.type === selectedType;
    return matchesStudent && matchesType;
  });

  const handleStudentSelect = (studentId: string) => {
    const std = students.find(s => s.id === studentId);
    if (std) {
      setForm({
        ...form,
        studentId: std.id,
        studentName: std.fullName,
        className: std.className
      });
    }
  };

  const handleTeacherSelect = (teacherId: string) => {
    const t = staff.find(s => s.id === teacherId);
    if (t) {
      setForm({ ...form, teacherId: t.id, teacherName: t.fullName });
    }
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    addTahfidzRecord(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookMarked className="w-5 h-5 text-teal-600" />
            <span>Pelacak Halaqah Tahfidz Al-Qur'an (Ziyadah & Murajaah)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pencatatan setoran hafalan baru, pengulangan hafalan mutqin, penilaian tajwid & makharijul huruf.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Input Setoran Tahfidz</span>
        </button>
      </div>

      {/* Overview Cards by Top Hafidz */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-teal-300 font-semibold">Total Setoran Pekan Ini</span>
            <BookOpen className="w-4 h-4 text-teal-300" />
          </div>
          <p className="text-2xl font-extrabold">{tahfidzRecords.length * 3 + 12} Sesi</p>
          <p className="text-[11px] text-teal-200">Ziyadah baru: 18 juz • Murajaah: 45 juz</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-200 font-semibold">Rata-rata Kelancaran</span>
            <Award className="w-4 h-4 text-emerald-300" />
          </div>
          <p className="text-2xl font-extrabold">Mumtaz (94%)</p>
          <p className="text-[11px] text-emerald-200">Kesesuaian standar Tajwid & Sifatul Huruf</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-semibold">Santri Hafidz Terbanyak</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-lg font-bold truncate">Muhammad Al-Fatih</p>
          <p className="text-[11px] text-amber-300 font-semibold">12.5 Juz Mutqin Bil Ghaib</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Santri:</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-teal-500 outline-none"
            >
              <option value="all">Semua Santri</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.fullName} ({s.tahfidzJuz} Juz)</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Jenis:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-bold focus:ring-1 focus:ring-teal-500 outline-none"
            >
              <option value="all">Semua Jenis</option>
              <option value="Ziyadah">Ziyadah (Hafalan Baru)</option>
              <option value="Murajaah">Murajaah (Ulang Hafalan)</option>
              <option value="Tasmi">Tasmi' (Ujian Bil Ghaib)</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400">
          Ditemukan <span className="font-bold text-teal-600 dark:text-teal-400">{filteredRecords.length}</span> log setoran
        </span>
      </div>

      {/* Tahfidz History Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Santri / Rombel</th>
                <th className="p-3.5">Jenis Setoran</th>
                <th className="p-3.5">Surat & Ayat</th>
                <th className="p-3.5">Juz</th>
                <th className="p-3.5">Kelancaran & Tajwid</th>
                <th className="p-3.5">Pengampu Halaqah</th>
                <th className="p-3.5">Catatan Ustadz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 text-slate-500 whitespace-nowrap">{rec.date}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{rec.studentName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{rec.className}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rec.type === 'Ziyadah' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      rec.type === 'Murajaah' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {rec.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    QS. {rec.surahName} (Ayat {rec.startAyah} - {rec.endAyah})
                  </td>
                  <td className="p-3.5 font-bold text-teal-600 dark:text-teal-400">Juz {rec.juz}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400">{rec.fluencyGrade}</div>
                    <div className="text-[11px] text-slate-400">Tajwid: {rec.tajweedGrade}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{rec.teacherName}</td>
                  <td className="p-3.5 text-slate-500 text-[11px] max-w-xs">{rec.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tahfidz Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-teal-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Pencatatan Setoran Hafalan Qur'an</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilih Santri</label>
                  <select
                    value={form.studentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.fullName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jenis Setoran</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Ziyadah">Ziyadah (Hafalan Baru)</option>
                    <option value="Murajaah">Murajaah (Ulang Hafalan)</option>
                    <option value="Tasmi">Tasmi' (Ujian Ulang Bil Ghaib)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Juz ke-</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={form.juz}
                    onChange={(e) => setForm({ ...form, juz: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Surat</label>
                  <input
                    type="text"
                    required
                    value={form.surahName}
                    onChange={(e) => setForm({ ...form, surahName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Al-Kahf / Yasin / Maryam"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ayat Awal</label>
                  <input
                    type="number"
                    value={form.startAyah}
                    onChange={(e) => setForm({ ...form, startAyah: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ayat Akhir</label>
                  <input
                    type="number"
                    value={form.endAyah}
                    onChange={(e) => setForm({ ...form, endAyah: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kelancaran</label>
                  <select
                    value={form.fluencyGrade}
                    onChange={(e) => setForm({ ...form, fluencyGrade: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Mumtaz (Sangat Lancar)">Mumtaz (Sangat Lancar)</option>
                    <option value="Jayyid Jiddan (Lancar)">Jayyid Jiddan (Lancar)</option>
                    <option value="Jayyid (Cukup)">Jayyid (Cukup)</option>
                    <option value="Maqbul (Perlu Ulang)">Maqbul (Perlu Ulang)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nilai Tajwid</label>
                  <select
                    value={form.tajweedGrade}
                    onChange={(e) => setForm({ ...form, tajweedGrade: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="A">A (Sangat Sesuai Kaidah)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C (Cukup)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ustadz Pengampu</label>
                <select
                  value={form.teacherId}
                  onChange={(e) => handleTeacherSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Catatan Evaluasi / Rekomendasi</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="Perhatikan ghunnah pada ayat 15 dan mad jaiz munfashil..."
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
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Setoran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
