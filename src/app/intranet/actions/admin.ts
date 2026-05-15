"use server";

import { createSupabaseServer } from "../../../../lib/supabaseServer";
import { revalidatePath } from "next/cache";

// ─── Subjects ────────────────────────────────────────────────────────────────

export async function createSubject(formData: FormData) {
  const supabase = await createSupabaseServer();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;
  if (!name) return { error: "Numele este obligatoriu." };
  const { error } = await supabase.from("subjects").insert({ name, description });
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/subjects");
}

export async function deleteSubject(id: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/subjects");
}

export async function updateSubject(formData: FormData) {
  const supabase = await createSupabaseServer();
  const id = Number(formData.get("id"));
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;
  if (!name) return { error: "Numele este obligatoriu." };
  const { error } = await supabase.from("subjects").update({ name, description }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/subjects");
}

// ─── Classes ─────────────────────────────────────────────────────────────────

export async function createClass(formData: FormData) {
  const supabase = await createSupabaseServer();
  const name = (formData.get("name") as string).trim();
  if (!name) return { error: "Numele este obligatoriu." };
  const { error } = await supabase.from("classes").insert({ name });
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/classes");
}

export async function deleteClass(id: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("classes").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/classes");
}

// ─── Assignments (teacher_subject_class) ─────────────────────────────────────

export async function createAssignment(formData: FormData) {
  const supabase = await createSupabaseServer();
  const teacher_id = formData.get("teacher_id") as string;
  const subject_id = Number(formData.get("subject_id"));
  const class_id = Number(formData.get("class_id"));
  if (!teacher_id || !subject_id || !class_id)
    return { error: "Toate câmpurile sunt obligatorii." };
  const { error } = await supabase
    .from("teacher_subject_class")
    .insert({ teacher_id, subject_id, class_id });
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/assignments");
}

export async function deleteAssignment(id: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("teacher_subject_class").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/assignments");
}

// ─── Grades (admin delete) ────────────────────────────────────────────────────

export async function deleteGradeAdmin(id: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("grades").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/grades");
}

// ─── Attendances (admin delete) ───────────────────────────────────────────────

export async function deleteAttendanceAdmin(id: number) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("attendances").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/intranet/admin/attendances");
}
