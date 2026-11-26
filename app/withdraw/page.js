"use client";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function WithdrawPage() {
  const [balance, setBalance] = useState(58200);
  const [amount, setAmount] = useState("5000");
  const [method, setMethod] = useState("mobile");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [showMobileDrop, setShowMobileDrop] = useState(false);

  const [walletNum, setWalletNum] = useState("");
  const [holder, setHolder] = useState("");
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [cryptoNetwork, setCryptoNetwork] = useState("");

  const [toast, setToast] = useState("");
  const [bindData, setBindData] = useState(null);

  useEffect(() => {
    const bal = localStorage.getItem("balance");
    if(bal) setBalance(Number(bal));
    const w = JSON.parse(localStorage.getItem("bindWallet") || "null");
    if(w) setBindData(w);
  }, []);

  const showToastMsg = (m) => { setToast(m); setTimeout(()=>setToast(""),3000); };

  const handleSelectMobileNetwork = (net) => {
    setMobileNetwork(net);
    setShowMobileDrop(false);
    if(!bindData){
      showToastMsg("Please bind wallet first");
      setWalletNum(""); setHolder(""); return;
    }
    if(bindData.network === net){
      setWalletNum(bindData.number || "");
      setHolder(bindData.holder || "");
    } else {
      setWalletNum(""); setHolder("");
      showToastMsg(`No ${net.toUpperCase()} wallet bound`);
    }
  };

  const handleSelectMethod = (m) => {
    setMethod(m);
    if(m === "usdt"){
      if(bindData?.network === "usdt"){
        setCryptoName(bindData.cryptoName || "");
        setCryptoAddress(bindData.cryptoAddress || "");
        setCryptoNetwork(bindData.cryptoNetwork || "");
      } else {
        setCryptoName(""); setCryptoAddress(""); setCryptoNetwork("");
        if(bindData) showToastMsg("Please bind USDT wallet first");
      }
    }
  };

  useEffect(()=>{
    if(bindData?.network === "usdt"){
      setCryptoName(bindData.cryptoName||"");
      setCryptoAddress(bindData.cryptoAddress||"");
      setCryptoNetwork(bindData.cryptoNetwork||"");
    }
  },[bindData]);

  const handleSubmit = () => {
    if(!amount || Number(amount) < 5000) return showToastMsg("Minimum 5,000 UGX");
    if(Number(amount) > balance) return showToastMsg("Insufficient balance");
    if(method === "mobile"){
      if(!mobileNetwork) return showToastMsg("Select network");
      if(!walletNum || !holder) return showToastMsg("Bind wallet first in Profile");
    }
    if(method === "usdt"){
      if(!cryptoAddress) return showToastMsg("Bind USDT wallet first");
    }
    // BLACK TOAST SUCCESS
    showToastMsg("Withdraw success");
  };

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
        </div>

        <h2 className="text-[34px] font-black text-[#1e1b4b] mt-4 mb-3">Withdraw</h2>

        <div className="flex gap-3">
          <div className="flex-1 bg-[#d8c6ff] rounded-[14px] p-3 border border-white">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#6d28d9] font-medium">Available Balance</span>
              <span className="text-[16px]">💼</span>
            </div>
            <p className="text-[18px] font-black text-[#1e1b4b] mt-2">{balance.toLocaleString()} UGX</p>
          </div>
          <div className="flex-1 bg-white rounded-[14px] p-3 border border-white shadow-sm">
            <p className="text-[14px] font-black text-[#1e1b4b]">Withdraw Amount</p>
            <p className="text-[11px] text-black/60 mt-1">Enter amount</p>
            <div className="flex items-center justify-between mt-1">
              <input value={amount} onChange={e=>setAmount(e.target.value)} className="w-[80%] bg-transparent outline-none font-bold text-[13px]" placeholder="5,000 UGX" />
              <span className="text-[14px]">📝</span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-[14px] p-3 border border-white">
          <p className="text-[14px] font-black text-[#1e1b4b] mb-2">Select method</p>
          <button onClick={()=>{ handleSelectMethod("mobile"); setShowMobileDrop(!showMobileDrop); }} className={`w-full flex items-center justify-between rounded-full px-4 py-3 font-bold text-[14px] ${method==="mobile" ? "bg-[#1e1b4b] text-white" : "bg-white border"}`}>
            <span className="flex items-center gap-2">📱 Mobile Money {mobileNetwork ? `• ${mobileNetwork.toUpperCase()} NETWORK` : ""}</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
          </button>
          {showMobileDrop && method==="mobile" && (
            <div className="mt-2 bg-[#f5f0ff] rounded-[12px] border p-1">
              <button onClick={()=>handleSelectMobileNetwork("mtn")} className={`w-full text-left px-4 py-2.5 rounded-full font-black text-[12px] ${mobileNetwork==="mtn" ? "bg-black text-white" : "bg-white"}`}>MTN NETWORK</button>
              <button onClick={()=>handleSelectMobileNetwork("airtel")} className={`w-full text-left px-4 py-2.5 rounded-full font-black text-[12px] mt-1 ${mobileNetwork==="airtel" ? "bg-black text-white" : "bg-white"}`}>AIRTEL NETWORK</button>
            </div>
          )}
        </div>

        <div className="mt-3">
          <button onClick={()=>handleSelectMethod("usdt")} className={`w-full flex items-center gap-2 rounded-[12px] px-4 py-3 font-bold text-[13px] border ${method==="usdt" ? "bg-[#ede9fe] border-[#a78bfa] text-[#5b21b6]" : "bg-[#f3e8ff]/70 border-white text-[#a78bfa]"}`}>
            💎 USDT {cryptoNetwork ? `• ${cryptoNetwork}` : ""}
          </button>
        </div>

        {method==="mobile" ? (
          <>
            <div className="mt-4 bg-white rounded-[14px] p-3 border border-white">
              <p className="text-[14px] font-black text-[#1e1b4b]">Wallet number</p>
              <div className="mt-2 flex items-center gap-2 bg-[#f9f5ff] border rounded-[10px] px-3 py-3">
                <span>📞</span>
                <input value={walletNum ? `+256 ${walletNum}` : ""} readOnly placeholder="+256 7xx xxx xxx" className="w-full bg-transparent outline-none text-[13px] font-bold pointer-events-none" />
              </div>
            </div>
            <div className="mt-3 bg-white rounded-[14px] p-3 border border-white">
              <p className="text-[14px] font-black text-[#1e1b4b]">Holder's Names</p>
              <div className="mt-2 bg-[#f9f5ff] border rounded-[10px] px-3 py-3">
                <input value={holder} readOnly placeholder="Enter holder's full names" className="w-full bg-transparent outline-none text-[13px] pointer-events-none" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 bg-white rounded-[14px] p-3 border border-white">
              <p className="text-[14px] font-black text-[#1e1b4b]">Cryptocurrency wallet name</p>
              <div className="mt-2 bg-[#f9f5ff] border rounded-[10px] px-3 py-3">
                <input value={cryptoName} readOnly placeholder="Trust Wallet / Binance" className="w-full bg-transparent outline-none text-[13px] font-bold pointer-events-none" />
              </div>
            </div>
            <div className="mt-3 bg-white rounded-[14px] p-3 border border-white">
              <p className="text-[14px] font-black text-[#1e1b4b]">Address</p>
              <div className="mt-2 bg-[#f9f5ff] border rounded-[10px] px-3 py-3">
                <input value={cryptoAddress} readOnly placeholder="USDT address" className="w-full bg-transparent outline-none text-[12px] font-bold pointer-events-none" />
              </div>
            </div>
            <div className="mt-3 bg-white rounded-[14px] p-3 border border-white">
              <p className="text-[14px] font-black text-[#1e1b4b]">Network</p>
              <div className="mt-2 bg-[#f9f5ff] border rounded-[10px] px-3 py-3">
                <input value={cryptoNetwork} readOnly placeholder="TRC20-USDT / BEP20-USDT" className="w-full bg-transparent outline-none text-[13px] font-bold pointer-events-none" />
              </div>
            </div>
          </>
        )}

        <button onClick={handleSubmit} className="w-full mt-5 bg-[#4c1d95] shadow-[0_0_18px_#7c3aed] text-white font-black py-3.5 rounded-full text-[17px]">Submit Withdrawal</button>
        <p className="text-[10px] text-center text-black/50 mt-3">Withdrawals processed within 24 hours • Minimum 5,000 UGX</p>
      </div>

      <BottomNav />

      {toast && <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold z-[999] shadow-xl">{toast}</div>}
    </div>
  );
}