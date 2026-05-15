import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { deleteGradeAdmin } from "../../actions/admin";
import AdminRow from "../components/AdminRow";

export default async function AdminGradesPage() {
  const supabase = await createSupabaseServer();

  const { data: grades } = await supabase
    .from("grades")
    .select("id, value, type, date, students(profiles(full_name)), teacher_subject_class(subjects(name), classes(name))")
    .order("date", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Toate Notele</h1>

      <div className="space-y-2">
        {(grades ?? []).map((g) => {
          const student = (g.students as unknown as { profiles: { full_name: string } | null } | null)
            ?.profiles?.full_name ?? "—";
          const subject = (g.teacher_subject_class as unknown as { subjects: { name: string } | null } | null)
            ?.subjects?.name ?? "—";
          const cls = (g.teacher_subject_class as unknown as { classes: { name: string } | null } | null)
            ?.classes?.name ?? "—";

          return (
            <AdminRow
              key={g.id}
              id={g.id}
              label={`${student} — ${subject} (Clasa ${cls})`}
              sublabel={`${g.value} · ${g.type} · ${g.date}`}
              deleteAction={deleteGradeAdmin}
            />
          );
        })}
        {(!grades || grades.length === 0) && (
          <p className="text-gray-400 text-sm">Nu există note.</p>
        )}
      </div>
    </div>
  );
}
