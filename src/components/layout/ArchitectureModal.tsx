import React, { useState } from 'react';
import { 
  Server, Database, ShieldCheck, Layers, Cpu, CreditCard, 
  BookOpen, CheckCircle, Code, Copy, Download, X, Globe, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen, addNotification } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'stack' | 'diagram' | 'schema' | 'rbac' | 'api'>('stack');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isArchitectureModalOpen) return null;

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    addNotification(`Skema ${section} berhasil disalin ke clipboard!`, 'info');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sqlSchemaCode = `-- =========================================================================
-- SISTEM INFORMASI ADMINISTRASI SEKOLAH & MADRASAH TERPADU (SIAMadrasah)
-- DIALECT: PostgreSQL 16+ / Cloud SQL / Supabase
-- =========================================================================

-- 1. ENUMS & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role_enum AS ENUM ('super_admin', 'guru', 'siswa', 'orang_tua', 'keuangan_tu');
CREATE TYPE gender_enum AS ENUM ('Laki-laki', 'Perempuan');
CREATE TYPE ppdb_status_enum AS ENUM ('Daftar', 'Verifikasi Berkas', 'Tes Wawancara', 'Diterima', 'Ditolak');
CREATE TYPE payment_status_enum AS ENUM ('Belum Bayar', 'Lunas', 'Jatuh Tempo', 'Dibatalkan');
CREATE TYPE prayer_status_enum AS ENUM ('Berjamaah', 'Munfarid', 'Masbuk', 'Udzur', 'Absen');
CREATE TYPE tajwid_score_enum AS ENUM ('Mumtaz', 'Jayyid Jiddan', 'Jayyid', 'Maqbul');

-- 2. USERS & RBAC TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'siswa',
    full_name VARCHAR(150) NOT NULL,
    identifier_number VARCHAR(50), -- NIP / NISN / NIK
    phone VARCHAR(25),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CLASSROOMS & ROMBEL
CREATE TABLE classrooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL, -- e.g., 'X Keagamaan 1'
    grade_level VARCHAR(10) NOT NULL,
    major VARCHAR(50), -- 'MIPA', 'IPS', 'Keagamaan'
    homeroom_teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
    academic_year VARCHAR(20) NOT NULL, -- '2026/2027'
    capacity INT DEFAULT 32,
    room_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. STUDENTS (SIS & EMIS INTEGRATION)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nis VARCHAR(20) UNIQUE NOT NULL,
    current_class_id UUID REFERENCES classrooms(id) ON DELETE SET NULL,
    birth_place VARCHAR(100),
    birth_date DATE NOT NULL,
    gender gender_enum NOT NULL,
    parent_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    parent_name VARCHAR(150),
    parent_phone VARCHAR(25),
    parent_address TEXT,
    blood_type VARCHAR(5),
    medical_allergies TEXT[],
    discipline_points INT DEFAULT 0,
    tahfidz_juz_completed NUMERIC(4, 2) DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'Aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PPDB (PENERIMAAN PESERTA DIDIK BARU)
CREATE TABLE ppdb_applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_no VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    previous_school VARCHAR(150),
    target_grade_level VARCHAR(20),
    target_major VARCHAR(50),
    parent_name VARCHAR(150),
    parent_phone VARCHAR(25),
    documents_verified JSONB DEFAULT '{}',
    interview_score NUMERIC(5,2),
    quran_score NUMERIC(5,2),
    academic_score NUMERIC(5,2),
    status ppdb_status_enum DEFAULT 'Daftar',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. CURRICULUM & SUBJECTS
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Umum', 'Kemenag / Agama', 'Muatan Lokal'
    kkm NUMERIC(5,2) DEFAULT 75.0,
    credit_hours INT DEFAULT 2,
    teacher_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. TIMETABLES / JADWAL
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_of_week VARCHAR(15) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50)
);

-- 8. TAHFIDZ & HAFALAN TRACKER
CREATE TABLE tahfidz_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    surah_name VARCHAR(100) NOT NULL,
    surah_number INT NOT NULL,
    from_ayah INT NOT NULL,
    to_ayah INT NOT NULL,
    juz_number INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'Ziyadah', 'Murajaah', 'Tasmi'
    tajwid_grade tajwid_score_enum NOT NULL,
    fluency_score VARCHAR(50),
    evaluator_teacher_id UUID REFERENCES users(id),
    notes TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. PRAYER ATTENDANCE (PRESENSI SHALAT)
CREATE TABLE prayer_attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    subuh prayer_status_enum DEFAULT 'Berjamaah',
    dhuha VARCHAR(20) DEFAULT 'Hadir',
    dzuhur prayer_status_enum DEFAULT 'Berjamaah',
    ashar prayer_status_enum DEFAULT 'Berjamaah',
    maghrib prayer_status_enum DEFAULT 'Berjamaah',
    isya prayer_status_enum DEFAULT 'Berjamaah',
    evaluator_id UUID REFERENCES users(id),
    UNIQUE(student_id, date)
);

-- 10. FINANCE: INVOICES & PAYMENTS (SPP & PAYMENT GATEWAY)
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    status payment_status_enum DEFAULT 'Belum Bayar',
    payment_method VARCHAR(50),
    payment_gateway_ref VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. HR & PAYROLL
CREATE TABLE payroll_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    period_month VARCHAR(30) NOT NULL,
    basic_salary NUMERIC(12,2) NOT NULL,
    total_allowances NUMERIC(12,2) DEFAULT 0,
    total_deductions NUMERIC(12,2) DEFAULT 0,
    net_salary NUMERIC(12,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    paid_at TIMESTAMP WITH TIME ZONE
);
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <Server className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Arsitektur, Tech Stack & Skema Database Sistem</h2>
              <p className="text-xs text-emerald-200/90">
                Blueprint Arsitektur Full-Stack Enterprise untuk Sekolah & Madrasah Terpadu
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-6 overflow-x-auto">
          {[
            { id: 'stack', label: 'Rekomendasi Tech Stack', icon: Layers },
            { id: 'diagram', label: 'Diagram Arsitektur', icon: Cpu },
            { id: 'schema', label: 'Skema PostgreSQL (DDL)', icon: Database },
            { id: 'rbac', label: 'Matriks Hak Akses (RBAC)', icon: ShieldCheck },
            { id: 'api', label: 'Kontrak Endpoint REST API', icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center space-x-2 py-3.5 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900' 
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 dark:text-slate-300 text-sm space-y-6">
          
          {/* TAB 1: TECH STACK */}
          {activeSubTab === 'stack' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-emerald-900 dark:text-emerald-200">
                <h3 className="font-bold text-base flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Rekomendasi Arsitektur Stack Modern & Skalabilitas Tinggi</span>
                </h3>
                <p className="text-xs mt-1 text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Sistem dirancang dengan arsitektur decoupled (SPA/SSR Frontend + REST/GraphQL API Backend) untuk mendukung ribuan santri, guru, orang tua murid dengan latensi rendah dan keamanan data tinggi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">Frontend Layer</h4>
                      <p className="text-xs text-slate-500">Next.js 14+ / React 19 + Vite</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• Tailwind CSS v4 untuk micro-styling responsif</li>
                    <li>• Lucide React Icons & Motion untuk micro-interaction</li>
                    <li>• Recharts untuk visualisasi kehadiran & keuangan</li>
                    <li>• e-Rapor & Print engine via Native CSS Print</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">Backend & API</h4>
                      <p className="text-xs text-slate-500">Node.js (Express/NestJS) or Go</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• RESTful API + WebSocket untuk notifikasi real-time</li>
                    <li>• JWT Authentication + HttpOnly Secure Cookies</li>
                    <li>• Drizzle ORM / Prisma untuk type-safe queries</li>
                    <li>• Role-Based Access Control (RBAC) middleware</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">Database & Caching</h4>
                      <p className="text-xs text-slate-500">PostgreSQL 16 + Redis Cache</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• PostgreSQL Cloud SQL / Supabase untuk relational data</li>
                    <li>• Redis untuk cache jadwal, session, & rate-limiting</li>
                    <li>• S3 / Cloud Storage untuk scan berkas PPDB & sertifikat</li>
                    <li>• Automated Daily Backup & Point-in-time Recovery</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">Payment Gateway</h4>
                      <p className="text-xs text-slate-500">Midtrans / Xendit / Bank BSI</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• QRIS Dynamic / Static untuk pembayaran cepat</li>
                    <li>• Virtual Account Syariah (BSI, BCA, Mandiri, BRI)</li>
                    <li>• Webhook callback untuk auto-reconciliation SPP</li>
                    <li>• Kwitansi digital & Slip pembayaran ber-barcode</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">Notifikasi & Blast</h4>
                      <p className="text-xs text-slate-500">WhatsApp Gateway & Email</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• Fonnte / Wablas API untuk WhatsApp bot wali santri</li>
                    <li>• SendGrid / Resend untuk pengiriman e-Rapor & slip gaji</li>
                    <li>• Pengingat otomatis H-3 jatuh tempo tagihan SPP</li>
                    <li>• Notifikasi kehadiran shalat & setoran tahfidz harian</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg text-rose-600 dark:text-rose-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">AI Assistant Madrasah</h4>
                      <p className="text-xs text-slate-500">Gemini 2.5 Flash API</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>• Auto-generator deskripsi capaian kompetensi e-Rapor</li>
                    <li>• Pembuatan draf pengumuman & surat undangan wali</li>
                    <li>• Asisten tanya jawab silabus & kurikulum Kemenag</li>
                    <li>• Rekomendasi hafalan Al-Qur'an dan tajwid santri</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE DIAGRAM */}
          {activeSubTab === 'diagram' && (
            <div className="space-y-4">
              <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                <p className="text-emerald-400 font-bold mb-2">┌── [DIAGRAM ARSITEKTUR SISTEM INFORMASI MADRASAH TERPADU] ──┐</p>
                <pre>{`
  +-----------------------------------------------------------------------------------+
  |                                CLIENT TIER (DEVICES)                              |
  |  [Kepala Sekolah]   [Dewan Guru]   [Santri/Siswa]   [Orang Tua/Wali]   [Staf TU]  |
  |   (Web Dashboard)    (Portal Guru)  (Portal Santri)   (Mobile PWA)     (Portal TU)|
  +-----------------------------------------+-----------------------------------------+
                                            | HTTPS / WSS
                                            v
  +-----------------------------------------------------------------------------------+
  |                          EDGE ROUTING & SECURITY GATEWAY                          |
  |           Reverse Proxy (Nginx / Cloud Run), SSL Offloading, WAF & Rate Limiter   |
  +-----------------------------------------+-----------------------------------------+
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                       APPLICATION CORE (REST / GRAPHQL APIs)                      |
  |  +-------------------+  +-------------------+  +-------------------+  +---------+ |
  |  | Auth & RBAC Guard |  | SIS & PPDB Engine |  | Academic & e-Rapor|  | Tahfidz | |
  |  +-------------------+  +-------------------+  +-------------------+  +---------+ |
  |  +-------------------+  +-------------------+  +-------------------+  +---------+ |
  |  | Keuangan & SPP    |  | HR & Slip Gaji    |  | Front Office/Tamu |  | GeminiAI| |
  |  +-------------------+  +-------------------+  +-------------------+  +---------+ |
  +--------------------+--------------------+--------------------+--------------------+
                       |                    |                    |
                       v                    v                    v
  +-------------------------+  +-------------------------+  +-------------------------+
  |  RELATIONAL DATABASE    |  |  IN-MEMORY CACHE & QUEUE|  |  EXTERNAL INTEGRATIONS  |
  |  PostgreSQL 16 (Cloud)  |  |  Redis 7+ (Sessions,    |  |  • Midtrans/BSI VA      |
  |  • 15+ Core Tables      |  |  Rate Limiting,         |  |  • WhatsApp Gateway API |
  |  • ACID Transactions    |  |  Background Workers)   |  |  • Cloud Storage S3     |
  +-------------------------+  +-------------------------+  +-------------------------+
