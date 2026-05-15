"use server";

import { createSupabaseServer } from "../../../../lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function addGrade(formData: FormData) {
  const supabase = await createSupabaseServer();
  const student_id = formData.get("student_id") as string;
  const teacher_subject_class_id = Number(formData.get("teacher_subject_class_id"));
  const value = Number(formData.get("value"));
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;

  if (!student_id || !teacher_subject_class_id || !value || !type || !date)
    return { error: "Toate câmpurile sunt obligatorii." };
  if (value < 1 || value > 10)
    return { error: "Nota trebuie să fie între 1 și 10." };

  const { error } = await supabase
    .from("grades")
    .insert({ student_id, teacher_subject_class_id, value, type, date });
  if (error) return { error: error.message };
  revalidatePath(`/intranet/teacher/${teacher_subject_class_id}`);
}

export async function updateGrade(formData: FormData) {
  const supabase = await createSupabaseServer();
  const id = Number(formData.get("id"));
  const value = Number(formData.get("value"));
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;
  const tscId = formData.get("teacher_subject_class_id");

  if (value < 1 || value > 10)
    return { error: "Nota trebuie să fie între 1 și 10." };

  const { error } = await supabase
    .from("grades")
    .update({ value, type, date })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/intranet/teacher/${tscId}`);
}

export async function deleteGrade(id: number, tscId: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("grades").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/intranet/teacher/${tscId}`);
}
