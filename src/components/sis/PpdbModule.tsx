import React, { useState } from 'react';
import { 
  UserPlus, CheckCircle2, Clock, XCircle, FileText, 
  Printer, Plus, Search, ChevronRight, BookOpen, Award, CheckSquare, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PpdbApplicant, PpdbStatus } from '../../types';

export const PpdbModule: React.FC = () => {
  const { ppdbApplicants, addPpdbApplicant, updatePpdbStatus, addNotification } = useApp();
  const [activeStage, setActiveStage] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<PpdbApplicant | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPrintCardModalOpen, setIsPrintCardModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: '',
    previousSchool: '',
    targetLevel: 'Kelas X (Aliyah)',
    targetMajor: 'Keagamaan / Tahfidz Unggulan',
    parentName: '',
    parentPhone: '',
    documents: {
      birthCertificate: true,
      familyCard: true,
      graduationCertificate: true,
      reportCard: true
    },
    notes: 'Pendaftar gelombang 1'
  });

  const stages: PpdbStatus[] = ['Daftar', 'Verifikasi Berkas', 'Tes Wawancara', 'Diterima', 'Ditolak'];

  const filteredApplicants = ppdbApplicants.filter(app => {
    if (activeStage === 'all') return true;
    return app.status === activeStage;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPpdbApplicant({
      fullName: form.fullName,
      previousSchool: form.previousSchool,
      targetLevel: form.targetLevel,
      targetMajor: form.targetMajor,
      parentName: form.parentName,
      parentPhone: form.parentPhone,
      documents: form.documents,
      status: 'Daftar',
      notes: form.notes
    });
    setIsRegisterModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <span>Penerimaan Peserta Didik Baru (PPDB Online)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Alur pendaftaran, verifikasi berkas, tes baca Al-Qur'an & wawancara, serta seleksi santri baru.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Formulir Daftar Baru</span>
        </button>
      </div>

      {/* Stage Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 pb-1 text-xs">
        <button
          onClick={() => setActiveStage('all')}
          className={`px-3 py-2 rounded-xl font-bold transition-all ${
            activeStage === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Semua Tahapan ({ppdbApplicants.length})
        </button>
        {stages.map((st) => {
          const count = ppdbApplicants.filter(a => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setActiveStage(st)}
              className={`px-3 py-2 rounded-xl font-semibold transition-all flex items-center space-x-1.5 ${
                activeStage === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>{st}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applicants List Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplicants.map((app) => (
          <div
            key={app.id}
            className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {app.registrationNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  app.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  app.status === 'Ditolak' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                  app.status === 'Tes Wawancara' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.fullName}</h4>
                <p className="text-slate-500 dark:text-slate-400">
                  Asal: <span className="font-medium text-slate-700 dark:text-slate-200">{app.previousSchool}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Pilihan: <span className="font-medium text-emerald-700 dark:text-emerald-400">{app.targetMajor}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Wali: {app.parentName} ({app.parentPhone})
                </p>
              </div>

              {/* Scores if evaluated */}
              {(app.quranReadingScore || app.interviewScore) && (
                <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl grid grid-cols-3 gap-1 text-center text-[10px]">
                  <div>
                    <span className="text-slate-400">Tes Qur'an</span>
                    <p className="font-bold text-teal-600">{app.quranReadingScore || '-'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Wawancara</span>
                    <p className="font-bold text-blue-600">{app.interviewScore || '-'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Akademik</span>
                    <p className="font-bold text-purple-600">{app.academicScore || '-'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedApplicant(app);
                  setIsPrintCardModalOpen(true);
                }}
                className="flex items-center space-x-1 text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Kartu Peserta</span>
              </button>

              <select
                value={app.status}
                onChange={(e) => updatePpdbStatus(app.id, e.target.value as PpdbStatus)}
                className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 outline-none"
              >
                {stages.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New PPDB Registration */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Formulir Pendaftaran Calon Santri Baru</h3>
              <button onClick={() => setIsRegisterModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Lengkap Calon Santri</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Fikri Robbani Ash-Shiddiq"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Asal Sekolah / MTs / SMP</label>
                  <input
                    type="text"
                    required
                    value={form.previousSchool}
                    onChange={(e) => setForm({ ...form, previousSchool: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. MTsN 1 Kota Malang"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilihan Peminatan / Jurusan</label>
                  <select
                    value={form.targetMajor}
                    onChange={(e) => setForm({ ...form, targetMajor: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Keagamaan / Tahfidz Unggulan">Keagamaan / Tahfidz Unggulan</option>
                    <option value="MIPA (Matematika & Sains Islam)">MIPA (Matematika & Sains Islam)</option>
                    <option value="IPS & Ekonomi Syariah">IPS & Ekonomi Syariah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. H. Mulyono Santoso"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">No. WhatsApp Wali</label>
                  <input
                    type="text"
                    required
                    value={form.parentPhone}
                    onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="0812-3344-5566"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Kelengkapan Berkas Fisik:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300 text-[11px]">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Akta Kelahiran</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Kartu Keluarga (KK)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Ijazah / SKL Asli</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Rapor 5 Semester</span>
                  </label>
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Printable Admission Card */}
      {isPrintCardModalOpen && selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between no-print">
              <h3 className="font-bold text-sm">Kartu Bukti Pendaftaran PPDB</h3>
              <button onClick={() => setIsPrintCardModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Card Area */}
            <div className="p-6 bg-white text-slate-900 space-y-4 print-card">
              {/* Institution Header */}
              <div className="text-center border-b-2 border-slate-800 pb-3">
                <h4 className="font-extrabold text-sm uppercase tracking-wide">YAYASAN PONDOK PESANTREN AL-HIKMAH</h4>
                <h3 className="font-bold text-base text-emerald-800">MADRASAH ALIYAH UNGGULAN & TAHFIDZ</h3>
                <p className="text-[10px] text-slate-500">Jl. Pesantren No. 45, Kota Malang • Telp: (0341) 554433 • Web: alhikmah.sch.id</p>
              </div>

              <div className="text-center">
                <span className="px-3 py-1 bg-slate-100 text-slate-900 font-bold text-xs rounded-full uppercase tracking-wider border border-slate-300">
                  KARTU TANDA PESERTA PPDB 2026/2027
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs pt-2">
                <div className="col-span-2 space-y-1.5">
                  <p><strong>No. Pendaftaran:</strong> <span className="font-mono text-emerald-700 font-bold">{selectedApplicant.registrationNumber}</span></p>
                  <p><strong>Nama Lengkap:</strong> {selectedApplicant.fullName}</p>
                  <p><strong>Asal Sekolah:</strong> {selectedApplicant.previousSchool}</p>
                  <p><strong>Peminatan:</strong> {selectedApplicant.targetMajor}</p>
                  <p><strong>Nama Orang Tua:</strong> {selectedApplicant.parentName}</p>
                  <p><strong>Tanggal Daftar:</strong> {selectedApplicant.submissionDate}</p>
                </div>
                <div className="border border-slate-300 rounded-lg flex flex-col items-center justify-center p-2 bg-slate-50 text-center">
                  <div className="w-20 h-24 bg-slate-200 border border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400">
                    Pas Foto 3x4
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono">SIAMadrasah</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] space-y-1">
                <p className="font-bold text-slate-800">Petunjuk Pelaksanaan Tes:</p>
                <p>1. Membawa kartu peserta ini dan bukti identitas saat jadwal tes wawancara & tasmi' Al-Qur'an.</p>
                <p>2. Berpakaian muslim/muslimah rapi dan bersepatu.</p>
              </div>

              <div className="flex justify-between items-end pt-3 text-[10px]">
                <div>
                  <p className="font-mono text-[9px] text-slate-400">Dicetak pada: {new Date().toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p>Ketua Panitia PPDB,</p>
                  <div className="h-10"></div>
                  <p className="font-bold underline">Ustadz Muhammad Ridwan, Lc</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end space-x-2 no-print">
              <button
                onClick={() => setIsPrintCardModalOpen(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kartu Peserta</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
