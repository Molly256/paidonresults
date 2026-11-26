"use client";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

const TABS = [
  { id: "all", label: "All" },
  { id: "expense", label: "Expense" },
  { id: "income", label: "Income" },
  { id: "tasks", label: "Tasks income" },
  { id: "invitation", label: "Invitation rewards" },
  { id: "funzone", label: "Funzone" },
  { id: "team", label: "Team salary" },
  { id: "lucky", label: "Luckywheel" },
  { id: "deposits", label: "Deposits" },
  { id: "refund", label: "Refund" },
];

function formatTxTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  const timePart = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  if (isToday) return `Today • ${timePart}`;
  if (isYesterday) return `Yesterday • ${timePart}`;
  const datePart = d.toLocaleDateString([], { month: "short", day: "2-digit" });
  return `${datePart} • ${timePart}`;
}

function getIcon(type, category) {
  if (category === "refund") return { bg: "bg-blue-50", icon: "↩", color: "text-blue-600" };
  if (category === "withdraw" || type === "expense") return { bg: "bg-red-50", icon: "↑", color: "text-red-600" };
  if (category === "vip") return { bg: "bg-red-50", icon: "↑", color: "text-red-600" };
  if (category === "tasks") return { bg: "bg-green-50", icon: "+", color: "text-green-600" };
  if (category === "referral" || category === "invitation") return { bg: "bg-green-50", icon: "↓", color: "text-green-600" };
  if (category === "deposit") return { bg: "bg-pink-50", icon: "🎁", color: "text-pink-600" };
  if (category === "bonus") return { bg: "bg-purple-50", icon: "🎁", color: "text-purple-600" };
  if (type === "income") return { bg: "bg-green-50", icon: "↓", color: "text-green-600" };
  return { bg: "bg-gray-50", icon: "•", color: "text-gray-600" };
}

export default function TransactionHistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("transactions");
    const parsed = raw ? JSON.parse(raw) : [];
    const deposits = JSON.parse(localStorage.getItem("depositHistory") || "[]");
    const withdraws = JSON.parse(localStorage.getItem("withdrawHistory") || "[]");
    const vip = JSON.parse(localStorage.getItem("vipPurchases") || "[]");
    const tasks = JSON.parse(localStorage.getItem("taskEarnings") || "[]");
    const referrals = JSON.parse(localStorage.getItem("referralEarnings") || "[]");
    const funzone = JSON.parse(localStorage.getItem("funzoneEarnings") || "[]");
    const team = JSON.parse(localStorage.getItem("teamSalary") || "[]");
    const lucky = JSON.parse(localStorage.getItem("luckyWheelEarnings") || "[]");
    const refunds = JSON.parse(localStorage.getItem("refundHistory") || "[]");

    let all = [...parsed];
    if (all.length === 0) {
      const mapToTx = (arr, defaults) => arr.map(a => ({
        id: a.id || Math.random().toString(36).slice(2),
        title: a.title || defaults.title,
        category: a.category || defaults.category,
        type: a.type || defaults.type,
        amount: Number(a.amount || 0),
        currency: a.currency || "UGX",
        createdAt: a.createdAt || a.date || new Date().toISOString(),
      }));
      all = [
        ...mapToTx(withdraws, { title: "Expense - Withdrawal", category: "withdraw", type: "expense" }),
        ...mapToTx(vip, { title: "Expense - VIP Purchase", category: "vip", type: "expense" }),
        ...mapToTx(deposits, { title: "Income - Deposit", category: "deposit", type: "income" }),
        ...mapToTx(tasks, { title: "Income - Task Reward", category: "tasks", type: "income" }),
        ...mapToTx(referrals, { title: "Income - Referral Bonus", category: "invitation", type: "income" }),
        ...mapToTx(funzone, { title: "Income - Funzone", category: "funzone", type: "income" }),
        ...mapToTx(team, { title: "Income - Team Salary", category: "team", type: "income" }),
        ...mapToTx(lucky, { title: "Income - Luckywheel", category: "lucky", type: "income" }),
        ...mapToTx(refunds, { title: "Income - Refund", category: "refund", type: "income" }),
      ];
    }
    all.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setTxs(all);
  }, []);

  const filtered = txs.filter(t => {
    if (activeTab === "all") return true;
    if (activeTab === "expense") return t.type === "expense" || ["withdraw","vip"].includes(t.category);
    if (activeTab === "income") return t.type === "income";
    if (activeTab === "tasks") return t.category === "tasks";
    if (activeTab === "invitation") return ["invitation","referral"].includes(t.category);
    if (activeTab === "funzone") return t.category === "funzone";
    if (activeTab === "team") return t.category === "team";
    if (activeTab === "lucky") return t.category === "lucky";
    if (activeTab === "deposits") return t.category === "deposit";
    if (activeTab === "refund") return t.category === "refund";
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#ffc5e3] pb-[90px] relative flex justify-center">
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 2.5px, transparent 2.5px)", backgroundSize: "22px 22px" }} />
      <div className="relative z-10 w-full max-w-[400px] px-4 pt-2">
        <div className="flex flex-col items-center">
          <img src="/paid.png" alt="logo" className="w-[72px] h-[72px] object-contain drop-shadow-xl" />
          <h1 className="font-black text-center leading-[0.85] mt-1">
            <span className="block text-[26px] text-[#7b2cff] drop-shadow-[0_2px_0_white]">PAID ON</span>
            <span className="block text-[30px] text-[#7b2cff] -mt-1 drop-shadow-[0_2px_0_white]">results</span>
          </h1>
          <h2 className="text-[18px] font-black text-[#1e1b4b] mt-2">Wallet</h2>
        </div>

        <div className="flex items-center justify-between mt-6 mb-3">
          <h3 className="text-[18px] font-black text-[#1e1b4b]">Transaction History</h3>
          <button onClick={()=>setActiveTab("all")} className="text-[12px] text-[#6d28d9] font-medium">See all</button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={()=>setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-bold border ${activeTab===tab.id ? "bg-[#1e1b4b] text-white border-[#1e1b4b]" : "bg-white text-[#6d28d9] border-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="bg-white/80 rounded-[16px] p-6 text-center mt-4">
              <p className="text-[14px] font-bold text-black/60">No transactions yet</p>
              <p className="text-[11px] text-black/40 mt-1">Your {activeTab} history will appear here</p>
            </div>
          ) : (
            filtered.map((tx) => {
              const style = getIcon(tx.type, tx.category);
              const isExpense = tx.type === "expense";
              return (
                <div key={tx.id} className="bg-white rounded-[14px] px-3 py-3 flex items-center justify-between border border-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${style.bg} flex items-center justify-center text-[16px] font-black ${style.color}`}>
                      {style.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-[#1e1b4b] leading-tight">{tx.title}</p>
                      <p className="text-[11px] text-black/50 mt-0.5">{formatTxTime(tx.createdAt)}</p>
                    </div>
                  </div>
                  <p className={`text-[13px] font-black ${isExpense ? "text-[#1e1b4b]" : "text-[#4c1d95]"}`}>
                    {isExpense ? "-" : "+"} {tx.currency === "UGX" ? `${Number(tx.amount).toLocaleString()} UGX` : `$${Number(tx.amount).toLocaleString()}`}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Full bottom nav active - no active prop, all buttons work */}
      <BottomNav />
    </div>
  );
}