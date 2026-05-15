import { createSupabaseServer } from "../../../../../lib/supabaseServer";

export default async function TeachersPage() {
  const supabase = await createSupabaseServer();

  const { data: teachers } = await supabase
    .from("teachers")
    .select("id, profiles(full_name)");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Profesori</h1>
      <p className="text-sm text-gray-500 mb-6">
        Creează un utilizator în <strong>Supabase Auth</strong>, setează rolul la{" "}
        <code className="bg-gray-100 px-1 rounded">teacher</code> în tabela{" "}
        <code className="bg-gray-100 px-1 rounded">profiles</code>, apoi inserează ID-ul în tabela{" "}
        <code className="bg-gray-100 px-1 rounded">teachers</code>.
      </p>

      <div className="space-y-2">
        {(teachers ?? []).map((t) => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <p className="font-medium text-gray-800">
              {(t.profiles as unknown as { full_name: string } | null)?.full_name ?? "—"}
            </p>
            <p className="text-xs text-gray-400 font-mono">{t.id}</p>
          </div>
        ))}
        {(!teachers || teachers.length === 0) && (
          <p className="text-gray-400 text-sm">Nu există profesori înregistrați.</p>
        )}
      </div>
    </div>
  );
}
