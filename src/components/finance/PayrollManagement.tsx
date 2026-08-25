import React, { useState } from 'react';
import { 
  Briefcase, Plus, Printer, CheckCircle, Clock, 
  DollarSign, Download, Users, FileText, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PayrollRecord, Staff } from '../../types';

export const PayrollManagement: React.FC = () => {
  const { payrollRecords, staff, processPayrollPayment } = useApp();
  const [selectedPayrollForSlip, setSelectedPayrollForSlip] = useState<PayrollRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new payroll
  const [form, setForm] = useState({
    staffId: staff[0]?.id || '',
    staffName: staff[0]?.fullName || '',
    staffRole: staff[0]?.role || '',
    month: 'September 2026',
    basicSalary: 4500000,
    teachingAllowance: 1200000,
    tahfidzIncentive: 800000,
    deductions: 150000,
  });

  const handleStaffSelect = (staffId: string) => {
    const s = staff.find(st => st.id === staffId);
    if (s) {
      setForm({
        ...form,
        staffId: s.id,
        staffName: s.fullName,
        staffRole: s.role,
        basicSalary: s.basicSalary
      });
    }
  };

  const handleSavePayroll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
  };

  const totalPayrollBudget = payrollRecords.reduce((acc, curr) => acc + curr.netSalary, 0);

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <span>Penggajian Guru, Ustadz & Karyawan (Payroll)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kalkulasi gaji pokok, tunjangan jam mengajar, insentif halaqah tahfidz, dan slip gaji digital.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Payroll Baru</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-emerald-300 font-semibold">Total Anggaran Gaji Periode Ini</span>
          <p className="text-2xl font-extrabold font-mono">Rp {totalPayrollBudget.toLocaleString('id-ID')}</p>
          <p className="text-[11px] text-emerald-200">{payrollRecords.length} Ustadz & Tenaga Kependidikan</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-teal-800 to-slate-900 text-white rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-teal-200 font-semibold">Insentif Halaqah Tahfidz Terdistribusi</span>
          <p className="text-2xl font-extrabold font-mono">Rp 3.800.000</p>
          <p className="text-[11px] text-teal-200">Berdasarkan mutqin capaian santri</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-300 font-semibold">Status Pencairan</span>
          <p className="text-lg font-bold text-emerald-400">Siap Ditransfer</p>
          <p className="text-[11px] text-slate-400">Integrasi BSI Payroll Corporate</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Nama Ustadz / Pegawai</th>
                <th className="p-3.5">Jabatan / Amanah</th>
                <th className="p-3.5">Bulan</th>
                <th className="p-3.5">Gaji Pokok</th>
                <th className="p-3.5">Total Tunjangan</th>
                <th className="p-3.5">Gaji Bersih (Take Home)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {payrollRecords.map((pay) => {
                const totalAllowances = (Object.values(pay.allowances) as number[]).reduce((a, b) => a + b, 0);
                return (
                  <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{pay.staffName}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{pay.staffRole}</td>
                    <td className="p-3.5 text-slate-500 font-mono">{pay.month}</td>
                    <td className="p-3.5 font-mono">Rp {pay.basicSalary.toLocaleString('id-ID')}</td>
                    <td className="p-3.5 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                      +Rp {totalAllowances.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white text-sm">
                      Rp {pay.netSalary.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        pay.paymentStatus === 'Dibayar'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {pay.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {pay.paymentStatus !== 'Dibayar' && (
                          <button
                            onClick={() => processPayrollPayment(pay.id)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                          >
                            Bayar Gaji
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedPayrollForSlip(pay)}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-200"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Slip Gaji</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Payslip Modal */}
      {selectedPayrollForSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between no-print">
              <h3 className="font-bold text-sm">Pratinjau Slip Gaji Karyawan</h3>
              <button onClick={() => setSelectedPayrollForSlip(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip Gaji Sheet */}
            <div className="p-6 bg-white text-slate-900 space-y-4 print-card">
              <div className="text-center border-b-2 border-slate-800 pb-2">
                <h4 className="font-bold text-xs uppercase">YAYASAN PONDOK PESANTREN AL-HIKMAH</h4>
                <h3 className="font-extrabold text-sm text-emerald-800">SLIP GAJI & HONORARIUM USTADZ</h3>
                <p className="text-[9px] text-slate-500">Periode: {selectedPayrollForSlip.month}</p>
              </div>

              <div className="grid grid-cols-2 text-xs py-1">
                <div>
                  <p><strong>Nama:</strong> {selectedPayrollForSlip.staffName}</p>
                  <p><strong>Jabatan:</strong> {selectedPayrollForSlip.staffRole}</p>
                </div>
                <div className="text-right">
                  <p><strong>Status:</strong> {selectedPayrollForSlip.paymentStatus}</p>
                  <p><strong>Tanggal Bayar:</strong> {selectedPayrollForSlip.paymentDate || '2026-08-25'}</p>
                </div>
              </div>

              <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
                <table className="w-full">
                  <thead className="bg-slate-100 font-bold border-b border-slate-300">
                    <tr>
                      <th className="p-2 text-left">Komponen Pendapatan</th>
                      <th className="p-2 text-right">Jumlah (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr>
                      <td className="p-2">Gaji Pokok</td>
                      <td className="p-2 text-right">Rp {selectedPayrollForSlip.basicSalary.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Tunjangan Mengajar & Jam Tambahan</td>
                      <td className="p-2 text-right">Rp {selectedPayrollForSlip.allowances.teachingAllowance.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Tunjangan Jabatan / Wali Kelas</td>
                      <td className="p-2 text-right">Rp {selectedPayrollForSlip.allowances.positionAllowance.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr className="text-rose-700 bg-rose-50/50">
                      <td className="p-2">Potongan (BPJS / Kas Koperasi)</td>
                      <td className="p-2 text-right">-Rp {(selectedPayrollForSlip.deductions.bpjsKesehatan + selectedPayrollForSlip.deductions.cooperativeLoan).toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-emerald-50 border-t-2 border-emerald-800 font-bold">
                    <tr>
                      <td className="p-2 text-emerald-950 font-sans">TOTAL GAJI BERSIH (TAKE HOME):</td>
                      <td className="p-2 text-right text-emerald-900 font-mono text-sm font-extrabold">
                        Rp {selectedPayrollForSlip.netSalary.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-between items-end text-[10px] pt-3">
                <div>
                  <p className="text-[9px] text-slate-400">Dokumen sah tanpa tanda tangan basah bila dicetak dari SIAMadrasah</p>
                </div>
                <div className="text-center">
                  <p>Bendahara Yayasan,</p>
                  <div className="h-8"></div>
                  <p className="font-bold underline">Hj. Maryam Khadijah, S.E</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end space-x-2 no-print">
              <button
                onClick={() => setSelectedPayrollForSlip(null)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Slip Gaji</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payroll Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Generate Gaji & Insentif Guru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePayroll} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Pilih Ustadz / Guru / Pegawai</label>
                <select
                  value={form.staffId}
                  onChange={(e) => handleStaffSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Periode Bulan</label>
                  <input
                    type="text"
                    required
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                    placeholder="e.g. Oktober 2026"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Gaji Pokok (Rp)</label>
                  <input
                    type="number"
                    value={form.basicSalary}
                    onChange={(e) => setForm({ ...form, basicSalary: Number(e.target.value) })}
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
                  Simpan Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
