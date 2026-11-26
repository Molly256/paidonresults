"use client";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

const VIP_LEVELS = [
  {
    id: 0,
    name: "VIP 0",
    price: "0.00 UGX",
    daily: "1,500 UGX daily",
    boost: "500 UGX per boost",
    products: "3 products daily",
    require: null,
  },
  {
    id: 1,
    name: "VIP 1",
    price: "50,000 UGX",
    daily: "1,800 UGX daily",
    boost: "900 UGX per boost",
    products: "2 products daily",
    require: null,
  },
  {
    id: 2,
    name: "VIP 2",
    price: "180,000 UGX",
    daily: "6,000 UGX daily",
    boost: "1,000 UGX per boost",
    products: "6 products daily",
    require: null,
  },
  {
    id: 3,
    name: "VIP 3",
    price: "600,000 UGX",
    daily: "19,000 UGX daily",
    boost: "950 UGX per boost",
    products: "Require 3 active members",
    require: true,
  },
  {
    id: 4,
    name: "VIP 4",
    price: "780,000 UGX",
    daily: "25,000 UGX daily",
    boost: "834 UGX per boost",
    products: "Require 5 active members",
    require: true,
  },
  {
    id: 5,
    name: "VIP 5",
    price: "900,000 UGX",
    daily: "29,000 UGX daily",
    boost: "725 UGX per boost",
    products: "Require 10 active members",
    require: true,
  },
  {
    id: 6,
    name: "VIP 6",
    price: "1,500,000 UGX",
    daily: "45,000 UGX daily",
    boost: "900 UGX per boost",
    products: "Require 20 active members",
    require: true,
  },
  {
    id: 7,
    name: "VIP 7",
    price: "2,300,000 UGX",
    daily: "69,000 UGX daily",
    boost: "1,150 UGX per boost",
    products: "Require 25 active members",
    require: true,
  },
];

export default function VipPage() {
  const [currentVip, setCurrentVip] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("currentVip");
    if (saved !== null) setCurrentVip(Number(saved));
    else setCurrentVip(0);
  }, []);

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(""),3000); };

  const handleUpgrade = (level) => {
    if (level.id === currentVip) return showToast("You are already on this level");
    if (level.id < currentVip) return showToast("You already have higher VIP");
    showToast(`Upgrade to ${level.name} requested`);
  };

  return (
    <div className="min-h-screen w-full bg-[#ffc5e3] pb-[100px] relative flex justify-center">
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 2.5px, transparent 2.5px)", backgroundSize: "22px 22px" }} />
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      <div className="relative z-10 w-full max-w-[400px] px-3 pt-2">
        {/* Header - logo from public/paid.png */}
        <div className="flex flex-col items-center">
          <img src="/paid.png" alt="logo" className="w-[72px] h-[72px] object-contain drop-shadow-xl" />
          <h1 className="font-black text-center leading-[0.85] mt-1">
            <span className="block text-[28px] text-[#7b2cff] drop-shadow-[0_2px_0_white] tracking-[1px]">PAID ON</span>
            <span className="block text-[32px] text-[#7b2cff] -mt-1 drop-shadow-[0_2px_0_white]">results</span>
          </h1>
          <h2 className="text-[24px] font-black text-[#1e1b4b] mt-3 tracking-wide">VIP Membership</h2>
          
          {/* Current oval */}
          <div className="mt-2 bg-[#ffe6f3] border border-white px-4 py-1.5 rounded-full text-[12px] font-bold text-[#6d28d9] shadow-sm">
            Current: VIP {currentVip} • Active
          </div>
        </div>

        {/* VIP Levels - 8 levels */}
        <div className="mt-4 flex flex-col gap-2.5">
          {VIP_LEVELS.map((level, idx) => {
            const isDark = idx % 2 === 1; // alternate like image: 1,3,5,7 light / dark pattern
            const isEvenRow = level.id % 2 !== 0;
            const isCurrent = currentVip === level.id;
            return (
              <div
                key={level.id}
                className={`rounded-[16px] px-3 py-3 flex items-center justify-between border border-white shadow-sm ${isEvenRow ? "bg-[#4c1d95] text-white" : "bg-[#ffe6f3] text-[#1e1b4b]"}`}
              >
                <div className="flex gap-2.5 items-start">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isEvenRow ? "bg-white/20" : "bg-[#e9d5ff]"}`}>
                    <span className="text-[18px]">👑</span>
                  </div>
                  <div>
                    <p className="font-black text-[16px] leading-none">{level.name}</p>
                    <div className="mt-1.5 space-y-0.5">
                      <p className={`text-[11px] font-bold ${isEvenRow ? "text-white/90" : "text-black/70"}`}>{level.daily}</p>
                      <p className={`text-[11px] font-bold ${isEvenRow ? "text-white/90" : "text-black/70"}`}>{level.boost}</p>
                      {level.require ? (
                        <p className={`text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block ${isEvenRow ? "bg-white/20 text-white" : "bg-[#f5d0ff] text-[#7b2cff]"}`}>{level.products}</p>
                      ) : (
                        <p className={`text-[11px] ${isEvenRow ? "text-white/80" : "text-black/60"}`}>{level.products}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className={`font-black text-[14px] ${isEvenRow ? "text-white" : "text-[#1e1b4b]"}`}>{level.price}</p>
                  <button
                    onClick={() => handleUpgrade(level)}
                    className={`px-5 py-1.5 rounded-full text-[12px] font-bold border ${isEvenRow ? "bg-white text-[#4c1d95] border-white" : "bg-[#ffe6f3] text-[#4c1d95] border-[#e9d5ff]"} ${isCurrent ? "opacity-50" : ""}`}
                  >
                    {isCurrent ? "Current" : "Upgrade"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />

      {toast && <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold z-[999] shadow-xl">{toast}</div>}
    </div>
  );
}