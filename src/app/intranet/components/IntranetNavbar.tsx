"use client";

import Link from "next/link";
import { LogOut, GraduationCap } from "lucide-react";
import { logoutAction } from "../actions/auth";

const roleLabel: Record<string, string> = {
  admin: "Administrator",
  teacher: "Profesor",
  student: "Elev",
};

const roleBg: Record<string, string> = {
  admin: "bg-amber-100 text-amber-600",
  teacher: "bg-forest-100 text-forest-700",
  student: "bg-parchment-100 text-forest-500",
};

export default function IntranetNavbar({
  fullName,
  role,
}: {
  fullName: string;
  role: string;
}) {
  return (
    <nav className="bg-parchment-50 border-b border-parchment-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <Link href="/intranet" className="flex items-center gap-2 font-bold text-forest-900 font-playfair">
        <GraduationCap className="w-6 h-6 text-forest-700" />
        <span>Platformă Școlară</span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-[#4a4540] hidden sm:block">{fullName}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleBg[role] ?? "bg-parchment-100 text-forest-700"}`}>
          {roleLabel[role] ?? role}
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-sm text-[#4a4540] hover:text-forest-700 hover:bg-parchment-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Ieși</span>
          </button>
        </form>
      </div>
    </nav>
  );
}
