import { 
  User, Student, PpdbApplicant, DisciplineRecord, AchievementRecord, 
  Classroom, Subject, ScheduleItem, Exam, GradeRecord, 
  TahfidzRecord, PrayerRecord, Staff, LeaveRequest, PayrollRecord, 
  FeeStructure, Invoice, Expense, Announcement, GuestBookEntry,
  DiniyahKitab, PrayerAttendance, FinancialJournalEntry, ReportCard,
  ExamSchedule, FinanceInvoice
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    email: 'kepala.sekolah@alhikmah.sch.id',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    identifierNumber: '197508152002121003',
    phone: '0812-3456-7890',
    title: 'Kepala Madrasah Aliyah & Koordinator Yayasan'
  },
  {
    id: 'usr-2',
    name: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    email: 'gurufitriah@gmail.com',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    identifierNumber: '198804122014032001',
    phone: '0813-9876-5432',
    title: 'Guru Bahasa Arab, Fiqih & Wali Kelas X PK 1'
  },
  {
    id: 'usr-3',
    name: 'Muhammad Farhan Ramadhan',
    email: 'farhan.ramadhan@santri.sch.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    identifierNumber: '0067891234',
    relatedStudentId: 'std-1',
    phone: '0857-1122-3344',
    title: 'Siswa Kelas XII Keagamaan 1 (Ketua OSIS)'
  },
  {
    id: 'usr-4',
    name: 'Ir. H. Bambang Sudaryanto',
    email: 'bambang.sudaryanto@gmail.com',
    role: 'orang_tua',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    identifierNumber: '3171051208720005',
    relatedStudentId: 'std-1',
    phone: '0811-2233-4455',
    title: 'Wali Murid dari Muhammad Farhan Ramadhan'
  },
  {
    id: 'usr-5',
    name: 'Siti Rohmah, S.E',
    email: 'keuangan.tu@alhikmah.sch.id',
    role: 'keuangan_tu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    identifierNumber: '199209182019022004',
    phone: '0818-4455-6677',
    title: 'Kepala Urusan Tata Usaha & Bendahara SPP'
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    nisn: '0067891234',
    nis: '20241001',
    fullName: 'Muhammad Farhan Ramadhan',
    gender: 'Laki-laki',
    birthPlace: 'Surabaya',
    birthDate: '2008-09-14',
    currentClassId: 'cls-1',
    className: 'XII Keagamaan 1',
    gradeLevel: '12',
    major: 'Keagamaan / Diniyah',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2024-07-15',
    parentName: 'Ir. H. Bambang Sudaryanto',
    parentPhone: '0811-2233-4455',
    parentAddress: 'Jl. Rungkut Asri Timur No. 42, Surabaya',
    medicalHistory: {
      bloodType: 'O',
      allergies: ['Udang / Seafood'],
      specialNotes: 'Riwayat asma ringan saat cuaca dingin'
    },
    sppStatus: 'Lunas',
    tahfidzJuz: 12.5,
    disciplinePoints: 0,
    achievementsCount: 3
  },
  {
    id: 'std-2',
    nisn: '0071234567',
    nis: '20241002',
    fullName: 'Aisyah Putri Azzahra',
    gender: 'Perempuan',
    birthPlace: 'Malang',
    birthDate: '2009-03-21',
    currentClassId: 'cls-2',
    className: 'XI IPA 1',
    gradeLevel: '11',
    major: 'MIPA (Matematika & IPA)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2024-07-15',
    parentName: 'Drs. H. Mulyono',
    parentPhone: '0812-7788-9900',
    parentAddress: 'Jl. Danau Toba G7/12, Sawojajar, Malang',
    medicalHistory: {
      bloodType: 'A',
      allergies: [],
      specialNotes: 'Kacamata minus 2.5 silinder'
    },
    sppStatus: 'Lunas',
    tahfidzJuz: 18.0,
    disciplinePoints: 5,
    achievementsCount: 5
  },
  {
    id: 'std-3',
    nisn: '0089876543',
    nis: '20241003',
    fullName: 'Zaidan Hilmi Abdillah',
    gender: 'Laki-laki',
    birthPlace: 'Sidoarjo',
    birthDate: '2009-11-05',
    currentClassId: 'cls-3',
    className: 'X Keagamaan 1',
    gradeLevel: '10',
    major: 'Keagamaan / Diniyah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2025-07-10',
    parentName: 'H. Suwandi Santoso',
    parentPhone: '0852-3344-5566',
    parentAddress: 'Komplek Pondok Mutiara Blok CC-8, Sidoarjo',
    medicalHistory: {
      bloodType: 'B',
      allergies: ['Debu pekat'],
      specialNotes: 'Tidak ada riwayat penyakit berat'
    },
    sppStatus: 'Tunggakan',
    tahfidzJuz: 7.0,
    disciplinePoints: 10,
    achievementsCount: 1
  },
  {
    id: 'std-4',
    nisn: '0076543219',
    nis: '20241004',
    fullName: 'Maryam Khairunnisa',
    gender: 'Perempuan',
    birthPlace: 'Gresik',
    birthDate: '2009-06-18',
    currentClassId: 'cls-2',
    className: 'XI IPA 1',
    gradeLevel: '11',
    major: 'MIPA (Matematika & IPA)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2024-07-15',
    parentName: 'Hj. Dewi Sartika',
    parentPhone: '0813-1122-8899',
    parentAddress: 'Jl. Dr. Wahidin Sudirohusodo No. 88, Gresik',
    medicalHistory: {
      bloodType: 'AB',
      allergies: ['Kacang tanah'],
      specialNotes: 'Perlu membawa inhaler jika ada aktivitas lari cepat'
    },
    sppStatus: 'Lunas',
    tahfidzJuz: 30.0,
    disciplinePoints: 0,
    achievementsCount: 7
  },
  {
    id: 'std-5',
    nisn: '0091122334',
    nis: '20241005',
    fullName: 'Rayhan Fadhil El-Shirazy',
    gender: 'Laki-laki',
    birthPlace: 'Pasuruan',
    birthDate: '2010-01-10',
    currentClassId: 'cls-4',
    className: 'X IPS 1',
    gradeLevel: '10',
    major: 'IPS (Ilmu Sosial)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    enrollmentDate: '2025-07-10',
    parentName: 'Drs. Subhan Basalamah',
    parentPhone: '0877-6655-4433',
    parentAddress: 'Jl. Pahlawan No. 15, Bangil, Pasuruan',
    medicalHistory: {
      bloodType: 'O',
      allergies: [],
      specialNotes: 'Kondisi fisik prima'
    },
    sppStatus: 'Sebagian',
    tahfidzJuz: 4.0,
    disciplinePoints: 15,
    achievementsCount: 2
  }
];

