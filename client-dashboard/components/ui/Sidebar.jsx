"use client";
import React from "react";
import { Home, Settings, User, BookOpenCheck, Warehouse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.png";
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
    <div className="h-screen w-64 xl:w-72 2xl:w-80 fixed bg-white shadow text-black p-7 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
        <h2 className="text-2xl 2xl:text-3xl font-semibold">Hostify</h2>
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
