"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Personal,
  Cliente,
  Proveedor,
  Producto,
  Deudor,
  ItemCompraProxima,
} from "@/types/business";

interface BusinessState {
  // Datos
  personal: Personal[];
  clientes: Cliente[];
  proveedores: Proveedor[];
  productos: Producto[];
  deudores: Deudor[];
  comprasProximas: ItemCompraProxima[];

  // Acciones Personal
  addPersonal: (item: Omit<Personal, "id">) => void;
  deletePersonal: (id: string) => void;

  // Acciones Clientes
  addCliente: (item: Omit<Cliente, "id">) => void;
  deleteCliente: (id: string) => void;

  // Acciones Proveedores
  addProveedor: (item: Omit<Proveedor, "id">) => void;
  deleteProveedor: (id: string) => void;

  // Acciones Productos
  addProducto: (item: Omit<Producto, "id">) => void;
  updateProductoStock: (id: string, nuevoStock: number) => void;
  deleteProducto: (id: string) => void;

  // Acciones Deudores
  addDeudor: (item: Omit<Deudor, "id" | "saldoPendiente" | "estado">) => void;
  abonarDeudor: (id: string, abono: number) => void;
  deleteDeudor: (id: string) => void;

  // Acciones Compras Próximas
  addCompraProxima: (item: Omit<ItemCompraProxima, "id" | "comprado">) => void;
  toggleCompraProxima: (id: string) => void;
  deleteCompraProxima: (id: string) => void;
  sincronizarStockBajo: () => void;
}

const INITIAL_PERSONAL: Personal[] = [
  {
    id: "p-1",
    nombre: "Carlos Gómez",
    cedula: "V-18.452.120",
    cargo: "Cajero / Atención",
    telefono: "0414-1234567",
    salario: 180,
    fechaIngreso: "2024-01-15",
  },
  {
    id: "p-2",
    nombre: "María Rodríguez",
    cedula: "V-20.334.891",
    cargo: "Encargada de Inventario",
    telefono: "0424-7654321",
    salario: 220,
    fechaIngreso: "2023-08-10",
  },
];

const INITIAL_CLIENTES: Cliente[] = [
  {
    id: "c-1",
    nombre: "Juan Pérez",
    documento: "V-14.882.311",
    telefono: "0412-9876543",
    direccion: "Calle Principal #12",
    saldoDeuda: 15.5,
  },
  {
    id: "c-2",
    nombre: "Elena Mendoza",
    documento: "V-16.741.002",
    telefono: "0416-5554321",
    direccion: "Av. Miranda Local 4",
    saldoDeuda: 0,
  },
];

const INITIAL_PROVEEDORES: Proveedor[] = [
  {
    id: "pr-1",
    nombreEmpresa: "Distribuidora Los Andes C.A.",
    contacto: "Roberto Sánchez",
    telefono: "0414-9988776",
    categoria: "viveres",
    direccion: "Zona Industrial Galpón 5",
  },
  {
    id: "pr-2",
    nombreEmpresa: "FerreMayorista Nacional",
    contacto: "Andrés Silva",
    telefono: "0424-3322110",
    categoria: "ferreteria",
    direccion: "Av. Intercomunal km 3",
  },
  {
    id: "pr-3",
    nombreEmpresa: "Químicos & Limpieza Express",
    contacto: "Patricia Gil",
    telefono: "0412-4455667",
    categoria: "higiene",
    direccion: "Calle Comercio Edif. Centro",
  },
];