export const initialPpdbApplicants: PpdbApplicant[] = [
  {
    id: 'ppdb-1',
    registrationNumber: 'PPDB-2026-001',
    fullName: 'Fathir Ahmad Robbani',
    previousSchool: 'MTs Negeri 1 Kota Malang',
    targetLevel: 'Kelas X (Aliyah)',
    targetMajor: 'Keagamaan / Tahfidz Unggulan',
    parentName: 'H. Mukhlis Robbani, M.Ag',
    parentPhone: '0812-4455-6677',
    submissionDate: '2026-08-10',
    status: 'Diterima',
    documents: {
      birthCertificate: true,
      familyCard: true,
      graduationCertificate: true,
      reportCard: true
    },
    interviewScore: 92,
    quranReadingScore: 95,
    academicScore: 88,
    notes: 'Hafal 8 Juz saat di MTs, membaca kitab Safinatun Najah lancar'
  },
  {
    id: 'ppdb-2',
    registrationNumber: 'PPDB-2026-002',
    fullName: 'Naila Salsabila Humaira',
    previousSchool: 'SMP Islam Terpadu Al-Izzah',
    targetLevel: 'Kelas X (Aliyah)',
    targetMajor: 'MIPA (Matematika & Sains Islam)',
    parentName: 'dr. Hendra Kurniawan, Sp.A',
    parentPhone: '0813-8899-0011',
    submissionDate: '2026-08-12',
    status: 'Tes Wawancara',
    documents: {
      birthCertificate: true,
      familyCard: true,
      graduationCertificate: true,
      reportCard: true
    },
    interviewScore: 88,
    quranReadingScore: 85,
    academicScore: 94,
    notes: 'Juara 2 OSN Matematika tingkat Kota Malang'
  },
  {
    id: 'ppdb-3',
    registrationNumber: 'PPDB-2026-003',
    fullName: 'Rifqi Pratama Al-Ghifari',
    previousSchool: 'SMP Negeri 3 Surabaya',
    targetLevel: 'Kelas X (Aliyah)',
    targetMajor: 'IPS & Kajian Ekonomi Syariah',
    parentName: 'Bambang Supriyadi',
    parentPhone: '0856-7788-9911',
    submissionDate: '2026-08-18',
    status: 'Verifikasi Berkas',
    documents: {
      birthCertificate: true,
      familyCard: true,
      graduationCertificate: false,
      reportCard: true
    },
    notes: 'Menunggu legalisir SKL dari sekolah asal'
  },
  {
    id: 'ppdb-4',
    registrationNumber: 'PPDB-2026-004',
    fullName: 'Salwa Annisa Qanita',
    previousSchool: 'Pondok Pesantren Modern Darussalam',
    targetLevel: 'Kelas X (Aliyah)',
    targetMajor: 'Keagamaan / Bahasa Arab Intensif',
    parentName: 'Hj. Ummi Kulsum',
    parentPhone: '0819-2233-4455',
    submissionDate: '2026-08-20',
    status: 'Daftar',
    documents: {
      birthCertificate: true,
      familyCard: true,
      graduationCertificate: true,
      reportCard: true
    },
    notes: 'Pendaftar jalur prestasi Tahfidz 15 Juz'
  }
];

export const initialDisciplines: DisciplineRecord[] = [
  {
    id: 'disc-1',
    studentId: 'std-5',
    studentName: 'Rayhan Fadhil El-Shirazy',
    className: 'X IPS 1',
    date: '2026-08-15',
    violationType: 'Terlambat Shalat Berjamaah Dzuhur',
    category: 'Ringan',
    penaltyPoints: 5,
    actionTaken: 'Teguran lisan & murajaah 1/2 juz Al-Waqiah di musholla',
    reportedBy: 'Ustadz Hasan Basri, S.Pd',
    status: 'Selesai'
  },
  {
    id: 'disc-2',
    studentId: 'std-3',
    studentName: 'Zaidan Hilmi Abdillah',
    className: 'X Keagamaan 1',
    date: '2026-08-20',
    violationType: 'Membawa HP saat jam belajar tanpa izin guru mapel',
    category: 'Sedang',
    penaltyPoints: 10,
    actionTaken: 'HP disita 3 hari dan dititipkan di ruang Bimbingan Konseling (BK)',
    reportedBy: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    status: 'Selesai'
  }
];

export const initialAchievements: AchievementRecord[] = [
  {
    id: 'ach-1',
    studentId: 'std-4',
    studentName: 'Maryam Khairunnisa',
    className: 'XI IPA 1',
    title: 'Juara 1 Musabaqah Hifdzil Qur\'an (MHQ) 30 Juz Tingkat Nasional',
    level: 'Nasional',
    category: 'Tahfidz & Diniyah',
    rank: 'Juara 1',
    date: '2026-07-28',
    organizer: 'Kementerian Agama RI & LPTQ Nasional'
  },
  {
    id: 'ach-2',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    className: 'XII Keagamaan 1',
    title: 'Juara 2 Debat Bahasa Arab (Munazarah Ilmiyah) Antar Pesantren se-Jawa',
    level: 'Provinsi',
    category: 'Akademik',
    rank: 'Juara 2',
    date: '2026-08-05',
    organizer: 'Universitas Islam Negeri Sunan Ampel Surabaya'
  },
  {
    id: 'ach-3',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    className: 'XI IPA 1',
    title: 'Medali Emas Olimpiade Sains Madrasah (KSM) Bidang Biologi Terintegrasi',
    level: 'Nasional',
    category: 'Akademik',
    rank: 'Juara 1',
    date: '2026-06-15',
    organizer: 'Direktorat KSKK Madrasah Kemenag RI'
  }
];

