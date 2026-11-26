"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const currencyMap = {
  "+256": { code: "UGX", rate: 3750, symbol: "UGX" },
  "+254": { code: "KES", rate: 130, symbol: "KSh" },
  "+255": { code: "TZS", rate: 2600, symbol: "TSh" },
  "+27": { code: "ZAR", rate: 18, symbol: "R" },
  "+234": { code: "NGN", rate: 1600, symbol: "₦" },
  "+1": { code: "USD", rate: 1, symbol: "$" },
};

const mainMenu = [
  { label: "Deposit", img: "/icons/deposit.png", href: "/deposit" },
  { label: "Withdraw", img: "/icons/withdraw.png", href: "/withdraw" },
  { label: "My Team", img: "/icons/myteam.png", href: "/team" },
  { label: "Invite", img: "/icons/invite.png", href: "/invite" },
  { label: "Install App", img: "/icons/installapp.png", href: "/installapp" },
  { label: "Manager", img: "/icons/manager.png", href: "/manager" },
  { label: "History", img: "/icons/history.png", href: "/transactions" },
  { label: "Lucky Wheel", img: "/icons/luckywheel.png", href: "/wheel" },
];

const bottomNav = [
  { id: "home", label: "Home", href: "/dashboard", icon: "/nav/home.png" },
  { id: "boost", label: "Boost", href: "/tasks", icon: "/nav/boost.png" },
  { id: "vip", label: "VIP", href: "/viplevels", icon: "/nav/vip.png" },
  { id: "profits", label: "Profits", href: "/transactions", icon: "/nav/profits.png" },
  { id: "profile", label: "Profile", href: "/profile", icon: "/nav/profile.png" },
];

export default function Dashboard() {
  const [hasNotif, setHasNotif] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [nowTime, setNowTime] = useState("");
  const [countryCode, setCountryCode] = useState("+256");
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState("Alex");

  useEffect(() => {
    setNowTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    const interval = setInterval(() => {
      setNowTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 60000);

    // load from register
    const savedCode = localStorage.getItem("countryCode");
    const savedBal = localStorage.getItem("balance");
    const savedName = localStorage.getItem("username");
    if (savedCode) setCountryCode(savedCode);
    if (savedBal) setBalance(parseFloat(savedBal));
    if (savedName) setUsername(savedName);

    return () => clearInterval(interval);
  }, []);

  const user = {
    username: username,
    countryCode: countryCode,
    balance: balance,
    lastUpdateType: balance === 0 ? "No deposit yet" : "Added",
    lastUpdateTime: nowTime || "10:00 AM",
    lastUpdateDay: "Today",
    prevUpdate: "Yesterday 10:00 AM",
  };

  const local = currencyMap[user.countryCode] || currencyMap["+256"];
  const localAmount = Math.floor(user.balance * local.rate).toLocaleString();

  return (
    <div className="min-h-screen bg-[#ffc5e3] pb-[90px] relative">
      <style>{`
        @keyframes shake {
          0%,100%{transform:rotate(0)}
          25%{transform:rotate(-12deg)}
          50%{transform:rotate(12deg)}
          75%{transform:rotate(-8deg)}
        }
        .shake { animation: shake 0.5s infinite; }
      `}</style>

      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 2px, transparent 2px)", backgroundSize: "24px 24px" }} />

      <div className="relative z-10 max-w-[420px] mx-auto">
        <div className="flex justify-center pt-5">
          <div className="text-center">
            <img src="/paid.png" alt="Paid On Results" className="w-[70px] h-[70px] mx-auto object-contain drop-shadow-xl" />
            <h1 className="font-black text-[#7b2cff] text-[38px] leading-[0.85] tracking-tight drop-shadow-[0_2px_0_white]">PAID ON<br/>results</h1>
          </div>
        </div>

        <div className="flex justify-between items-center px-5 mt-7">
          <div>
            <h2 className="font-bold text-[28px] text-[#1a0b2e] leading-none">Hello, {user.username}</h2>
            <p className="text-[14px] text-black/60 mt-1">Welcome back!</p>
          </div>
          <div className="flex gap-2.5 items-center">
            <Link href="/notifications" className="relative" onClick={() => setHasNotif(false)}>
              <div className={`w-10 h-10 bg-[#7b2cff] rounded-full flex items-center justify-center shadow-lg ${hasNotif ? "shake" : ""}`}>
                <span className="text-white text-[20px]">🔔</span>
              </div>
              {hasNotif && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
            </Link>
            <Link href="/profile" className="w-10 h-10 bg-[#7b2cff] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-[20px]">⚙️</span>
            </Link>
          </div>
        </div>

        <div className="mx-4 mt-5 bg-[#5f1abc] rounded-[24px] p-5 shadow-[0_10px_30px_rgba(95,26,188,0.35)] border border-white/10">
          <p className="text-[#e8b4ff] text-[13px] tracking-wide">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <p className="text-white font-black text-[38px] leading-none mt-1">${user.balance.toFixed(2)}</p>
            <span className="text-white/60 text-[13px]">USD</span>
          </div>
          <p className="text-[#ffddf2] font-bold text-[18px] mt-1">{localAmount} {local.code}</p>
          <div className="mt-2.5 pt-2.5 border-t border-white/10 text-[#c9a6ff] text-[11px] leading-[1.4]">
            <p>{user.lastUpdateType} • {user.lastUpdateDay} {user.lastUpdateTime}</p>
            <p>Last • {user.prevUpdate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5 px-4 mt-6">
          {mainMenu.map((item) => (
            <Link key={item.label} href={item.href} className="bg-[#ffe6f3] rounded-[22px] py-5 px-3 flex flex-col items-center justify-center border-[1.5px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-[0.97] transition">
              <img src={item.img} alt={item.label} className="w-[90px] h-[70px] object-contain" />
              <span className="mt-3 font-bold text-[#2d1a5e] text-[14px]">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 flex justify-around py-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          {bottomNav.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <Link key={tab.id} href={tab.href} onClick={() => setActiveTab(tab.id)} className="flex flex-col items-center w-1/5 py-1">
                <img src={tab.icon} alt={tab.label} className={`w-7 h-7 object-contain transition-all ${active ? "scale-110" : "grayscale opacity-60 scale-95"}`} style={active ? { filter: "drop-shadow(0 0 6px #7b2cff)" } : {}} />
                <span className={`text-[10px] font-bold mt-1.5 ${active ? "text-[#7b2cff]" : "text-gray-400"}`}>{tab.label}</span>
                {active && <span className="w-1 h-1 bg-[#7b2cff] rounded-full mt-1"></span>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}