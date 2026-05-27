"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <div className="flex gap-4">
        <Button asChild size="lg" className="font-semibold text-xl">
          <Link href="/login" >
            Sign In/Sign Up
          </Link>
        </Button>
      </div>
    </main>
  );
}