export const initialClassrooms: Classroom[] = [
  {
    id: 'cls-1',
    name: 'XII Keagamaan 1',
    gradeLevel: '12',
    major: 'Keagamaan / Diniyah Khusus',
    homeroomTeacherId: 'usr-2',
    homeroomTeacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    capacity: 30,
    studentCount: 28,
    academicYear: '2026/2027',
    roomNumber: 'Gedung Umar Bin Khattab Lt. 2 (R.201)'
  },
  {
    id: 'cls-2',
    name: 'XI IPA 1 (Unggulan Sains)',
    gradeLevel: '11',
    major: 'MIPA (Matematika & Sains Terpadu)',
    homeroomTeacherId: 'stf-3',
    homeroomTeacherName: 'Ustadz Syamsul Hadi, M.Si',
    capacity: 32,
    studentCount: 30,
    academicYear: '2026/2027',
    roomNumber: 'Gedung Ibnu Sina Lt. 1 (R.102)'
  },
  {
    id: 'cls-3',
    name: 'X Keagamaan 1 (Tahfidz Intensif)',
    gradeLevel: '10',
    major: 'Keagamaan & Tahfidz',
    homeroomTeacherId: 'stf-4',
    homeroomTeacherName: 'Ustadz Muhammad Ridwan, Lc',
    capacity: 30,
    studentCount: 26,
    academicYear: '2026/2027',
    roomNumber: 'Gedung Abu Bakar Ash-Shiddiq Lt. 1 (R.105)'
  },
  {
    id: 'cls-4',
    name: 'X IPS 1 (Sosial & Humaniora)',
    gradeLevel: '10',
    major: 'IPS (Ilmu Pengetahuan Sosial)',
    homeroomTeacherId: 'stf-5',
    homeroomTeacherName: 'Ustadzah Nurul Hidayati, S.Sos',
    capacity: 32,
    studentCount: 29,
    academicYear: '2026/2027',
    roomNumber: 'Gedung Utsman Bin Affan Lt. 2 (R.204)'
  }
];

export const initialSubjects: Subject[] = [
  {
    id: 'sbj-1',
    code: 'ARB-01',
    name: 'Bahasa Arab & Nahwu Sharaf',
    category: 'Kemenag / Agama',
    kkm: 75,
    creditHours: 4,
    teacherId: 'usr-2',
    teacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    description: 'Kaidah tata bahasa Arab, Qawaid, Mutammimah, dan percakapan (Muhadatsah)'
  },
  {
    id: 'sbj-2',
    code: 'FQH-02',
    name: 'Fiqih & Ushul Fiqih',
    category: 'Kemenag / Agama',
    kkm: 78,
    creditHours: 3,
    teacherId: 'stf-4',
    teacherName: 'Ustadz Muhammad Ridwan, Lc',
    description: 'Kajian hukum ibadah, muamalah Islam, dan metodologi istinbath hukum Fathul Qarib'
  },
  {
    id: 'sbj-3',
    code: 'THF-03',
    name: 'Tahfidz & Tajwid Al-Qur\'an',
    category: 'Kemenag / Agama',
    kkm: 80,
    creditHours: 6,
    teacherId: 'stf-4',
    teacherName: 'Ustadz Muhammad Ridwan, Lc',
    description: 'Setoran hafalan Al-Qur\'an harian, matan Jazariyah, dan tasmi\' bersanad'
  },
  {
    id: 'sbj-4',
    code: 'MAT-04',
    name: 'Matematika Terapan',
    category: 'Umum',
    kkm: 72,
    creditHours: 4,
    teacherId: 'stf-3',
    teacherName: 'Ustadz Syamsul Hadi, M.Si',
    description: 'Aljabar linier, kalkulus diferensial, statistika data dan pemecahan masalah'
  },
  {
    id: 'sbj-5',
    code: 'BIO-05',
    name: 'Biologi & Sains Terintegrasi Islam',
    category: 'Umum',
    kkm: 75,
    creditHours: 4,
    teacherId: 'stf-3',
    teacherName: 'Ustadz Syamsul Hadi, M.Si',
    description: 'Biologi sel, genetika, keanekaragaman hayati dikaitkan dengan ayat-ayat kauniyah'
  },
  {
    id: 'sbj-6',
    code: 'SKI-06',
    name: 'Sejarah Kebudayaan Islam (SKI)',
    category: 'Kemenag / Agama',
    kkm: 75,
    creditHours: 2,
    teacherId: 'usr-2',
    teacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    description: 'Peradaban Islam era Khulafaur Rasyidin, Dinasti Umayyah, Abbasiyah, dan Wali Songo'
  }
];

export const initialSchedules: ScheduleItem[] = [
  {
    id: 'sch-1',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    subjectId: 'sbj-1',
    subjectName: 'Bahasa Arab & Nahwu Sharaf',
    teacherId: 'usr-2',
    teacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    day: 'Senin',
    startTime: '07:30',
    endTime: '09:00',
    roomNumber: 'R.201'
  },
  {
    id: 'sch-2',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    subjectId: 'sbj-3',
    subjectName: 'Tahfidz & Tajwid Al-Qur\'an',
    teacherId: 'stf-4',
    teacherName: 'Ustadz Muhammad Ridwan, Lc',
    day: 'Senin',
    startTime: '09:30',
    endTime: '11:45',
    roomNumber: 'Musholla Utama / Halaqah 1'
  },
  {
    id: 'sch-3',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    subjectId: 'sbj-2',
    subjectName: 'Fiqih & Ushul Fiqih',
    teacherId: 'stf-4',
    teacherName: 'Ustadz Muhammad Ridwan, Lc',
    day: 'Selasa',
    startTime: '07:30',
    endTime: '09:45',
    roomNumber: 'R.201'
  },
  {
    id: 'sch-4',
    classId: 'cls-2',
    className: 'XI IPA 1',
    subjectId: 'sbj-4',
    subjectName: 'Matematika Terapan',
    teacherId: 'stf-3',
    teacherName: 'Ustadz Syamsul Hadi, M.Si',
    day: 'Rabu',
    startTime: '07:30',
    endTime: '09:45',
    roomNumber: 'R.102'
  },
  {
    id: 'sch-5',
    classId: 'cls-2',
    className: 'XI IPA 1',
    subjectId: 'sbj-5',
    subjectName: 'Biologi & Sains Terintegrasi Islam',
    teacherId: 'stf-3',
    teacherName: 'Ustadz Syamsul Hadi, M.Si',
    day: 'Kamis',
    startTime: '10:00',
    endTime: '11:45',
    roomNumber: 'Laboratorium Biologi'
  }
];

