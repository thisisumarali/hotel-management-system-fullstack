"use client";
import React from "react";
import { Home, Settings, User, BookOpenCheck, Warehouse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/bookings", label: "Bookings", icon: <BookOpenCheck size={18} /> },
    { href: "/cabins", label: "Cabins", icon: <Warehouse size={18} /> },
    { href: "/users", label: "Users", icon: <User size={18} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="h-screen w-64 fixed bg-white shadow text-black p-7 flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      <nav className="flex flex-col gap-4 text-base">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link key={link.href} href={link.href}>
              <button
                className={`flex items-center gap-4 py-2 px-4  rounded-xl transition 
                  ${active ? "bg-black text-white" : "hover:bg-gray-200"}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