`}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: POSTGRESQL SCHEMA DDL */}
          {activeSubTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Skema relasional PostgreSQL komprehensif mencakup 11 modul utama sekolah & madrasah.
                </p>
                <button
                  onClick={() => handleCopy(sqlSchemaCode, 'PostgreSQL Schema DDL')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSection === 'PostgreSQL Schema DDL' ? 'Tersalin!' : 'Salin SQL DDL'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto max-h-96 border border-slate-800">
                {sqlSchemaCode}
              </pre>
            </div>
          )}

          {/* TAB 4: RBAC MATRIX */}
          {activeSubTab === 'rbac' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold">
                  <tr>
                    <th className="p-3">Modul / Fitur</th>
                    <th className="p-3 text-center">Super Admin</th>
                    <th className="p-3 text-center">Guru</th>
                    <th className="p-3 text-center">Siswa</th>
                    <th className="p-3 text-center">Orang Tua</th>
                    <th className="p-3 text-center">Staf Keuangan/TU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-semibold">Dashboard & Analitik Global</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-center text-blue-600">Terbatas (Kelas)</td>
                    <td className="p-3 text-center text-slate-500">Ringkasan Diri</td>
                    <td className="p-3 text-center text-slate-500">Ringkasan Anak</td>
                    <td className="p-3 text-center text-blue-600">Finansial & Siswa</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                    <td className="p-3 font-semibold">SIS & PPDB Pendaftaran</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Kelola / Setujui</td>
                    <td className="p-3 text-center text-blue-600">Input Nilai Tes</td>
                    <td className="p-3 text-center text-slate-400">Lihat Profil</td>
                    <td className="p-3 text-center text-slate-400">Lihat Profil</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Verifikasi Berkas</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-semibold">Jadwal & Manajemen Ujian</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Input Nilai & Kartu</td>
                    <td className="p-3 text-center text-blue-600">Lihat & Cetak Kartu</td>
                    <td className="p-3 text-center text-blue-600">Lihat Jadwal</td>
                    <td className="p-3 text-center text-slate-400">Cetak Kartu Massal</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                    <td className="p-3 font-semibold">e-Rapor Kurikulum Merdeka/Kemenag</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Validasi & TTD</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Input & Buat Rapor</td>
                    <td className="p-3 text-center text-blue-600">Unduh e-Rapor</td>
                    <td className="p-3 text-center text-blue-600">Unduh e-Rapor</td>
                    <td className="p-3 text-center text-slate-400">Arsip Legalisir</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-semibold">Pelacak Tahfidz & Shalat Berjamaah</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Monitoring</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Verifikasi Setoran</td>
                    <td className="p-3 text-center text-blue-600">Lihat Progres</td>
                    <td className="p-3 text-center text-blue-600">Pantau Realtime</td>
                    <td className="p-3 text-center text-slate-400">Lihat</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                    <td className="p-3 font-semibold">Keuangan SPP & Payment Gateway</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Audit & Laporan</td>
                    <td className="p-3 text-center text-slate-400">No Access</td>
                    <td className="p-3 text-center text-blue-600">Riwayat Tagihan</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Bayar via QRIS/VA</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Kelola Tagihan & Kas</td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="p-3 font-semibold">HR Kepegawaian & Penggajian</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Approve & Slip</td>
                    <td className="p-3 text-center text-blue-600">Slip Gaji & Cuti</td>
                    <td className="p-3 text-center text-slate-400">No Access</td>
                    <td className="p-3 text-center text-slate-400">No Access</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">Kalkulasi Payroll</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: API CONTRACTS */}
          {activeSubTab === 'api' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 rounded">POST</span>
                  <span>/api/v1/auth/login</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans text-xs">Autentikasi multi-peran dengan JWT & session tokens.</p>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-blue-600 font-bold">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/60 rounded">GET / POST</span>
                  <span>/api/v1/sis/students</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans text-xs">Manajemen data profil siswa, filter kelas, riwayat medis, dan kontak wali.</p>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-purple-600 font-bold">
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/60 rounded">POST</span>
                  <span>/api/v1/madrasah/tahfidz/verify</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans text-xs">Pencatatan setoran ayat Al-Qur'an, penilaian makhraj & tajwid oleh musyrif.</p>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-amber-600 font-bold">
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/60 rounded">POST</span>
                  <span>/api/v1/finance/payments/charge</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 font-sans text-xs">Inisiasi pembayaran SPP melalui Virtual Account BSI / QRIS Dynamic dengan Webhook handler.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Spesifikasi & Schema terverifikasi siap untuk Implementasi Produksi</span>
          </div>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            Tutup & Buka Aplikasi
          </button>
        </div>

      </div>
    </div>
  );
};
