"use client";

import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  Receipt,
  Users,
  Truck,
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Trash2,
  DollarSign,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Wrench,
  Sparkles,
  Layers,
} from "lucide-react";
import { useBusinessStore } from "@/stores/use-business-store";
import { QuickActions } from "./quick-actions";
import { RegisterModal, ModalType } from "@/components/forms/register-modal";
import { CategoriaProducto } from "@/types/business";

export function BusinessDashboard() {
  const {
    personal,
    deletePersonal,
    clientes,
    deleteCliente,
    proveedores,
    deleteProveedor,
    productos,
    updateProductoStock,
    deleteProducto,
    deudores,
    abonarDeudor,
    deleteDeudor,
    comprasProximas,
    toggleCompraProxima,
    deleteCompraProxima,
    sincronizarStockBajo,
  } = useBusinessStore();

  const [activeTab, setActiveTab] = useState<
    "productos" | "compras" | "deudores" | "personal" | "clientes" | "proveedores"
  >("productos");

  const [modalType, setModalType] = useState<ModalType>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas");
  const [abonoInput, setAbonoInput] = useState<{ [id: string]: string }>({});

  // Estadísticas globales
  const totalProductos = productos.length;
  const valorInventario = productos.reduce(
    (sum, p) => sum + p.precioVenta * p.stockActual,
    0,
  );
  const totalDeudaPendiente = deudores.reduce((sum, d) => sum + d.saldoPendiente, 0);
  const productosBajoStock = productos.filter((p) => p.stockActual <= p.stockMinimo).length;
  const comprasPendientes = comprasProximas.filter((c) => !c.comprado).length;

  // Filtrado de productos
  const productosFiltrados = productos.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoriaFiltro === "todas" || p.categoria === categoriaFiltro;
    return matchesSearch && matchesCat;
  });

  const getCategoriaBadge = (cat: CategoriaProducto) => {
    switch (cat) {
      case "viveres":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
            <ShoppingBag className="w-3.5 h-3.5" /> Víveres
          </span>
        );
      case "ferreteria":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-800">
            <Wrench className="w-3.5 h-3.5" /> Ferretería
          </span>
        );
      case "higiene":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800">
            <Sparkles className="w-3.5 h-3.5" /> Higiene
          </span>
        );
      case "extras":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
            <Layers className="w-3.5 h-3.5" /> Extras
          </span>
        );
    }
  };

  const handleAbonoSubmit = (deudorId: string) => {
    const monto = parseFloat(abonoInput[deudorId] || "0");
    if (monto > 0) {
      abonarDeudor(deudorId, monto);
      setAbonoInput({ ...abonoInput, [deudorId]: "" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Principal del Negocio (100% Sólido) */}
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-2.5 border border-blue-200 dark:border-blue-800">
              🏪 Sistema de Gestión de Comercio
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Control de Víveres, Ferretería & Servicios
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Registro rápido de inventario, fiados, compras de reposición y personal.
            </p>
          </div>
          <button
            onClick={() => sincronizarStockBajo()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Sincronizar Stock Bajo
          </button>
        </div>

        {/* Tarjetas de Métricas Rápidas (Fondos Sólidos con Contraste) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Inventario Total</span>
              <Package className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalProductos} <span className="text-sm font-semibold text-slate-500">ítems</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Valor est: <strong className="text-slate-700 dark:text-slate-200">${valorInventario.toFixed(2)}</strong>
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 p-4 shadow-xs">
            <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Total por Cobrar</span>
              <Receipt className="h-4 w-4 text-rose-600" />
            </div>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              ${totalDeudaPendiente.toFixed(2)}
            </div>
            <p className="text-xs text-rose-700/80 dark:text-rose-300/80 mt-1">
              {deudores.filter((d) => d.estado !== "pagado").length} cuentas con fiado
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/40 p-4 shadow-xs">
            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Alertas Stock Bajo</span>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {productosBajoStock}
            </div>
            <p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1">
              Por debajo del stock mínimo
            </p>
          </div>

          <div className="rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/70 dark:bg-purple-950/40 p-4 shadow-xs">
            <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Compras Próximas</span>
              <ShoppingCart className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {comprasPendientes} <span className="text-sm font-semibold text-purple-600/70">ítems</span>
            </div>
            <p className="text-xs text-purple-700/80 dark:text-purple-300/80 mt-1">
              Artículos por abastecer
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE BOTONES DE ACCIÓN RÁPIDA */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Botones de Registro Rápido
          </h2>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Haz clic en cualquier botón para registrar datos
          </span>
        </div>
        <QuickActions onOpenModal={(type) => setModalType(type)} />
      </div>

      {/* PESTAÑAS DE VISUALIZACIÓN & GESTIÓN */}
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50 dark:bg-slate-800/60 gap-2">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab("productos")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "productos"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Package className="h-4 w-4" />
              Productos ({productos.length})
            </button>

            <button
              onClick={() => setActiveTab("compras")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "compras"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Compras Próximas ({comprasPendientes})
            </button>

            <button
              onClick={() => setActiveTab("deudores")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "deudores"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Receipt className="h-4 w-4" />
              Deudores (${totalDeudaPendiente.toFixed(0)})
            </button>

            <button
              onClick={() => setActiveTab("personal")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "personal"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              Personal ({personal.length})
            </button>

            <button
              onClick={() => setActiveTab("clientes")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "clientes"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Users className="h-4 w-4" />
              Clientes ({clientes.length})
            </button>

            <button
              onClick={() => setActiveTab("proveedores")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "proveedores"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Truck className="h-4 w-4" />
              Proveedores ({proveedores.length})
            </button>
          </div>

          {/* Botón rápido del tab activo */}
          <button
            onClick={() => {
              if (activeTab === "productos") setModalType("producto");
              if (activeTab === "compras") setModalType("compra");
              if (activeTab === "deudores") setModalType("deudor");
              if (activeTab === "personal") setModalType("personal");
              if (activeTab === "clientes") setModalType("cliente");
              if (activeTab === "proveedores") setModalType("proveedor");
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-bold shadow hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Nuevo Registro
          </button>
        </div>

        {/* CONTENIDO DEL TAB ACTIVO */}
        <div className="p-5">
          {/* TAB 1: PRODUCTOS */}
          {activeTab === "productos" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar producto o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500 mr-1">Categoría:</span>
                  {(["todas", "viveres", "ferreteria", "higiene", "extras"] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoriaFiltro(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                          categoriaFiltro === cat
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3.5">Código</th>
                      <th className="p-3.5">Producto</th>
                      <th className="p-3.5">Categoría</th>
                      <th className="p-3.5">Costo / Venta</th>
                      <th className="p-3.5">Stock en Tienda</th>
                      <th className="p-3.5">Estado</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {productosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">
                          No se encontraron productos en esta categoría o búsqueda.
                        </td>
                      </tr>
                    ) : (
                      productosFiltrados.map((prod) => {
                        const esBajo = prod.stockActual <= prod.stockMinimo;
                        const esAgotado = prod.stockActual === 0;

                        return (
                          <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-3.5 font-mono text-xs font-bold text-slate-500">
                              {prod.codigo}
                            </td>
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                              {prod.nombre}
                            </td>
                            <td className="p-3.5">{getCategoriaBadge(prod.categoria)}</td>
                            <td className="p-3.5">
                              <span className="text-xs text-slate-500 block">
                                Costo: ${prod.precioCosto.toFixed(2)}
                              </span>
                              <div className="font-extrabold text-blue-600 dark:text-blue-400">
                                Venta: ${prod.precioVenta.toFixed(2)}
                              </div>
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateProductoStock(prod.id, prod.stockActual - 1)
                                  }
                                  className="h-7 w-7 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-extrabold min-w-8 text-center text-slate-900 dark:text-white">
                                  {prod.stockActual} {prod.unidad}
                                </span>
                                <button
                                  onClick={() =>
                                    updateProductoStock(prod.id, prod.stockActual + 1)
                                  }
                                  className="h-7 w-7 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-[11px] font-medium text-slate-500">
                                Mínimo: {prod.stockMinimo} {prod.unidad}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {esAgotado ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                                  Agotado
                                </span>
                              ) : esBajo ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                                  Bajo Stock
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                                  Disponible
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => deleteProducto(prod.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: COMPRAS PRÓXIMAS */}
          {activeTab === "compras" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Listado de Compras & Reposición
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Artículos faltantes o sugeridos para comprar con distribuidores.
                  </p>
                </div>
                <button
                  onClick={() => sincronizarStockBajo()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  Auto-Detectar Stock Bajo
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3.5">Estado</th>
                      <th className="p-3.5">Producto a Comprar</th>
                      <th className="p-3.5">Categoría</th>
                      <th className="p-3.5">Cantidad a Pedir</th>
                      <th className="p-3.5">Stock en Tienda</th>
                      <th className="p-3.5">Proveedor Sugerido</th>
                      <th className="p-3.5">Prioridad</th>
                      <th className="p-3.5 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {comprasProximas.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 dark:text-slate-400">
                          No hay compras pendientes. ¡El inventario está abastecido!
                        </td>
                      </tr>
                    ) : (
                      comprasProximas.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                            item.comprado ? "opacity-40 line-through bg-slate-50" : ""
                          }`}
                        >
                          <td className="p-3.5">
                            <button
                              onClick={() => toggleCompraProxima(item.id)}
                              className="text-blue-600 hover:scale-110 transition-transform cursor-pointer"
                            >
                              {item.comprado ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-400" />
                              )}
                            </button>
                          </td>
                          <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                            {item.productoNombre}
                          </td>
                          <td className="p-3.5">{getCategoriaBadge(item.categoria)}</td>
                          <td className="p-3.5 font-extrabold text-purple-600 dark:text-purple-400">
                            {item.cantidadRequerida} unidades
                          </td>
                          <td className="p-3.5 font-medium text-slate-500">
                            {item.stockActual} en existencia
                          </td>
                          <td className="p-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {item.proveedorSugerido || "Sin asignar"}
                          </td>
                          <td className="p-3.5">
                            {item.prioridad === "alta" ? (
                              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                                🔴 Alta
                              </span>
                            ) : item.prioridad === "media" ? (
                              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                                🟡 Media
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200">
                                🟢 Baja
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => deleteCompraProxima(item.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DEUDORES / FIADOS */}
          {activeTab === "deudores" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Control de Fiados y Cuentas por Cobrar
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Registro de compras fiadas a clientes, detalle de artículos y abonos de dinero.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Total por Cobrar
                  </span>
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                    ${totalDeudaPendiente.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deudores.map((deudor) => {
                  const porcentajePago =
                    deudor.montoTotal > 0
                      ? Math.min(100, (deudor.montoAbonado / deudor.montoTotal) * 100)
                      : 100;

                  return (
                    <div
                      key={deudor.id}
                      className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                              {deudor.clienteNombre}
                            </h4>
                            <span
                              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                                deudor.estado === "pagado"
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                                  : deudor.estado === "parcial"
                                  ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
                                  : "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300"
                              }`}
                            >
                              {deudor.estado.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-slate-500 mt-0.5 block">
                            Tel: {deudor.telefono || "Sin teléfono"} • Fecha: {deudor.fecha}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteDeudor(deudor.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Detalle fiado */}
                      <div className="text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          🛒 Artículos llevados fiados:
                        </span>
                        <p className="text-slate-600 dark:text-slate-400">{deudor.detalle || "Sin detalles"}</p>
                      </div>

                      {/* Montos y progreso */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                          <span className="text-slate-500">
                            Abonado: ${deudor.montoAbonado.toFixed(2)} / Total: ${deudor.montoTotal.toFixed(2)}
                          </span>
                          <span className="text-rose-600 dark:text-rose-400 font-black">
                            Resta: ${deudor.saldoPendiente.toFixed(2)}
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${porcentajePago}%` }}
                          />
                        </div>
                      </div>

                      {/* Formulario rápido de abono */}
                      {deudor.saldoPendiente > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                          <input
                            type="number"
                            step="0.01"
                            placeholder="Monto abono ($)"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={abonoInput[deudor.id] || ""}
                            onChange={(e) =>
                              setAbonoInput({ ...abonoInput, [deudor.id]: e.target.value })
                            }
                          />
                          <button
                            onClick={() => handleAbonoSubmit(deudor.id)}
                            className="rounded-xl bg-emerald-600 text-white px-3.5 py-1.5 text-xs font-bold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                          >
                            Registrar Abono
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PERSONAL */}
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Personal y Empleados del Negocio
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Registro de cajeros, encargados de inventario y atención al público.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3.5">Empleado</th>
                      <th className="p-3.5">Cédula / Documento</th>
                      <th className="p-3.5">Cargo</th>
                      <th className="p-3.5">Teléfono</th>
                      <th className="p-3.5">Salario</th>
                      <th className="p-3.5">Fecha Ingreso</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {personal.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{p.nombre}</td>
                        <td className="p-3.5 font-mono text-xs font-semibold text-slate-500">{p.cedula}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                            {p.cargo}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium">{p.telefono || "N/A"}</td>
                        <td className="p-3.5 font-black text-slate-900 dark:text-white">${p.salario.toFixed(2)}</td>
                        <td className="p-3.5 text-xs text-slate-500">{p.fechaIngreso}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deletePersonal(p.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CLIENTES */}
          {activeTab === "clientes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Directorio de Clientes
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Base de datos de compradores frecuentes y datos de contacto.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3.5">Nombre</th>
                      <th className="p-3.5">Documento</th>
                      <th className="p-3.5">Teléfono</th>
                      <th className="p-3.5">Dirección</th>
                      <th className="p-3.5">Deuda Activa</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {clientes.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{c.nombre}</td>
                        <td className="p-3.5 font-mono text-xs font-semibold text-slate-500">{c.documento || "N/A"}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium">{c.telefono || "N/A"}</td>
                        <td className="p-3.5 text-xs text-slate-500">
                          {c.direccion || "N/A"}
                        </td>
                        <td className="p-3.5">
                          {c.saldoDeuda > 0 ? (
                            <span className="font-black text-rose-600 dark:text-rose-400">
                              ${c.saldoDeuda.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-emerald-600 text-xs font-bold">Al día</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteCliente(c.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PROVEEDORES */}
          {activeTab === "proveedores" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Proveedores & Distribuidores
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Distribuidores por categorías (Víveres, Ferretería, Higiene, Extras).
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3.5">Empresa Proveedora</th>
                      <th className="p-3.5">Rubro / Categoría</th>
                      <th className="p-3.5">Contacto</th>
                      <th className="p-3.5">Teléfono</th>
                      <th className="p-3.5">Ubicación / Galpón</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {proveedores.map((pr) => (
                      <tr key={pr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{pr.nombreEmpresa}</td>
                        <td className="p-3.5">{getCategoriaBadge(pr.categoria)}</td>
                        <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">{pr.contacto || "N/A"}</td>
                        <td className="p-3.5 font-mono text-xs font-semibold text-slate-500">{pr.telefono || "N/A"}</td>
                        <td className="p-3.5 text-xs text-slate-500">
                          {pr.direccion || "N/A"}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteProveedor(pr.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL GLOBAL DE REGISTRO (100% Sólido y Amigable) */}
      <RegisterModal
        type={modalType}
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}
