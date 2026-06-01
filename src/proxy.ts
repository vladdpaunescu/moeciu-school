import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Allow login page through
  if (pathname === "/intranet/login") {
    if (user) {
      // Already logged in — redirect to role dashboard
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role;
      const dest =
        role === "admin"
          ? "/intranet/admin"
          : role === "teacher"
          ? "/intranet/teacher"
          : "/intranet/student";

      return NextResponse.redirect(new URL(dest, request.url));
    }
    return supabaseResponse;
  }

  // Protect all /intranet/* routes
  if (pathname.startsWith("/intranet")) {
    if (!user) {
      return NextResponse.redirect(new URL("/intranet/login", request.url));
    }

    // Redirect /intranet root to role dashboard
    if (pathname === "/intranet") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role;
      const dest =
        role === "admin"
          ? "/intranet/admin"
          : role === "teacher"
          ? "/intranet/teacher"
          : "/intranet/student";

      return NextResponse.redirect(new URL(dest, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/intranet/:path*"],
};
