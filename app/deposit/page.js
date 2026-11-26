"use client";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

const WALLETS = {
  mtn: { network: "MTN", number: "0773242118", name: "James Mark" },
  airtel: { network: "AIRTEL", number: "0753185973", name: "Kaye David" },
  bep20: { network: "BEP20", label: "BEP20USDT", address: "Bsjdbdndbdvdksjdvdksbvznsjsvs" },
  trc20: { network: "TRC20", label: "TRC-20USDT", address: "Trdgxhhhhhjhvhhvhhggggvjhh" },
};

export default function DepositPage() {
  const [mainTab, setMainTab] = useState("mobile");
  const [mobileNet, setMobileNet] = useState("mtn");
  const [usdtNet, setUsdtNet] = useState("bep20");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState("");
  const [currencyCode, setCurrencyCode] = useState("UGX");

  useEffect(() => {
    const code = localStorage.getItem("countryCode") || "+256";
    if (code === "+256") setCurrencyCode("UGX");
    else if (code === "+254") setCurrencyCode("KES");
    else if (code === "+255") setCurrencyCode("TZS");
    else if (code === "+234") setCurrencyCode("NGN");
    else setCurrencyCode("USD");
  }, []);

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  };
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = () => {
    if (!amount || Number(amount) < 1) {
      showToast("Enter amount");
      return;
    }
    const tx = {
      id: Date.now(),
      type: "deposit",
      method: mainTab === "mobile" ? WALLETS[mobileNet].network : WALLETS[usdtNet].label,
      amount,
      wallet: mainTab === "mobile" ? WALLETS[mobileNet].number : WALLETS[usdtNet].address,
      status: "pending",
      time: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem("pendingDeposits") || "[]");
    prev.push(tx);
    localStorage.setItem("pendingDeposits", JSON.stringify(prev));
    showToast("Withdraw success");
    setAmount("");
  };

  return (
    <div className="min-h-screen w-full bg-[#ffc5e3] pb-[90px] relative flex justify-center">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 2.5px, transparent 2.5px)", backgroundSize: "22px 22px" }} />
      <div className="relative z-10 w-full max-w-[400px] px-4 pt-4">
        <div className="flex flex-col items-center">
          <img src="/paid.png" alt="logo" className="w-[72px] h-[72px] object-contain drop-shadow-xl" />
          <h1 className="font-black text-center leading-[0.85] mt-1">
            <span className="block text-[30px] text-[#7b2cff] drop-shadow-[0_2px_0_white]">PAID ON</span>
            <span className="block text-[36px] text-[#7b2cff] -mt-1 drop-shadow-[0_2px_0_white]">results</span>
          </h1>
          <h2 className="text-[28px] font-bold text-black mt-4">Deposit</h2>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={() => setMainTab("mobile")} className={`flex-1 py-2.5 rounded-full font-bold text-[16px] ${mainTab === "mobile" ? "bg-[#5f1abc] text-white" : "bg-[#ffe6f3] text-[#7b2cff] border border-white"}`}>Mobile Money</button>
          <button onClick={() => setMainTab("usdt")} className={`flex-1 py-2.5 rounded-full font-bold text-[16px] ${mainTab === "usdt" ? "bg-[#5f1abc] text-white" : "bg-[#ffe6f3] text-[#7b2cff] border border-white"}`}>USDT</button>
        </div>

        {mainTab === "mobile" && (
          <>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setMobileNet("mtn")} className={`flex-1 py-2 rounded-full text-[13px] font-black border ${mobileNet === "mtn" ? "bg-black text-white border-black" : "bg-white text-black"}`}>MTN NETWORK</button>
              <button onClick={() => setMobileNet("airtel")} className={`flex-1 py-2 rounded-full text-[13px] font-black border ${mobileNet === "airtel" ? "bg-black text-white border-black" : "bg-white text-black"}`}>AIRTEL NETWORK</button>
            </div>
            <div className="mt-3 bg-[#ffe0f0] rounded-[18px] border-[1.5px] border-[#c8a6ff] p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e9d4ff] rounded-full flex items-center justify-center">📱</div>
                <div>
                  <p className="font-black text-[#5f1abc] text-[18px] leading-none">Mobile Money</p>
                  <p className="text-[13px] font-bold text-black mt-1">{WALLETS[mobileNet].network}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[12px] text-black/70">Wallet number</p>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[18px] text-black">{WALLETS[mobileNet].number}</p>
                  <button onClick={() => copyText(WALLETS[mobileNet].number)} className="bg-[#5f1abc] text-white px-3 py-1.5 rounded-full text-[12px] font-bold">⎙ Copy</button>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[12px] text-black/70">Name</p>
                <p className="font-black text-[16px] text-black">{WALLETS[mobileNet].name}</p>
              </div>
              <div className="mt-4">
                <label className="text-[#5f1abc] font-black text-[16px]">Enter amount</label>
                <div className="mt-1 bg-white rounded-[12px] border px-3 py-3">
                  <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="5,000" className="w-full outline-none bg-transparent text-[15px]" />
                </div>
                <p className="text-[11px] text-black/60 mt-1.5">Min 5,000 {currencyCode}</p>
              </div>
              <button onClick={handleSubmit} className="w-full mt-4 bg-[#5f1abc] text-white font-bold py-3 rounded-full">Submit</button>
            </div>
          </>
        )}

        {mainTab === "usdt" && (
          <>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setUsdtNet("bep20")} className={`flex-1 py-2 rounded-full text-[13px] font-black border ${usdtNet === "bep20" ? "bg-black text-white" : "bg-white text-black"}`}>BEP20USDT</button>
              <button onClick={() => setUsdtNet("trc20")} className={`flex-1 py-2 rounded-full text-[13px] font-black border ${usdtNet === "trc20" ? "bg-black text-white" : "bg-white text-black"}`}>TRC-20USDT</button>
            </div>
            <div className="mt-3 bg-[#2d0a5a] rounded-[18px] border border-[#a86bff] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6a3ad6] rounded-full flex items-center justify-center">$</div>
                <div>
                  <p className="font-black text-[20px]">USDT</p>
                  <span className="bg-[#ffdff2] text-black text-[11px] font-bold px-2 py-0.5 rounded-full">{WALLETS[usdtNet].label}</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[12px] text-[#d6b6ff]">USDT Address</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-[14px] break-all">{WALLETS[usdtNet].address}</p>
                  <button onClick={() => copyText(WALLETS[usdtNet].address)} className="bg-[#ffe6f3] text-black px-3 py-1.5 rounded-full text-[12px] font-bold shrink-0">⎙ Copy</button>
                </div>
              </div>
              <div className="mt-5">
                <label className="text-white font-bold text-[14px]">Enter amount (USDT)</label>
                <div className="mt-1 bg-white rounded-[12px] px-3 py-3">
                  <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="10" className="w-full outline-none text-black" />
                </div>
              </div>
              <button onClick={handleSubmit} className="w-full mt-4 bg-white text-[#2d0a5a] font-black py-3 rounded-full">Submit</button>
            </div>
          </>
        )}
      </div>
      <BottomNav />
      {toast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold shadow-xl z-[999]">{toast}</div>
      )}
    </div>
  );
}