const INITIAL_PRODUCTOS: Producto[] = [
  {
    id: "prod-1",
    codigo: "VIV-001",
    nombre: "Harina de Maíz Precocida 1kg",
    categoria: "viveres",
    precioCosto: 0.95,
    precioVenta: 1.35,
    stockActual: 4,
    stockMinimo: 15,
    unidad: "paq",
  },
  {
    id: "prod-2",
    codigo: "VIV-002",
    nombre: "Arroz Blanco Grano Entero 1kg",
    categoria: "viveres",
    precioCosto: 0.85,
    precioVenta: 1.2,
    stockActual: 22,
    stockMinimo: 10,
    unidad: "paq",
  },
  {
    id: "prod-3",
    codigo: "FER-001",
    nombre: "Bombillo LED 12W Luz Blanca",
    categoria: "ferreteria",
    precioCosto: 1.1,
    precioVenta: 2.0,
    stockActual: 2,
    stockMinimo: 8,
    unidad: "unid",
  },
  {
    id: "prod-4",
    codigo: "FER-002",
    nombre: "Teflón Industrial 3/4 pulgada",
    categoria: "ferreteria",
    precioCosto: 0.45,
    precioVenta: 1.0,
    stockActual: 18,
    stockMinimo: 10,
    unidad: "unid",
  },
  {
    id: "prod-5",
    codigo: "HIG-001",
    nombre: "Jabón de Baño Antibacterial 120g",
    categoria: "higiene",
    precioCosto: 0.7,
    precioVenta: 1.15,
    stockActual: 3,
    stockMinimo: 12,
    unidad: "unid",
  },
  {
    id: "prod-6",
    codigo: "EXT-001",
    nombre: "Pilas Alcalinas AA (Paq 2 unid)",
    categoria: "extras",
    precioCosto: 1.2,
    precioVenta: 2.2,
    stockActual: 5,
    stockMinimo: 10,
    unidad: "paq",
  },
];

const INITIAL_DEUDORES: Deudor[] = [
  {
    id: "d-1",
    clienteNombre: "Juan Pérez",
    telefono: "0412-9876543",
    montoTotal: 25.5,
    montoAbonado: 10.0,
    saldoPendiente: 15.5,
    fecha: "2026-11-01",
    detalle: "2 Harina Maíz, 1 Aceite, 1 Bombillo LED",
    estado: "parcial",
  },
  {
    id: "d-2",
    clienteNombre: "Pedro Ramírez",
    telefono: "0414-7778899",
    montoTotal: 8.0,
    montoAbonado: 0,
    saldoPendiente: 8.0,
    fecha: "2026-11-03",
    detalle: "1 Jabón Antibacterial, 1 Teflón",
    estado: "pendiente",
  },
];

