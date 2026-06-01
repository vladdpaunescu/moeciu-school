import { createSupabaseServer } from "../../../../lib/supabaseServer";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default async function StudentDashboard() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select("class_id")
    .eq("id", user!.id)
    .single();

  const { data: assignments } = student?.class_id
    ? await supabase
        .from("teacher_subject_class")
        .select("id, subjects(name), profiles!teacher_subject_class_teacher_id_fkey(full_name)")
        .eq("class_id", student.class_id)
    : { data: [] };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Materiile mele</h1>

      {!assignments || assignments.length === 0 ? (
        <p className="text-gray-500">Nu ești înscris la nicio materie momentan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((a) => (
            <Link
              key={a.id}
              href={`/intranet/student/${a.id}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <BookOpen className="w-8 h-8 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">
                  {(a.subjects as unknown as { name: string } | null)?.name ?? "—"}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Prof. {(a.profiles as unknown as { full_name: string } | null)?.full_name ?? "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
