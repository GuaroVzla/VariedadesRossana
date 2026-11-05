import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios",
  description: "Consulta nuestros planes y precios.",
};

export default function PricingPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-bold">Precios</h1>
      <p className="text-lg text-muted-foreground">
        Próximamente: planes y precios para tu equipo.
      </p>
    </main>
  );
}

