import React, { useState } from 'react';
import { 
  CreditCard, Plus, Printer, CheckCircle2, Clock, 
  AlertCircle, Search, Download, DollarSign, Wallet, ShieldCheck, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FinanceInvoice, Student } from '../../types';

export const BillingInvoices: React.FC = () => {
  const { invoices, students, addInvoice, payInvoice, addNotification } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<FinanceInvoice | null>(null);
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<FinanceInvoice | null>(null);
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);

  // Payment Form
  const [payMethod, setPayMethod] = useState<'Transfer Bank Syariah' | 'QRIS' | 'Virtual Account' | 'Tunai / Kasir TU'>('Transfer Bank Syariah');

  // Form State for new invoice
  const [form, setForm] = useState<Omit<FinanceInvoice, 'id'>>({
    studentId: students[0]?.id || '',
    studentName: students[0]?.fullName || '',
    className: students[0]?.className || '',
    title: 'SPP & Uang Makan Asrama Oktober 2026',
    category: 'SPP Bulanan',
    amount: 1500000,
    dueDate: '2026-10-10',
    status: 'Belum Lunas',
    academicYear: '2026/2027 Ganjil'
  });

  const filteredInvoices = invoices.filter(inv => {
    if (selectedStatus === 'all') return true;
    return inv.status === selectedStatus;
  });

  const handleStudentSelect = (studentId: string) => {
    const s = students.find(std => std.id === studentId);
    if (s) {
      setForm({
        ...form,
        studentId: s.id,
        studentName: s.fullName,
        className: s.className
      });
    }
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    addInvoice(form);
    setIsAddInvoiceOpen(false);
  };

  const handleProcessPayment = () => {
    if (selectedInvoiceForPay) {
      payInvoice(selectedInvoiceForPay.id, payMethod);
      setSelectedInvoiceForPay(null);
    }
  };

  const handleExportCsv = () => {
    const headers = ['No Tagihan', 'Nama Santri', 'Kelas', 'Keterangan', 'Nominal (Rp)', 'Jatuh Tempo', 'Status', 'Metode Bayar'];
    const rows = filteredInvoices.map(i => [
      i.id,
      `"${i.studentName}"`,
      i.className,
      `"${i.title}"`,
      i.amount,
      i.dueDate,
      i.status,
      i.paymentMethod || '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tagihan_SPP_${new Date().toISOString().split('T')[0]}.csv`);
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
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>Manajemen Tagihan SPP & Pembayaran Santri</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pengelolaan tagihan SPP, infaq pembangunan, catering asrama, dan kwitansi resmi.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data</span>
          </button>
          <button
            onClick={() => setIsAddInvoiceOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Terbitkan Tagihan</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1 text-xs">
        {['all', 'Lunas', 'Belum Lunas', 'Menunggu Konfirmasi'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedStatus === st
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {st === 'all' ? 'Semua Tagihan' : st}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Santri / Rombel</th>
                <th className="p-3.5">Keterangan Tagihan</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Nominal (Rp)</th>
                <th className="p-3.5">Jatuh Tempo</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{inv.studentName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{inv.className}</div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">{inv.title}</td>
                  <td className="p-3.5 text-slate-500">{inv.category}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                    Rp {inv.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 font-mono text-slate-500">{inv.dueDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      inv.status === 'Belum Lunas' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      {inv.status === 'Lunas' ? (
                        <button
                          onClick={() => setSelectedInvoiceForReceipt(inv)}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Kwitansi</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedInvoiceForPay(inv)}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                        >
                          <Wallet className="w-3.5 h-3.5" />
                          <span>Bayar Sekarang</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Modal Simulator */}
      {selectedInvoiceForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Pembayaran SPP & Administrasi</h3>
              <button onClick={() => setSelectedInvoiceForPay(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <p className="text-slate-400">Santri: <strong>{selectedInvoiceForPay.studentName}</strong> ({selectedInvoiceForPay.className})</p>
                <p className="text-slate-400">Tagihan: <strong>{selectedInvoiceForPay.title}</strong></p>
                <div className="text-base font-extrabold text-emerald-800 dark:text-emerald-400 pt-1 font-mono">
                  Total: Rp {selectedInvoiceForPay.amount.toLocaleString('id-ID')}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-slate-700 dark:text-slate-300">Pilih Metode Pembayaran Syariah:</label>
                <div className="space-y-2">
                  {[
                    { id: 'Transfer Bank Syariah', name: 'BSI (Bank Syariah Indonesia)', desc: 'No. Rek: 7123-456-789 a.n. Yayasan Al-Hikmah' },
                    { id: 'Virtual Account', name: 'BSI Virtual Account', desc: 'Kode VA Otomatis: 9888 2026 1009' },
                    { id: 'QRIS', name: 'QRIS Syariah (Gopay/OVO/ShopeePay/BSI Mobile)', desc: 'Scan instan otomatis terverifikasi' },
                    { id: 'Tunai / Kasir TU', name: 'Pembayaran Langsung di Loket Tata Usaha', desc: 'Kwitansi fisik dicetak langsung' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPayMethod(method.id as any)}
                      className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                        payMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={payMethod === method.id}
                        onChange={() => setPayMethod(method.id as any)}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{method.name}</p>
                        <p className="text-[11px] text-slate-400">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceForPay(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi Pembayaran</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedInvoiceForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between no-print">
              <h3 className="font-bold text-sm">Kwitansi Bukti Pembayaran Resmi</h3>
              <button onClick={() => setSelectedInvoiceForReceipt(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Content */}
            <div className="p-6 bg-white text-slate-900 space-y-4 print-card">
              <div className="text-center border-b-2 border-slate-800 pb-2">
                <h4 className="font-bold text-xs uppercase">YAYASAN PONDOK PESANTREN AL-HIKMAH</h4>
                <h3 className="font-extrabold text-sm text-emerald-800">KWITANSI PEMBAYARAN SYARIAH</h3>
                <p className="text-[9px] text-slate-500">No. Kwitansi: KW/2026/AH/{selectedInvoiceForReceipt.id}</p>
              </div>

              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Telah diterima dari:</span>
                  <span className="font-bold">{selectedInvoiceForReceipt.studentName} ({selectedInvoiceForReceipt.className})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Untuk Pembayaran:</span>
                  <span className="font-semibold text-right">{selectedInvoiceForReceipt.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Transaksi:</span>
                  <span className="font-semibold">{selectedInvoiceForReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Transaksi:</span>
                  <span className="font-mono">{selectedInvoiceForReceipt.paidDate || '2026-08-25'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-between">
                <span className="font-bold text-xs">JUMLAH TERBILANG:</span>
                <span className="text-base font-extrabold text-emerald-800 font-mono">
                  Rp {selectedInvoiceForReceipt.amount.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex justify-between items-end text-[10px] pt-4">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-extrabold rounded uppercase tracking-wider border border-emerald-300">
                    LUNAS TERVERIFIKASI
                  </span>
                  <p className="text-[9px] text-slate-400 mt-2 font-mono">Valid ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
                <div className="text-center">
                  <p>Bendahara Madrasah,</p>
                  <div className="h-10"></div>
                  <p className="font-bold underline">Hj. Maryam Khadijah, S.E</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end space-x-2 no-print">
              <button
                onClick={() => setSelectedInvoiceForReceipt(null)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Kwitansi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {isAddInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Terbitkan Tagihan Baru</h3>
              <button onClick={() => setIsAddInvoiceOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilih Santri</label>
                <select
                  value={form.studentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.className})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Judul / Keterangan Tagihan</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. SPP Bulan November 2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategori Tagihan</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    <option value="SPP Bulanan">SPP Bulanan</option>
                    <option value="Uang Gedung / Infaq">Uang Gedung / Infaq</option>
                    <option value="Uang Makan Asrama">Uang Makan Asrama</option>
                    <option value="Ujian / Asesmen">Ujian / Asesmen</option>
                    <option value="Kegiatan / Rihlah">Kegiatan / Rihlah</option>
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

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Batas Tanggal Jatuh Tempo</label>
                <input
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddInvoiceOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Terbitkan Tagihan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
