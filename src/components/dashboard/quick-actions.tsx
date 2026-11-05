"use client";

import React from "react";
import {
  UserPlus,
  Users,
  Truck,
  PackagePlus,
  Receipt,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { ModalType } from "@/components/forms/register-modal";
import { useBusinessStore } from "@/stores/use-business-store";

interface QuickActionsProps {
  onOpenModal: (type: ModalType) => void;
}

export function QuickActions({ onOpenModal }: QuickActionsProps) {
  const { personal, clientes, proveedores, productos, deudores, comprasProximas } =
    useBusinessStore();

  const totalDeudaPendiente = deudores.reduce((sum, d) => sum + d.saldoPendiente, 0);
  const productosBajoStock = productos.filter((p) => p.stockActual <= p.stockMinimo).length;
  const comprasPendientes = comprasProximas.filter((c) => !c.comprado).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* 1. Botón Personal */}
      <button
        onClick={() => onOpenModal("personal")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 group-hover:scale-110 transition-transform">
            <UserPlus className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {personal.length}
          </span>
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Personal</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Registrar empleado</span>
      </button>

      {/* 2. Botón Clientes */}
      <button
        onClick={() => onOpenModal("cliente")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {clientes.length}
          </span>
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Clientes</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Registrar cliente</span>
      </button>

      {/* 3. Botón Proveedores */}
      <button
        onClick={() => onOpenModal("proveedor")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900 group-hover:scale-110 transition-transform">
            <Truck className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {proveedores.length}
          </span>
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Proveedores</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Registrar proveedor</span>
      </button>

      {/* 4. Botón Productos */}
      <button
        onClick={() => onOpenModal("producto")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 group-hover:scale-110 transition-transform">
            <PackagePlus className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {productos.length}
          </span>
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Productos</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Víveres, ferretería…</span>
      </button>

      {/* 5. Botón Deudores */}
      <button
        onClick={() => onOpenModal("deudor")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900 group-hover:scale-110 transition-transform">
            <Receipt className="h-5 w-5" />
          </div>
          <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
            ${totalDeudaPendiente.toFixed(0)}
          </span>
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Deudores</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fiar / Cuentas</span>
      </button>

      {/* 6. Botón Compras Próximas */}
      <button
        onClick={() => onOpenModal("compra")}
        className="group flex flex-col items-start p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-500 hover:shadow-lg transition-all text-left shadow-sm cursor-pointer"
      >
        <div className="flex w-full items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900 group-hover:scale-110 transition-transform">
            <ShoppingCart className="h-5 w-5" />
          </div>
          {productosBajoStock > 0 ? (
            <span className="flex items-center gap-1 text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              {comprasPendientes}
            </span>
          ) : (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {comprasPendientes}
            </span>
          )}
        </div>
        <span className="font-bold text-sm text-slate-900 dark:text-white">Compras</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reponer stock</span>
      </button>
    </div>
  );
}
