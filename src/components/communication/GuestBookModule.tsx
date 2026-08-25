import React, { useState } from 'react';
import { 
  Building2, Plus, Clock, User, Phone, CheckCircle, 
  Search, Calendar, Filter, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GuestBookEntry } from '../../types';

export const GuestBookModule: React.FC = () => {
  const { guestBook, addGuestEntry, updateGuestStatus } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState<Omit<GuestBookEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    guestName: '',
    institution: '',
    phone: '',
    purpose: '',
    meetWith: 'Kepala Madrasah',
    status: 'Menunggu'
  });

  const filteredGuests = guestBook.filter(g => {
    if (selectedStatus === 'all') return true;
    return g.status === selectedStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addGuestEntry(form);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>Buku Tamu Digital & Front Office Resepsionis</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registrasi kunjungan dinas Kemenag, wali santri, studi banding, dan tamu yayasan.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Registrasi Tamu Baru</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        {['all', 'Menunggu', 'Sedang Bertemu', 'Selesai'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedStatus === st
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {st === 'all' ? 'Semua Kunjungan' : st}
          </button>
        ))}
      </div>

      {/* Guest Book Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Waktu Kunjungan</th>
                <th className="p-3.5">Nama Tamu & No. Kontak</th>
                <th className="p-3.5">Asal Instansi / Lembaga</th>
                <th className="p-3.5">Maksud & Keperluan</th>
                <th className="p-3.5">Pejabat Dituju</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="font-bold text-slate-900 dark:text-white">{guest.time}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{guest.date}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                    <div>{guest.guestName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{guest.phone}</div>
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">{guest.institution}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs">{guest.purpose}</td>
                  <td className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">{guest.meetWith}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      guest.status === 'Selesai' ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                      guest.status === 'Sedang Bertemu' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <select
                      value={guest.status}
                      onChange={(e) => updateGuestStatus(guest.id, e.target.value as any)}
                      className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="Menunggu">Menunggu</option>
                      <option value="Sedang Bertemu">Sedang Bertemu</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Registrasi Tamu Madrasah</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nama Tamu</label>
                  <input
                    type="text"
                    required
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. H. Agus Wahyudi"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Asal Instansi / Lembaga</label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Kemenag Kota Malang"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">No. WhatsApp / HP</label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="0813-9876-5432"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pejabat yang Dituju</label>
                  <input
                    type="text"
                    required
                    value={form.meetWith}
                    onChange={(e) => setForm({ ...form, meetWith: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Kepala Madrasah / Waka Kurikulum"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Maksud & Keperluan Kunjungan</label>
                <textarea
                  required
                  rows={3}
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Koordinasi persiapan akreditasi madrasah & peninjauan asrama"
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
                  Simpan Buku Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
