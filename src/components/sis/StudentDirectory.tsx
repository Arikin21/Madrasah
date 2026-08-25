import React, { useState } from 'react';
import { 
  Users, Search, Plus, Filter, Download, Eye, Edit2, 
  Trash2, Award, ShieldAlert, Heart, Phone, MapPin, 
  CheckCircle2, XCircle, Clock, BookMarked, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

export const StudentDirectory: React.FC = () => {
  const { students, classrooms, addStudent, updateStudent, deleteStudent, searchQuery } = useApp();
  
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State for new student
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    nisn: '',
    nis: '',
    fullName: '',
    gender: 'Laki-laki',
    birthPlace: 'Surabaya',
    birthDate: '2009-01-01',
    currentClassId: classrooms[0]?.id || 'cls-1',
    className: classrooms[0]?.name || 'XII Keagamaan 1',
    gradeLevel: '12',
    major: 'Keagamaan / Diniyah',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2026-07-15',
    parentName: '',
    parentPhone: '',
    parentAddress: '',
    medicalHistory: {
      bloodType: 'O',
      allergies: [],
      specialNotes: 'Sehat wal afiat'
    },
    sppStatus: 'Lunas',
    tahfidzJuz: 5.0,
    disciplinePoints: 0,
    achievementsCount: 0
  });

  // Filter logic
  const filteredStudents = students.filter(std => {
    const matchesSearch = 
      std.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.nisn.includes(searchQuery) ||
      std.nis.includes(searchQuery) ||
      std.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClass === 'all' || std.currentClassId === selectedClass;
    const matchesStatus = selectedStatus === 'all' || std.sppStatus === selectedStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleExportCsv = () => {
    const headers = ['NISN', 'NIS', 'Nama Lengkap', 'Jenis Kelamin', 'Kelas', 'Hafalan (Juz)', 'Status SPP', 'Poin Pelanggaran', 'Nama Wali', 'No HP Wali'];
    const rows = filteredStudents.map(s => [
      s.nisn,
      s.nis,
      s.fullName,
      s.gender,
      s.className,
      s.tahfidzJuz,
      s.sppStatus,
      s.disciplinePoints,
      `"${s.parentName}"`,
      s.parentPhone
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Santri_SIAMadrasah_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const targetClass = classrooms.find(c => c.id === formData.currentClassId);
    addStudent({
      ...formData,
      className: targetClass ? targetClass.name : formData.className
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Direktori Santri & Sistem Informasi Siswa</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manajemen profil santri, data akademik, riwayat medis, dan kontak wali murid.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Santri Baru</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center space-x-1.5 text-slate-500">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-semibold">Filter:</span>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-slate-600 dark:text-slate-400">Kelas / Rombel:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 outline-none"
          >
            <option value="all">Semua Rombel</option>
            {classrooms.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-slate-600 dark:text-slate-400">Status SPP:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-emerald-500 outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Tunggakan">Tunggakan</option>
            <option value="Sebagian">Sebagian</option>
          </select>
        </div>

        <span className="ml-auto text-slate-400">
          Ditemukan <span className="font-bold text-emerald-600 dark:text-emerald-400">{filteredStudents.length}</span> santri
        </span>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Santri / Siswa</th>
                <th className="p-3.5">NISN / NIS</th>
                <th className="p-3.5">Kelas & Jurusan</th>
                <th className="p-3.5">Capaian Tahfidz</th>
                <th className="p-3.5">Status SPP</th>
                <th className="p-3.5">Poin Disiplin</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredStudents.map((std) => (
                <tr 
                  key={std.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={std.avatar}
                        alt={std.fullName}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{std.fullName}</p>
                        <p className="text-[11px] text-slate-400">{std.gender} • Wali: {std.parentName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px]">
                    <div>{std.nisn}</div>
                    <div className="text-slate-400">NIS: {std.nis}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{std.className}</span>
                    <p className="text-[11px] text-slate-400">{std.major}</p>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-1.5">
                      <BookMarked className="w-3.5 h-3.5 text-teal-600" />
                      <span className="font-bold text-teal-700 dark:text-teal-400">{std.tahfidzJuz} Juz</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      std.sppStatus === 'Lunas'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : std.sppStatus === 'Tunggakan'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {std.sppStatus}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`font-semibold ${std.disciplinePoints > 0 ? 'text-amber-600 font-bold' : 'text-slate-500'}`}>
                      {std.disciplinePoints} Poin
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => setSelectedStudent(std)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"
                        title="Lihat Profil Lengkap"
                      >
                        <Eye className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button
                        onClick={() => deleteStudent(std.id)}
                        className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg text-rose-600"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Student Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.fullName}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-white/40"
                />
                <div>
                  <h3 className="text-base font-bold">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-emerald-200">NISN: {selectedStudent.nisn} • {selectedStudent.className}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 hover:bg-white/10 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-400 font-semibold">Tempat, Tanggal Lahir</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                    {selectedStudent.birthPlace}, {selectedStudent.birthDate}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-400 font-semibold">Capaian Tahfidz Al-Qur'an</span>
                  <p className="font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                    {selectedStudent.tahfidzJuz} Juz Mutqin
                  </p>
                </div>
              </div>

              {/* Parents / Wali Info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Informasi Orang Tua / Wali Murid</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <p><strong>Nama Wali:</strong> {selectedStudent.parentName}</p>
                  <p><strong>No. WhatsApp:</strong> {selectedStudent.parentPhone}</p>
                  <p className="sm:col-span-2"><strong>Alamat Domisili:</strong> {selectedStudent.parentAddress}</p>
                </div>
              </div>

              {/* Medical History */}
              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-xl space-y-1 text-rose-900 dark:text-rose-200">
                <h4 className="font-bold flex items-center space-x-2 text-rose-800 dark:text-rose-300">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Catatan Riwayat Medis & Kesehatan</span>
                </h4>
                <p><strong>Golongan Darah:</strong> {selectedStudent.medicalHistory.bloodType}</p>
                <p><strong>Alergi:</strong> {selectedStudent.medicalHistory.allergies.join(', ') || 'Tidak ada alergi tercatat'}</p>
                <p><strong>Catatan Khusus:</strong> {selectedStudent.medicalHistory.specialNotes}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Registrasi Data Santri / Siswa Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap Santri</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Ahmad Faiz Al-Kautsar"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">NISN (10 Digit)</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
                    placeholder="0098765432"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">NIS Lokal</label>
                  <input
                    type="text"
                    required
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
                    placeholder="20261009"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kelas / Rombel</label>
                  <select
                    value={formData.currentClassId}
                    onChange={(e) => setFormData({ ...formData, currentClassId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {classrooms.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. H. Bambang Sudaryanto"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">No. HP / WhatsApp Wali</label>
                  <input
                    type="text"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="0812-3456-7890"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap</label>
                <textarea
                  value={formData.parentAddress}
                  onChange={(e) => setFormData({ ...formData, parentAddress: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="Jl. Raya Pesantren No. 10, Surabaya"
                />
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
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
                  Simpan Santri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
