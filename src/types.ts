export type UserRole = 
  | 'super_admin'  // Super Admin / Kepala Sekolah
  | 'guru'         // Guru / Pengajar
  | 'siswa'        // Siswa / Pelajar
  | 'orang_tua'    // Orang Tua / Wali
  | 'keuangan_tu'; // Staf Keuangan / Tata Usaha

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  identifierNumber: string; // NIP / NISN / No. Induk
  relatedStudentId?: string; // For parents/students
  phone: string;
  title?: string;
}

export type Gender = 'Laki-laki' | 'Perempuan';

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  fullName: string;
  gender: Gender;
  birthPlace: string;
  birthDate: string;
  currentClassId: string;
  className: string;
  gradeLevel: '10' | '11' | '12' | '7' | '8' | '9' | '1' | '2' | '3' | '4' | '5' | '6';
  major?: string; // IPA, IPS, Keagamaan, Umum
  avatar: string;
  status: 'Aktif' | 'Alumni' | 'Pindah' | 'Drop Out';
  enrollmentDate: string;
  parentName: string;
  parentPhone: string;
  parentAddress: string;
  medicalHistory: {
    bloodType: 'A' | 'B' | 'AB' | 'O';
    allergies: string[];
    specialNotes: string;
  };
  sppStatus: 'Lunas' | 'Tunggakan' | 'Sebagian';
  tahfidzJuz: number; // e.g. 5.5 juz
  disciplinePoints: number; // Penalty points
  achievementsCount: number;
}

export type PpdbStatus = 'Daftar' | 'Verifikasi Berkas' | 'Tes Wawancara' | 'Diterima' | 'Ditolak';

export interface PpdbApplicant {
  id: string;
  registrationNumber: string;
  fullName: string;
  previousSchool: string;
  targetLevel: string;
  targetMajor: string;
  parentName: string;
  parentPhone: string;
  submissionDate: string;
  status: PpdbStatus;
  documents: {
    birthCertificate: boolean;
    familyCard: boolean;
    graduationCertificate: boolean;
    reportCard: boolean;
  };
  interviewScore?: number;
  quranReadingScore?: number;
  academicScore?: number;
  notes?: string;
}

export interface DisciplineRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  violationType: string;
  category: 'Ringan' | 'Sedang' | 'Berat';
  penaltyPoints: number;
  actionTaken: string;
  reportedBy: string;
  status: 'Investigasi' | 'Selesai' | 'Surat Panggilan Orang Tua';
}

export interface AchievementRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  title: string;
  level: 'Sekolah' | 'Kecamatan/Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
  category: 'Akademik' | 'Tahfidz & Diniyah' | 'Seni & Olahraga' | 'Karya Ilmiah';
  rank: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Harapan' | 'Peserta Terbaik';
  date: string;
  organizer: string;
  certificateUrl?: string;
}

export interface Classroom {
  id: string;
  name: string; // e.g. "X MA Keagamaan 1", "XII IPA 1"
  gradeLevel: string;
  major: string;
  homeroomTeacherId: string; // Wali Kelas
  homeroomTeacherName: string;
  capacity: number;
  studentCount: number;
  academicYear: string;
  roomNumber: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'Umum' | 'Kemenag / Agama' | 'Muatan Lokal' | 'Peminatan';
  kkm: number; // Kriteria Ketuntasan Minimal
  creditHours: number;
  teacherId: string;
  teacherName: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  startTime: string;
  endTime: string;
  roomNumber: string;
}

export interface Exam {
  id: string;
  title: string;
  type: 'Penilaian Harian' | 'Asesmen Sumatif Tengah Semester (ASTS)' | 'Asesmen Sumatif Akhir Semester (ASAS)' | 'Ujian Akhir Madrasah (UAM)';
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  startDate: string;
  endDate: string;
  status: 'Mendatang' | 'Berlangsung' | 'Selesai';
  classesInvolved: string[];
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  formatifAvg: number;
  sumatifTengah: number;
  sumatifAkhir: number;
  finalScore: number;
  letterGrade: 'A' | 'B' | 'C' | 'D';
  competencyDescription: string;
}

export interface ReportCard {
  id?: string;
  studentId: string;
  studentName: string;
  nisn: string;
  nis: string;
  className: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  rank: number;
  totalStudents: number;
  grades: GradeRecord[];
  attendance: {
    present: number;
    sick: number;
    permission: number;
    unexcused: number;
  };
  spiritualAttitude: string;
  socialAttitude: string;
  homeroomNotes: string;
  headmasterName: string;
  homeroomTeacherName: string;
  dateIssued: string;
}

// Fitur Khusus Madrasah
export interface TahfidzRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  surahName: string;
  surahNumber: number;
  fromAyah: number;
  toAyah: number;
  juzNumber: number;
  type: 'Ziyadah (Hafalan Baru)' | 'Muraja\'ah (Pengulangan)' | 'Tasmi\' Akbar';
  tajwidScore: 'Mumtaz (Istimewa)' | 'Jayyid Jiddan (Sangat Baik)' | 'Jayyid (Baik)' | 'Maqbul (Cukup)';
  fluencyScore: 'Sangat Lancar' | 'Lancar' | 'Kurang Lancar';
  evaluatorId: string;
  evaluatorName: string;
  notes: string;
}

