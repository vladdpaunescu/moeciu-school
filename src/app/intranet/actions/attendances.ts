"use server";

import { createSupabaseServer } from "../../../../lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function upsertAttendance(formData: FormData) {
  const supabase = await createSupabaseServer();
  const student_id = formData.get("student_id") as string;
  const teacher_subject_class_id = Number(formData.get("teacher_subject_class_id"));
  const date = formData.get("date") as string;
  const status = formData.get("status") as string;

  if (!student_id || !teacher_subject_class_id || !date || !status)
    return { error: "Toate câmpurile sunt obligatorii." };

  const { error } = await supabase.from("attendances").upsert(
    { student_id, teacher_subject_class_id, date, status },
    { onConflict: "student_id,teacher_subject_class_id,date" }
  );
  if (error) return { error: error.message };
  revalidatePath(`/intranet/teacher/${teacher_subject_class_id}`);
}

export async function deleteAttendance(id: number, tscId: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("attendances").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/intranet/teacher/${tscId}`);
}
