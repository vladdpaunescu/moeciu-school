import { createSupabaseServer } from "../../../lib/supabaseServer";
import IntranetNavbar from "./components/IntranetNavbar";

export const metadata = { title: "Platformă Școlară | Moieciu de Jos" };

export default async function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  let fullName = "";
  let role = "";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();
    fullName = profile?.full_name ?? "";
    role = profile?.role ?? "";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user && <IntranetNavbar fullName={fullName} role={role} />}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
