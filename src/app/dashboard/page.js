
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}