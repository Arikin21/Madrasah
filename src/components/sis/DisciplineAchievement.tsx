import React, { useState } from 'react';
import { 
  Award, ShieldAlert, Plus, CheckCircle2, AlertTriangle, 
  Trash2, Search, Filter, Calendar, Trophy, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DisciplineRecord, AchievementRecord } from '../../types';

export const DisciplineAchievement: React.FC = () => {
  const { students, disciplines, achievements, addDiscipline, addAchievement } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'discipline' | 'achievements'>('achievements');
  
  const [isAddDisciplineOpen, setIsAddDisciplineOpen] = useState(false);
  const [isAddAchievementOpen, setIsAddAchievementOpen] = useState(false);

  // Forms
  const [discForm, setDiscForm] = useState<Omit<DisciplineRecord, 'id'>>({
    studentId: students[0]?.id || '',
    studentName: students[0]?.fullName || '',
    className: students[0]?.className || '',
    date: new Date().toISOString().split('T')[0],
    violationType: '',
    category: 'Ringan',
    penaltyPoints: 5,
    actionTaken: '',
    reportedBy: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    status: 'Selesai'
  });

  const [achForm, setAchForm] = useState<Omit<AchievementRecord, 'id'>>({
    studentId: students[0]?.id || '',
    studentName: students[0]?.fullName || '',
    className: students[0]?.className || '',
    title: '',
    level: 'Nasional',
    category: 'Tahfidz & Diniyah',
    rank: 'Juara 1',
    date: new Date().toISOString().split('T')[0],
    organizer: ''
  });

  const handleStudentSelectDiscipline = (studentId: string) => {
    const std = students.find(s => s.id === studentId);
    if (std) {
      setDiscForm({
        ...discForm,
        studentId: std.id,
        studentName: std.fullName,
        className: std.className
      });
    }
  };

  const handleStudentSelectAchievement = (studentId: string) => {
    const std = students.find(s => s.id === studentId);
    if (std) {
      setAchForm({
        ...achForm,
        studentId: std.id,
        studentName: std.fullName,
        className: std.className
      });
    }
  };

  const handleSaveDiscipline = (e: React.FormEvent) => {
    e.preventDefault();
    addDiscipline(discForm);
    setIsAddDisciplineOpen(false);
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    addAchievement(achForm);
    setIsAddAchievementOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Rekam Jejak Prestasi & Kedisiplinan Santri</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pencatatan prestasi lomba keagamaan/sains dan pemantauan pelanggaran tata tertib madrasah.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeSubTab === 'achievements' ? (
            <button
              onClick={() => setIsAddAchievementOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Prestasi Baru</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddDisciplineOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Pelanggaran</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        <button
          onClick={() => setActiveSubTab('achievements')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeSubTab === 'achievements'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Prestasi Santri ({achievements.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('discipline')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all ${
            activeSubTab === 'discipline'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Catatan Kedisiplinan ({disciplines.length})</span>
        </button>
      </div>

      {/* ACHIEVEMENTS TAB */}
      {activeSubTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {ach.level}
                  </span>
                  <span className="text-[11px] text-slate-400">{ach.date}</span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-600 font-bold">
                    <Trophy className="w-4 h-4" />
                    <span>{ach.rank}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {ach.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Santri: <strong className="text-emerald-600 dark:text-emerald-400">{ach.studentName}</strong> ({ach.className})
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Penyelenggara: {ach.organizer}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Kategori: {ach.category}</span>
                <span className="text-emerald-600 font-semibold">Tervalidasi</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DISCIPLINE TAB */}
      {activeSubTab === 'discipline' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Santri / Rombel</th>
                  <th className="p-3.5">Bentuk Pelanggaran</th>
                  <th className="p-3.5">Kategori & Poin</th>
                  <th className="p-3.5">Tindakan / Sanksi Edukatif</th>
                  <th className="p-3.5">Pelapor</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {disciplines.map((disc) => (
                  <tr key={disc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">{disc.date}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{disc.studentName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{disc.className}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{disc.violationType}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        disc.category === 'Berat' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        disc.category === 'Sedang' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {disc.category} (+{disc.penaltyPoints} Poin)
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs">{disc.actionTaken}</td>
                    <td className="p-3.5 text-slate-400 text-[11px]">{disc.reportedBy}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full font-bold text-[10px]">
                        {disc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Achievement Modal */}
      {isAddAchievementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-amber-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Dokumentasi Prestasi Santri</h3>
              <button onClick={() => setIsAddAchievementOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilih Santri</label>
                <select
                  value={achForm.studentId}
                  onChange={(e) => handleStudentSelectAchievement(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.className})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Kejuaraan / Prestasi</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Juara 1 Musabaqah Hifdzil Qur'an 20 Juz"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tingkat</label>
                  <select
                    value={achForm.level}
                    onChange={(e) => setAchForm({ ...achForm, level: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Sekolah">Sekolah</option>
                    <option value="Kecamatan/Kota">Kecamatan/Kota</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Peringkat</label>
                  <select
                    value={achForm.rank}
                    onChange={(e) => setAchForm({ ...achForm, rank: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Juara 1">Juara 1</option>
                    <option value="Juara 2">Juara 2</option>
                    <option value="Juara 3">Juara 3</option>
                    <option value="Harapan">Harapan</option>
                    <option value="Peserta Terbaik">Peserta Terbaik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Penyelenggara</label>
                <input
                  type="text"
                  required
                  value={achForm.organizer}
                  onChange={(e) => setAchForm({ ...achForm, organizer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Kementerian Agama RI & LPTQ"
                />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddAchievementOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Discipline Modal */}
      {isAddDisciplineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-rose-700 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Catat Pelanggaran Tata Tertib</h3>
              <button onClick={() => setIsAddDisciplineOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDiscipline} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilih Santri</label>
                <select
                  value={discForm.studentId}
                  onChange={(e) => handleStudentSelectDiscipline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.className})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Bentuk Pelanggaran</label>
                <input
                  type="text"
                  required
                  value={discForm.violationType}
                  onChange={(e) => setDiscForm({ ...discForm, violationType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Terlambat shalat berjamaah / membawa HP tanpa izin"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategori</label>
                  <select
                    value={discForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setDiscForm({ 
                        ...discForm, 
                        category: cat,
                        penaltyPoints: cat === 'Ringan' ? 5 : cat === 'Sedang' ? 10 : 25
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Ringan">Ringan (5 Poin)</option>
                    <option value="Sedang">Sedang (10 Poin)</option>
                    <option value="Berat">Berat (25 Poin)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Poin Pelanggaran</label>
                  <input
                    type="number"
                    value={discForm.penaltyPoints}
                    onChange={(e) => setDiscForm({ ...discForm, penaltyPoints: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tindakan / Sanksi Edukatif</label>
                <textarea
                  required
                  value={discForm.actionTaken}
                  onChange={(e) => setDiscForm({ ...discForm, actionTaken: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Setoran murajaah surat Al-Mulk dan teguran lisan"
                />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddDisciplineOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