export const initialExams: Exam[] = [
  {
    id: 'ex-1',
    title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil 2026',
    type: 'Asesmen Sumatif Tengah Semester (ASTS)',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    startDate: '2026-09-22',
    endDate: '2026-09-29',
    status: 'Mendatang',
    classesInvolved: ['X Keagamaan 1', 'XI IPA 1', 'XII Keagamaan 1', 'X IPS 1']
  },
  {
    id: 'ex-2',
    title: 'Ujian Tasmi\' Akbar Hafalan 5, 10, 20, 30 Juz Bersanad',
    type: 'Penilaian Harian',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    startDate: '2026-08-30',
    endDate: '2026-09-02',
    status: 'Berlangsung',
    classesInvolved: ['X Keagamaan 1', 'XI IPA 1', 'XII Keagamaan 1']
  }
];

export const initialGrades: GradeRecord[] = [
  {
    id: 'grd-1',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    subjectId: 'sbj-1',
    subjectName: 'Bahasa Arab & Nahwu Sharaf',
    classId: 'cls-1',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    formatifAvg: 90,
    sumatifTengah: 88,
    sumatifAkhir: 94,
    finalScore: 91,
    letterGrade: 'A',
    competencyDescription: 'Sangat mahir dalam mengi\'rob kalimat isim dan fi\'il serta fasih dalam muhadatsah yaumiyyah.'
  },
  {
    id: 'grd-2',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    subjectId: 'sbj-2',
    subjectName: 'Fiqih & Ushul Fiqih',
    classId: 'cls-1',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    formatifAvg: 92,
    sumatifTengah: 90,
    sumatifAkhir: 93,
    finalScore: 92,
    letterGrade: 'A',
    competencyDescription: 'Menguasai bab muamalah syariah dan hukum waris Islam dengan ketelitian tinggi.'
  },
  {
    id: 'grd-3',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    subjectId: 'sbj-3',
    subjectName: 'Tahfidz & Tajwid Al-Qur\'an',
    classId: 'cls-1',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    formatifAvg: 95,
    sumatifTengah: 94,
    sumatifAkhir: 96,
    finalScore: 95,
    letterGrade: 'A',
    competencyDescription: 'Pencapaian hafalan melampaui target semester dengan makharijul huruf dan sifatul huruf istimewa.'
  },
  {
    id: 'grd-4',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    subjectId: 'sbj-4',
    subjectName: 'Matematika Terapan',
    classId: 'cls-2',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    formatifAvg: 96,
    sumatifTengah: 95,
    sumatifAkhir: 98,
    finalScore: 96,
    letterGrade: 'A',
    competencyDescription: 'Kemampuan analisis pemodelan matematika dan kalkulus sangat luar biasa.'
  }
];

export const initialTahfidzRecords: TahfidzRecord[] = [
  {
    id: 'thf-1',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    className: 'XII Keagamaan 1',
    date: '2026-08-24',
    surahName: 'QS. Maryam',
    surahNumber: 19,
    fromAyah: 1,
    toAyah: 40,
    juzNumber: 16,
    type: 'Ziyadah (Hafalan Baru)',
    tajwidScore: 'Mumtaz (Istimewa)',
    fluencyScore: 'Sangat Lancar',
    evaluatorId: 'usr-2',
    evaluatorName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    notes: 'Makhraj huruf shad dan tha sangat bersih, irama kurdi tenang.'
  },
  {
    id: 'thf-2',
    studentId: 'std-4',
    studentName: 'Maryam Khairunnisa',
    className: 'XI IPA 1',
    date: '2026-08-23',
    surahName: 'QS. Al-Baqarah (Tasmi\' 1 Juz)',
    surahNumber: 2,
    fromAyah: 1,
    toAyah: 141,
    juzNumber: 1,
    type: 'Tasmi\' Akbar',
    tajwidScore: 'Mumtaz (Istimewa)',
    fluencyScore: 'Sangat Lancar',
    evaluatorId: 'stf-4',
    evaluatorName: 'Ustadz Muhammad Ridwan, Lc',
    notes: 'Tasmi\' 1 kali duduk tanpa salah harakat dan waqaf ibtida sempurna.'
  },
  {
    id: 'thf-3',
    studentId: 'std-3',
    studentName: 'Zaidan Hilmi Abdillah',
    className: 'X Keagamaan 1',
    date: '2026-08-22',
    surahName: 'QS. Al-Mulk',
    surahNumber: 67,
    fromAyah: 1,
    toAyah: 30,
    juzNumber: 29,
    type: 'Muraja\'ah (Pengulangan)',
    tajwidScore: 'Jayyid Jiddan (Sangat Baik)',
    fluencyScore: 'Lancar',
    evaluatorId: 'usr-2',
    evaluatorName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    notes: 'Perhatikan panjang mad wajib muttashil pada ayat 16.'
  }
];

export const initialPrayerRecords: PrayerRecord[] = [
  {
    id: 'pry-1',
    date: '2026-08-25',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    className: 'XII Keagamaan 1',
    prayers: {
      subuh: 'Berjamaah',
      dhuha: 'Hadir',
      dzuhur: 'Berjamaah',
      ashar: 'Berjamaah',
      maghrib: 'Berjamaah',
      isya: 'Berjamaah'
    },
    evaluatedBy: 'Ustadz Hasan Basri, S.Pd (Musyrif Asrama)'
  },
  {
    id: 'pry-2',
    date: '2026-08-25',
    studentId: 'std-3',
    studentName: 'Zaidan Hilmi Abdillah',
    className: 'X Keagamaan 1',
    prayers: {
      subuh: 'Berjamaah',
      dhuha: 'Hadir',
      dzuhur: 'Masbuk',
      ashar: 'Berjamaah',
      maghrib: 'Berjamaah',
      isya: 'Berjamaah'
    },
    evaluatedBy: 'Ustadz Hasan Basri, S.Pd'
  },
  {
    id: 'pry-3',
    date: '2026-08-25',
    studentId: 'std-5',
    studentName: 'Rayhan Fadhil El-Shirazy',
    className: 'X IPS 1',
    prayers: {
      subuh: 'Munfarid',
      dhuha: 'Hadir',
      dzuhur: 'Berjamaah',
      ashar: 'Berjamaah',
      maghrib: 'Berjamaah',
      isya: 'Berjamaah'
    },
    evaluatedBy: 'Ustadzah Fitriah Nur Azizah, S.Pd.I'
  }
];

