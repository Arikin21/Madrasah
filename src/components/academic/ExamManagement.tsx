import React, { useState } from 'react';
import { 
  FileSpreadsheet, Plus, Printer, Calendar, Clock, 
  MapPin, CheckCircle, Search, FileText, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExamSchedule, Student } from '../../types';

export const ExamManagement: React.FC = () => {
  const { exams, classrooms, subjects, students, addExamSchedule } = useApp();
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil',
    type: 'ASTS' as ExamSchedule['type'],
    subjectId: subjects[0]?.id || '',
    subjectName: subjects[0]?.name || '',
    classId: classrooms[0]?.id || '',
    className: classrooms[0]?.name || '',
    date: '2026-09-20',
    startTime: '08:00',
    endTime: '09:30',
    roomNumber: 'R. 101 - R. 104',
    academicYear: '2026/2027 Ganjil'
  });

  const handleSubjectChange = (subjectId: string) => {
    const s = subjects.find(sb => sb.id === subjectId);
    if (s) setForm({ ...form, subjectId: s.id, subjectName: s.name });
  };

  const handleClassChange = (classId: string) => {
    const c = classrooms.find(cl => cl.id === classId);
    if (c) setForm({ ...form, classId: c.id, className: c.name });
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    addExamSchedule(form);
    setIsAddExamModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>Manajemen Asesmen & Ujian Madrasah (ASTS / ASAS)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jadwal ujian tulis, ujian lisan bahasa Arab/Tahfidz, pengawas ruang, dan cetak kartu ujian.
          </p>
        </div>

        <button
          onClick={() => setIsAddExamModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwal Ujian Baru</span>
        </button>
      </div>

      {/* Quick Action: Generate Printable Exam Card for Any Student */}
      <div className="p-4 bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="font-bold text-sm">Cetak Kartu Tanda Peserta Ujian / Asesmen</h3>
          <p className="text-xs text-teal-200">Pilih santri untuk mencetak kartu ujian berfoto resmi dengan jadwal mata pelajaran.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            onChange={(e) => {
              const std = students.find(s => s.id === e.target.value);
              if (std) setSelectedStudentForCard(std);
            }}
            className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-1.5 text-xs font-medium outline-none"
          >
            <option value="" className="text-slate-800">-- Pilih Santri --</option>
            {students.map(s => (
              <option key={s.id} value={s.id} className="text-slate-800">{s.fullName} ({s.className})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Exam Schedules Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Nama Asesmen / Ujian</th>
                <th className="p-3.5">Mata Pelajaran</th>
                <th className="p-3.5">Sasaran Kelas</th>
                <th className="p-3.5">Tanggal Pelaksanaan</th>
                <th className="p-3.5">Waktu</th>
                <th className="p-3.5">Ruangan</th>
                <th className="p-3.5">Tipe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {exams.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{ex.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{ex.academicYear}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-700 dark:text-emerald-400">{ex.subjectName}</td>
                  <td className="p-3.5">{ex.className}</td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">{ex.date}</td>
                  <td className="p-3.5 font-mono font-semibold">{ex.startTime} - {ex.endTime}</td>
                  <td className="p-3.5 text-slate-500">{ex.roomNumber}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {ex.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Exam Card Modal */}
      {selectedStudentForCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between no-print">
              <h3 className="font-bold text-sm">Pratinjau Kartu Peserta Ujian</h3>
              <button onClick={() => setSelectedStudentForCard(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-white text-slate-900 space-y-4 print-card">
              <div className="text-center border-b-2 border-slate-800 pb-2">
                <h4 className="font-bold text-xs uppercase">MADRASAH ALIYAH UNGGULAN & TAHFIDZ AL-HIKMAH</h4>
                <h3 className="font-extrabold text-sm text-emerald-800">KARTU PESERTA ASESMEN SUMATIF (ASTS/ASAS)</h3>
                <p className="text-[9px] text-slate-500">Tahun Ajaran 2026/2027 Semester Ganjil</p>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={selectedStudentForCard.avatar}
                  alt={selectedStudentForCard.fullName}
                  className="w-16 h-20 object-cover border border-slate-400 rounded"
                />
                <div className="text-xs space-y-1">
                  <p><strong>Nama:</strong> {selectedStudentForCard.fullName}</p>
                  <p><strong>NISN / NIS:</strong> {selectedStudentForCard.nisn} / {selectedStudentForCard.nis}</p>
                  <p><strong>Kelas / Jurusan:</strong> {selectedStudentForCard.className}</p>
                  <p><strong>No. Peserta:</strong> <span className="font-mono font-bold text-emerald-700">ASTS-2026-{selectedStudentForCard.nis}</span></p>
                </div>
              </div>

              <table className="w-full text-[10px] border border-slate-300">
                <thead className="bg-slate-100 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-1.5 border-r border-slate-300 text-left">Mata Ujian</th>
                    <th className="p-1.5 border-r border-slate-300 text-center">Tanggal</th>
                    <th className="p-1.5 border-r border-slate-300 text-center">Waktu</th>
                    <th className="p-1.5 text-center">Paraf Pengawas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {exams.slice(0, 4).map((ex, idx) => (
                    <tr key={idx}>
                      <td className="p-1.5 border-r border-slate-300 font-semibold">{ex.subjectName}</td>
                      <td className="p-1.5 border-r border-slate-300 text-center">{ex.date}</td>
                      <td className="p-1.5 border-r border-slate-300 text-center">{ex.startTime}</td>
                      <td className="p-1.5 text-center text-slate-300">______</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-end text-[10px] pt-2">
                <div>
                  <p className="text-[9px] text-slate-400">Dicetak otomatis dari Sistem SIAMadrasah</p>
                </div>
                <div className="text-center">
                  <p>Kepala Madrasah,</p>
                  <div className="h-8"></div>
                  <p className="font-bold underline">Dr. H. Ahmad Fauzi, M.Pd.I</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end space-x-2 no-print">
              <button
                onClick={() => setSelectedStudentForCard(null)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kartu Ujian</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Exam Schedule Modal */}
      {isAddExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Jadwalkan Ujian / Asesmen Baru</h3>
              <button onClick={() => setIsAddExamModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Asesmen</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tipe Asesmen</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="ASTS">ASTS (Tengah Semester)</option>
                    <option value="ASAS">ASAS (Akhir Semester)</option>
                    <option value="Ujian Madrasah">Ujian Madrasah (UM)</option>
                    <option value="Tasmi Tahfidz">Tasmi' Tahfidz</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Mata Pelajaran</label>
                  <select
                    value={form.subjectId}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kelas / Rombel</label>
                  <select
                    value={form.classId}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {classrooms.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Waktu Mulai</label>
                  <input
                    type="time"
                    required
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Waktu Selesai</label>
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
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Ruangan Pengawas</label>
                <input
                  type="text"
                  required
                  value={form.roomNumber}
                  onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddExamModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Jadwal Ujian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
