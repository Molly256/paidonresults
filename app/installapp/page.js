"use client";

import BottomNav from "../components/BottomNav";

export default function InstallAppPage() {
  return (
    <div className="min-h-screen w-full bg-[#ffc5e3] pb-[100px] relative flex justify-center">
      <div className="relative z-10 w-full max-w-[400px] px-4 pt-4">
        <div className="flex flex-col items-center">
          <img src="/paid.png" alt="logo" className="w-[72px] h-[72px] object-contain" />
          <h1 className="font-black text-center leading-[0.85] mt-1">
            <span className="block text-[28px] text-[#7b2cff]">PAID ON</span>
            <span className="block text-[32px] text-[#7b2cff] -mt-1">results</span>
          </h1>
          <h2 className="text-[22px] font-black text-[#1e1b4b] mt-3">Install App</h2>
        </div>

        <div className="mt-5 bg-white rounded-[16px] p-4 shadow-sm">
          <p className="font-black text-[16px] text-[#1e1b4b]">Android (Chrome)</p>
          <p className="text-[13px] text-black/70 mt-1 leading-relaxed">
            1. Tap the 3 dots (⋮) top right<br/>
            2. Tap &quot;Add to Home screen&quot;<br/>
            3. Tap &quot;Install&quot;
          </p>
        </div>

        <div className="mt-3 bg-[#4c1d95] rounded-[16px] p-4 shadow-sm text-white">
          <p className="font-black text-[16px]">iPhone (Safari)</p>
          <p className="text-[13px] text-white/90 mt-1 leading-relaxed">
            1. Tap Share button<br/>
            2. Tap &quot;Add to Home Screen&quot;<br/>
            3. Tap &quot;Add&quot;
          </p>
        </div>

        <div className="mt-3 bg-[#ffe6f3] border border-white rounded-[16px] p-4 text-center">
          <p className="text-[13px] font-bold text-[#6d28d9]">
            After installing, open it from your home screen like a real app.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}