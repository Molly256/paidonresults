"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();

  const items = [
    { label: "Home", href: "/dashboard", img: "/nav/home.png" },
    { label: "Wallet", href: "/deposit", img: "/nav/profits.png" },
    { label: "Tasks", href: "/tasks", img: "/nav/boost.png" },
    { label: "VIP", href: "/viplevels", img: "/nav/vip.png" },
    { label: "Profile", href: "/profile", img: "/nav/profile.png" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[420px] bg-white border-t border-pink-200 flex justify-around py-1.5 rounded-t-[18px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {items.map((t) => {
          const active = path.startsWith(t.href);
          return (
            <Link key={t.label} href={t.href} className="flex flex-col items-center w-[64px] py-1">
              <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center overflow-hidden transition ${active ? "bg-[#5f1abc] ring-2 ring-[#d8b4fe] scale-105 shadow-lg" : "bg-[#f3e8ff] opacity-70"}`}>
                <img src={t.img} alt={t.label} className="w-[38px] h-[38px] object-cover rounded-full" />
              </div>
              <span className={`text-[11px] mt-0.5 ${active ? "text-[#5f1abc] font-black" : "text-gray-500 font-medium"}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}