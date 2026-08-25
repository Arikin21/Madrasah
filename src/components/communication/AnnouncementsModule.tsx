import React, { useState } from 'react';
import { 
  Bell, Plus, Send, Share2, Users, Calendar, 
  CheckCircle, MessageSquare, ExternalLink, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';

export const AnnouncementsModule: React.FC = () => {
  const { announcements, addAnnouncement, addNotification } = useApp();
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState<Omit<Announcement, 'id'>>({
    title: '',
    content: '',
    targetAudience: 'Semua',
    date: new Date().toISOString().split('T')[0],
    priority: 'Normal',
    author: 'Bagian Humas & Kesantrian',
    authorRole: 'Humas Madrasah'
  });

  const filteredAnnouncements = announcements.filter(a => {
    if (selectedTarget === 'all') return true;
    return a.targetAudience === selectedTarget;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(form);
    setIsAddModalOpen(false);
  };

  const handleBroadcastWa = (ann: Announcement) => {
    const text = encodeURIComponent(`*PENGUMUMAN MADRASAH AL-HIKMAH*\n\n*${ann.title}*\n\n${ann.content}\n\n_Tanggal: ${ann.date}_\n_Bagian Humas Madrasah_`);
    addNotification(`Pesan broadcast "${ann.title}" siap dikirimkan via WhatsApp!`);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <span>Papan Pengumuman & Broadcast Notifikasi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Publikasi surat edaran, agenda santri, libur nasional, dan integrasi WhatsApp wali murid.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Pengumuman Baru</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        {['all', 'Semua', 'Wali Santri', 'Ustadz / Guru', 'Siswa'].map((tgt) => (
          <button
            key={tgt}
            onClick={() => setSelectedTarget(tgt)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedTarget === tgt
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {tgt === 'all' ? 'Semua Sasaran' : `Sasaran: ${tgt}`}
          </button>
        ))}
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Untuk: {ann.targetAudience}
                  </span>
                  {ann.priority === 'Penting' || ann.priority === 'Darurat' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
                      {ann.priority.toUpperCase()}
                    </span>
                  ) : null}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{ann.date}</span>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Oleh: {ann.author}</span>
              <button
                onClick={() => handleBroadcastWa(ann)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl font-bold hover:bg-emerald-100 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Broadcast WA</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Publikasikan Pengumuman / Edaran Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Judul Pengumuman</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold"
                  placeholder="e.g. Edaran Libur Akhir Semester & Pembagian Rapor"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Sasaran Penerima</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Semua">Semua Civitas</option>
                    <option value="Wali Santri">Wali Santri / Orang Tua</option>
                    <option value="Ustadz / Guru">Ustadz & Guru</option>
                    <option value="Siswa">Santri / Siswa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pengirim / Bagian</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Isi Pengumuman</label>
                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl leading-relaxed"
                  placeholder="Tuliskan detail agenda atau instruksi pengumuman..."
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.priority === 'Penting'}
                  onChange={(e) => setForm({ ...form, priority: e.target.checked ? 'Penting' : 'Normal' })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-rose-600">Tandai sebagai Pengumuman Mendesak / Penting (Urgent)</span>
              </label>

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
                  Terbitkan Pengumuman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
