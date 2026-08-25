import React, { useState } from 'react';
import { BookOpen, Plus, Search, BookMarked, User, Clock, Award, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Subject } from '../../types';

export const SubjectCurriculum: React.FC = () => {
  const { subjects, staff, addSubject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState({
    code: '',
    name: '',
    category: 'Kemenag / Agama' as Subject['category'],
    kkm: 75,
    creditHours: 3,
    teacherId: staff[0]?.id || '',
    teacherName: staff[0]?.fullName || '',
    description: ''
  });

  const filteredSubjects = subjects.filter(sbj => {
    if (selectedCategory === 'all') return true;
    return sbj.category === selectedCategory;
  });

  const handleTeacherChange = (teacherId: string) => {
    const t = staff.find(s => s.id === teacherId);
    if (t) {
      setForm({ ...form, teacherId: t.id, teacherName: t.fullName });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Struktur Kurikulum & Mata Pelajaran Madrasah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Integrasi Kurikulum Nasional Kemendikbud & Kurikulum Kemenag (Diniyah, Nahwu, Fiqih, Tahfidz).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mata Pelajaran</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        {['all', 'Kemenag / Agama', 'Umum', 'Muatan Lokal'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {cat === 'all' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sbj) => (
          <div
            key={sbj.id}
            className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {sbj.code}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  {sbj.category}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sbj.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {sbj.description}
                </p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pengampu: <strong>{sbj.teacherName}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Beban: {sbj.creditHours} Jam Pelajaran / Pekan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">KKM / Kriteria:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{sbj.kkm} Poin</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Tambah Mata Pelajaran Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kode Mapel</label>
                  <input
                    type="text"
                    required
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono uppercase"
                    placeholder="e.g. TWH-07"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Kemenag / Agama">Kemenag / Agama (Diniyah)</option>
                    <option value="Umum">Umum (Kemendikbud)</option>
                    <option value="Muatan Lokal">Muatan Lokal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Ilmu Falak & Astronomi Islam"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Guru Pengampu</label>
                <select
                  value={form.teacherId}
                  onChange={(e) => handleTeacherChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">KKM Minimum</label>
                  <input
                    type="number"
                    value={form.kkm}
                    onChange={(e) => setForm({ ...form, kkm: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jam Pelajaran / Pekan</label>
                  <input
                    type="number"
                    value={form.creditHours}
                    onChange={(e) => setForm({ ...form, creditHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Deskripsi & Ruang Lingkup Silabus</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="Kajian penentuan arah kiblat, waktu shalat, dan hisab rukyat..."
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
                  Simpan Mapel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
