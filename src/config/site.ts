export const siteConfig = {
  name: "La Central — Víveres, Ferretería & Extras",
  shortName: "La Central",
  description:
    "Sistema de gestión para pequeños negocios de víveres, ferretería, higiene y extras. Control de personal, clientes, proveedores, inventario, deudores y lista de compras.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com",
  },
  nav: {
    main: [
      { label: "Panel Principal", href: "/" },
      { label: "Dashboard Avanzado", href: "/dashboard" },
    ],
    dashboard: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Configuración", href: "/settings" },
    ],
  },
} as const;
