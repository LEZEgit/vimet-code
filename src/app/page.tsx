import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import util from "util";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  // If user is authenticated, redirect to dashboard
  await delay(3000);
  console.log(`Session details: ${util.inspect(session, { depth: null, colors: true })}`);
  if (session?.user) {
    redirect("/dashboard");
  }

  // If user is unauthenticated, redirect to login page
  redirect("/login");
}