export const initialStaff: Staff[] = [
  {
    id: 'usr-1',
    nip: '197508152002121003',
    nuptk: '4567753655200012',
    fullName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    role: 'Kepala Sekolah',
    employmentStatus: 'PNS',
    gender: 'Laki-laki',
    phone: '0812-3456-7890',
    email: 'kepala.sekolah@alhikmah.sch.id',
    education: 'S3 Manajemen Pendidikan Islam (UIN Malang)',
    joinDate: '2010-07-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    basicSalary: 6500000,
    bankAccount: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7144889901',
      holderName: 'Ahmad Fauzi'
    }
  },
  {
    id: 'usr-2',
    nip: '198804122014032001',
    nuptk: '8934766668210043',
    fullName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    role: 'Guru',
    employmentStatus: 'GTT (Guru Tetap Yayasan)',
    gender: 'Perempuan',
    phone: '0813-9876-5432',
    email: 'gurufitriah@gmail.com',
    education: 'S1 Pendidikan Bahasa Arab (Al-Azhar Cairo / UIN Syarif Hidayatullah)',
    joinDate: '2016-08-01',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    basicSalary: 4500000,
    bankAccount: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7199223344',
      holderName: 'Fitriah Nur Azizah'
    }
  },
  {
    id: 'stf-3',
    nip: '198305202008011005',
    nuptk: '1244761663200082',
    fullName: 'Ustadz Syamsul Hadi, M.Si',
    role: 'Guru',
    employmentStatus: 'PNS',
    gender: 'Laki-laki',
    phone: '0812-5566-7788',
    email: 'syamsul.hadi@alhikmah.sch.id',
    education: 'S2 Biologi & Bioinformatika (Institut Teknologi Sepuluh Nopember)',
    joinDate: '2012-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    basicSalary: 5200000,
    bankAccount: {
      bankName: 'Bank Mandiri',
      accountNumber: '1420019988221',
      holderName: 'Syamsul Hadi'
    }
  },
  {
    id: 'stf-4',
    nip: '199009102021021008',
    fullName: 'Ustadz Muhammad Ridwan, Lc',
    role: 'Guru',
    employmentStatus: 'GTT (Guru Tetap Yayasan)',
    gender: 'Laki-laki',
    phone: '0857-4433-2211',
    email: 'ridwan.lc@alhikmah.sch.id',
    education: 'S1 Syariah & Hadits (Universitas Islam Madinah, KSA)',
    joinDate: '2021-08-01',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    basicSalary: 4800000,
    bankAccount: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7188334455',
      holderName: 'Muhammad Ridwan'
    }
  },
  {
    id: 'usr-5',
    nip: '199209182019022004',
    fullName: 'Siti Rohmah, S.E',
    role: 'Bendahara',
    employmentStatus: 'GTT (Guru Tetap Yayasan)',
    gender: 'Perempuan',
    phone: '0818-4455-6677',
    email: 'keuangan.tu@alhikmah.sch.id',
    education: 'S1 Akuntansi Syariah (Universitas Airlangga)',
    joinDate: '2019-02-01',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    basicSalary: 4200000,
    bankAccount: {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7155667788',
      holderName: 'Siti Rohmah'
    }
  }
];

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'lv-1',
    staffId: 'usr-2',
    staffName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    staffRole: 'Guru Bahasa Arab',
    startDate: '2026-09-05',
    endDate: '2026-09-07',
    daysCount: 3,
    type: 'Izin Dinas / Pelatihan',
    reason: 'Menghadiri Workshop Nasional Kurikulum Berbasis AI Kemenag di Jakarta',
    status: 'Disetujui',
    approvedBy: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    requestedAt: '2026-08-20'
  },
  {
    id: 'lv-2',
    staffId: 'stf-4',
    staffName: 'Ustadz Muhammad Ridwan, Lc',
    staffRole: 'Guru Fiqih & Tahfidz',
    startDate: '2026-09-12',
    endDate: '2026-09-15',
    daysCount: 4,
    type: 'Izin Khusus / Ibadah Umrah',
    reason: 'Mendampingi jamaah bimbingan manasik umrah yayasan',
    status: 'Menunggu Persetujuan',
    requestedAt: '2026-08-24'
  }
];

export const initialPayrollRecords: PayrollRecord[] = [
  {
    id: 'pyr-1',
    staffId: 'usr-2',
    staffName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    staffRole: 'Guru Bahasa Arab & Wali Kelas',
    month: 'Agustus 2026',
    basicSalary: 4500000,
    allowances: {
      positionAllowance: 500000, // Wali Kelas
      teachingAllowance: 600000, // 24 Jam Pelajaran
      transportAllowance: 400000,
      otherAllowance: 250000 // Tunjangan Sertifikasi Tahfidz
    },
    deductions: {
      bpjsKesehatan: 90000,
      bpjsKetenagakerjaan: 110000,
      cooperativeLoan: 0,
      latePenalty: 0
    },
    netSalary: 6150000,
    paymentStatus: 'Dibayar',
    paymentDate: '2026-08-25'
  },
  {
    id: 'pyr-2',
    staffId: 'stf-3',
    staffName: 'Ustadz Syamsul Hadi, M.Si',
    staffRole: 'Guru Biologi & Kepala Lab',
    month: 'Agustus 2026',
    basicSalary: 5200000,
    allowances: {
      positionAllowance: 600000,
      teachingAllowance: 550000,
      transportAllowance: 400000,
      otherAllowance: 300000
    },
    deductions: {
      bpjsKesehatan: 104000,
      bpjsKetenagakerjaan: 130000,
      cooperativeLoan: 250000,
      latePenalty: 0
    },
    netSalary: 6566000,
    paymentStatus: 'Dibayar',
    paymentDate: '2026-08-25'
  },
  {
    id: 'pyr-3',
    staffId: 'usr-5',
    staffName: 'Siti Rohmah, S.E',
    staffRole: 'Bendahara & Staf TU',
    month: 'Agustus 2026',
    basicSalary: 4200000,
    allowances: {
      positionAllowance: 400000,
      teachingAllowance: 0,
      transportAllowance: 400000,
      otherAllowance: 200000
    },
    deductions: {
      bpjsKesehatan: 84000,
      bpjsKetenagakerjaan: 105000,
      cooperativeLoan: 0,
      latePenalty: 0
    },
    netSalary: 5011000,
    paymentStatus: 'Dibayar',
    paymentDate: '2026-08-25'
  }
];

