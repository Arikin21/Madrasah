import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ArchitectureModal } from './components/layout/ArchitectureModal';
import { AiMadrasahAssistant } from './components/dashboard/AiMadrasahAssistant';
import { DashboardView } from './components/dashboard/DashboardView';

// SIS Modules
import { StudentDirectory } from './components/sis/StudentDirectory';
import { PpdbModule } from './components/sis/PpdbModule';
import { DisciplineAchievement } from './components/sis/DisciplineAchievement';

// Academic Modules
import { ClassManagement } from './components/academic/ClassManagement';
import { SubjectCurriculum } from './components/academic/SubjectCurriculum';
import { ScheduleTimetable } from './components/academic/ScheduleTimetable';
import { ExamManagement } from './components/academic/ExamManagement';
import { ReportCardModule } from './components/academic/ReportCardModule';

// Madrasah Modules
import { TahfidzTracker } from './components/madrasah/TahfidzTracker';
import { PrayerAttendanceModule } from './components/madrasah/PrayerAttendanceModule';
import { DiniyahKitabModule } from './components/madrasah/DiniyahKitabModule';

// HR & Kepegawaian Modules
import { StaffManagement } from './components/hr/StaffManagement';
import { PayrollManagement } from './components/finance/PayrollManagement';

// Finance Modules
import { BillingInvoices } from './components/finance/BillingInvoices';
import { FinancialJournal } from './components/finance/FinancialJournal';

// Communication & Front Office Modules
import { AnnouncementsModule } from './components/communication/AnnouncementsModule';
import { GuestBookModule } from './components/communication/GuestBookModule';

// Toast Notifications Component
const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {notifications.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-center justify-between transition-all animate-fadeIn ${
            toast.type === 'error'
              ? 'bg-rose-900 text-rose-100 border-rose-700'
              : toast.type === 'warning'
              ? 'bg-amber-900 text-amber-100 border-amber-700'
              : toast.type === 'info'
              ? 'bg-blue-900 text-blue-100 border-blue-700'
              : 'bg-emerald-900 text-emerald-100 border-emerald-700'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeNotification(toast.id)}
            className="ml-3 text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

// Main Content Dispatcher
const MainContent: React.FC = () => {
  const { activeTab } = useApp();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onOpenAiModal={() => setIsAiModalOpen(true)} />;
      case 'sis_students':
        return <StudentDirectory />;
      case 'sis_ppdb':
        return <PpdbModule />;
      case 'sis_discipline':
        return <DisciplineAchievement />;
      case 'acad_classes':
        return <ClassManagement />;
      case 'acad_subjects':
        return <SubjectCurriculum />;
      case 'acad_schedule':
        return <ScheduleTimetable />;
      case 'acad_exams':
        return <ExamManagement />;
      case 'acad_rapor':
        return <ReportCardModule />;
      case 'madr_tahfidz':
        return <TahfidzTracker />;
      case 'madr_prayers':
        return <PrayerAttendanceModule />;
      case 'madr_diniyah':
        return <DiniyahKitabModule />;
      case 'hr_staff':
      case 'hr_leave':
        return <StaffManagement />;
      case 'hr_payroll':
        return <PayrollManagement />;
      case 'fin_fees':
      case 'fin_invoices':
        return <BillingInvoices />;
      case 'fin_expenses':
        return <FinancialJournal />;
      case 'fo_announcements':
        return <AnnouncementsModule />;
      case 'fo_guestbook':
        return <GuestBookModule />;
      default:
        return <DashboardView onOpenAiModal={() => setIsAiModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col antialiased">
      <div className="flex flex-1 min-h-screen">
        {/* Persistent Responsive Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Header */}
          <Header onOpenAiModal={() => setIsAiModalOpen(true)} />

          {/* Dynamic Module Page Body */}
          <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Database Schema & Technical Architecture Modal */}
      <ArchitectureModal />

      {/* AI Madrasah Pedagogical Assistant Modal */}
      <AiMadrasahAssistant
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* System Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
