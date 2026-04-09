import type { Metadata } from "next";
import { Component } from "@/components/ui/404-page-error";

export const metadata: Metadata = {
  title: "404 — Página não encontrada | Mezzold Studio",
  description: "A página que você procura não existe.",
};

export default function NotFound() {
  return <Component />;
}
