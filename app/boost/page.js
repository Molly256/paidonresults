'use client';
import { useState } from 'react';
import Image from 'next/image';
import { tasks } from '@/data/tasks.js';
import { getVipByLevel } from '@/data/vip.js'; // VIP file we created

export default function BoostPage() {
  // REAL USER - will come from your auth
  const user = {
    countryCode: 'UG',
    currency: 'UGX',
    vipLevel: 1,
  };

  // 1. CHECK VIP FIRST - knows how many products + commission
  const vip = getVipByLevel(user.vipLevel);

  const [totalEarned, setTotalEarned] = useState(1250.50);
  const [currentIndex, setCurrentIndex] = useState(0); // 0 to vip.dailyBoosts-1
  const [showAnimation, setShowAnimation] = useState(false);
  const [hasBoosted, setHasBoosted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 = EMPTY AT START

  const todaysTasks = tasks.slice(0, vip.dailyBoosts);
  const currentTask = todaysTasks[currentIndex] || tasks[0];
  const commission = (currentTask.price * vip.commissionRate).toFixed(2);

  const handleBoost = () => {
    if (hasBoosted) return;
    
    // Purple-white loader ONLY when tap boost
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      setHasBoosted(true);
      setProgress(50); // EMPTY -> 50%
    }, 1000);
  };

  const handleSubmit = () => {
    if (!hasBoosted) return;

    setProgress(100); // 50% -> 100% FULL glow purple
    setTotalEarned(prev => prev + parseFloat(commission));

    setTimeout(() => {
      if (currentIndex < vip.dailyBoosts - 1) {
        setCurrentIndex(prev => prev + 1);
        setHasBoosted(false);
        setProgress(0); // Next product -> EMPTY again
      } else {
        alert(`Done! ${vip.dailyBoosts} boosts today - VIP${user.vipLevel}`);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-6 pb-24">
      <div className="flex flex-col items-center">
        <Image src="/paid.png" alt="Paid" width={120} height={36} className="object-contain" />
        <p className="text-[11px] tracking-widest text-gray-400 mt-1">PAID ON results</p>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-400">
        <span>VIP {user.vipLevel} - {vip.label}</span>
        <span>Boost {currentIndex + 1}/{vip.dailyBoosts}</span>
      </div>

      <div className="mt-2 text-center">
        <h2 className="text-sm text-gray-400">Total Earned</h2>
        <p className="text-2xl font-bold mt-1">+ {totalEarned.toFixed(2)} {user.currency}</p>
      </div>

      <div className="mt-6 border border-[#2a2a2a] rounded-xl p-4 relative overflow-hidden bg-[#0f0f0f] min-h-[260px]">
        
        {/* Purple-White Illustration - ONLY on Boost tap, 1 sec */}
        {showAnimation && (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center">
            <div className="relative w-64 h-44">
              <img src="/boost-loading.png" alt="loading" className="w-full h-full object-contain" />
              <div className="absolute left-1 top-1/2 flex flex-col gap-1">
                <span className="w-1.5 h-1.5 bg-[#8a5cff] rounded-full animate-ping"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </div>
              <div className="absolute right-1 top-1/2 flex flex-col gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                <span className="w-1.5 h-1.5 bg-[#8a5cff] rounded-full animate-ping"></span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.6s]"></span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="w-[90px] h-[90px] bg-white rounded-lg overflow-hidden flex-shrink-0">
            <img src={`/tasks/photo${currentTask.id}.jpg`} alt={currentTask.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium line-clamp-2">{currentTask.name}</h3>
            <p className="text-xs text-gray-400 mt-1">Task Code: {currentTask.id}</p>
            <div className="flex gap-6 mt-3">
              <div>
                <p className="text-[10px] text-gray-500">TOTAL</p>
                <p className="text-sm font-bold">{currentTask.price} {user.currency}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">PROFIT ({vip.label})</p>
                <p className="text-sm font-bold text-[#ffb6e6]">{commission} {user.currency}</p>
              </div>
            </div>
          </div>
        </div>

        {/* OVAL BAR: 0% EMPTY -> 50% -> 100% */}
        <div className="mt-6">
          <div className="w-full h-[8px] rounded-full bg-[#2a1a2e] border border-[#3a2a3e] overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${progress}%`,
                background: progress === 0 ? 'transparent' : progress === 50 ? '#ffb6e6' : 'linear-gradient(to right, #a855f7, #e879f9)',
                boxShadow: progress === 100 ? '0 0 15px #a855f7' : 'none'
              }}
            />
          </div>
          <p className="text-center text-[11px] text-gray-500 mt-2">Boost progress</p>
        </div>

        {/* BUTTONS: Boost = hot purple first, then luxury pink / Submit = opposite */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleBoost}
            disabled={hasBoosted}
            className={`flex-1 h-[46px] rounded-full text-sm font-bold transition-all duration-300 ${!hasBoosted ? 'bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-[#ffd6ec] text-[#7a4a65]'}`}
          >
            Boost product
          </button>
          <button
            onClick={handleSubmit}
            disabled={!hasBoosted}
            className={`flex-1 h-[46px] rounded-full text-sm font-bold transition-all duration-300 ${hasBoosted ? 'bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-[#ffd6ec] text-[#7a4a65] opacity-70'}`}
          >
            Submit product
          </button>
        </div>
      </div>
    </div>
  );
}