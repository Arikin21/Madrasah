import React, { useState } from 'react';
import { 
  Users, Plus, Phone, Mail, Award, BookOpen, 
  MapPin, CheckCircle, Search, Trash2, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Staff } from '../../types';

export const StaffManagement: React.FC = () => {
  const { staff, addStaff, deleteStaff, searchQuery } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState<Omit<Staff, 'id'>>({
    nip: '',
    nuptk: '',
    fullName: '',
    gender: 'Laki-laki',
    role: 'Guru Mapel',
    position: 'Guru Pengampu Fiqih & Bahasa Arab',
    phone: '',
    email: '',
    education: 'S1 Dirasat Islamiyah, Al-Azhar University Kairo',
    isCertified: true,
    baseSalary: 4500000,
    teachingSubjects: ['Fiqih', 'Bahasa Arab'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });

  const filteredStaff = staff.filter(st => {
    const matchesSearch = 
      st.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.nip.includes(searchQuery);

    const matchesRole = selectedRole === 'all' || st.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Direktori Kepegawaian & Dewan Asatidz / Guru</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Database profil pendidik, NUPTK, riwayat sanad keilmuan, dan penugasan jam mengajar.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Guru / Ustadz</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs overflow-x-auto">
        {['all', 'Kepala Madrasah', 'Guru Mapel', 'Wali Kelas', 'Pembina Asrama', 'Tata Usaha'].map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedRole === r
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {r === 'all' ? 'Semua Amanah' : r}
          </button>
        ))}
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((st) => (
          <div
            key={st.id}
            className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={st.avatar}
                    alt={st.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{st.fullName}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {st.position}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="space-y-1 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl">
                  <p className="font-mono text-[11px]">NIP: {st.nip}</p>
                  <p className="font-mono text-[11px]">NUPTK: {st.nuptk}</p>
                  <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">{st.education}</p>
                </div>

                <div className="flex items-center space-x-2 pt-1 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{st.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{st.email}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                st.isCertified ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-slate-100 text-slate-600'
              }`}>
                {st.isCertified ? 'Sertifikasi Kemenag' : 'Non-Sertifikasi'}
              </span>

              <button
                onClick={() => deleteStaff(st.id)}
                className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg text-rose-600 transition-colors"
                title="Hapus Staff"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Registrasi Pendidik / Tenaga Kependidikan</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Ustadz Dr. H. M. Ridwan, Lc., M.Ag"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">NIP</label>
                  <input
                    type="text"
                    value={form.nip}
                    onChange={(e) => setForm({ ...form, nip: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
                    placeholder="198502142010011005"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">NUPTK</label>
                  <input
                    type="text"
                    value={form.nuptk}
                    onChange={(e) => setForm({ ...form, nuptk: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
                    placeholder="8472910382910294"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Amanah / Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Guru Mapel">Guru Mapel</option>
                    <option value="Wali Kelas">Wali Kelas</option>
                    <option value="Pembina Asrama">Pembina Asrama / Musyrif</option>
                    <option value="Tata Usaha">Tata Usaha</option>
                    <option value="Kepala Madrasah">Kepala Madrasah</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jabatan Spesifik</label>
                  <input
                    type="text"
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Guru Bahasa Arab & Tahfidz"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Riwayat Pendidikan & Sanad Keilmuan</label>
                <input
                  type="text"
                  required
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. S1 Universitas Al-Azhar Kairo • Sanad Jazariyyah"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">No. WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="0812-4455-6677"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Email Madrasah</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="ustadz@alhikmah.sch.id"
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
                  Simpan Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
