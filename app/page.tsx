"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { martyrsData } from '../martyrs';

export default function SehidlerMemoriali() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Hamısı");
  const [selectedMartyr, setSelectedMartyr] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
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
    const list = Array.from(new Set(martyrsData.map(m => m.home)));
    return ["Hamısı", ...list.sort()];
  }, []);

  const filteredData = useMemo(() => {
    return martyrsData.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "Hamısı" || m.home === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans relative">
      
      {/* ÜST MƏLUMAT BANNERİ (Daha təmiz rənglə) */}
      <div className="bg-[#0f172a] text-amber-100/80 py-3 px-6 flex justify-between items-center text-[11px] md:text-xs font-semibold sticky top-0 z-[80] border-b border-amber-900/20">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>
            Siyahı tam deyil. Məlumat üçün: <a href="tel:0555556963" className="text-amber-400 hover:text-amber-300 transition-colors">055 555 69 63</a>
          </span>
        </div>
        
        <div className="flex items-center">
          <a 
            href="https://www.facebook.com/parabournex/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-amber-600/10 p-2 rounded-lg border border-amber-600/20 hover:bg-amber-600/20 transition-all flex items-center justify-center group"
          >
            <svg className="w-4 h-4 fill-amber-600 group-hover:fill-amber-500" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* HEADER (Zərif Qızılı vurğu ilə) */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
            Vətən <span className="text-amber-600">Qəhrəmanları</span>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 max-w-lg mx-auto text-sm font-medium italic leading-relaxed">
            "Torpaq, uğrunda ölən varsa, Vətəndir!"
          </p>
        </div>
      </header>

      {/* FİLTR VƏ AXTARIŞ (Slate rəngləri ilə) */}
      <section className="max-w-5xl mx-auto px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Şəhid adı axtar..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all border border-transparent focus:border-slate-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="md:w-64 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold cursor-pointer outline-none hover:bg-slate-800 transition-colors appearance-none"
          >
            {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
          </select>
        </div>
      </section>

      {/* SİYAHI (Kartlarda qırmızı yerinə tünd göy və qızılı) */}
      <main className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((m, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedMartyr(m)} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-amber-500 transition-all duration-300"></div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100 uppercase tracking-tighter">
                {m.rank}
              </span>
              <span className="text-amber-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 text-xs font-bold">
                Məlumat →
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 leading-snug">{m.name}</h2>
            <p className="text-slate-400 text-sm mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              {m.home} rayonu
            </p>
          </div>
        ))}
      </main>

      {/* YUXARI QALX DÜYMƏSİ */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[90] w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-amber-600 hover:scale-110 active:scale-95 ${
          showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* MODAL (Daha ağır və sanballı rənglər) */}
      {selectedMartyr && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-200">
            <div className="bg-slate-900 p-10 text-white relative">
              <button 
                onClick={() => setSelectedMartyr(null)} 
                className="absolute top-8 right-8 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center border border-white/10 transition-colors"
              >
                ✕
              </button>
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">
                {selectedMartyr.rank}
              </span>
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                {selectedMartyr.name}
              </h2>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <DetailItem label="Doğum Tarixi" value={selectedMartyr.birth} icon="📅" />
                <DetailItem label="Şəhadət Tarixi" value={selectedMartyr.death} icon="⭐" />
                <DetailItem label="Doğulduğu Yer" value={selectedMartyr.home} icon="📍" />
                <DetailItem label="Döyüş Meydanı" value={selectedMartyr.location} icon="🛡️" />
              </div>
              <div className="h-px bg-slate-100 w-full"></div>
              <button 
                onClick={() => setSelectedMartyr(null)} 
                className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
              >
                Ehtiramla bağla
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-20 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        Şəhidlər Ölməz, Vətən Bölünməz!
      </footer>
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="opacity-80 text-sm">{icon}</span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-slate-800 font-bold pl-7">{value}</p>
    </div>
  );
}