const INITIAL_COMPRAS: ItemCompraProxima[] = [
  {
    id: "cp-1",
    productoNombre: "Harina de Maíz Precocida 1kg",
    categoria: "viveres",
    cantidadRequerida: 24,
    stockActual: 4,
    costoEstimado: 0.95,
    proveedorSugerido: "Distribuidora Los Andes C.A.",
    prioridad: "alta",
    comprado: false,
  },
  {
    id: "cp-2",
    productoNombre: "Bombillo LED 12W Luz Blanca",
    categoria: "ferreteria",
    cantidadRequerida: 15,
    stockActual: 2,
    costoEstimado: 1.1,
    proveedorSugerido: "FerreMayorista Nacional",
    prioridad: "alta",
    comprado: false,
  },
  {
    id: "cp-3",
    productoNombre: "Jabón de Baño Antibacterial 120g",
    categoria: "higiene",
    cantidadRequerida: 20,
    stockActual: 3,
    costoEstimado: 0.7,
    proveedorSugerido: "Químicos & Limpieza Express",
    prioridad: "alta",
    comprado: false,
  },
];

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      personal: INITIAL_PERSONAL,
      clientes: INITIAL_CLIENTES,
      proveedores: INITIAL_PROVEEDORES,
      productos: INITIAL_PRODUCTOS,
      deudores: INITIAL_DEUDORES,
      comprasProximas: INITIAL_COMPRAS,

      addPersonal: (item) =>
        set((state) => ({
          personal: [{ ...item, id: `p-${Date.now()}` }, ...state.personal],
        })),

      deletePersonal: (id) =>
        set((state) => ({
          personal: state.personal.filter((p) => p.id !== id),
        })),

      addCliente: (item) =>
        set((state) => ({
          clientes: [{ ...item, id: `c-${Date.now()}` }, ...state.clientes],
        })),

      deleteCliente: (id) =>
        set((state) => ({
          clientes: state.clientes.filter((c) => c.id !== id),
        })),

      addProveedor: (item) =>
        set((state) => ({
          proveedores: [{ ...item, id: `pr-${Date.now()}` }, ...state.proveedores],
        })),

      deleteProveedor: (id) =>
        set((state) => ({
          proveedores: state.proveedores.filter((pr) => pr.id !== id),
        })),

      addProducto: (item) => {
        const newProduct: Producto = { ...item, id: `prod-${Date.now()}` };
        set((state) => ({
          productos: [newProduct, ...state.productos],
        }));
        // Auto alertar si el stock inicial es menor que el mínimo
        if (newProduct.stockActual <= newProduct.stockMinimo) {
          get().sincronizarStockBajo();
        }
      },

      updateProductoStock: (id, nuevoStock) => {
        set((state) => ({
          productos: state.productos.map((prod) =>
            prod.id === id ? { ...prod, stockActual: Math.max(0, nuevoStock) } : prod,
          ),
        }));
        get().sincronizarStockBajo();
      },

      deleteProducto: (id) =>
        set((state) => ({
          productos: state.productos.filter((prod) => prod.id !== id),
        })),

      addDeudor: (item) => {
        const saldoPendiente = Math.max(0, item.montoTotal - item.montoAbonado);
        const estado =
          saldoPendiente === 0
            ? "pagado"
            : item.montoAbonado > 0
            ? "parcial"
            : "pendiente";

        const nuevoDeudor: Deudor = {
          ...item,
          id: `d-${Date.now()}`,
          saldoPendiente,
          estado,
        };

        set((state) => ({
          deudores: [nuevoDeudor, ...state.deudores],
        }));
      },

      abonarDeudor: (id, abono) => {
        set((state) => ({
          deudores: state.deudores.map((deudor) => {
            if (deudor.id !== id) return deudor;
            const nuevoAbono = deudor.montoAbonado + abono;
            const saldo = Math.max(0, deudor.montoTotal - nuevoAbono);
            return {
              ...deudor,
              montoAbonado: nuevoAbono,
              saldoPendiente: saldo,
              estado: saldo === 0 ? "pagado" : "parcial",
            };
          }),
        }));
      },

      deleteDeudor: (id) =>
        set((state) => ({
          deudores: state.deudores.filter((d) => d.id !== id),
        })),

      addCompraProxima: (item) =>
        set((state) => ({
          comprasProximas: [
            { ...item, id: `cp-${Date.now()}`, comprado: false },
            ...state.comprasProximas,
          ],
        })),

      toggleCompraProxima: (id) =>
        set((state) => ({
          comprasProximas: state.comprasProximas.map((c) =>
            c.id === id ? { ...c, comprado: !c.comprado } : c,
          ),
        })),

      deleteCompraProxima: (id) =>
        set((state) => ({
          comprasProximas: state.comprasProximas.filter((c) => c.id !== id),
        })),

      sincronizarStockBajo: () => {
        const { productos, comprasProximas } = get();
        const productosBajoStock = productos.filter((p) => p.stockActual <= p.stockMinimo);

        const nuevasCompras = [...comprasProximas];

        productosBajoStock.forEach((prod) => {
          const yaExiste = nuevasCompras.some(
            (c) => c.productoNombre.toLowerCase() === prod.nombre.toLowerCase() && !c.comprado,
          );
          if (!yaExiste) {
            nuevasCompras.push({
              id: `cp-auto-${Date.now()}-${Math.random()}`,
              productoNombre: prod.nombre,
              categoria: prod.categoria,
              cantidadRequerida: Math.max(1, prod.stockMinimo * 2 - prod.stockActual),
              stockActual: prod.stockActual,
              costoEstimado: prod.precioCosto,
              prioridad: prod.stockActual === 0 ? "alta" : "media",
              comprado: false,
            });
          }
        });

        set({ comprasProximas: nuevasCompras });
      },
    }),
    {
      name: "negocio-store-data",
    },
  ),
);

