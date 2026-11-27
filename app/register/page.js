"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
  { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
  { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
  { name: "Uganda", code: "+256", flag: "🇺🇬", iso: "UG" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
  { name: "Tanzania", code: "+255", flag: "🇹🇿", iso: "TZ" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼", iso: "RW" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG" },
  { name: "Ghana", code: "+233", flag: "🇬🇭", iso: "GH" },
  { name: "India", code: "+91", flag: "🇮🇳", iso: "IN" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", iso: "PK" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD" },
  { name: "UAE", code: "+971", flag: "🇦🇪", iso: "AE" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA" },
  { name: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA" },
  { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
  { name: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
  { name: "Italy", code: "+39", flag: "🇮🇹", iso: "IT" },
  { name: "Spain", code: "+34", flag: "🇪🇸", iso: "ES" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX" },
  { name: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
  { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR" },
  { name: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG" },
  { name: "Ethiopia", code: "+251", flag: "🇪🇹", iso: "ET" },
  { name: "Morocco", code: "+212", flag: "🇲🇦", iso: "MA" },
  { name: "Algeria", code: "+213", flag: "🇩🇿", iso: "DZ" },
  { name: "Cameroon", code: "+237", flag: "🇨🇲", iso: "CM" },
  { name: "Zambia", code: "+260", flag: "🇿🇲", iso: "ZM" },
  { name: "Zimbabwe", code: "+263", flag: "🇿🇼", iso: "ZW" },
  { name: "Botswana", code: "+267", flag: "🇧🇼", iso: "BW" },
  { name: "Namibia", code: "+264", flag: "🇳🇦", iso: "NA" },
  { name: "Angola", code: "+244", flag: "🇦🇴", iso: "AO" },
  { name: "Senegal", code: "+221", flag: "🇸🇳", iso: "SN" },
  { name: "Ivory Coast", code: "+225", flag: "🇨🇮", iso: "CI" },
  { name: "DR Congo", code: "+243", flag: "🇨🇩", iso: "CD" },
  { name: "Mozambique", code: "+258", flag: "🇲🇿", iso: "MZ" },
  { name: "Malawi", code: "+265", flag: "🇲🇼", iso: "MW" },
  { name: "Somalia", code: "+252", flag: "🇸🇴", iso: "SO" },
  { name: "Sudan", code: "+249", flag: "🇸🇩", iso: "SD" },
  { name: "Liberia", code: "+231", flag: "🇱🇷", iso: "LR" },
  { name: "Sierra Leone", code: "+232", flag: "🇸🇱", iso: "SL" },
  { name: "Burundi", code: "+257", flag: "🇧🇮", iso: "BI" },
  { name: "South Sudan", code: "+211", flag: "🇸🇸", iso: "SS" },
  { name: "Eritrea", code: "+291", flag: "🇪🇷", iso: "ER" },
  { name: "Djibouti", code: "+253", flag: "🇩🇯", iso: "DJ" },
  { name: "Gabon", code: "+241", flag: "🇬🇦", iso: "GA" },
  { name: "Congo", code: "+242", flag: "🇨🇬", iso: "CG" },
  { name: "Chad", code: "+235", flag: "🇹🇩", iso: "TD" },
  { name: "Mali", code: "+223", flag: "🇲🇱", iso: "ML" },
  { name: "Niger", code: "+227", flag: "🇳🇪", iso: "NE" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫", iso: "BF" },
  { name: "Benin", code: "+229", flag: "🇧🇯", iso: "BJ" },
  { name: "Togo", code: "+228", flag: "🇹🇬", iso: "TG" },
  { name: "Guinea", code: "+224", flag: "🇬🇳", iso: "GN" },
  { name: "Lesotho", code: "+266", flag: "🇱🇸", iso: "LS" },
  { name: "Eswatini", code: "+268", flag: "🇸🇿", iso: "SZ" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU" },
  { name: "Seychelles", code: "+248", flag: "🇸🇨", iso: "SC" },
  { name: "Madagascar", code: "+261", flag: "🇲🇬", iso: "MG" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.includes(search)
  );

  const closeDropdown = () => { setOpen(false); setSearch(""); };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffc2e0 0%, #ff9ecb 50%, #ff85be 100%)" }}
    >
      {open && (
        <div className="fixed inset-0 z-20 bg-black/20" onClick={closeDropdown} />
      )}

      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 80px 80px",
        }}
      />

      <div className="w-full max-w-[380px] relative z-30">
        <div className="text-center mb-4">
          <div className="flex justify-center">
            <img src="/paid.png" alt="logo" className="w-28 h-28 object-contain drop-shadow-lg" />
          </div>
          <h2 className="text-[38px] font-bold text-white tracking-widest mt-1">SIGN UP</h2>
        </div>

        <div className="bg-[#fff0f6]/90 backdrop-blur-md rounded-[24px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white">
          <div className="space-y-3">
            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2">
              <label className="text-[13px] font-semibold text-black block leading-none">Username</label>
              <input placeholder="Enter your username" className="w-full text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
            </div>

            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2 relative">
              <label className="text-[13px] font-semibold text-black block leading-none">Phone</label>
              <div className="flex items-center gap-2 mt-1">
                <button type="button" onClick={() => open ? closeDropdown() : setOpen(true)} className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1 text-[13px] border text-black">
                  <span>{selected.flag}</span>
                  <span>{selected.code}</span>
                  <span className="text-[10px]">{open ? "▲" : "▼"}</span>
                </button>
                <input placeholder="(000) 000-0000" className="flex-1 text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
              </div>

              {open && (
                <div className="absolute left-0 right-0 top-[65px] bg-white border rounded-lg shadow-lg max-h-[200px] overflow-hidden z-50">
                  <div className="flex items-center border-b">
                    <input autoFocus placeholder="Search country" value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 px-3 py-2 text-[12px] outline-none text-black placeholder:text-gray-400" />
                    <button type="button" onClick={closeDropdown} className="px-3 py-2 text-black font-bold text-[16px]">✕</button>
                  </div>
                  <div className="overflow-y-auto max-h-[160px]">
                    {filtered.map((c) => (
                      <button key={c.iso+c.code} onClick={() => { setSelected(c); closeDropdown(); }} className="w-full text-left px-3 py-2 hover:bg-pink-50 flex items-center gap-2 text-[13px] text-black">
                        <span>{c.flag}</span><span className="flex-1">{c.name}</span><span className="text-gray-500">{c.code}</span>
                      </button>
                    ))}
                    {filtered.length === 0 && <p className="px-3 py-2 text-[13px] text-black">No country found</p>}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2">
              <label className="text-[13px] font-semibold text-black block leading-none">Email</label>
              <input placeholder="Enter your email" className="w-full text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
            </div>

            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2 flex items-center justify-between">
              <div className="flex-1">
                <label className="text-[13px] font-semibold text-black block leading-none">Password</label>
                <input type={showPass ? "text" : "password"} placeholder="Create password" className="w-full text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
              </div>
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-[18px] ml-2">{showPass ? "👁️‍🗨️" : "👁️"}</button>
            </div>

            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2 flex items-center justify-between">
              <div className="flex-1">
                <label className="text-[13px] font-semibold text-black block leading-none">Confirm password</label>
                <input type={showConfirm ? "text" : "password"} placeholder="Re-enter password" className="w-full text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
              </div>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[18px] ml-2">{showConfirm ? "👁️‍🗨️" : "👁️"}</button>
            </div>

            <div className="bg-white rounded-[10px] border border-[#e8c2d1] px-3 py-2 flex items-center justify-between">
              <div className="flex-1">
                <label className="text-[13px] font-semibold text-black block leading-none">Transaction password</label>
                <input type={showTrans ? "text" : "password"} placeholder="Create transaction password" className="w-full text-[13px] outline-none bg-transparent text-black placeholder:text-gray-400" />
              </div>
              <button type="button" onClick={() => setShowTrans(!showTrans)} className="text-[18px] ml-2">{showTrans ? "👁️‍🗨️" : "👁️"}</button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-[13px] font-semibold text-black">Gender</span>
              <select className="flex-1 bg-white border border-[#e8c2d1] rounded-[8px] px-3 py-2 text-[13px] outline-none text-black">
                <option>Select gender</option><option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-[12px] text-black">I accept the Terms and Conditions</span>
            </div>

            <button onClick={() => router.push('/login')} className="w-full mt-2 bg-[#6a11cb] text-white font-bold text-[26px] py-3 rounded-[14px] shadow-[inset_0_-3px_0_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.2)]">
              Submit
            </button>

            <p className="text-center text-[13px] text-black pt-3">
              Don&apos;t have an account? <Link href="/login" className="text-[#5b2cff] font-bold underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}