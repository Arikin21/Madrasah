import React, { useState } from 'react';
import { 
  FileText, Printer, Search, Award, BookOpen, CheckCircle, 
  Sparkles, Download, User, Calendar 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReportCard, Student } from '../../types';

export const ReportCardModule: React.FC = () => {
  const { reportCards, students, updateReportCardNarrative } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [isEditingNarrative, setIsEditingNarrative] = useState<boolean>(false);
  const [narrativeText, setNarrativeText] = useState<string>('');

  const currentReport = reportCards.find(r => r.studentId === selectedStudentId) || reportCards[0];
  const currentStudent = students.find(s => s.id === (currentReport?.studentId || selectedStudentId));

  const handlePrint = () => {
    window.print();
  };

  const handleSaveNarrative = () => {
    if (currentReport) {
      updateReportCardNarrative(currentReport.id, narrativeText);
      setIsEditingNarrative(false);
    }
  };

  if (!currentReport || !currentStudent) {
    return <div className="p-4 text-xs text-slate-500">Memuat data e-Rapor...</div>;
  }

  // Calculate average score
  const totalScore = currentReport.grades.reduce((acc, curr) => acc + curr.finalScore, 0);
  const averageScore = Math.round(totalScore / currentReport.grades.length);

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm no-print">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>e-Rapor Digital Madrasah (Kurikulum Merdeka & Kemenag)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Laporan Capaian Pembelajaran Akademik, Diniyah, Tahfidz, Sikap Spiritual, dan Ekstrakurikuler.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Select Student */}
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.fullName} ({s.className})</option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak e-Rapor PDF</span>
          </button>
        </div>
      </div>

      {/* Report Card Document Sheet */}
      <div className="bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-10 max-w-4xl mx-auto print-card">
        
        {/* Official Letterhead (KOP Rapor) */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h4>
          <h3 className="font-extrabold text-base text-emerald-900">MADRASAH ALIYAH UNGGULAN TAHFIDZ AL-HIKMAH</h3>
          <p className="text-[10px] text-slate-500">NSM: 131135730099 • NPSN: 69987654 • Terakreditasi A (Unggul)</p>
          <p className="text-[10px] text-slate-500">Alamat: Jl. Pesantren Al-Hikmah No. 45, Kota Malang • Telp: (0341) 554433</p>
        </div>

        <div className="text-center py-4">
          <h2 className="font-extrabold text-sm uppercase tracking-wide">
            LAPORAN HASIL BELAJAR (E-RAPOR MADRASAH)
          </h2>
          <span className="text-[11px] font-semibold text-slate-600">
            Tahun Ajaran: {currentReport.academicYear} • Semester: {currentReport.semester}
          </span>
        </div>

        {/* Student Biodata Summary */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <div className="space-y-1">
            <p><strong>Nama Santri:</strong> <span className="font-bold text-emerald-900">{currentStudent.fullName}</span></p>
            <p><strong>NISN / NIS:</strong> {currentStudent.nisn} / {currentStudent.nis}</p>
            <p><strong>Kelas / Rombel:</strong> {currentReport.className}</p>
          </div>
          <div className="space-y-1">
            <p><strong>Fase / Kurikulum:</strong> Fase F (Kurikulum Merdeka Kemenag)</p>
            <p><strong>Peminatan:</strong> {currentStudent.major}</p>
            <p><strong>Wali Kelas:</strong> {currentReport.homeroomTeacher}</p>
          </div>
        </div>

        {/* Table A: Academic & Religious Subjects */}
        <div className="space-y-2 mb-6">
          <h4 className="font-bold text-xs uppercase text-emerald-950 flex items-center space-x-1.5">
            <span>A. Capaian Nilai Akademik & Muatan Diniyah</span>
          </h4>
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-slate-100 font-bold border-b border-slate-300 text-slate-700">
              <tr>
                <th className="p-2 border-r border-slate-300 text-center w-8">No</th>
                <th className="p-2 border-r border-slate-300 text-left">Mata Pelajaran</th>
                <th className="p-2 border-r border-slate-300 text-center w-14">KKM</th>
                <th className="p-2 border-r border-slate-300 text-center w-14">Nilai</th>
                <th className="p-2 border-r border-slate-300 text-center w-14">Predikat</th>
                <th className="p-2 text-left">Deskripsi Capaian Kompetensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentReport.grades.map((grd, idx) => (
                <tr key={grd.subjectId}>
                  <td className="p-2 border-r border-slate-300 text-center font-mono">{idx + 1}</td>
                  <td className="p-2 border-r border-slate-300 font-semibold">{grd.subjectName}</td>
                  <td className="p-2 border-r border-slate-300 text-center">{grd.kkm}</td>
                  <td className="p-2 border-r border-slate-300 text-center font-bold text-emerald-800">{grd.finalScore}</td>
                  <td className="p-2 border-r border-slate-300 text-center font-bold">{grd.letterGrade}</td>
                  <td className="p-2 text-[11px] leading-relaxed text-slate-600">{grd.competencyNarrative}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-300">
              <tr>
                <td colSpan={3} className="p-2 text-right border-r border-slate-300">Rata-Rata Nilai Akhir:</td>
                <td className="p-2 text-center text-emerald-900 font-extrabold border-r border-slate-300">{averageScore}</td>
                <td colSpan={2} className="p-2 text-slate-600">Predikat Rata-rata: Amat Baik (A)</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Table B: Extracurricular & Spiritual Attitude */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-300 rounded-xl p-3 space-y-2">
            <h4 className="font-bold text-xs uppercase text-slate-800">B. Kegiatan Ekstrakurikuler</h4>
            <div className="space-y-1.5 text-xs">
              {currentReport.extracurriculars.map((ex, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="font-semibold">{ex.name}</span>
                  <span className="font-bold text-emerald-800">{ex.score} ({ex.description})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-300 rounded-xl p-3 space-y-2">
            <h4 className="font-bold text-xs uppercase text-slate-800">C. Sikap Spiritual & Sosial</h4>
            <div className="space-y-1 text-xs">
              <p><strong>Predikat Spiritual:</strong> {currentReport.spiritualAttitude.grade}</p>
              <p className="text-[11px] text-slate-600 italic">"{currentReport.spiritualAttitude.description}"</p>
              <p className="pt-1"><strong>Predikat Sosial:</strong> {currentReport.socialAttitude.grade}</p>
              <p className="text-[11px] text-slate-600 italic">"{currentReport.socialAttitude.description}"</p>
            </div>
          </div>
        </div>

        {/* Table C: Attendance & Tahfidz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-300 rounded-xl p-3">
            <h4 className="font-bold text-xs uppercase text-slate-800 mb-2">D. Rekapitulasi Kehadiran</h4>
            <div className="grid grid-cols-3 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Sakit</span>
                <p className="font-bold">{currentReport.attendanceSummary.sick} Hari</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Izin</span>
                <p className="font-bold">{currentReport.attendanceSummary.permission} Hari</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Alpa</span>
                <p className="font-bold">{currentReport.attendanceSummary.absent} Hari</p>
              </div>
            </div>
          </div>

          <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-3">
            <h4 className="font-bold text-xs uppercase text-teal-900 mb-2">E. Capaian Tahfidz Al-Qur'an</h4>
            <p className="text-xs">
              <strong>Total Hafalan Mutqin:</strong> <span className="font-bold text-teal-800">{currentStudent.tahfidzJuz} Juz</span>
            </p>
            <p className="text-[11px] text-teal-700 mt-1">
              Hafalan teruji pada Asesmen Tasmi' Bil Ghaib Juz 28, 29, 30 dengan kelancaran mumtaz.
            </p>
          </div>
        </div>

        {/* Homeroom Teacher's Note */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-xs uppercase text-slate-800">Catatan Wali Kelas:</h4>
            {!isEditingNarrative && (
              <button
                onClick={() => {
                  setNarrativeText(currentReport.homeroomNotes);
                  setIsEditingNarrative(true);
                }}
                className="text-[11px] text-emerald-700 font-semibold hover:underline no-print"
              >
                Ubah Catatan
              </button>
            )}
          </div>

          {isEditingNarrative ? (
            <div className="space-y-2 no-print">
              <textarea
                value={narrativeText}
                onChange={(e) => setNarrativeText(e.target.value)}
                rows={2}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditingNarrative(false)}
                  className="px-2 py-1 bg-slate-200 text-xs rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveNarrative}
                  className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{currentReport.homeroomNotes}"
            </p>
          )}
        </div>

        {/* Official Signatures */}
        <div className="grid grid-cols-3 text-center text-xs pt-4 gap-4">
          <div>
            <p>Mengetahui,</p>
            <p className="text-slate-600">Orang Tua / Wali Santri</p>
            <div className="h-16"></div>
            <p className="font-bold underline">({currentStudent.parentName})</p>
          </div>
          <div>
            <p>Kota Malang, 18 Desember 2026</p>
            <p className="text-slate-600">Wali Kelas,</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{currentReport.homeroomTeacher}</p>
          </div>
          <div>
            <p>Mengetahui,</p>
            <p className="text-slate-600">Kepala Madrasah</p>
            <div className="h-16"></div>
            <p className="font-bold underline">Dr. H. Ahmad Fauzi, M.Pd.I</p>
            <p className="text-[10px] text-slate-400 font-mono">NIP. 197804152003121002</p>
          </div>
        </div>

      </div>

    </div>
  );
};
