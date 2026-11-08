import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de",
  description: "Conoce más sobre nuestra aplicación.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">Acerca de</h1>
      <p className="text-lg text-muted-foreground">
        Esta aplicación está construida con el stack moderno de React, TypeScript y Next.js,
        siguiendo las mejores prácticas de arquitectura y desarrollo web.
      </p>
    </main>
  );
}

