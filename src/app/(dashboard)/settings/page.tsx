import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Configuración</h1>
      <p className="text-muted-foreground">
        Gestiona tus preferencias y configuración de la cuenta.
      </p>
    </div>
  );
}