export const initialFeeStructures: FeeStructure[] = [
  {
    id: 'fee-1',
    name: 'SPP Bulanan (Pendidikan & Asrama)',
    category: 'Bulanan',
    amount: 1250000,
    gradeLevels: ['10', '11', '12'],
    academicYear: '2026/2027'
  },
  {
    id: 'fee-2',
    name: 'Infaq Pengembangan Fasilitas & Gedung',
    category: 'Tahunan',
    amount: 3500000,
    gradeLevels: ['10'],
    academicYear: '2026/2027'
  },
  {
    id: 'fee-3',
    name: 'Seragam Khas Madrasah & Almamater',
    category: 'Sekali Bayar',
    amount: 950000,
    gradeLevels: ['10'],
    academicYear: '2026/2027'
  },
  {
    id: 'fee-4',
    name: 'Paket Kitab Kuning & Modul Kurikulum Kemenag',
    category: 'Tahunan',
    amount: 650000,
    gradeLevels: ['10', '11', '12'],
    academicYear: '2026/2027'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-202608-001',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    className: 'XII Keagamaan 1',
    parentName: 'Ir. H. Bambang Sudaryanto',
    parentPhone: '0811-2233-4455',
    title: 'SPP Bulan Agustus 2026 & Paket Kitab',
    amount: 1900000,
    dueDate: '2026-08-10',
    createdAt: '2026-08-01',
    status: 'Lunas',
    paymentMethod: 'Virtual Account BSI',
    paidAt: '2026-08-05 09:24:12',
    paymentProofRef: 'BSI-VA-9928172648'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-202608-002',
    studentId: 'std-2',
    studentName: 'Aisyah Putri Azzahra',
    className: 'XI IPA 1',
    parentName: 'Drs. H. Mulyono',
    parentPhone: '0812-7788-9900',
    title: 'SPP Bulan Agustus 2026',
    amount: 1250000,
    dueDate: '2026-08-10',
    createdAt: '2026-08-01',
    status: 'Lunas',
    paymentMethod: 'QRIS',
    paidAt: '2026-08-07 14:11:05',
    paymentProofRef: 'NMID-QRIS-77881122'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-202608-003',
    studentId: 'std-3',
    studentName: 'Zaidan Hilmi Abdillah',
    className: 'X Keagamaan 1',
    parentName: 'H. Suwandi Santoso',
    parentPhone: '0852-3344-5566',
    title: 'SPP Bulan Agustus 2026',
    amount: 1250000,
    dueDate: '2026-08-10',
    createdAt: '2026-08-01',
    status: 'Jatuh Tempo'
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-202608-004',
    studentId: 'std-5',
    studentName: 'Rayhan Fadhil El-Shirazy',
    className: 'X IPS 1',
    parentName: 'Drs. Subhan Basalamah',
    parentPhone: '0877-6655-4433',
    title: 'Infaq Gedung Cicilan ke-2',
    amount: 1500000,
    dueDate: '2026-08-30',
    createdAt: '2026-08-15',
    status: 'Belum Bayar'
  }
];

export const initialExpenses: Expense[] = [
  {
    id: 'exp-1',
    title: 'Pembayaran Honor dan Gaji Pendidik & Tenaga Kependidikan Bulan Agustus 2026',
    category: 'Gaji & Honor',
    amount: 48500000,
    date: '2026-08-25',
    approvedBy: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    description: 'Transfer payroll gaji 18 guru dan 6 staf administrasi melalui Bank BSI'
  },
  {
    id: 'exp-2',
    title: 'Tagihan Listrik PLN & Internet Dedicated Fiber Optic Madrasah',
    category: 'Operasional & Utilitas',
    amount: 4850000,
    date: '2026-08-15',
    approvedBy: 'Siti Rohmah, S.E',
    description: 'Tagihan daya 23.000 VA gedung madrasah dan langganan Biznet 150 Mbps'
  },
  {
    id: 'exp-3',
    title: 'Pengadaan Kitab Kuning Jurumiyah & Fathul Qarib untuk Siswa Baru',
    category: 'Pengadaan Kitab & ATK',
    amount: 6200000,
    date: '2026-08-12',
    approvedBy: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    description: 'Pemesanan 120 eksemplar cetakan Darul Kutub Ilmiyah Beirut & Toha Putra'
  },
  {
    id: 'exp-4',
    title: 'Perawatan AC Ruang Kelas dan Filter Air Minum Santri',
    category: 'Pemeliharaan Gedung',
    amount: 2400000,
    date: '2026-08-18',
    approvedBy: 'Siti Rohmah, S.E',
    description: 'Servis rutin 8 unit AC split dan penggantian membran RO mesin air minum'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Jadwal Pelaksanaan Asesmen Sumatif Tengah Semester (ASTS) Ganjil T.A 2026/2027',
    content: 'Diberitahukan kepada seluruh dewan guru, santri, dan wali murid bahwa pelaksanaan ASTS Ganjil akan dimulai tanggal 22 September 2026. Seluruh siswa diharapkan telah menyelesaikan administrasi e-Kartu Ujian dan melunasi SPP hingga bulan berjalan.',
    author: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    authorRole: 'Kepala Madrasah',
    date: '2026-08-24',
    targetAudience: 'Semua',
    priority: 'Penting',
    attachmentName: 'Jadwal_ASTS_Ganjil_2026.pdf'
  },
  {
    id: 'ann-2',
    title: 'Peringatan Hari Santri Nasional & Musabaqah Tilawatil Qur\'an Antar Rombel',
    content: 'Dalam rangka menyambut Hari Santri, madrasah akan menyelenggarakan gebyar lomba tahfidz, qiraatul kutub, kaligrafi, dan pidato 3 bahasa (Arab, Inggris, Indonesia). Pendaftaran peserta dibuka melalui Wali Kelas masing-masing.',
    author: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    authorRole: 'Koordinator Kesiswaan & Keagamaan',
    date: '2026-08-20',
    targetAudience: 'Siswa',
    priority: 'Normal'
  },
  {
    id: 'ann-3',
    title: 'Pemberitahuan Pembayaran SPP Online via QRIS & BSI Virtual Account',
    content: 'Untuk meningkatkan kemudahan dan transparansi, seluruh pembayaran SPP kini dapat dilakukan secara real-time melalui QRIS, BSI Virtual Account, atau Bank Mitra lainnya yang langsung terverifikasi oleh sistem secara otomatis.',
    author: 'Siti Rohmah, S.E',
    authorRole: 'Kepala Tata Usaha & Keuangan',
    date: '2026-08-15',
    targetAudience: 'Orang Tua',
    priority: 'Normal'
  }
];

