import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f141c] text-slate-100 font-sans relative overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* SHAFFAF NAVIGATSIYA BAR */}
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-[#0f141c]/80 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
            P
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white block leading-none">PIN PLATFORM</span>
            <span className="text-[10px] text-cyan-400 tracking-widest font-mono">CAREER HUB</span>
          </div>
        </div>

        {/* SUZIB YURUVCHI MENYU */}
        <nav className="bg-[#18202c] border border-slate-700/50 p-1.5 rounded-full hidden md:flex items-center gap-1 shadow-inner">
          {[
            { id: 'home', label: 'Bosh sahifa' },
            { id: 'career-hours', label: 'Career Hours' },
            { id: 'resources', label: 'Hujjatlar va Resurslar' },
            { id: 'news', label: 'Yangiliklar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* PROFILE VA SETTINGS */}
        <div className="flex items-center gap-3">
          <button className="bg-[#18202c] border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:border-slate-500 transition-colors">
            UZ
          </button>
          <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 text-sm font-bold cursor-pointer hover:bg-cyan-500/20 transition-all">
            👤
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        {/* HEADER SECTION */}
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Boshqaruv paneli</h1>
          <p className="text-xs text-slate-400">Murojaatlar, imkoniyatlar va profil holatini kuzating</p>
        </div>

        {/* MAIN DASHBOARD CARD */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
          
          {/* USER PROFILE INFO */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-slate-800">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#151c28] rounded-full"></span>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-wide">Ismael Alimamedov</h2>
              <p className="text-xs text-slate-400 font-mono">
                QA – QA Engineer <span className="text-slate-600">•</span> <span className="text-cyan-400">@ismaelja</span>
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold rounded-md">
                  Takliflarga ochiqman
                </span>
                <span className="text-xs text-slate-500">Yangi</span>
              </div>
            </div>
          </div>

          {/* YANGILIKLAR BANNER */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-200">Yangiliklar & Anonslar</h3>
              <a href="#news" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">Barchasini ko'rish</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1c2635] border border-slate-700/50 rounded-2xl p-4 flex gap-4 items-center hover:border-slate-600 transition-all">
                <div className="w-20 h-16 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="news" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="inline-block px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded">
                    📌 QADALGAN
                  </span>
                  <h4 className="text-xs font-bold text-white">Data Analysts! - TBC Uzbekistan</h4>
                  <p className="text-[10px] text-slate-400 font-mono">2026 M07 27</p>
                </div>
              </div>

              <div className="bg-[#1c2635] border border-slate-700/50 rounded-2xl p-4 flex gap-4 items-center hover:border-slate-600 transition-all">
                <div className="w-20 h-16 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="news" />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="inline-block px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold rounded">
                    AMALIYOT
                  </span>
                  <h4 className="text-xs font-bold text-white">EPAM Java Intern Dasturi</h4>
                  <p className="text-[10px] text-slate-400 font-mono">2026 M07 28</p>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTIKA KARTALARI */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Mening murojaatlarim", count: "0" },
              { label: "Ko'rib chiqilmoqda", count: "0" },
              { label: "Takliflar", count: "0" },
              { label: "Ochiq vakansiyalar", count: "8" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#1c2635] border border-slate-800/80 rounded-2xl p-5 text-center flex flex-col justify-center items-center hover:border-slate-700 transition-all">
                <span className="text-3xl font-black text-white mb-1">{stat.count}</span>
                <span className="text-[11px] font-medium text-slate-400 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* AMALIYOT HOLATI (PROGRESS BAR) */}
          <div className="bg-gradient-to-r from-cyan-500 via-purple-600 to-fuchsia-600 rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg shadow-purple-900/20">
            <span className="text-xs font-extrabold text-slate-950 uppercase tracking-wider pl-2">
              Amaliyot holati
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white text-slate-950 text-xs font-extrabold rounded-full shadow-sm">
                Yangi
              </span>
              <span className="text-white/60 font-mono text-xs">›</span>
              <span className="px-3 py-1 bg-black/20 text-white/80 text-xs font-semibold rounded-full">
                Jarayonda
              </span>
              <span className="text-white/60 font-mono text-xs">›</span>
              <span className="px-3 py-1 bg-black/20 text-white/80 text-xs font-semibold rounded-full">
                Yakunlangan
              </span>
            </div>
          </div>

        </div>

        {/* CAREER HOURS & UCHRASHUVGA YOZILISH BLOCK */}
        <div id="career-hours" className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div>
            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold rounded-md uppercase tracking-wider">
              📢 CAREER HOURS
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">PIN bo‘limi bilan doimiy uchrashuvlar</h2>
            <p className="text-xs text-slate-400 mt-1">
              Amaliyot, CV tayyorlash va intervyular bo'yicha yuzma-yuz muloqot qilishingiz mumkin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GRAFIK VA LOKATSIYA */}
            <div className="bg-[#1c2635] p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="font-bold text-cyan-400 uppercase tracking-wider mb-2">📅 Uchrashuv Grafigi:</div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-300">• Seshanba:</span>
                  <span className="font-mono text-slate-400">14:00 – 19:00</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-300">• Chorshanba:</span>
                  <span className="font-mono text-slate-400">14:00 – 17:00</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-300">• Payshanba:</span>
                  <span className="font-mono text-slate-400">14:00 – 19:00</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/50">
                <span className="font-semibold text-slate-200">📍 Manzil:</span> SKD kampusi, 4-qavat, uchrashuvlar xonasi (Peregovorka)
              </div>

              <a
                href="https://calendly.com/k-ganiyev-21-school"
                target="_blank"
                rel="noreferrer"
                className="block text-center w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/10"
              >
                Calendly orqali yozilish &rarr;
              </a>
            </div>

            {/* FORM */}
            <div className="bg-[#1c2635] p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3">Tezkor Uchrashuv Yozish</h3>
              {bookingSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center text-xs space-y-1">
                  <div className="text-2xl">✅</div>
                  <div className="font-bold">Murojaat qabul qilindi!</div>
                  <p className="text-[11px] text-slate-400">PIN koordinatori tez orada siz bilan bog'lanadi.</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Ism va Familiya</label>
                    <input type="text" required placeholder="Ismael Alimamedov" className="w-full px-3 py-2 bg-[#151c28] border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Mavzu</label>
                    <select className="w-full px-3 py-2 bg-[#151c28] border border-slate-700 rounded-lg text-white outline-none focus:border-cyan-500">
                      <option>Amaliyot imkoniyatlari</option>
                      <option>CV va Intervyu tayyorgarligi</option>
                      <option>Startap loyihalar</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold py-2 rounded-lg border border-slate-700 transition-all">
                    Tasdiqlash
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* RESURSLAR VA HUJJATLAR */}
        <div id="resources" className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold text-white">📂 Hujjatlar va Linklar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Amaliyot ariza formasi", type: "DOCX" },
              { title: "Namunaviy CV Shablon", type: "PDF" },
              { title: "Amaliyot hisoboti shakli", type: "DOCX" }
            ].map((doc, idx) => (
              <div key={idx} className="bg-[#1c2635] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{doc.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{doc.type}</span>
                </div>
                <button className="text-[11px] bg-slate-800 text-cyan-400 border border-slate-700 px-2.5 py-1 rounded-lg font-mono hover:bg-slate-700">
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Foydali Linklar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="p-3 bg-[#1c2635] border border-slate-800 rounded-xl flex justify-between items-center hover:border-slate-700">
                <span className="text-slate-300">LeetCode Texnik Tayyorgarlik</span>
                <span className="text-cyan-400 font-mono">&rarr;</span>
              </a>
              <a href="https://novoresume.com" target="_blank" rel="noreferrer" className="p-3 bg-[#1c2635] border border-slate-800 rounded-xl flex justify-between items-center hover:border-slate-700">
                <span className="text-slate-300">NovoResume CV Yaratish</span>
                <span className="text-cyan-400 font-mono">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* HAMKORLAR */}
        <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hamkor Kompaniyalar</h3>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-black text-sm">
            <span>EPAM</span>
            <span>TBC BANK</span>
            <span>IT PARK</span>
            <span>EXADEL</span>
            <span>UZUM</span>
            <span>CLICK</span>
          </div>
        </div>

        {/* RASSILKA (NEWSLETTER) */}
        <div className="bg-gradient-to-r from-slate-900 via-[#1a2332] to-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3">
          <h3 className="text-lg font-bold text-white">📩 Yangi vakansiyalardan xabardor bo'ling</h3>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Email manzilingiz..." className="w-full px-3 py-2 bg-[#0f141c] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-500" />
            <button className="bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap hover:bg-cyan-400">
              Obuna
            </button>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-[11px] text-slate-600 border-t border-slate-800/50">
        © 2026 PIN Platform • School 21 Style Design
      </footer>
    </div>
  );
}
