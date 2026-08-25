import React, { useState } from 'react';
import { Layers, Plus, Users, UserCheck, MapPin, Calendar, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Classroom } from '../../types';

export const ClassManagement: React.FC = () => {
  const { classrooms, staff, addClassroom } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    gradeLevel: '10',
    major: 'Keagamaan / Diniyah',
    homeroomTeacherId: staff[0]?.id || '',
    homeroomTeacherName: staff[0]?.fullName || '',
    capacity: 32,
    academicYear: '2026/2027',
    roomNumber: 'Gedung Utama Lt. 2'
  });

  const handleTeacherChange = (teacherId: string) => {
    const t = staff.find(s => s.id === teacherId);
    if (t) {
      setForm({
        ...form,
        homeroomTeacherId: t.id,
        homeroomTeacherName: t.fullName
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClassroom({
      name: form.name,
      gradeLevel: form.gradeLevel,
      major: form.major,
      homeroomTeacherId: form.homeroomTeacherId,
      homeroomTeacherName: form.homeroomTeacherName,
      capacity: form.capacity,
      studentCount: 0,
      academicYear: form.academicYear,
      roomNumber: form.roomNumber
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Manajemen Kelas & Rombongan Belajar (Rombel)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Struktur kelas madrasah, penugasan wali kelas, alokasi ruangan, dan kapasitas santri.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kelas Baru</span>
        </button>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((cls) => (
          <div
            key={cls.id}
            className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Tingkat {cls.gradeLevel}
                </span>
                <span className="text-xs text-slate-400 font-mono">{cls.academicYear}</span>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{cls.name}</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{cls.major}</p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span>Wali Kelas: <strong>{cls.homeroomTeacherName}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{cls.roomNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Kapasitas: {cls.studentCount} / {cls.capacity} Santri</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Keterisian Rombel</span>
                <span>{Math.round((cls.studentCount / cls.capacity) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${(cls.studentCount / cls.capacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Buat Kelas / Rombongan Belajar Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Rombel / Kelas</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. XI Keagamaan 2 (Tahfidz)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tingkat Kelas</label>
                  <select
                    value={form.gradeLevel}
                    onChange={(e) => setForm({ ...form, gradeLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="10">Kelas 10 (Aliyah)</option>
                    <option value="11">Kelas 11 (Aliyah)</option>
                    <option value="12">Kelas 12 (Aliyah)</option>
                    <option value="7">Kelas 7 (Tsanawiyah)</option>
                    <option value="8">Kelas 8 (Tsanawiyah)</option>
                    <option value="9">Kelas 9 (Tsanawiyah)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Peminatan / Jurusan</label>
                  <select
                    value={form.major}
                    onChange={(e) => setForm({ ...form, major: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Keagamaan / Diniyah">Keagamaan / Diniyah</option>
                    <option value="MIPA (Matematika & IPA)">MIPA (Matematika & IPA)</option>
                    <option value="IPS (Ilmu Sosial)">IPS (Ilmu Sosial)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Wali Kelas</label>
                <select
                  value={form.homeroomTeacherId}
                  onChange={(e) => handleTeacherChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ruangan</label>
                  <input
                    type="text"
                    required
                    value={form.roomNumber}
                    onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Gedung Abu Bakar R.101"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kapasitas Maksimal</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
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
                  Simpan Rombel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
