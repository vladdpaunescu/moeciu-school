import { createSupabaseServer } from "../../../../../lib/supabaseServer";
import { notFound } from "next/navigation";
import GradeFormSection from "./GradeFormSection";
import AttendanceFormSection from "./AttendanceFormSection";

export default async function TeacherSubjectPage({
  params,
}: {
  params: Promise<{ tscId: string }>;
}) {
  const { tscId } = await params;
  const tscIdNum = Number(tscId);
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // Verify this assignment belongs to the current teacher
  const { data: tsc } = await supabase
    .from("teacher_subject_class")
    .select("id, subjects(name), classes(id, name)")
    .eq("id", tscIdNum)
    .eq("teacher_id", user!.id)
    .single();

  if (!tsc) return notFound();

  const subjectName = (tsc.subjects as unknown as { name: string } | null)?.name ?? "—";
  const classInfo = tsc.classes as unknown as { id: number; name: string } | null;

  // Get all students in this class
  const { data: students } = await supabase
    .from("students")
    .select("id, class_id, profiles(full_name)")
    .eq("class_id", classInfo?.id ?? 0);

  // Get grades for this assignment
  const { data: grades } = await supabase
    .from("grades")
    .select("id, student_id, value, type, date")
    .eq("teacher_subject_class_id", tscIdNum)
    .order("date", { ascending: false });

  // Get attendances for this assignment
  const { data: attendances } = await supabase
    .from("attendances")
    .select("id, student_id, date, status")
    .eq("teacher_subject_class_id", tscIdNum)
    .order("date", { ascending: false });

  const studentList = (students ?? []).map((s) => ({
    id: s.id as string,
    name: (s.profiles as unknown as { full_name: string } | null)?.full_name ?? "—",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{subjectName}</h1>
      <p className="text-gray-500 mb-8">Clasa {classInfo?.name ?? "—"}</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GradeFormSection
          tscId={tscIdNum}
          students={studentList}
          grades={grades ?? []}
        />
        <AttendanceFormSection
          tscId={tscIdNum}
          students={studentList}
          attendances={attendances ?? []}
        />
      </div>
    </div>
  );
}
