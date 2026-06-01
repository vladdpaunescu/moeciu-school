import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { createClass, deleteClass } from "../../actions/admin";
import AdminCrudForm from "../components/AdminCrudForm";
import AdminRow from "../components/AdminRow";

export default async function ClassesPage() {
  const supabase = await createSupabaseServer();
  const { data: classes } = await supabase
    .from("classes")
    .select("id, name")
    .order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Clase</h1>

      <AdminCrudForm
        title="Adaugă clasă"
        action={createClass}
        fields={[{ name: "name", label: "Denumire (ex: V A)", required: true }]}
      />

      <div className="mt-8 space-y-2">
        {(classes ?? []).map((c) => (
          <AdminRow
            key={c.id}
            id={c.id}
            label={c.name}
            deleteAction={deleteClass}
          />
        ))}
      </div>
    </div>
  );
}
