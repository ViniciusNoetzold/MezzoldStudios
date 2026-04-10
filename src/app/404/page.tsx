import type { Metadata } from "next";
import { Component } from "@/components/ui/404-page-error";

export const metadata: Metadata = {
  title: "404 — Página não encontrada | Mezzold Studio",
  description: "A página que você procura ainda não existe.",
};

// Disable RSC prefetch caching so links to /404 don't produce rsc-prefetch errors
export const dynamic = "force-dynamic";

export default function NotFoundPage() {
  return <Component />;
}
