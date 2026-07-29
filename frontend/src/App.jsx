import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [authMode, setAuthMode] = useState('login'); 
  const [userRole, setUserRole] = useState('student');

  // Input states
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Interactive States (Modal & Application)
  const [selectedVacancy, setSelectedVacancy] = useState(null); // Modal uchun
  const [applyModalVacancy, setApplyModalVacancy] = useState(null); // Ariza topshirish uchun
  const [appliedVacancies, setAppliedVacancies] = useState([]); // Topshirilgan vakansiyalar ID lari

  // Form inputs for Application
  const [telegramInput, setTelegramInput] = useState('');
  const [cvLinkInput, setCvLinkInput] = useState('');
  const [coverLetterInput, setCoverLetterInput] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // Filter Company
  const [filterCompany, setFilterCompany] = useState('All');

  // Vakansiyalar va Hujjatlar
  const [vacancies, setVacancies] = useState([
    { 
      id: 1, 
      title: "Junior Data Analyst", 
      company: "TBC Bank", 
      applicants: 12, 
      status: "Aktiv", 
      type: "Gibrid / Full-time",
      salary: "3,000,000 - 5,000,000 UZS",
      desc: "SQL, Python va PowerBI bo'yicha boshlang'ich bilimga ega talabalarni taklif etamiz. Moliyaviy tahlil va ma'lumotlar bazasi bilan ishlash o'rgatiladi." 
    },
    { 
      id: 2, 
      title: "Java Developer Intern", 
      company: "EPAM Systems", 
      applicants: 8, 
      status: "Aktiv", 
      type: "Online / Part-time",
      salary: "Amaliyot davri stipendiyali",
      desc: "Java Core, Spring Boot basics va PostgreSQL bo'yicha amaliy tajriba orttirish imkoniyati. Tajribali mentorlar biriktiriladi." 
    },
    { 
      id: 3, 
      title: "QA Engineer Intern", 
      company: "IT Park Uzbekistan", 
      applicants: 5, 
      status: "Yopilgan", 
      type: "Offlayn",
      salary: "Suhbat asosida",
      desc: "Manual va Automation testing yo'nalishida amaliyot o'tash. Test-keyslar yozish va bug-report tayyorlash ko'nikmalari." 
    },
    { 
      id: 4, 
      title: "Frontend Developer (React)", 
      company: "Ucell", 
      applicants: 15, 
      status: "Aktiv", 
      type: "Gibrid",
      salary: "4,000,000 UZS",
      desc: "React.js, Tailwind CSS va REST API lar bilan ishlash. Dizaynlarni sifatli kodga o'tkazish." 
    }
  ]);

  const documents = [
    { id: 1, title: "Amaliyot Shartnomasi Namunasi (Nizam)", size: "1.2 MB", format: "PDF", filename: "Amaliyot_Shartnomasi.pdf" },
    { id: 2, title: "Rezyume (CV) Tayyorlash Standartlari", size: "850 KB", format: "PDF", filename: "CV_Standartlari.pdf" },
    { id: 3, title: "Kompaniyaga Yuboriladigan Kafolat Xati", size: "500 KB", format: "DOCX", filename: "Kafolat_Xati.docx" },
  ];

  const partners = [
    { name: "TBC Bank", openRoles: 4, logo: "🏦" },
    { name: "EPAM Systems", openRoles: 6, logo: "💻" },
    { name: "IT Park Uzbekistan", openRoles: 3, logo: "🚀" },
    { name: "Ucell", openRoles: 2, logo: "📡" },
  ];

  const usefulLinks = [
    { title: "Karyera Resurslari va Shablonlar", url: "https://github.com", desc: "Rezyume va Cover Letter namunalari" },
    { title: "Mock Intervyu Qoidalari", url: "https://leetcode.com", desc: "Texnik va soft-skills suhbatga tayyorgarlik" },
    { title: "School 21 GitHub Repository", url: "https://github.com", desc: "AQA va Dev loyihalar to'plami" },
  ];

  // Form States
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('CV / Rezyume Tahlili');
  const [meetingSuccess, setMeetingSuccess] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [newVacTitle, setNewVacTitle] = useState('');
  const [newVacCompany, setNewVacCompany] = useState('');

  // Ariza Topshirish Formasi Mantiqi
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalVacancy) return;

    // Ariza topshirilganlar ro'yxatiga qo'shish
    setAppliedVacancies([...appliedVacancies, applyModalVacancy.id]);

    // Topshirganlar sonini oshirish
    setVacancies(vacancies.map(v => 
      v.id === applyModalVacancy.id ? { ...v, applicants: v.applicants + 1 } : v
    ));

    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyModalVacancy(null);
      setTelegramInput('');
      setCvLinkInput('');
      setCoverLetterInput('');
    }, 2000);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const login = loginInput.trim();
    const password = passwordInput.trim();
    const fullName = fullNameInput.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
    const validFullNameRegex = /^[a-zA-Z'’-]{2,}\s+[a-zA-Z'’-]{2,}(\s+[a-zA-Z'’-]{2,})?$/;

    if (!login || !password) {
      setAuthError("Iltimos, barcha maydonlarni to'liq kiriting!");
      return;
    }

    if (authMode === 'register') {
      if (!fullName) {
        setAuthError("Ro'yxatdan o'tish uchun to'liq Ism va Familiyangizni kiriting!");
        return;
      }
      const words = fullName.split(/\s+/);
      if (words.length < 2 || !validFullNameRegex.test(fullName)) {
        setAuthError("Iltimos, to'liq Ism va Familiyangizni to'g'ri yozing!");
        return;
      }
    }

    if (!emailRegex.test(login) && !usernameRegex.test(login)) {
      setAuthError("Login kamida 3 ta belgidan iborat bo'lishi lozim!");
      return;
    }

    if (password.length < 6) {
      setAuthError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    setUserRole(selectedRole);
    setIsAuthenticated(true);
    setAuthError('');
    setActiveTab(selectedRole === 'admin' ? 'admin' : 'home');
  };

  const handleMeetingSubmit = (e) => {
    e.preventDefault();
    setMeetingSuccess(true);
    setTimeout(() => setMeetingSuccess(false), 4000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleAddVacancy = (e) => {
    e.preventDefault();
    if (newVacTitle && newVacCompany) {
      setVacancies([
        ...vacancies,
        { id: Date.now(), title: newVacTitle, company: newVacCompany, applicants: 0, status: "Aktiv", type: "Full-time", salary: "Kelishilgan holda", desc: "Yangi amaliyot vakansiyasi" }
      ]);
      setNewVacTitle('');
      setNewVacCompany('');
    }
  };

  const handleDownload = (doc) => {
    const element = document.createElement("a");
    const file = new Blob([`Fayl kontenti: ${doc.title}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = doc.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredVacancies = filterCompany === 'All' 
    ? vacancies 
    : vacancies.filter(v => v.company.toLowerCase().includes(filterCompany.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0f141c] text-slate-100 font-sans relative overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
      
      {!isAuthenticated ? (
        /* LOGIN / REGISTER EKRANI */
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-[#151c28] border border-slate-800 rounded-3xl w-full max-w-md p-6 md:p-8 relative shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-cyan-500 rounded-2xl mx-auto flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 mb-3">
                P
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-wide">CAREER HUB 21 / PIN</h1>
              <p className="text-xs text-slate-400">
                {authMode === 'login' ? "Tizimga kirish" : "Yangi hisob yaratish"}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs rounded-xl flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <span className="leading-relaxed">{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    To'liq ism va familiya <span className="text-rose-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={fullNameInput}
                    onChange={(e) => { setFullNameInput(e.target.value); setAuthError(''); }}
                    placeholder="Ismael Jalilov"
                    className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700/80 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Login yoki Email <span className="text-rose-400">*</span>
                </label>
                <input 
                  type="text" 
                  value={loginInput}
                  onChange={(e) => { setLoginInput(e.target.value); setAuthError(''); }}
                  placeholder="ismaelja yoki user@gmail.com"
                  className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700/80 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Parol <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setAuthError(''); }}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 bg-[#1c2635] border border-slate-700/80 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-base"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Hisob turi (Rol)</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#1c2635] border border-slate-700/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedRole === 'student' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    🎓 Talaba
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedRole === 'admin' ? 'bg-purple-500 text-white' : 'text-slate-400'
                    }`}
                  >
                    ⚡ Admin (PIN)
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg mt-2 ${
                  selectedRole === 'admin' ? 'bg-purple-600 text-white' : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {authMode === 'login' ? 'Tizimga kirish' : "Ro'yxatdan o'tish"}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
              {authMode === 'login' ? (
                <p>
                  Hisobingiz yo'qmi?{" "}
                  <button type="button" onClick={() => { setAuthMode('register'); setAuthError(''); }} className="text-cyan-400 font-semibold hover:underline">
                    Ro'yxatdan o'ting
                  </button>
                </p>
              ) : (
                <p>
                  Mavjud hisobingiz bormi?{" "}
                  <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} className="text-cyan-400 font-semibold hover:underline">
                    Tizimga kiring
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* DASHBOARD */
        <>
          <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-[#0f141c]/80 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg ${
                userRole === 'admin' ? 'bg-purple-600 text-white' : 'bg-cyan-500 text-slate-950'
              }`}>
                P
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wider text-white block leading-none">CAREER HUB</span>
                <span className={`text-[10px] tracking-widest font-mono ${userRole === 'admin' ? 'text-purple-400' : 'text-cyan-400'}`}>
                  21 / {userRole === 'admin' ? 'ADMIN PANEL' : 'PIN'}
                </span>
              </div>
            </div>

            <nav className="bg-[#18202c] border border-slate-700/50 p-1.5 rounded-full hidden md:flex items-center gap-1 shadow-inner">
              {userRole === 'admin' ? (
                <button onClick={() => setActiveTab('admin')} className="px-5 py-2 rounded-full text-xs font-semibold bg-purple-600 text-white">
                  ⚡ Admin Panel
                </button>
              ) : (
                [
                  { id: 'home', label: 'Bosh sahifa' },
                  { id: 'documents', label: 'Hujjatlar & Fayllar' },
                  { id: 'links', label: 'Foydali Linklar' },
                  { id: 'meeting', label: 'PIN Uchrashuv 📅' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              )}
            </nav>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                userRole === 'admin' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
              }`}>
                {userRole === 'admin' ? '⚡ ADMIN' : '🎓 TALABA'}
              </span>

              <button onClick={() => setIsAuthenticated(false)} className="bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all">
                Chiqish 🚪
              </button>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {activeTab === 'home' && userRole !== 'admin' && (
              <>
                {/* BANNER */}
                <div className="bg-gradient-to-r from-cyan-900/40 via-slate-900 to-purple-900/40 border border-cyan-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-2">
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        🎉 YANGI AMALIYOT MATCH ANONS
                      </span>
                      <h2 className="text-xl font-bold text-white">
                        Sardor Rahimov EPAM Systems kompaniyasiga QA Intern bo'lib ishga qabul qilindi!
                      </h2>
                      <p className="text-xs text-slate-300">
                        PIN komandasi nomidan tengqurimizni tabriklaymiz! EPAM da muvaffaqiyatli amaliyot tilaymiz.
                      </p>
                    </div>
                  </div>
                </div>

                {/* HAMKORLAR */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      🤝 Bizning Hamkorlarimiz
                    </h3>
                    {filterCompany !== 'All' && (
                      <button 
                        onClick={() => setFilterCompany('All')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Barcha vakansiyalarni ko'rsatish 🔄
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {partners.map((p, i) => (
                      <div 
                        key={i} 
                        onClick={() => setFilterCompany(p.name)}
                        className={`bg-[#151c28] border rounded-2xl p-4 text-center cursor-pointer transition-all hover:scale-[1.02] ${
                          filterCompany === p.name ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' : 'border-slate-800/80 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="text-3xl mb-2">{p.logo}</div>
                        <h4 className="text-sm font-bold text-white">{p.name}</h4>
                        <p className="text-[11px] text-cyan-400 font-mono mt-1">{p.openRoles} ta ochiq o'rin</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VAKANSIYALAR RO'YXATI */}
                <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      💼 Mavjud Ochiq Amaliyotlar {filterCompany !== 'All' && `(${filterCompany})`}
                    </h3>
                    <span className="text-xs text-cyan-400 font-mono">{filteredVacancies.length} ta aktiv</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredVacancies.map((vac) => {
                      const isApplied = appliedVacancies.includes(vac.id);
                      return (
                        <div 
                          key={vac.id} 
                          className="bg-[#1c2635] p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between space-y-4 hover:border-slate-500 transition-all cursor-pointer"
                          onClick={() => setSelectedVacancy(vac)}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                                vac.status === 'Aktiv' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}>
                                {vac.status}
                              </span>
                              <span className="text-[10px] text-slate-400">{vac.type}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-3 group-hover:text-cyan-400">{vac.title}</h4>
                            <p className="text-xs text-cyan-300/80 font-medium">{vac.company}</p>
                            <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{vac.desc}</p>
                          </div>

                          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500 font-mono">{vac.applicants} topshirildi</span>
                            
                            {isApplied ? (
                              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                                Topshirildi ✓
                              </span>
                            ) : vac.status === 'Aktiv' ? (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setApplyModalVacancy(vac);
                                }}
                                className="text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-extrabold px-3 py-1.5 rounded-lg text-xs transition-all shadow-md shadow-cyan-400/20"
                              >
                                Ariza berish →
                              </button>
                            ) : (
                              <span className="text-slate-500 font-semibold">Yopilgan</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* OBUNA BO'LIMI */}
                <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 text-center space-y-4">
                  <h3 className="text-lg font-bold text-white">📩 Yangi amaliyotlardan xabardor bo'ling</h3>
                  {subscribed && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl max-w-md mx-auto">
                      ✓ Muvaffaqiyatli obuna bo'ldingiz!
                    </div>
                  )}
                  <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
                    <input 
                      type="email" 
                      required 
                      placeholder="emailingizni kiriting..." 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                    />
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all">
                      Obuna
                    </button>
                  </form>
                </div>
              </>
            )}

            {activeTab === 'documents' && (
              <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">📁 Amaliyot Hujjatlari va Shablonlar</h2>
                </div>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-[#1c2635] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
                          {doc.format}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                          <span className="text-[11px] text-slate-500 font-mono">{doc.size}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                      >
                        Yuklab olish 📥
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">🔗 Foydali Manbalar va Linklar</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {usefulLinks.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="bg-[#1c2635] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition-all block group">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{link.title}</h4>
                      <p className="text-xs text-slate-400 mt-2">{link.desc}</p>
                      <span className="text-[11px] text-cyan-400 font-semibold mt-4 block">O'tish →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'meeting' && (
              <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 max-w-xl mx-auto">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">📅 PIN Komandasi Bilan Uchrashuv</h2>
                </div>
                {meetingSuccess && (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-2xl text-center">
                    ✓ Uchrashuv so'rovingiz qabul qilindi!
                  </div>
                )}
                <form onSubmit={handleMeetingSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Uchrashuv Mavzusi</label>
                    <select 
                      value={meetingTopic}
                      onChange={(e) => setMeetingTopic(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                    >
                      <option>CV / Rezyume Tahlili</option>
                      <option>Mock Intervyu Tayyorgarligi</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="date" 
                        required 
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <input 
                        type="time" 
                        required 
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20">
                    Uchrashuv Belgilash 🗓️
                  </button>
                </form>
              </div>
            )}

            {userRole === 'admin' && activeTab === 'admin' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Admin Boshqaruv Paneli</h1>
                </div>
                <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-purple-400">➕</span> Yangi Vakansiya Joylash
                  </h3>
                  <form onSubmit={handleAddVacancy} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text"
                      placeholder="Vakansiya nomi"
                      value={newVacTitle}
                      onChange={(e) => setNewVacTitle(e.target.value)}
                      required
                      className="px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-purple-500"
                    />
                    <input 
                      type="text"
                      placeholder="Kompaniya nomi"
                      value={newVacCompany}
                      onChange={(e) => setNewVacCompany(e.target.value)}
                      required
                      className="px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-purple-500"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-purple-600/20">
                      Chop etish 🚀
                    </button>
                  </form>
                </div>
              </div>
            )}
          </main>

          {/* 🔍 VAKANSIYA BATAFSIL MODAL OYNASI */}
          {selectedVacancy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
              <div className="bg-[#151c28] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
                <button 
                  onClick={() => setSelectedVacancy(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedVacancy.type}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2">{selectedVacancy.title}</h3>
                  <p className="text-xs text-cyan-400 font-semibold">{selectedVacancy.company}</p>
                </div>

                <div className="p-4 bg-[#1c2635] rounded-2xl space-y-2 border border-slate-800 text-xs">
                  <p className="text-slate-300"><strong className="text-white">Maosh / Stipendiya:</strong> {selectedVacancy.salary}</p>
                  <p className="text-slate-300"><strong className="text-white">Arizalar soni:</strong> {selectedVacancy.applicants} ta talaba topshirgan</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-300">Tavsif va talablar:</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedVacancy.desc}</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={() => {
                      setApplyModalVacancy(selectedVacancy);
                      setSelectedVacancy(null);
                    }}
                    className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                  >
                    Ariza berish 📝
                  </button>
                  <button 
                    onClick={() => setSelectedVacancy(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 📝 ARIZA TOPSHIRISH MODAL OYNASI */}
          {applyModalVacancy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
              <div className="bg-[#151c28] border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
                <button 
                  onClick={() => setApplyModalVacancy(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>

                <div>
                  <h3 className="text-lg font-extrabold text-white">Ariza Topshirish</h3>
                  <p className="text-xs text-cyan-400">{applyModalVacancy.title} — {applyModalVacancy.company}</p>
                </div>

                {applySuccess ? (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-2xl text-center space-y-2">
                    <div className="text-2xl">🎉</div>
                    <p className="font-bold">Arizangiz muvaffaqiyatli topshirildi!</p>
                    <p className="text-[11px] text-emerald-400/80">Kompaniya vakillari tez orada siz bilan bog'lanishadi.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Telegram Username <span className="text-rose-400">*</span></label>
                      <input 
                        type="text" 
                        required 
                        placeholder="@ismaelja" 
                        value={telegramInput}
                        onChange={(e) => setTelegramInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">CV / Rezyume Havolasi (Google Drive, GitHub yoki LinkedIn) <span className="text-rose-400">*</span></label>
                      <input 
                        type="url" 
                        required 
                        placeholder="https://drive.google.com/..." 
                        value={cvLinkInput}
                        onChange={(e) => setCvLinkInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Qo'shimcha izoh / Motivatsion Xat</label>
                      <textarea 
                        rows="3"
                        placeholder="Ushbu amaliyotda nimalarni o'rganmoqchisiz..." 
                        value={coverLetterInput}
                        onChange={(e) => setCoverLetterInput(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#1c2635] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400 resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-400/20"
                    >
                      Arizani Yuborish 🚀
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          <footer className="text-center py-6 text-[11px] text-slate-600 border-t border-slate-800/50">
            © 2026 CAREER HUB 21 / PIN Platform
          </footer>
        </>
      )}

    </div>
  );
}
