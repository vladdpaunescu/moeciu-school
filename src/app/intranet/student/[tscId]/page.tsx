import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { notFound } from "next/navigation";

const STATUS_LABEL: Record<string, string> = {
  present: "Prezent",
  absent: "Absent",
  motivated: "Motivat",
};
const STATUS_COLOR: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  motivated: "bg-yellow-100 text-yellow-700",
};

export default async function StudentSubjectPage({
  params,
}: {
  params: Promise<{ tscId: string }>;
}) {
  const { tscId } = await params;
  const tscIdNum = Number(tscId);
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select("class_id")
    .eq("id", user!.id)
    .single();

  const { data: tsc } = await supabase
    .from("teacher_subject_class")
    .select("id, subjects(name), classes(name), profiles!teacher_subject_class_teacher_id_fkey(full_name)")
    .eq("id", tscIdNum)
    .eq("class_id", student?.class_id ?? 0)
    .single();

  if (!tsc) return notFound();

  const subjectName = (tsc.subjects as unknown as { name: string } | null)?.name ?? "—";
  const className = (tsc.classes as unknown as { name: string } | null)?.name ?? "—";
  const teacherName = (tsc.profiles as unknown as { full_name: string } | null)?.full_name ?? "—";

  const { data: grades } = await supabase
    .from("grades")
    .select("id, value, type, date")
    .eq("student_id", user!.id)
    .eq("teacher_subject_class_id", tscIdNum)
    .order("date", { ascending: false });

  const { data: attendances } = await supabase
    .from("attendances")
    .select("id, date, status")
    .eq("student_id", user!.id)
    .eq("teacher_subject_class_id", tscIdNum)
    .order("date", { ascending: false });

  const avg =
    grades && grades.length > 0
      ? (grades.reduce((s, g) => s + g.value, 0) / grades.length).toFixed(2)
      : null;

  const absentCount = attendances?.filter((a) => a.status === "absent").length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{subjectName}</h1>
      <p className="text-gray-500 mb-8">Clasa {className} · Prof. {teacherName}</p>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{avg ?? "—"}</p>
          <p className="text-sm text-gray-500 mt-1">Medie</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-gray-700">{grades?.length ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Note</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{absentCount}</p>
          <p className="text-sm text-gray-500 mt-1">Absențe</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Grades */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Note</h2>
          {!grades || grades.length === 0 ? (
            <p className="text-gray-400 text-sm">Nu ai note la această materie.</p>
          ) : (
            <div className="space-y-2">
              {grades.map((g) => (
                <div key={g.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-700">{g.value}</span>
                    <span className="ml-2 text-xs uppercase text-gray-500">{g.type}</span>
                  </div>
                  <span className="text-sm text-gray-400">{g.date}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Attendance */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Prezențe</h2>
          {!attendances || attendances.length === 0 ? (
            <p className="text-gray-400 text-sm">Nu există înregistrări de prezență.</p>
          ) : (
            <div className="space-y-2">
              {attendances.map((a) => (
                <div key={a.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{a.date}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[a.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {STATUS_LABEL[a.status] ?? a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