export const initialGuestBookEntries: GuestBookEntry[] = [
  {
    id: 'gst-1',
    guestName: 'Drs. H. Miftahul Huda, M.Ag',
    institution: 'Kantor Kementerian Agama (Kemenag) Kota Malang',
    phoneNumber: '0812-9988-7766',
    purpose: 'Kunjungan Dinas',
    personToMeet: 'Dr. H. Ahmad Fauzi, M.Pd.I (Kepala Madrasah)',
    checkInTime: '2026-08-25 09:15',
    checkOutTime: '2026-08-25 11:30',
    notes: 'Monitoring dan Evaluasi Implementasi Kurikulum Berbasis Madrasah Digital Unggul',
    status: 'Selesai'
  },
  {
    id: 'gst-2',
    guestName: 'H. Mukhlis Robbani, M.Ag',
    institution: 'Wali Calon Santri Baru (PPDB)',
    phoneNumber: '0812-4455-6677',
    purpose: 'Konsultasi PPDB',
    personToMeet: 'Panitia PPDB / Bagian Administrasi',
    checkInTime: '2026-08-25 10:00',
    notes: 'Konfirmasi pendaftaran jalur beasiswa tahfidz dan penyerahan sertifikat kejuaraan',
    status: 'Sedang Bertemu'
  },
  {
    id: 'gst-3',
    guestName: 'Ir. Hendro Kusumo',
    institution: 'PT. Telkom Indonesia EduConnect',
    phoneNumber: '0813-5566-7788',
    purpose: 'Kerjasama & Vendor',
    personToMeet: 'Kepala Urusan Tata Usaha & IT',
    checkInTime: '2026-08-25 13:30',
    notes: 'Sosialisasi bandwidth fiber dedicated & server backup cloud madrasah',
    status: 'Menunggu'
  }
];

export const initialDiniyahKitabs: DiniyahKitab[] = [
  {
    id: 'ktb-1',
    kitabName: 'Fathul Qarib Al-Mujib',
    author: 'Al-Imam Syamsuddin Muhammad bin Qasim Al-Ghazi',
    category: 'Fiqih',
    totalChapters: 24,
    currentChapter: 8,
    currentChapterTitle: 'Fasal Ketentuan Shalat Jama\'ah & Jamak Qashar',
    targetLevel: 'Kelas XI & XII Keagamaan',
    teacherId: 'stf-2',
    teacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    scheduleDay: 'Senin & Rabu Ba\'da Ashar'
  },
  {
    id: 'ktb-2',
    kitabName: 'Matan Al-Jurumiyyah',
    author: 'Abu Abdillah Sidi Muhammad bin Daud Ash-Shanhaji',
    category: 'Nahwu & Sharaf',
    totalChapters: 18,
    currentChapter: 12,
    currentChapterTitle: 'Bab \'Awamil Ad-Dakhilah \'ala Al-Mubtada\' wal Khabar',
    targetLevel: 'Kelas X Keagamaan & Reguler',
    teacherId: 'stf-1',
    teacherName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    scheduleDay: 'Selasa Ba\'da Subuh'
  },
  {
    id: 'ktb-3',
    kitabName: 'Bulughul Maram min Adillatil Ahkam',
    author: 'Al-Hafizh Ibnu Hajar Al-Asqalani',
    category: 'Hadits',
    totalChapters: 16,
    currentChapter: 5,
    currentChapterTitle: 'Kitab Ash-Shiyam (Hukum-Hukum Puasa & I\'tikaf)',
    targetLevel: 'Kelas XI & XII Program Tahfidz',
    teacherId: 'stf-3',
    teacherName: 'Ustadz Hilman Hakim, Lc., M.H',
    scheduleDay: 'Kamis Ba\'da Maghrib'
  },
  {
    id: 'ktb-4',
    kitabName: 'Ta\'limul Muta\'allim Thariqat Ta\'allum',
    author: 'Syaikh Az-Zarnuji',
    category: 'Akhlaq / Tasawwuf',
    totalChapters: 13,
    currentChapter: 9,
    currentChapterTitle: 'Fasal Akhlak Penghormatan kepada Guru & Teman Belajar',
    targetLevel: 'Seluruh Santri Asrama',
    teacherId: 'stf-1',
    teacherName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    scheduleDay: 'Ahad Pagi (Kajian Akbar)'
  },
  {
    id: 'ktb-5',
    kitabName: 'Aqidatul Awwam & Tijanud Darari',
    author: 'Syaikh Ahmad Al-Marzuqi Al-Maliki',
    category: 'Aqidah / Tauhid',
    totalChapters: 10,
    currentChapter: 6,
    currentChapterTitle: 'Sifat Wajib, Mustahil, dan Jaiz bagi Para Rasul',
    targetLevel: 'Kelas X Seluruh Jurusan',
    teacherId: 'stf-2',
    teacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    scheduleDay: 'Jumat Ba\'da Shubuh'
  }
];

export const initialPrayerLogs: PrayerAttendance[] = [
  {
    id: 'pr-1',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    className: 'XII Keagamaan 1',
    date: '2026-08-25',
    prayerName: 'Dzuhur',
    status: 'Berjamaah di Masjid',
    location: 'Masjid Jami\' Al-Hikmah'
  },
  {
    id: 'pr-2',
    studentId: 'std-3',
    studentName: 'Zaidan Hilmi Abdillah',
    className: 'X Keagamaan 1',
    date: '2026-08-25',
    prayerName: 'Dzuhur',
    status: 'Masbuq',
    location: 'Masjid Jami\' Al-Hikmah'
  },
  {
    id: 'pr-3',
    studentId: 'std-5',
    studentName: 'Rayhan Fadhil El-Shirazy',
    className: 'X IPS 1',
    date: '2026-08-25',
    prayerName: 'Dzuhur',
    status: 'Berjamaah di Masjid',
    location: 'Masjid Jami\' Al-Hikmah'
  }
];

