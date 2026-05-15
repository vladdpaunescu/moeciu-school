import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { createAssignment, deleteAssignment } from "../../actions/admin";
import AdminCrudForm from "../components/AdminCrudForm";
import AdminRow from "../components/AdminRow";

type ProfileJoin = { full_name: string };
type NameJoin = { name: string };

export default async function AssignmentsPage() {
  const supabase = await createSupabaseServer();

  const [{ data: assignments }, { data: teachers }, { data: subjects }, { data: classes }] =
    await Promise.all([
      supabase
        .from("teacher_subject_class")
        .select("id, profiles!teacher_subject_class_teacher_id_fkey(full_name), subjects(name), classes(name)"),
      supabase.from("teachers").select("id, profiles(full_name)"),
      supabase.from("subjects").select("id, name").order("name"),
      supabase.from("classes").select("id, name").order("name"),
    ]);

  const teacherOptions = (teachers ?? []).map((t) => ({
    value: t.id as string,
    label: (t.profiles as unknown as ProfileJoin | null)?.full_name ?? (t.id as string),
  }));
  const subjectOptions = (subjects ?? []).map((s) => ({
    value: String(s.id),
    label: s.name,
  }));
  const classOptions = (classes ?? []).map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{"Asignări Profesor → Materie → Clasă"}</h1>

      <AdminCrudForm
        title="Adaugă asignare"
        action={createAssignment}
        fields={[
          { name: "teacher_id", label: "Profesor", required: true, options: teacherOptions },
          { name: "subject_id", label: "Materie", required: true, options: subjectOptions },
          { name: "class_id", label: "Clasă", required: true, options: classOptions },
        ]}
      />

      <div className="mt-8 space-y-2">
        {(assignments ?? []).map((a) => {
          const teacher = (a.profiles as unknown as ProfileJoin | null)?.full_name ?? "—";
          const subject = (a.subjects as unknown as NameJoin | null)?.name ?? "—";
          const cls = (a.classes as unknown as NameJoin | null)?.name ?? "—";
          return (
            <AdminRow
              key={a.id}
              id={a.id}
              label={`${teacher} · ${subject}`}
              sublabel={`Clasa ${cls}`}
              deleteAction={deleteAssignment}
            />
          );
        })}
      </div>
    </div>
  );
}
