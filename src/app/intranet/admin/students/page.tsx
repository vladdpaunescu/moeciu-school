import { createSupabaseServer } from "../../../../../lib/supabaseServer";

export default async function StudentsPage() {
  const supabase = await createSupabaseServer();

  const { data: students } = await supabase
    .from("students")
    .select("id, class_id, profiles(full_name), classes(name)");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Elevi</h1>
      <p className="text-sm text-gray-500 mb-6">
        Creează un utilizator în <strong>Supabase Auth</strong>, setează rolul la{" "}
        <code className="bg-gray-100 px-1 rounded">student</code> în tabela{" "}
        <code className="bg-gray-100 px-1 rounded">profiles</code>, apoi inserează ID-ul și{" "}
        <code className="bg-gray-100 px-1 rounded">class_id</code> în tabela{" "}
        <code className="bg-gray-100 px-1 rounded">students</code>.
      </p>

      <div className="space-y-2">
        {(students ?? []).map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">
                {(s.profiles as unknown as { full_name: string } | null)?.full_name ?? "—"}
              </p>
              <p className="text-xs text-gray-400 font-mono">{s.id}</p>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Clasa {(s.classes as unknown as { name: string } | null)?.name ?? "—"}
            </span>
          </div>
        ))}
        {(!students || students.length === 0) && (
          <p className="text-gray-400 text-sm">Nu există elevi înregistrați.</p>
        )}
      </div>
    </div>
  );
}
