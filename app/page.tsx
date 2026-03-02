"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { martyrsData } from '../martyrs';

export default function SehidlerMemoriali() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Hamısı");
  const [selectedMartyr, setSelectedMartyr] = useState<any>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Layihə haqqında məlumat pəncərəsi üçün state
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Sayt açılan kimi pəncərəni göstər
    setShowWelcome(true);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const regions = useMemo(() => {
    if (!martyrsData) return ["Hamısı"];
    const list = Array.from(new Set(martyrsData.map(m => m?.home).filter(Boolean)));
    return ["Hamısı", ...list.sort()];
  }, []);

  const filteredData = useMemo(() => {
    if (!martyrsData) return [];
    return martyrsData.filter(m => {
      const name = m?.name ? String(m.name).toLowerCase() : "";
      const home = m?.home || "";
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch = name.includes(search);
      const matchesTab = activeTab === "Hamısı" || home === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans relative">

      {/* --- LAYİHƏ HAQQINDA İLK AÇILAN MODAL --- */}
      {showWelcome && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative border border-amber-200/50">
            {/* Bağla Düyməsi (X) */}
            <button 
              onClick={() => setShowWelcome(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full flex items-center justify-center transition-all z-10 font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Sol tərəf - Vizual */}
              <div className="bg-slate-900 md:w-1/3 p-10 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-4 text-3xl shadow-lg shadow-amber-500/20">
                  🇦🇿
                </div>
                <h3 className="text-white font-black text-xl tracking-tighter uppercase">Memorial Layihəsi</h3>
              </div>

              {/* Sağ tərəf - Məlumat */}
              <div className="p-8 md:p-12 md:w-2/3">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Layiha Haqqında</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Bu memorial layihəsi Azərbaycanın ərazi bütövlüyü uğrunda canından keçmiş qəhrəman şəhidlərimizin əziz xatirəsini yaşatmaq məqsədilə yaradılmışdır. Siyahı mütəmadi olaraq yenilənir.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      📞
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Əlaqə nömrəsi</p>
                      <a href="tel:0555556963" className="text-slate-900 font-bold hover:text-amber-600 transition-colors">055 555 69 63</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Facebook</p>
                      <a href="https://www.facebook.com/parabournex/" target="_blank" rel="noreferrer" className="text-slate-900 font-bold hover:text-blue-600 transition-colors">parabournex</a>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowWelcome(false)}
                  className="w-full mt-10 py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
                >
                  Siyahıya bax
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ANA SAYFA ELEMENTLƏRİ --- */}
      
      {/* ÜST MƏLUMAT BANNERİ */}
      <div className="bg-[#0f172a] text-amber-100/80 py-3 px-6 flex justify-between items-center text-[11px] md:text-xs font-semibold sticky top-0 z-[80] border-b border-amber-900/20">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>Siyahı tam deyil: <a href="tel:0555556963" className="text-amber-400">055 555 69 63</a></span>
        </div>
        <button onClick={() => setShowWelcome(true)} className="text-amber-400 hover:underline">Haqqımızda</button>
      </div>

      <header className="bg-white border-b border-slate-200 pt-20 pb-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="max-w-6xl mx-auto px-6 relative text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase text-center">
            Vətən <span className="text-amber-600">Qəhrəmanları</span>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 max-w-lg mx-auto text-sm font-medium italic">"Torpaq, uğrunda ölən varsa, Vətəndir!"</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Şəhid adı axtar..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
          </div>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="md:w-64 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold outline-none cursor-pointer"
          >
            {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
          </select>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {filteredData.map((m: any, index: number) => (
          <div 
            key={index} 
            onClick={() => setSelectedMartyr(m)} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden text-center"
          >
            <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-amber-500 transition-all duration-300"></div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100 uppercase mb-4 inline-block">
              {m?.rank || "Əsgər"}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{m?.name}</h2>
            <p className="text-slate-400 text-sm">{m?.home} rayonu</p>
          </div>
        ))}
      </main>

      {/* ŞƏHİD MODAL (DETALLAR) */}
      {selectedMartyr && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="bg-slate-900 p-10 text-white">
              <button onClick={() => setSelectedMartyr(null)} className="absolute top-8 right-8 text-white">✕</button>
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block mb-2">{selectedMartyr?.rank}</span>
              <h2 className="text-3xl font-bold">{selectedMartyr?.name}</h2>
            </div>
            <div className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <DetailItem label="Doğum" value={selectedMartyr?.birth} icon="📅" />
                <DetailItem label="Şəhadət" value={selectedMartyr?.death} icon="⭐" />
                <DetailItem label="Rayon" value={selectedMartyr?.home} icon="📍" />
                <DetailItem label="Yer" value={selectedMartyr?.location} icon="🛡️" />
              </div>
              <button onClick={() => setSelectedMartyr(null)} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl mt-4">Bağla</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        Şəhidlər Ölməz, Vətən Bölünməz!
      </footer>

      {/* YUXARI QALX */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[100] w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center transition-all ${showScrollButton ? "opacity-100" : "opacity-0"}`}
      >
        ↑
      </button>
    </div>
  );
}

function DetailItem({ label, value, icon }: any) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{icon} {label}</p>
      <p className="text-slate-800 font-bold">{value || "-"}</p>
    </div>
  );
}