export interface PrayerRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  className: string;
  prayers: {
    subuh: 'Berjamaah' | 'Munfarid' | 'Masbuk' | 'Udzur' | 'Absen';
    dhuha: 'Hadir' | 'Udzur' | 'Absen';
    dzuhur: 'Berjamaah' | 'Munfarid' | 'Masbuk' | 'Udzur' | 'Absen';
    ashar: 'Berjamaah' | 'Munfarid' | 'Masbuk' | 'Udzur' | 'Absen';
    maghrib: 'Berjamaah' | 'Munfarid' | 'Masbuk' | 'Udzur' | 'Absen';
    isya: 'Berjamaah' | 'Munfarid' | 'Masbuk' | 'Udzur' | 'Absen';
  };
  evaluatedBy: string;
}

export interface Staff {
  id: string;
  nip: string;
  nuptk?: string;
  fullName: string;
  role: 'Guru' | 'Kepala Sekolah' | 'Staf TU' | 'Bendahara' | 'Laboran / Pustakawan' | 'Keamanan & Kebersihan';
  employmentStatus: 'PNS' | 'PPPK' | 'GTT (Guru Tetap Yayasan)' | 'Honorer';
  gender: Gender;
  phone: string;
  email: string;
  education: string;
  joinDate: string;
  avatar: string;
  basicSalary: number;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    holderName: string;
  };
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  type: 'Cuti Sakit' | 'Cuti Tahunan' | 'Cuti Melahirkan' | 'Izin Dinas / Pelatihan' | 'Izin Khusus / Ibadah Umrah';
  reason: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';
  approvedBy?: string;
  requestedAt: string;
}

export interface PayrollRecord {
  id: string;
  staffId: string;
  staffName: string;
  staffRole: string;
  month: string; // e.g. "Agustus 2026"
  basicSalary: number;
  allowances: {
    positionAllowance: number; // Tunjangan Jabatan / Wali Kelas
    teachingAllowance: number; // Insentif Jam Mengajar
    transportAllowance: number; // Uang Transport & Kehadiran
    otherAllowance: number;
  };
  deductions: {
    bpjsKesehatan: number;
    bpjsKetenagakerjaan: number;
    cooperativeLoan: number; // Potongan Koperasi
    latePenalty: number;
  };
  netSalary: number;
  paymentStatus: 'Dibayar' | 'Pending' | 'Diproses';
  paymentDate?: string;
}

// Keuangan
export interface FeeStructure {
  id: string;
  name: string; // SPP Bulanan, Biaya Gedung/Infaq Pengembangan, Seragam, Kitab/Buku, Ujian
  category: 'Bulanan' | 'Tahunan' | 'Sekali Bayar';
  amount: number;
  gradeLevels: string[]; // ['10', '11', '12']
  academicYear: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  parentPhone: string;
  title: string;
  amount: number;
  dueDate: string;
  createdAt: string;
  status: 'Lunas' | 'Belum Bayar' | 'Jatuh Tempo';
  paymentMethod?: 'QRIS' | 'Virtual Account BCA' | 'Virtual Account BSI' | 'Virtual Account Mandiri' | 'Tunai / Kasir TU';
  paidAt?: string;
  paymentProofRef?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'Gaji & Honor' | 'Operasional & Utilitas' | 'Pemeliharaan Gedung' | 'Kegiatan Siswa & Lomba' | 'Pengadaan Kitab & ATK';
  amount: number;
  date: string;
  approvedBy: string;
  description: string;
  receiptUrl?: string;
}

// Komunikasi & Front Office
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  targetAudience: 'Semua' | 'Guru' | 'Siswa' | 'Orang Tua' | 'Staf TU';
  priority: 'Normal' | 'Penting' | 'Darurat';
  attachmentName?: string;
}

export interface GuestBookEntry {
  id: string;
  guestName: string;
  institution: string;
  phoneNumber: string;
  purpose: 'Kunjungan Dinas' | 'Konsultasi PPDB' | 'Wali Murid / Urusan Siswa' | 'Kerjasama & Vendor' | 'Lainnya';
  personToMeet: string;
  checkInTime: string;
  checkOutTime?: string;
  notes: string;
  status: 'Sedang Bertemu' | 'Menunggu' | 'Selesai';
}

export interface ExamSchedule {
  id: string;
  name: string;
  type: 'ASTS' | 'ASAS' | 'Ujian Akhir Madrasah' | 'Tahfidz & Lisan';
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  academicYear: string;
}

export interface DiniyahKitab {
  id: string;
  kitabName: string;
  author: string;
  category: 'Fiqih' | 'Nahwu & Sharaf' | 'Hadits' | 'Akhlaq / Tasawwuf' | 'Aqidah / Tauhid';
  totalChapters: number;
  currentChapter: number;
  currentChapterTitle: string;
  targetLevel: string;
  teacherId: string;
  teacherName: string;
  scheduleDay: string;
}

export type PrayerStatus = 'Berjamaah di Masjid' | 'Munfarid (Sendiri)' | 'Masbuq' | 'Udzur Syar\'i / Sakit';

export interface PrayerAttendance {
  id?: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  prayerName: 'Subuh' | 'Dhuha' | 'Dzuhur' | 'Ashar' | 'Maghrib' | 'Isya';
  status: PrayerStatus;
  location: string;
}

export interface FinanceInvoice {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  title: string;
  category: 'SPP Bulanan' | 'Uang Gedung / Infaq' | 'Uang Makan Asrama' | 'Ujian / Asesmen' | 'Kegiatan / Rihlah';
  amount: number;
  dueDate: string;
  status: 'Lunas' | 'Belum Lunas' | 'Menunggu Konfirmasi';
  academicYear: string;
  paymentMethod?: string;
  paidDate?: string;
}

export interface FinancialJournalEntry {
  id: string;
  date: string;
  description: string;
  type: 'Pemasukan' | 'Pengeluaran';
  category: string;
  amount: number;
  recordedBy: string;
  referenceNo: string;
}

