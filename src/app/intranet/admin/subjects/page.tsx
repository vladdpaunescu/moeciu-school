import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { createSubject, deleteSubject, updateSubject } from "../../actions/admin";
import AdminCrudForm from "../components/AdminCrudForm";
import AdminRow from "../components/AdminRow";

export default async function SubjectsPage() {
  const supabase = await createSupabaseServer();
  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, description")
    .order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Materii</h1>

      <AdminCrudForm
        title="Adaugă materie"
        action={createSubject}
        fields={[
          { name: "name", label: "Denumire", required: true },
          { name: "description", label: "Descriere" },
        ]}
      />

      <div className="mt-8 space-y-2">
        {(subjects ?? []).map((s) => (
          <AdminRow
            key={s.id}
            id={s.id}
            label={s.name}
            sublabel={s.description ?? undefined}
            deleteAction={deleteSubject}
            editAction={updateSubject}
            editFields={[
              { name: "name", label: "Denumire", defaultValue: s.name, required: true },
              { name: "description", label: "Descriere", defaultValue: s.description ?? "" },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