export const initialJournalEntries: FinancialJournalEntry[] = [
  {
    id: 'jrn-1',
    date: '2026-08-25',
    description: 'Penerimaan SPP & Uang Makan Santri Asrama (Transfer BSI VA)',
    type: 'Pemasukan',
    category: 'SPP Bulanan',
    amount: 14500000,
    recordedBy: 'Siti Rohmah, S.E (Bendahara)',
    referenceNo: 'KAS-IN-202608-01'
  },
  {
    id: 'jrn-2',
    date: '2026-08-24',
    description: 'Penyaluran Insentif Guru Halaqah Tahfidz & Honor Asatidz',
    type: 'Pengeluaran',
    category: 'Gaji & Insentif',
    amount: 8500000,
    recordedBy: 'Siti Rohmah, S.E (Bendahara)',
    referenceNo: 'KAS-OUT-202608-02'
  },
  {
    id: 'jrn-3',
    date: '2026-08-22',
    description: 'Penerimaan Infaq Pengembangan Gedung & Asrama Santri Baru',
    type: 'Pemasukan',
    category: 'Infaq & Wakaf',
    amount: 25000000,
    recordedBy: 'Siti Rohmah, S.E (Bendahara)',
    referenceNo: 'KAS-IN-202608-03'
  },
  {
    id: 'jrn-4',
    date: '2026-08-20',
    description: 'Pengadaan Kitab Kuning & Buku Modul Pembelajaran Kemenag',
    type: 'Pengeluaran',
    category: 'Pengadaan Kitab',
    amount: 6200000,
    recordedBy: 'Siti Rohmah, S.E (Bendahara)',
    referenceNo: 'KAS-OUT-202608-04'
  },
  {
    id: 'jrn-5',
    date: '2026-08-18',
    description: 'Biaya Pemeliharaan Genset & Langganan Internet Dedicated',
    type: 'Pengeluaran',
    category: 'Operasional & IT',
    amount: 3450000,
    recordedBy: 'Siti Rohmah, S.E (Bendahara)',
    referenceNo: 'KAS-OUT-202608-05'
  }
];

export const initialReportCards: ReportCard[] = [
  {
    id: 'rc-1',
    studentId: 'std-1',
    studentName: 'Muhammad Farhan Ramadhan',
    nisn: '0067891234',
    nis: '20241001',
    className: 'XII Keagamaan 1',
    academicYear: '2026/2027',
    semester: 'Ganjil',
    rank: 1,
    totalStudents: 28,
    grades: [
      {
        id: 'grd-1',
        studentId: 'std-1',
        studentName: 'Muhammad Farhan Ramadhan',
        subjectId: 'sbj-1',
        subjectName: 'Bahasa Arab (Nahwu & Sharaf)',
        classId: 'cls-1',
        academicYear: '2026/2027',
        semester: 'Ganjil',
        formatifAvg: 92,
        sumatifTengah: 90,
        sumatifAkhir: 95,
        finalScore: 93,
        letterGrade: 'A',
        competencyDescription: 'Sangat menguasai kaidah I\'rab dan tarkib kalimat fi\'liyyah/ismiyyah dalam teks bahasa Arab gundul.'
      },
      {
        id: 'grd-2',
        studentId: 'std-1',
        studentName: 'Muhammad Farhan Ramadhan',
        subjectId: 'sbj-2',
        subjectName: 'Fiqih & Ushul Fiqih',
        classId: 'cls-1',
        academicYear: '2026/2027',
        semester: 'Ganjil',
        formatifAvg: 89,
        sumatifTengah: 91,
        sumatifAkhir: 94,
        finalScore: 92,
        letterGrade: 'A',
        competencyDescription: 'Mampu menganalisis dalil hukum syariat dan implementasi muamalah kontemporer dengan sangat baik.'
      },
      {
        id: 'grd-3',
        studentId: 'std-1',
        studentName: 'Muhammad Farhan Ramadhan',
        subjectId: 'sbj-3',
        subjectName: 'Tahfidz Al-Qur\'an 30 Juz',
        classId: 'cls-1',
        academicYear: '2026/2027',
        semester: 'Ganjil',
        formatifAvg: 96,
        sumatifTengah: 98,
        sumatifAkhir: 97,
        finalScore: 97,
        letterGrade: 'A',
        competencyDescription: 'Mutqin hafalan juz 1-12 dengan makhraj huruf dan sifatul huruf yang sangat fasih.'
      },
      {
        id: 'grd-4',
        studentId: 'std-1',
        studentName: 'Muhammad Farhan Ramadhan',
        subjectId: 'sbj-4',
        subjectName: 'Matematika Terapan',
        classId: 'cls-1',
        academicYear: '2026/2027',
        semester: 'Ganjil',
        formatifAvg: 85,
        sumatifTengah: 84,
        sumatifAkhir: 88,
        finalScore: 86,
        letterGrade: 'B',
        competencyDescription: 'Menunjukkan pemahaman yang baik dalam analisis statistika dan kalkulasi logaritma.'
      }
    ],
    attendance: {
      present: 78,
      sick: 2,
      permission: 1,
      unexcused: 0
    },
    spiritualAttitude: 'Sangat baik dalam menjalankan ibadah shalat berjamaah 5 waktu di masjid, istiqamah muraja\'ah Al-Qur\'an, dan berakhlak terpuji.',
    socialAttitude: 'Menunjukkan kepemimpinan yang amanah, gotong royong tinggi, dan santun dalam bermuamalah antar sesama santri.',
    homeroomNotes: 'Prestasi akademik dan hafalan Al-Qur\'an sangat membanggakan. Pertahankan ketawadhuan dan terus tingkatkan persiapan masuk Universitas Al-Azhar Kairo.',
    headmasterName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
    homeroomTeacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
    dateIssued: '25 Desember 2026'
  }
];

export const initialExamSchedules: ExamSchedule[] = [
  {
    id: 'exm-1',
    name: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil',
    type: 'ASTS',
    subjectId: 'sbj-1',
    subjectName: 'Bahasa Arab (Nahwu & Sharaf)',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    date: '2026-09-21',
    startTime: '08:00',
    endTime: '09:30',
    roomNumber: 'R. 201 (Gedung Al-Azhar)',
    academicYear: '2026/2027 Ganjil'
  },
  {
    id: 'exm-2',
    name: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil',
    type: 'ASTS',
    subjectId: 'sbj-2',
    subjectName: 'Fiqih & Ushul Fiqih',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    date: '2026-09-22',
    startTime: '08:00',
    endTime: '09:30',
    roomNumber: 'R. 201 (Gedung Al-Azhar)',
    academicYear: '2026/2027 Ganjil'
  },
  {
    id: 'exm-3',
    name: 'Ujian Lisan Tahfidz & Tasmi\' Akbar',
    type: 'Tahfidz & Lisan',
    subjectId: 'sbj-3',
    subjectName: 'Tahfidz Al-Qur\'an',
    classId: 'cls-1',
    className: 'XII Keagamaan 1',
    date: '2026-09-24',
    startTime: '07:30',
    endTime: '11:30',
    roomNumber: 'Masjid Jami\' Lantai 2',
    academicYear: '2026/2027 Ganjil'
  }
];

