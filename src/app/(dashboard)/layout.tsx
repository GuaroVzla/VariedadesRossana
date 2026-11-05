import Link from "next/link";
import { Store, LayoutDashboard, Settings, ArrowLeft } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r bg-muted/30 md:block">
        <div className="flex h-16 items-center border-b px-6 gap-2">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-base font-bold">La Central</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-accent text-accent-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Panel General
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
          <div className="pt-4 mt-4 border-t">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver a Vista Tienda
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-6 max-w-7xl">{children}</main>
    </div>
  );
}
