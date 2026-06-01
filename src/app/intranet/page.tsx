// Middleware handles redirect to the role dashboard.
// This page is only reached if middleware fails — redirect to login.
import { redirect } from "next/navigation";
export default function IntranetRoot() {
  redirect("/intranet/login");
}
