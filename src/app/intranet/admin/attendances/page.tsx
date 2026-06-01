import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { deleteAttendanceAdmin } from "../../actions/admin";
import AdminRow from "../components/AdminRow";

const STATUS_LABEL: Record<string, string> = {
  present: "Prezent",
  absent: "Absent",
  motivated: "Motivat",
};

export default async function AdminAttendancesPage() {
  const supabase = await createSupabaseServer();

  const { data: attendances } = await supabase
    .from("attendances")
    .select("id, date, status, students(profiles(full_name)), teacher_subject_class(subjects(name), classes(name))")
    .order("date", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Toate Prezențele</h1>

      <div className="space-y-2">
        {(attendances ?? []).map((a) => {
          const student = (a.students as unknown as { profiles: { full_name: string } | null } | null)
            ?.profiles?.full_name ?? "—";
          const subject = (a.teacher_subject_class as unknown as { subjects: { name: string } | null } | null)
            ?.subjects?.name ?? "—";
          const cls = (a.teacher_subject_class as unknown as { classes: { name: string } | null } | null)
            ?.classes?.name ?? "—";

          return (
            <AdminRow
              key={a.id}
              id={a.id}
              label={`${student} — ${subject} (Clasa ${cls})`}
              sublabel={`${STATUS_LABEL[a.status] ?? a.status} · ${a.date}`}
              deleteAction={deleteAttendanceAdmin}
            />
          );
        })}
        {(!attendances || attendances.length === 0) && (
          <p className="text-gray-400 text-sm">Nu există înregistrări de prezență.</p>
        )}
      </div>
    </div>
  );
}
