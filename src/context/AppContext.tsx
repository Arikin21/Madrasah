import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserRole, Student, PpdbApplicant, DisciplineRecord, AchievementRecord, 
  Classroom, Subject, ScheduleItem, Exam, GradeRecord, ReportCard,
  TahfidzRecord, PrayerRecord, Staff, LeaveRequest, PayrollRecord, 
  FeeStructure, Invoice, Expense, Announcement, GuestBookEntry,
  DiniyahKitab, PrayerAttendance, FinancialJournalEntry, ExamSchedule, FinanceInvoice
} from '../types';
import { 
  initialUsers, initialStudents, initialPpdbApplicants, initialDisciplines, 
  initialAchievements, initialClassrooms, initialSubjects, initialSchedules, 
  initialExams, initialGrades, initialTahfidzRecords, initialPrayerRecords, 
  initialStaff, initialLeaveRequests, initialPayrollRecords, initialFeeStructures, 
  initialInvoices, initialExpenses, initialAnnouncements, initialGuestBookEntries,
  initialDiniyahKitabs, initialPrayerLogs, initialJournalEntries, initialReportCards,
  initialExamSchedules
} from '../data/mockData';

export type ActiveNavTab = 
  | 'dashboard'
  | 'sis_students'
  | 'sis_ppdb'
  | 'sis_discipline'
  | 'acad_classes'
  | 'acad_subjects'
  | 'acad_schedule'
  | 'acad_exams'
  | 'acad_rapor'
  | 'madr_tahfidz'
  | 'madr_prayers'
  | 'madr_diniyah'
  | 'hr_staff'
  | 'hr_leave'
  | 'hr_payroll'
  | 'fin_fees'
  | 'fin_invoices'
  | 'fin_expenses'
  | 'fo_announcements'
  | 'fo_guestbook'
  | 'architecture';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationToast[];
  addNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;

  // Data states & actions
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  ppdbApplicants: PpdbApplicant[];
  addPpdbApplicant: (applicant: Omit<PpdbApplicant, 'id' | 'registrationNumber' | 'submissionDate'>) => void;
  updatePpdbStatus: (id: string, status: PpdbApplicant['status']) => void;

  disciplines: DisciplineRecord[];
  addDiscipline: (record: Omit<DisciplineRecord, 'id'>) => void;
  
  achievements: AchievementRecord[];
  addAchievement: (record: Omit<AchievementRecord, 'id'>) => void;

  classrooms: Classroom[];
  addClassroom: (cls: Omit<Classroom, 'id'>) => void;

  subjects: Subject[];
  addSubject: (sbj: Omit<Subject, 'id'>) => void;

  schedules: ScheduleItem[];
  addSchedule: (sch: Omit<ScheduleItem, 'id'>) => void;

  exams: Exam[];
  addExam: (exam: Omit<Exam, 'id'>) => void;
  examSchedules: ExamSchedule[];
  addExamSchedule: (sch: any) => void;

  grades: GradeRecord[];
  updateGrade: (id: string, finalScore: number, formatif: number, tengah: number, akhir: number) => void;
  addGrade: (grade: Omit<GradeRecord, 'id'>) => void;
  generateReportCard: (studentId: string) => ReportCard | null;

  reportCards: ReportCard[];
  updateReportCardNarrative: (id: string, narrative: string) => void;

  tahfidzRecords: TahfidzRecord[];
  addTahfidzRecord: (record: Omit<TahfidzRecord, 'id'>) => void;

  prayerRecords: PrayerRecord[];
  updatePrayerRecord: (record: PrayerRecord) => void;
  prayerLogs: PrayerAttendance[];
  addPrayerAttendance: (log: Omit<PrayerAttendance, 'id'>) => void;

  diniyahKitabs: DiniyahKitab[];
  addDiniyahKitab: (kitab: Omit<DiniyahKitab, 'id'>) => void;
  updateKitabProgress: (id: string, currentChapter: number, title?: string) => void;

  staff: Staff[];
  addStaff: (stf: Omit<Staff, 'id'>) => void;
  deleteStaff: (id: string) => void;

  leaveRequests: LeaveRequest[];
  addLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'requestedAt'>) => void;
  updateLeaveStatus: (id: string, status: LeaveRequest['status']) => void;

  payrollRecords: PayrollRecord[];
  processPayrollPayment: (id: string) => void;

  feeStructures: FeeStructure[];
  invoices: Invoice[];
  payInvoice: (invoiceId: string, method?: any) => void;
  createInvoice: (inv: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => void;
  addInvoice: (inv: any) => void;

  expenses: Expense[];
  addExpense: (exp: Omit<Expense, 'id'>) => void;

  journalEntries: FinancialJournalEntry[];
  addJournalEntry: (entry: Omit<FinancialJournalEntry, 'id'>) => void;

  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  blastAnnouncement: (announcementId: string, channel: 'WhatsApp' | 'SMS' | 'Email') => void;

  guestBookEntries: GuestBookEntry[];
  guestBook: GuestBookEntry[];
  addGuestBookEntry: (entry: Omit<GuestBookEntry, 'id' | 'checkInTime'>) => void;
  addGuestEntry: (entry: Omit<GuestBookEntry, 'id' | 'checkInTime'>) => void;
  updateGuestStatus: (id: string, status: GuestBookEntry['status']) => void;

  // Modals
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage hydrated states
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('siamadrasah_user');
    return saved ? JSON.parse(saved) : initialUsers[0];
  });

  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('siamadrasah_dark') === 'true';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  // Core Data
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('siamadrasah_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [ppdbApplicants, setPpdbApplicants] = useState<PpdbApplicant[]>(() => {
    const saved = localStorage.getItem('siamadrasah_ppdb');
    return saved ? JSON.parse(saved) : initialPpdbApplicants;
  });

  const [disciplines, setDisciplines] = useState<DisciplineRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_disc');
    return saved ? JSON.parse(saved) : initialDisciplines;
  });

  const [achievements, setAchievements] = useState<AchievementRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_ach');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [classrooms, setClassrooms] = useState<Classroom[]>(() => {
    const saved = localStorage.getItem('siamadrasah_classes');
    return saved ? JSON.parse(saved) : initialClassrooms;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('siamadrasah_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('siamadrasah_schedules');
    return saved ? JSON.parse(saved) : initialSchedules;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('siamadrasah_exams');
    return saved ? JSON.parse(saved) : initialExams;
  });

  const [grades, setGrades] = useState<GradeRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_grades');
    return saved ? JSON.parse(saved) : initialGrades;
  });

  const [tahfidzRecords, setTahfidzRecords] = useState<TahfidzRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_tahfidz');
    return saved ? JSON.parse(saved) : initialTahfidzRecords;
  });

  const [prayerRecords, setPrayerRecords] = useState<PrayerRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_prayers');
    return saved ? JSON.parse(saved) : initialPrayerRecords;
  });

  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('siamadrasah_staff');
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('siamadrasah_leaves');
    return saved ? JSON.parse(saved) : initialLeaveRequests;
  });

  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem('siamadrasah_payroll');
    return saved ? JSON.parse(saved) : initialPayrollRecords;
  });

  const [feeStructures] = useState<FeeStructure[]>(initialFeeStructures);

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('siamadrasah_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('siamadrasah_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('siamadrasah_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [guestBookEntries, setGuestBookEntries] = useState<GuestBookEntry[]>(() => {
    const saved = localStorage.getItem('siamadrasah_guestbook');
    return saved ? JSON.parse(saved) : initialGuestBookEntries;
  });

  const [diniyahKitabs, setDiniyahKitabs] = useState<DiniyahKitab[]>(() => {
    const saved = localStorage.getItem('siamadrasah_diniyah');
    return saved ? JSON.parse(saved) : initialDiniyahKitabs;
  });

  const [prayerLogs, setPrayerLogs] = useState<PrayerAttendance[]>(() => {
    const saved = localStorage.getItem('siamadrasah_prayer_logs');
    return saved ? JSON.parse(saved) : initialPrayerLogs;
  });

  const [journalEntries, setJournalEntries] = useState<FinancialJournalEntry[]>(() => {
    const saved = localStorage.getItem('siamadrasah_journal');
    return saved ? JSON.parse(saved) : initialJournalEntries;
  });

  const [reportCards, setReportCards] = useState<ReportCard[]>(() => {
    const saved = localStorage.getItem('siamadrasah_reportcards');
    return saved ? JSON.parse(saved) : initialReportCards;
  });

  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>(() => {
    const saved = localStorage.getItem('siamadrasah_examschedules');
    return saved ? JSON.parse(saved) : initialExamSchedules;
  });

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('siamadrasah_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_diniyah', JSON.stringify(diniyahKitabs));
  }, [diniyahKitabs]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_prayer_logs', JSON.stringify(prayerLogs));
  }, [prayerLogs]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_reportcards', JSON.stringify(reportCards));
  }, [reportCards]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_examschedules', JSON.stringify(examSchedules));
  }, [examSchedules]);

  useEffect(() => {
    localStorage.setItem('siamadrasah_dark', isDarkMode ? 'true' : 'false');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const targetUser = initialUsers.find(u => u.role === role) || initialUsers[0];
    setCurrentUser(targetUser);
    addNotification(`Berhasil beralih ke peran: ${targetUser.name} (${role.toUpperCase()})`, 'info');
  };

  // Student Actions
  const addStudent = (newStd: Omit<Student, 'id'>) => {
    const student: Student = {
      ...newStd,
      id: `std-${Date.now()}`
    };
    setStudents(prev => [student, ...prev]);
    addNotification(`Siswa baru "${student.fullName}" berhasil ditambahkan.`);
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    addNotification('Data siswa berhasil diperbarui.');
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    addNotification('Siswa berhasil dihapus dari sistem.', 'warning');
  };

  // PPDB Actions
  const addPpdbApplicant = (app: Omit<PpdbApplicant, 'id' | 'registrationNumber' | 'submissionDate'>) => {
    const count = ppdbApplicants.length + 1;
    const applicant: PpdbApplicant = {
      ...app,
      id: `ppdb-${Date.now()}`,
      registrationNumber: `PPDB-2026-${String(count).padStart(3, '0')}`,
      submissionDate: new Date().toISOString().split('T')[0]
    };
    setPpdbApplicants(prev => [applicant, ...prev]);
    addNotification(`Pendaftaran PPDB #${applicant.registrationNumber} berhasil diajukan.`);
  };

  const updatePpdbStatus = (id: string, status: PpdbApplicant['status']) => {
    setPpdbApplicants(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    addNotification(`Status pendaftar PPDB diubah menjadi: ${status}`);
  };

  // Discipline & Achievement
  const addDiscipline = (record: Omit<DisciplineRecord, 'id'>) => {
    const item: DisciplineRecord = { ...record, id: `disc-${Date.now()}` };
    setDisciplines(prev => [item, ...prev]);
    // update student penalty points
    setStudents(prev => prev.map(s => s.id === record.studentId ? { ...s, disciplinePoints: s.disciplinePoints + record.penaltyPoints } : s));
    addNotification('Catatan kedisiplinan santri berhasil dicatat.', 'warning');
  };

  const addAchievement = (record: Omit<AchievementRecord, 'id'>) => {
    const item: AchievementRecord = { ...record, id: `ach-${Date.now()}` };
    setAchievements(prev => [item, ...prev]);
    setStudents(prev => prev.map(s => s.id === record.studentId ? { ...s, achievementsCount: s.achievementsCount + 1 } : s));
    addNotification('Prestasi santri berhasil didokumentasikan!');
  };

  // Classrooms & Subjects
  const addClassroom = (cls: Omit<Classroom, 'id'>) => {
    setClassrooms(prev => [{ ...cls, id: `cls-${Date.now()}` }, ...prev]);
    addNotification(`Kelas "${cls.name}" berhasil dibuat.`);
  };

  const addSubject = (sbj: Omit<Subject, 'id'>) => {
    setSubjects(prev => [{ ...sbj, id: `sbj-${Date.now()}` }, ...prev]);
    addNotification(`Mata pelajaran "${sbj.name}" berhasil ditambahkan.`);
  };

  const addSchedule = (sch: Omit<ScheduleItem, 'id'>) => {
    setSchedules(prev => [{ ...sch, id: `sch-${Date.now()}` }, ...prev]);
    addNotification('Jadwal pelajaran baru berhasil disimpan.');
  };

  const addExam = (exam: Omit<Exam, 'id'>) => {
    setExams(prev => [{ ...exam, id: `ex-${Date.now()}` }, ...prev]);
    addNotification(`Ujian "${exam.title}" berhasil dijadwalkan.`);
  };

  const updateGrade = (id: string, finalScore: number, formatif: number, tengah: number, akhir: number) => {
    let letter: 'A' | 'B' | 'C' | 'D' = 'C';
    if (finalScore >= 88) letter = 'A';
    else if (finalScore >= 78) letter = 'B';
    else if (finalScore >= 65) letter = 'C';
    else letter = 'D';

    setGrades(prev => prev.map(g => g.id === id ? {
      ...g,
      finalScore,
      formatifAvg: formatif,
      sumatifTengah: tengah,
      sumatifAkhir: akhir,
      letterGrade: letter
    } : g));
    addNotification('Nilai capaian asesmen berhasil diperbarui.');
  };

  const addGrade = (grade: Omit<GradeRecord, 'id'>) => {
    setGrades(prev => [{ ...grade, id: `grd-${Date.now()}` }, ...prev]);
    addNotification('Nilai asesmen siswa berhasil dimasukkan.');
  };

  const generateReportCard = (studentId: string): ReportCard | null => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;

    const studentGrades = grades.filter(g => g.studentId === studentId);
    return {
      studentId: student.id,
      studentName: student.fullName,
      nisn: student.nisn,
      nis: student.nis,
      className: student.className,
      academicYear: '2026/2027',
      semester: 'Ganjil',
      rank: 1,
      totalStudents: 28,
      grades: studentGrades.length > 0 ? studentGrades : grades.slice(0, 3),
      attendance: {
        present: 78,
        sick: 2,
        permission: 1,
        unexcused: 0
      },
      spiritualAttitude: 'Sangat baik dalam menjalankan ibadah shalat berjamaah 5 waktu, disiplin hafalan Qur\'an, serta berakhlaqul karimah.',
      socialAttitude: 'Menunjukkan sikap ta\'awun (gotong royong), santun terhadap guru dan musyrif, serta kepemimpinan yang aktif.',
      homeroomNotes: 'Pertahankan prestasi akademik dan istiqamah dalam muraja\'ah hafalan Al-Qur\'an.',
      headmasterName: 'Dr. H. Ahmad Fauzi, M.Pd.I',
      homeroomTeacherName: 'Ustadzah Fitriah Nur Azizah, S.Pd.I',
      dateIssued: '25 Desember 2026'
    };
  };

  // Tahfidz & Prayers
  const addTahfidzRecord = (record: Omit<TahfidzRecord, 'id'>) => {
    const item: TahfidzRecord = { ...record, id: `thf-${Date.now()}` };
    setTahfidzRecords(prev => [item, ...prev]);
    addNotification(`Setoran Tahfidz [${record.surahName}] berhasil diverifikasi oleh ${record.evaluatorName}.`);
  };

  const updatePrayerRecord = (record: PrayerRecord) => {
    setPrayerRecords(prev => {
      const exists = prev.find(p => p.id === record.id);
      if (exists) {
        return prev.map(p => p.id === record.id ? record : p);
      }
      return [record, ...prev];
    });
    addNotification('Presensi shalat berjamaah harian diperbarui.');
  };

  // HR Staff & Leave
  const addStaff = (stf: Omit<Staff, 'id'>) => {
    setStaff(prev => [{ ...stf, id: `stf-${Date.now()}` }, ...prev]);
    addNotification(`Pendidik / Staf "${stf.fullName}" berhasil didaftarkan.`);
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    addNotification('Data pendidik/staf berhasil dihapus.', 'warning');
  };

  const addDiniyahKitab = (kitab: Omit<DiniyahKitab, 'id'>) => {
    const item: DiniyahKitab = { ...kitab, id: `ktb-${Date.now()}` };
    setDiniyahKitabs(prev => [item, ...prev]);
    addNotification(`Kitab "${kitab.kitabName}" berhasil didaftarkan ke kurikulum diniyah.`);
  };

  const updateKitabProgress = (id: string, currentChapter: number, title?: string) => {
    setDiniyahKitabs(prev => prev.map(k => k.id === id ? { 
      ...k, 
      currentChapter, 
      currentChapterTitle: title || k.currentChapterTitle 
    } : k));
    addNotification('Progres pengkajian kitab berhasil diperbarui.');
  };

  const addPrayerAttendance = (log: Omit<PrayerAttendance, 'id'>) => {
    const item: PrayerAttendance = { ...log, id: `pr-${Date.now()}` };
    setPrayerLogs(prev => {
      const existing = prev.filter(p => !(p.studentId === log.studentId && p.date === log.date && p.prayerName === log.prayerName));
      return [item, ...existing];
    });
    addNotification(`Presensi shalat santri ${log.studentName} berhasil dicatat.`);
  };

  const addJournalEntry = (entry: Omit<FinancialJournalEntry, 'id'>) => {
    const item: FinancialJournalEntry = { ...entry, id: `jrn-${Date.now()}` };
    setJournalEntries(prev => [item, ...prev]);
    addNotification(`Transaksi ${entry.type} (${entry.referenceNo}) sebesar Rp ${entry.amount.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  const updateReportCardNarrative = (id: string, narrative: string) => {
    setReportCards(prev => prev.map(r => (r.studentId === id || r.id === id) ? { ...r, homeroomNotes: narrative } : r));
    addNotification('Catatan perkembangan santri pada e-Rapor berhasil disimpan.');
  };

  const addExamSchedule = (sch: any) => {
    const item: ExamSchedule = { ...sch, id: `exm-${Date.now()}` };
    setExamSchedules(prev => [item, ...prev]);
    addNotification(`Jadwal ujian "${sch.name || sch.subjectName}" berhasil ditambahkan.`);
  };

  const addLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'requestedAt'>) => {
    const item: LeaveRequest = {
      ...req,
      id: `lv-${Date.now()}`,
      requestedAt: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests(prev => [item, ...prev]);
    addNotification('Pengajuan cuti/izin berhasil dikirim ke pimpinan.');
  };

  const updateLeaveStatus = (id: string, status: LeaveRequest['status']) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status, approvedBy: currentUser.name } : l));
    addNotification(`Status pengajuan cuti diubah menjadi: ${status}`);
  };

  const processPayrollPayment = (id: string) => {
    setPayrollRecords(prev => prev.map(p => p.id === id ? { 
      ...p, 
      paymentStatus: 'Dibayar', 
      paymentDate: new Date().toISOString().split('T')[0] 
    } : p));
    addNotification('Slip gaji berhasil diproses dan status telah dibayar!');
  };

  // Finance & Payment Gateway
  const payInvoice = (invoiceId: string, method: Invoice['paymentMethod'] = 'Virtual Account BSI') => {
    const now = new Date();
    const paidAtStr = now.toISOString().replace('T', ' ').substring(0, 19);
    const proof = `${method?.includes('QRIS') ? 'QRIS' : 'VA'}-${Math.floor(100000000 + Math.random() * 900000000)}`;

    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'Lunas',
          paymentMethod: method,
          paidAt: paidAtStr,
          paymentProofRef: proof
        };
      }
      return inv;
    }));

    addNotification(`Pembayaran ${method} berhasil! Tagihan #${invoiceId} terverifikasi LUNAS.`);
  };

  const createInvoice = (inv: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => {
    const count = invoices.length + 1;
    const item: Invoice = {
      ...inv,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-202608-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInvoices(prev => [item, ...prev]);
    addNotification(`Tagihan baru #${item.invoiceNumber} berhasil dibuat untuk ${item.studentName}.`);
  };

  const addInvoice = (inv: any) => {
    const count = invoices.length + 1;
    const item: any = {
      ...inv,
      id: `inv-${Date.now()}`,
      invoiceNumber: inv.invoiceNumber || `INV-202608-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInvoices(prev => [item, ...prev]);
    addNotification(`Tagihan SPP/Biaya berhasil dibuat.`);
  };

  const addExpense = (exp: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...exp, id: `exp-${Date.now()}` }, ...prev]);
    addNotification(`Pengeluaran Rp ${exp.amount.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  // Front Office & Announcements
  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const item: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [item, ...prev]);
    addNotification('Pengumuman baru berhasil diterbitkan di papan info!');
  };

  const blastAnnouncement = (announcementId: string, channel: 'WhatsApp' | 'SMS' | 'Email') => {
    const ann = announcements.find(a => a.id === announcementId);
    if (!ann) return;
    addNotification(`Broadcast ${channel} untuk pengumuman "${ann.title.substring(0, 30)}..." berhasil dikirim ke 350+ nomor wali murid/guru!`);
  };

  const addGuestBookEntry = (entry: Omit<GuestBookEntry, 'id' | 'checkInTime'>) => {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);
    setGuestBookEntries(prev => [{
      ...entry,
      id: `gst-${Date.now()}`,
      checkInTime: timeStr
    }, ...prev]);
    addNotification(`Tamu "${entry.guestName}" berhasil didaftarkan di buku tamu digital.`);
  };

  const addGuestEntry = (entry: Omit<GuestBookEntry, 'id' | 'checkInTime'>) => {
    addGuestBookEntry(entry);
  };

  const updateGuestStatus = (id: string, status: GuestBookEntry['status']) => {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);
    setGuestBookEntries(prev => prev.map(g => g.id === id ? { 
      ...g, 
      status,
      checkOutTime: status === 'Selesai' ? timeStr : g.checkOutTime 
    } : g));
    addNotification(`Status kunjungan tamu diperbarui: ${status}`);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      activeTab,
      setActiveTab,
      isDarkMode,
      toggleDarkMode,
      isSidebarOpen,
      toggleSidebar,
      searchQuery,
      setSearchQuery,
      notifications,
      addNotification,
      removeNotification,

      students: students || [],
      addStudent,
      updateStudent,
      deleteStudent,

      ppdbApplicants: ppdbApplicants || [],
      addPpdbApplicant,
      updatePpdbStatus,

      disciplines: disciplines || [],
      addDiscipline,

      achievements: achievements || [],
      addAchievement,

      classrooms: classrooms || [],
      addClassroom,

      subjects: subjects || [],
      addSubject,

      schedules: schedules || [],
      addSchedule,

      exams: exams || [],
      addExam,
      examSchedules: examSchedules || [],
      addExamSchedule,

      grades: grades || [],
      updateGrade,
      addGrade,
      generateReportCard,

      reportCards: reportCards || [],
      updateReportCardNarrative,

      tahfidzRecords: tahfidzRecords || [],
      addTahfidzRecord,

      prayerRecords: prayerRecords || [],
      updatePrayerRecord,
      prayerLogs: prayerLogs || [],
      addPrayerAttendance,

      diniyahKitabs: diniyahKitabs || [],
      addDiniyahKitab,
      updateKitabProgress,

      staff: staff || [],
      addStaff,
      deleteStaff,

      leaveRequests: leaveRequests || [],
      addLeaveRequest,
      updateLeaveStatus,

      payrollRecords: payrollRecords || [],
      processPayrollPayment,

      feeStructures: feeStructures || [],
      invoices: invoices || [],
      payInvoice,
      createInvoice,
      addInvoice,

      expenses: expenses || [],
      addExpense,

      journalEntries: journalEntries || [],
      addJournalEntry,

      announcements: announcements || [],
      addAnnouncement,
      blastAnnouncement,

      guestBookEntries: guestBookEntries || [],
      guestBook: guestBookEntries || [],
      addGuestBookEntry,
      addGuestEntry,
      updateGuestStatus,

      isArchitectureModalOpen,
      setIsArchitectureModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
