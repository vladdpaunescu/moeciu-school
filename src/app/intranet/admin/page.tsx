import { createSupabaseServer } from "../../../../lib/supabaseServer";
import Link from "next/link";
import { Users, BookOpen, School, ClipboardList, Star, CalendarCheck } from "lucide-react";

const tiles = [
  { href: "/intranet/admin/subjects", label: "Materii", icon: BookOpen, color: "text-blue-500" },
  { href: "/intranet/admin/classes", label: "Clase", icon: School, color: "text-purple-500" },
  { href: "/intranet/admin/teachers", label: "Profesori", icon: Users, color: "text-indigo-500" },
  { href: "/intranet/admin/students", label: "Elevi", icon: Users, color: "text-green-500" },
  { href: "/intranet/admin/assignments", label: "Asignări", icon: ClipboardList, color: "text-orange-500" },
  { href: "/intranet/admin/grades", label: "Note", icon: Star, color: "text-yellow-500" },
  { href: "/intranet/admin/attendances", label: "Prezențe", icon: CalendarCheck, color: "text-red-500" },
];

export default async function AdminDashboard() {
  const supabase = await createSupabaseServer();

  const [
    { count: subjects },
    { count: classes },
    { count: teachers },
    { count: students },
  ] = await Promise.all([
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase.from("classes").select("*", { count: "exact", head: true }),
    supabase.from("teachers").select("*", { count: "exact", head: true }),
    supabase.from("students").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Materii", value: subjects ?? 0 },
    { label: "Clase", value: classes ?? 0 },
    { label: "Profesori", value: teachers ?? 0 },
    { label: "Elevi", value: students ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Panou Administrator</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-3"
          >
            <t.icon className={`w-8 h-8 ${t.color}`} />
            <span className="font-semibold text-gray-700">{t.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
