import React, { useState } from 'react';
import { BookOpen, Plus, Search, CheckCircle2, Award, User, Clock, Bookmark, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DiniyahKitab } from '../../types';

export const DiniyahKitabModule: React.FC = () => {
  const { diniyahKitabs, staff, addDiniyahKitab, updateKitabProgress } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState<Omit<DiniyahKitab, 'id'>>({
    kitabName: '',
    author: '',
    category: 'Fiqih',
    totalChapters: 20,
    currentChapter: 1,
    currentChapterTitle: 'Fasal Rukun Shalat & Syarat Sah',
    targetLevel: 'Kelas XI Keagamaan',
    teacherId: staff[0]?.id || '',
    teacherName: staff[0]?.fullName || '',
    scheduleDay: 'Selasa Ba\'da Ashar'
  });

  const categories = ['all', 'Fiqih', 'Nahwu & Sharaf', 'Hadits', 'Akhlaq / Tasawwuf', 'Aqidah / Tauhid'];

  const filteredKitabs = diniyahKitabs.filter(k => {
    if (selectedCategory === 'all') return true;
    return k.category === selectedCategory;
  });

  const handleTeacherSelect = (teacherId: string) => {
    const t = staff.find(s => s.id === teacherId);
    if (t) setForm({ ...form, teacherId: t.id, teacherName: t.fullName });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addDiniyahKitab(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Kajian Kitab Kuning & Dirasah Islamiyah (Diniyah)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pelacakan capaian bab/fasal pengajian kitab turots (Fiqih, Nahwu, Hadits, Akhlaq, Tauhid).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buka Kajian Kitab Baru</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {cat === 'all' ? 'Semua Fan Ilmu' : cat}
          </button>
        ))}
      </div>

      {/* Kitab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKitabs.map((kitab) => {
          const progressPercent = Math.round((kitab.currentChapter / kitab.totalChapters) * 100);
          return (
            <div
              key={kitab.id}
              className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    {kitab.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{kitab.targetLevel}</span>
                </div>

                <div className="mt-3 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Bookmark className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kitab {kitab.kitabName}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    Karya: {kitab.author}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1 text-xs">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Fasal / Bab Sedang Berlangsung:</span>
                    <p className="font-bold text-emerald-800 dark:text-emerald-300">{kitab.currentChapterTitle}</p>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ustadz Pengampu: <strong>{kitab.teacherName}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Waktu: {kitab.scheduleDay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Progres Khatam:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Bab {kitab.currentChapter} dari {kitab.totalChapters} ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => updateKitabProgress(kitab.id, Math.min(kitab.totalChapters, kitab.currentChapter + 1), `Fasal Lanjutan Bab ${kitab.currentChapter + 1}`)}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    + Update Bab Berikutnya
                  </button>
                  {kitab.currentChapter >= kitab.totalChapters && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
                      Khatam
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Kitab Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Buka Kajian Kitab Turots Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Kitab</label>
                  <input
                    type="text"
                    required
                    value={form.kitabName}
                    onChange={(e) => setForm({ ...form, kitabName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Fathul Mu'in / Al-Hikam"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pengarang / Muallif</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Syaikh Zainuddin Al-Malibari"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Fan / Bidang Ilmu</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Fiqih">Fiqih</option>
                    <option value="Nahwu & Sharaf">Nahwu & Sharaf</option>
                    <option value="Hadits">Hadits</option>
                    <option value="Akhlaq / Tasawwuf">Akhlaq / Tasawwuf</option>
                    <option value="Aqidah / Tauhid">Aqidah / Tauhid</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Sasaran Tingkat</label>
                  <input
                    type="text"
                    required
                    value={form.targetLevel}
                    onChange={(e) => setForm({ ...form, targetLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Kelas XII Keagamaan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Total Fasal / Bab</label>
                  <input
                    type="number"
                    value={form.totalChapters}
                    onChange={(e) => setForm({ ...form, totalChapters: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jadwal Pengajian</label>
                  <input
                    type="text"
                    required
                    value={form.scheduleDay}
                    onChange={(e) => setForm({ ...form, scheduleDay: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Senin & Kamis Ba'da Maghrib"
                  />
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
                  Simpan Kajian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
