"use server";

import { createSupabaseServer } from "../../../../lib/supabaseServer";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "Email sau parolă incorecte." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role;
  if (role === "admin") redirect("/intranet/admin");
  if (role === "teacher") redirect("/intranet/teacher");
  redirect("/intranet/student");
}

export async function logoutAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/intranet/login");
}
