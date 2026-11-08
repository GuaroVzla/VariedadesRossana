import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Store } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold text-base leading-none block">
              {siteConfig.shortName}
            </span>
            <span className="text-[11px] text-muted-foreground font-medium block">
              Víveres • Ferretería • Higiene
            </span>
          </div>
        </Link>

        <nav className="flex items-center space-x-4 text-sm font-medium">
          {siteConfig.nav.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
