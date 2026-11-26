"use client";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

function PassField({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mt-3">
      <input type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-white rounded-[12px] border px-3 py-3 pr-10 outline-none text-[14px]" />
      <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px]">{show ? "🙈" : "👁️"}</button>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "Alex Johnson", email: "alex.johnson@email.com", phone: "+256 770000000", gender: "Female", avatar: "" });
  const [view, setView] = useState("main");
  const [passTab, setPassTab] = useState("login");
  const [toast, setToast] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPass, setOldPass] = useState(""); const [newPass, setNewPass] = useState(""); const [confirmPass, setConfirmPass] = useState("");
  const [oldTx, setOldTx] = useState(""); const [newTx, setNewTx] = useState(""); const [confirmTx, setConfirmTx] = useState("");
  const [network, setNetwork] = useState("mtn"); const [walletNum, setWalletNum] = useState(""); const [holder, setHolder] = useState(""); const [walletLocked, setWalletLocked] = useState(false);
  const [cryptoName, setCryptoName] = useState(""); const [cryptoAddress, setCryptoAddress] = useState(""); const [cryptoNetwork, setCryptoNetwork] = useState("TRC20-USDT");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Alex Johnson";
    const email = localStorage.getItem("userEmail") || "alex.johnson@email.com";
    const code = localStorage.getItem("countryCode") || "+256";
    const phoneRaw = localStorage.getItem("userPhone") || "0770000000";
    const gender = localStorage.getItem("userGender") || "Female";
    const avatar = localStorage.getItem("avatar") || "";
    let fullPhone = phoneRaw.includes("+") ? phoneRaw : `${code} ${phoneRaw}`;
    setUser({ name, email, phone: fullPhone, gender, avatar });
    setNewName(name); setNewEmail(email);
    const w = JSON.parse(localStorage.getItem("bindWallet") || localStorage.getItem("withdrawSettings") || "null");
    if (w) { setNetwork(w.network); setWalletNum(w.number||""); setHolder(w.holder||""); setCryptoName(w.cryptoName||""); setCryptoAddress(w.cryptoAddress||""); setCryptoNetwork(w.cryptoNetwork||"TRC20-USDT"); setWalletLocked(w.locked||false); }
  }, []);

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(""),3000); };
  const GlowBtn = ({ onClick, text }) => (
    <button onClick={onClick} className="w-full mt-6 bg-[#c084fc] shadow-[0_0_18px_#a855f7] border border-white text-black font-black py-3.5 rounded-full text-[17px] active:scale-[0.98]">{text}</button>
  );

  const handleBindSave = () => {
    if(network === "usdt"){
      if(!cryptoName.trim()) return showToast("Enter Cryptocurrency wallet name");
      if(!cryptoAddress.trim()) return showToast("Enter Address");
      if(!["TRC20-USDT","BEP20-USDT"].includes(cryptoNetwork)) return showToast("Only TRC20-USDT / BEP20-USDT allowed");
      localStorage.setItem("bindWallet", JSON.stringify({network, cryptoName, cryptoAddress, cryptoNetwork, locked:true}));
      setWalletLocked(true); setShowSaved(true);
    } else {
      const clean=walletNum.replace(/\s/g,"");
      if(!/^07\d{8}$/.test(clean)) return showToast("Must be 07 + 10 digits");
      if(!holder.trim()) return showToast("Enter Holder's Names");
      localStorage.setItem("bindWallet", JSON.stringify({network, number:clean, holder, locked:true}));
      setWalletLocked(true); setShowSaved(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#ffc5e3] pb-[90px] relative flex justify-center">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 2.5px, transparent 2.5px)", backgroundSize: "22px 22px" }} />
      <div className="relative z-10 w-full max-w-[400px] px-5 pt-3">
        <div className="flex flex-col items-center">
          <img src="/paid.png" alt="logo" className="w-[72px] h-[72px] object-contain drop-shadow-xl" />
          <h1 className="font-black text-center leading-[0.85] mt-1">
            <span className="block text-[26px] text-[#7b2cff] drop-shadow-[0_2px_0_white]">PAID ON</span>
            <span className="block text-[30px] text-[#7b2cff] -mt-1 drop-shadow-[0_2px_0_white]">results</span>
          </h1>
        </div>

        {view==="main" && (
          <>
            <div className="flex flex-col items-center mt-5">
              <div className="w-[110px] h-[110px] rounded-full border-[4px] border-white bg-white overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                <img src={user.avatar || "https://i.pravatar.cc/150?img=32"} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-[22px] font-black text-black mt-3">{user.name}</h2>
              <div className="flex flex-col items-center gap-1.5 mt-2 text-[14px] font-bold text-black/80">
                <p>✉️ {user.email}</p><p>📞 {user.phone}</p><p>♀ Gender • {user.gender}</p>
              </div>
            </div>
            <h3 className="text-[20px] font-black text-black mt-6 mb-3">Account Settings</h3>
            <div className="flex flex-col gap-3">
              <button onClick={()=>setView("edit")} className="w-full bg-[#ffeaf5]/90 border border-white rounded-full py-3.5 px-4 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white">👤</div><span className="font-bold text-[15px]">Edit Profile</span></div><span className="text-[#6d28d9]">›</span></button>
              <button onClick={()=>setView("password")} className="w-full bg-[#ffeaf5]/90 border border-white rounded-full py-3.5 px-4 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white">🔒</div><span className="font-bold text-[15px]">Change Password</span></div><span className="text-[#6d28d9]">›</span></button>
              <button onClick={()=>setView("bind")} className="w-full bg-[#ffeaf5]/90 border border-white rounded-full py-3.5 px-4 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white">💳</div><span className="font-bold text-[15px]">Bind wallet</span></div><span className="text-[#6d28d9]">›</span></button>
              <button onClick={()=>window.location.href="/transactions"} className="w-full bg-[#ffeaf5]/90 border border-white rounded-full py-3.5 px-4 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white">🕒</div><span className="font-bold text-[15px]">Transaction History</span></div><span className="text-[#6d28d9]">›</span></button>
              <button onClick={()=>setShowLogout(true)} className="w-full bg-[#ffeaf5]/90 border border-white rounded-full py-3.5 px-4 flex items-center justify-between"><div className="flex gap-3 items-center"><div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white">↗️</div><span className="font-bold text-[15px]">Logout</span></div><span className="text-[#6d28d9]">›</span></button>
            </div>
          </>
        )}

        {view==="edit" && (
          <div className="mt-6"><button onClick={()=>setView("main")} className="font-bold">← Back</button>
            <h3 className="text-[20px] font-black mt-2">Edit Profile</h3>
            <div className="mt-3 bg-[#ffeaf5] rounded-[18px] border border-[#d8b4fe] p-4">
              <label className="text-[13px] font-bold text-[#5f1abc]">Modify username</label>
              <input value={newName} onChange={e=>setNewName(e.target.value)} className="mt-1 w-full bg-white rounded-[12px] border px-3 py-3 outline-none" />
              <label className="text-[13px] font-bold text-[#5f1abc] mt-3 block">Modify email</label>
              <input value={newEmail} onChange={e=>setNewEmail(e.target.value)} className="mt-1 w-full bg-white rounded-[12px] border px-3 py-3 outline-none" />
              <GlowBtn onClick={()=>{localStorage.setItem("userName",newName); localStorage.setItem("userEmail",newEmail); setUser(s=>({...s,name:newName,email:newEmail})); showToast("Profile updated"); setView("main");}} text="Save" />
            </div>
          </div>
        )}

        {view==="password" && (
          <div className="mt-6"><button onClick={()=>setView("main")} className="font-bold">← Back</button>
            <h3 className="text-[20px] font-black mt-2">Change Password</h3>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>setPassTab("login")} className={`flex-1 py-2 rounded-full font-bold text-[13px] ${passTab==="login" ? "bg-[#5f1abc] text-white" : "bg-white"}`}>Modify login password</button>
              <button onClick={()=>setPassTab("tx")} className={`flex-1 py-2 rounded-full font-bold text-[13px] ${passTab==="tx" ? "bg-[#5f1abc] text-white" : "bg-white"}`}>Modify transactions password</button>
            </div>
            <div className="mt-3 bg-[#ffeaf5] rounded-[18px] border border-[#d8b4fe] p-4">
              {passTab==="login" ? (
                <>
                  <p className="font-black text-[#5f1abc]">Modify login password</p>
                  <PassField value={oldPass} onChange={e=>setOldPass(e.target.value)} placeholder="Input old password" />
                  <PassField value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New password" />
                  <PassField value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} placeholder="Confirm password" />
                  <GlowBtn onClick={()=>{if(!oldPass||!newPass||!confirmPass) return showToast("Fill all"); if(newPass!==confirmPass) return showToast("Don't match"); localStorage.setItem("userPassword",newPass); showToast("Login password changed"); setOldPass(""); setNewPass(""); setConfirmPass("");}} text="Save" />
                </>
              ) : (
                <>
                  <p className="font-black text-[#5f1abc]">Modify transactions password</p>
                  <PassField value={oldTx} onChange={e=>setOldTx(e.target.value)} placeholder="Old password" />
                  <PassField value={newTx} onChange={e=>setNewTx(e.target.value)} placeholder="New password" />
                  <PassField value={confirmTx} onChange={e=>setConfirmTx(e.target.value)} placeholder="Confirm" />
                  <GlowBtn onClick={()=>{if(!oldTx||!newTx||!confirmTx) return showToast("Fill all"); if(newTx!==confirmTx) return showToast("Don't match"); localStorage.setItem("txPassword",newTx); showToast("Transaction password changed"); setOldTx(""); setNewTx(""); setConfirmTx("");}} text="Save" />
                </>
              )}
            </div>
          </div>
        )}

        {view==="bind" && (
          <div className="mt-6"><button onClick={()=>setView("main")} className="font-bold">← Back</button>
            <h3 className="text-[20px] font-black mt-2">Bind wallet</h3>
            <div className="mt-3 bg-[#ffeaf5] rounded-[18px] border border-[#d8b4fe] p-4">
              <p className="text-[13px] font-bold text-[#5f1abc]">Choose network</p>
              <div className="flex gap-2 mt-2">
                <button disabled={walletLocked} onClick={()=>setNetwork("mtn")} className={`flex-1 py-2.5 rounded-full font-black text-[11px] border ${network==="mtn" ? "bg-black text-white" : "bg-white"}`}>MTN NETWORK</button>
                <button disabled={walletLocked} onClick={()=>setNetwork("airtel")} className={`flex-1 py-2.5 rounded-full font-black text-[11px] border ${network==="airtel" ? "bg-black text-white" : "bg-white"}`}>AIRTEL NETWORK</button>
                <button disabled={walletLocked} onClick={()=>setNetwork("usdt")} className={`flex-1 py-2.5 rounded-full font-black text-[11px] border ${network==="usdt" ? "bg-black text-white" : "bg-white"}`}>USDT</button>
              </div>

              {network==="usdt" ? (
                <>
                  <p className="text-[13px] font-bold text-[#5f1abc] mt-4">Cryptocurrency wallet name</p>
                  <input disabled={walletLocked} value={cryptoName} onChange={e=>setCryptoName(e.target.value)} placeholder="e.g. Trust Wallet / Binance" className={`mt-1 w-full rounded-[12px] border px-3 py-3 outline-none ${walletLocked ? "bg-gray-100" : "bg-white"}`} />
                  <p className="text-[13px] font-bold text-[#5f1abc] mt-4">Address</p>
                  <input disabled={walletLocked} value={cryptoAddress} onChange={e=>setCryptoAddress(e.target.value)} placeholder="Enter USDT address" className={`mt-1 w-full rounded-[12px] border px-3 py-3 outline-none text-[13px] ${walletLocked ? "bg-gray-100" : "bg-white"}`} />
                  <p className="text-[13px] font-bold text-[#5f1abc] mt-4">Network</p>
                  <select disabled={walletLocked} value={cryptoNetwork} onChange={e=>setCryptoNetwork(e.target.value)} className={`mt-1 w-full rounded-[12px] border px-3 py-3 outline-none font-bold ${walletLocked ? "bg-gray-100" : "bg-white"}`}>
                    <option value="TRC20-USDT">TRC20-USDT</option>
                    <option value="BEP20-USDT">BEP20-USDT</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="text-[13px] font-bold text-[#5f1abc] mt-4">Wallet number</p>
                  <input disabled={walletLocked} value={walletNum} onChange={e=>setWalletNum(e.target.value)} placeholder="07********" className={`mt-1 w-full rounded-[12px] border px-3 py-3 outline-none ${walletLocked ? "bg-gray-100" : "bg-white"}`} />
                  <p className="text-[11px] text-black/50 mt-1">Must start with 07 and 10 digits total</p>
                  <p className="text-[13px] font-bold text-[#5f1abc] mt-4">Holder's Names</p>
                  <input disabled={walletLocked} value={holder} onChange={e=>setHolder(e.target.value)} placeholder="..........." className={`mt-1 w-full rounded-[12px] border px-3 py-3 outline-none ${walletLocked ? "bg-gray-100" : "bg-white"}`} />
                </>
              )}

              {walletLocked ? <p className="text-[12px] text-red-500 font-bold mt-3 text-center">Locked — only admin can edit for funds safety</p> : <GlowBtn onClick={handleBindSave} text="Save" />}
            </div>
          </div>
        )}
      </div>

      <BottomNav />

      {showLogout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
          <div className="w-full max-w-[320px] bg-[#ffeaf5] border-[2px] border-[#d8b4fe] rounded-[22px] p-6 shadow-[0_0_30px_rgba(168,85,247,0.5)] text-center">
            <div className="w-16 h-16 bg-[#f3e8ff] rounded-full flex items-center justify-center mx-auto text-[28px]">👋</div>
            <h3 className="text-[20px] font-black text-black mt-3">Logout?</h3>
            <p className="text-[13px] text-black/70 mt-1">Are you sure you want to leave?</p>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setShowLogout(false)} className="flex-1 bg-white border border-[#d8b4fe] text-black font-black py-3 rounded-full text-[15px] shadow-[0_0_12px_#c084fc]">Stay</button>
              <button onClick={()=>{ localStorage.clear(); window.location.href="/login"; }} className="flex-1 bg-[#c084fc] shadow-[0_0_18px_#a855f7] border border-white text-black font-black py-3 rounded-full text-[15px]">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showSaved && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
          <div className="w-full max-w-[320px] bg-[#ffeaf5] border-[2px] border-[#d8b4fe] rounded-[22px] p-6 shadow-[0_0_30px_rgba(168,85,247,0.5)] text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-[28px]">✅</div>
            <h3 className="text-[20px] font-black text-black mt-3">Saved Successfully</h3>
            <p className="text-[13px] text-black/70 mt-1">Your wallet has been bound</p>
            <button onClick={()=>{setShowSaved(false); setView("main");}} className="w-full mt-5 bg-[#c084fc] shadow-[0_0_18px_#a855f7] border border-white text-black font-black py-3.5 rounded-full text-[17px]">OK</button>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-[13px] font-bold z-[999]">{toast}</div>}
    </div>
  );
}