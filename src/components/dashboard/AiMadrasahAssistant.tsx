import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Copy, CheckCircle, RefreshCw, X, BookOpen, Lightbulb } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiMadrasahAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const { addNotification } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Assalamu\'alaikum! Saya Asisten AI Madrasah Al-Hikmah. Saya dapat membantu Anda merumuskan deskripsi capaian e-Rapor Kurikulum Merdeka/Kemenag, menyusun draf pengumuman untuk wali santri, membuat silabus pembelajaran, atau memberikan rekomendasi bimbingan tahfidz. Apa yang bisa saya bantu hari ini?',
      timestamp: 'Baru saja'
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Buat deskripsi capaian rapor mata pelajaran Bahasa Arab nilai 92',
    'Draf surat pemberitahuan libur Maulid Nabi & kegiatan santri',
    'Ide materi silabus Fiqih Muamalah untuk Madrasah Aliyah',
    'Tips motivasi santri yang sedang murajaah Juz 28-30'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    // AI Generation simulation tailored for Madrasah education
    setTimeout(() => {
      let aiResponseText = '';

      if (query.toLowerCase().includes('rapor') || query.toLowerCase().includes('deskripsi')) {
        aiResponseText = `**Rekomendasi Deskripsi Capaian Kompetensi (e-Rapor):**\n\n*Capaian Tertinggi:* Ananda menunjukkan penguasaan yang sangat istimewa dalam mengidentifikasi kaidah tarkib (Nahwu & Sharaf), kelancaran pelafalan makharijul huruf, serta kefasihan dalam muhadatsah yaumiyyah (percakapan harian).\n\n*Capaian yang Perlu Ditingkatkan:* Perlu pembiasaan lebih lanjut dalam penerapan qawaid isim ghairu munsharif pada teks bacaan kitab klasik (Fathul Qarib).\n\n*Catatan Sikap Spiritual:* Menunjukkan adab yang mulia, tawadhu' terhadap ustadz/ustadzah, serta istiqamah dalam shalat berjamaah 5 waktu di masjid.`;
      } else if (query.toLowerCase().includes('surat') || query.toLowerCase().includes('pengumuman') || query.toLowerCase().includes('maulid')) {
        aiResponseText = `**DRAF PENGUMUMAN WALI SANTRI**\n\n*Nomor:* 112/MA-AH/IX/2026\n*Hal:* Pemberitahuan Kegiatan Peringatan Maulid Nabi & Tasmi' Akbar\n\nKepada Yth.\nBapak/Ibu Orang Tua/Wali Santri Madrasah Aliyah Terpadu\nDi Tempat\n\n*Assalamu'alaikum Warahmatullahi Wabarakatuh*\n\nDengan memohon rahmat dan ridho Allah SWT, kami beritahukan bahwa dalam rangka menyambut Maulid Nabi Muhammad SAW 1448 H, madrasah akan menyelenggarakan:\n1. Tasmi' Al-Qur'an Akbar 30 Juz Bil Ghaib\n2. Tabligh Akbar & Pembagian Laporan Progres Tahfidz Triwulan\n\nSehubungan dengan hal tersebut, kami mengundang kehadiran Bapak/Ibu pada hari Sabtu, 12 September 2026 pukul 08.00 WIB bertempat di Aula Utama Madrasah.\n\nDemikian pemberitahuan ini, atas perhatian dan kerjasama Bapak/Ibu kami haturkan jazakumullah khairan katsiran.\n\n*Wassalamu'alaikum Warahmatullahi Wabarakatuh*\n\n*Kepala Madrasah*\nDr. H. Ahmad Fauzi, M.Pd.I`;
      } else if (query.toLowerCase().includes('silabus') || query.toLowerCase().includes('fiqih')) {
        aiResponseText = `**Rancangan Silabus & Alur Tujuan Pembelajaran (ATP) - Fiqih Muamalah Kontemporer:**\n\n1. **Pekan 1-2:** Konsep Dasar Akad Syariah (Rukun, Syarat, dan Larangan Riba/Gharar/Maysir).\n2. **Pekan 3-4:** Transaksi Jual Beli Modern, E-Commerce, dan Fintech Syariah (QRIS, Paylater, Uang Elektronik).\n3. **Pekan 5-6:** Akad Kerjasama Investasi (Mudharabah, Musyarakah, dan Murabahah pada Perbankan Syariah).\n4. **Pekan 7-8:** Asuransi Syariah (Takaful) dan Wakaf Produktif untuk Kemaslahatan Umat.\n\n*Indikator Penilaian:* Analisis studi kasus perbankan syariah dan simulasi akad bai' di kelas.`;
      } else {
        aiResponseText = `Terima kasih atas pertanyaannya. Sebagai asisten pendidikan madrasah, berikut adalah panduan praktis untuk topik tersebut:\n\n1. **Pendekatan Holistik:** Mengintegrasikan nilai-nilai keislaman (Adab & Akhlaq) dengan keunggulan akademik sains dan teknologi.\n2. **Monitoring Terstruktur:** Gunakan fitur Pelacak Tahfidz dan e-Presensi Shalat di SIAMadrasah untuk mencatat kemajuan santri setiap hari.\n3. **Kemitraan Wali Santri:** Komunikasikan capaian positif anak melalui fitur broadcast pesan atau rapor digital secara berkala.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 900);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Teks berhasil disalin ke clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[650px] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Asisten AI Madrasah Pintar</h3>
              <p className="text-[11px] text-emerald-200">Powered by Gemini 2.5 • Generator e-Rapor, Silabus & Administrasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-line text-xs">{msg.text}</div>
                <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="hover:underline flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Menyusun rekomendasi dari kurikulum madrasah...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Contoh:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg whitespace-nowrap hover:border-emerald-500 text-slate-700 dark:text-slate-200 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik instruksi (e.g. Buat surat undangan rapat wali santri)..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isGenerating}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
