"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card/90 p-8 text-card-foreground shadow-lg backdrop-blur">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Signed in
          </p>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        <div className="mt-6 space-y-2 text-sm">
          <p>Welcome, {user.name || "User"}!</p>
          <p>Email: {user.email}</p>
        </div>
        <button
          onClick={() => authClient.signOut()}
          className="mt-6 w-full rounded-md bg-foreground px-4 py-2 font-medium text-background transition hover:opacity-90"
        >
          Sign out
        </button>
      </section>
    </main>
  );
}
