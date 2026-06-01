import { createSupabaseServer } from "../../../../lib/supabaseServer";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default async function TeacherDashboard() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: assignments } = await supabase
    .from("teacher_subject_class")
    .select("id, subjects(name), classes(name)")
    .eq("teacher_id", user!.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Materiile mele</h1>

      {!assignments || assignments.length === 0 ? (
        <p className="text-gray-500">Nu ești asignat la nicio materie încă.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((a) => (
            <Link
              key={a.id}
              href={`/intranet/teacher/${a.id}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <BookOpen className="w-8 h-8 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">
                  {(a.subjects as unknown as { name: string } | null)?.name ?? "—"}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Clasa {(a.classes as unknown as { name: string } | null)?.name ?? "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
