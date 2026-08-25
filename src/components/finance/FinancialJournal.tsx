import React, { useState } from 'react';
import { 
  DollarSign, Plus, ArrowUpRight, ArrowDownRight, 
  Download, Filter, Calendar, BookOpen, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FinancialJournalEntry } from '../../types';

export const FinancialJournal: React.FC = () => {
  const { journalEntries, addJournalEntry } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState<Omit<FinancialJournalEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'Pemasukan',
    category: 'SPP',
    amount: 1000000,
    recordedBy: 'Tata Usaha Keuangan',
    referenceNo: `KAS-${Date.now().toString().slice(-4)}`
  });

  const totalIncome = journalEntries
    .filter(j => j.type === 'Pemasukan')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = journalEntries
    .filter(j => j.type === 'Pengeluaran')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const filteredEntries = journalEntries.filter(entry => {
    if (selectedType === 'all') return true;
    return entry.type === selectedType;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry(form);
    setIsAddModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = ['Ref No', 'Tanggal', 'Keterangan', 'Kategori', 'Tipe', 'Nominal (Rp)', 'Petugas'];
    const rows = filteredEntries.map(e => [
      e.referenceNo,
      e.date,
      `"${e.description}"`,
      e.category,
      e.type,
      e.amount,
      `"${e.recordedBy}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Buku_Kas_Keuangan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>Buku Kas & Jurnal Keuangan Madrasah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pencatatan arus kas masuk (SPP, BOS Kemenag, Wakaf) dan kas operasional madrasah.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Laporan Kas</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Transaksi Kas</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <span>Total Pemasukan Kas</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
            Rp {totalIncome.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Dari SPP, Dana BOS, Donasi Wakaf</p>
        </div>

        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <span>Total Pengeluaran Kas</span>
            <ArrowDownRight className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-rose-900 dark:text-rose-200 font-mono">
            Rp {totalExpense.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400">Gaji ustadz, listrik, konsumsi santri</p>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-slate-300 text-xs font-semibold">
            <span>Saldo Kas Bersih Tersedia</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">
            Rp {currentBalance.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-slate-400">Kas Tunai & Rekening Giro BSI</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        {['all', 'Pemasukan', 'Pengeluaran'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedType === t
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {t === 'all' ? 'Semua Jurnal' : t}
          </button>
        ))}
      </div>

      {/* Journal Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">No. Ref</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Uraian / Keterangan Transaksi</th>
                <th className="p-3.5">Kategori Akun</th>
                <th className="p-3.5">Jenis Kas</th>
                <th className="p-3.5 text-right">Nominal (Rp)</th>
                <th className="p-3.5">Petugas TU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredEntries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-mono text-[11px] font-bold text-slate-500">{item.referenceNo}</td>
                  <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">{item.date}</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{item.description}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{item.category}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.type === 'Pemasukan'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className={`p-3.5 text-right font-mono font-bold ${
                    item.type === 'Pemasukan' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {item.type === 'Pemasukan' ? '+' : '-'}Rp {item.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-slate-400 text-[11px]">{item.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Journal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Catat Transaksi Buku Kas</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Jenis Transaksi</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="Pemasukan">Pemasukan (Debet)</option>
                    <option value="Pengeluaran">Pengeluaran (Kredit)</option>
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

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Uraian / Keterangan Transaksi</label>
                <input
                  type="text"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Pembelian kitab Fathul Qarib untuk santri baru"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategori Akun</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="SPP">SPP & Biaya Santri</option>
                    <option value="BOS Kemenag">Dana BOS Kemenag</option>
                    <option value="Wakaf & Donasi">Wakaf & Donasi Ummat</option>
                    <option value="Penggajian">Gaji & Honorarium</option>
                    <option value="Konsumsi & Dapur">Konsumsi & Dapur Asrama</option>
                    <option value="Utilitas">Listrik, Air & Internet</option>
                    <option value="Perlengkapan">Kitab & Sarpras</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nominal (Rp)</label>
                  <input
                    type="number"
                    required
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono"
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
                  Simpan Jurnal Kas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
