"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffc2e0 0%, #ff9ecb 50%, #ff85be 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 80px 80px",
        }}
      />

      <div className="w-full max-w-[360px] relative z-10">
        {/* Logo */}
        <div className="text-center mb-5">
          <div className="flex justify-center">
            <img src="/paid.png" alt="logo" className="w-16 h-16 object-contain drop-shadow-xl" 
              onError={(e)=> e.target.style.display='none'} />
          </div>
          {/* If your /paid.png is missing, this text fallback shows like image */}
          <div className="flex justify-center -mt-2">
            <span className="text-4xl">💎</span>
          </div>
          <h1 className="font-black leading-none tracking-wide mt-1">
            <span className="block text-[36px] text-[#7b2cff] drop-shadow-[0_3px_0_#fff]">PAID ON</span>
            <span className="block text-[44px] text-[#7b2cff] -mt-1 drop-shadow-[0_3px_0_#fff]">results</span>
          </h1>
          <h2 className="text-[46px] font-serif font-bold text-white tracking-wider mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            LOGIN
          </h2>
        </div>

        {/* Card - matches your screenshot */}
        <div className="bg-[#ffe9f1] rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white">
          <div className="space-y-5">
            {/* Username or Email */}
            <div>
              <label className="text-[15px] font-bold text-black block mb-2">Username or Email</label>
              <div className="bg-[#fff5f8] rounded-[12px] border border-[#f3cbd8] px-4 py-3">
                <input placeholder="Enter username or email" className="w-full text-[14px] outline-none bg-transparent placeholder:text-black/70" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[15px] font-bold text-black block mb-2">Password</label>
              <div className="bg-[#fff5f8] rounded-[12px] border border-[#f3cbd8] px-4 py-3 flex items-center justify-between">
                <input type={showPass ? "text" : "password"} placeholder="Enter your password" className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-black/70" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-[20px] ml-2">
                  {showPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-md border-2 border-black/30 bg-transparent" />
                <span className="text-[13px] text-black font-medium">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[13px] text-[#5b2cff] underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button onClick={() => router.push('/dashboard')} className="w-full mt-2 bg-[#6a11cb] hover:bg-[#5a0eb0] text-white font-bold text-[30px] py-3 rounded-full shadow-[0_6px_0_#4a0d8f,0_8px_20px_rgba(0,0,0,0.2)] border-2 border-[#a86bff]">
              Submit
            </button>

            <p className="text-center text-[14px] text-black pt-4">
              Don&apos;t have an account? <Link href="/register" className="text-[#6a11cb] font-bold">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}