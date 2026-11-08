"use client";

import React, { useState } from "react";
import {
  X,
  UserPlus,
  Users,
  Truck,
  PackagePlus,
  Receipt,
  ShoppingCart,
  Save,
  Info,
} from "lucide-react";
import { useBusinessStore } from "@/stores/use-business-store";
import { CategoriaProducto } from "@/types/business";

export type ModalType =
  | "personal"
  | "cliente"
  | "proveedor"
  | "producto"
  | "deudor"
  | "compra"
  | null;

interface RegisterModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ type, isOpen, onClose }: RegisterModalProps) {
  const {
    addPersonal,
    addCliente,
    addProveedor,
    addProducto,
    addDeudor,
    addCompraProxima,
    proveedores,
  } = useBusinessStore();

  // Estados locales para cada formulario
  const [personalForm, setPersonalForm] = useState({
    nombre: "",
    cedula: "",
    cargo: "Cajero / Atención",
    telefono: "",
    salario: "",
    fechaIngreso: new Date().toISOString().split("T")[0],
  });

  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    direccion: "",
    saldoDeuda: "0",
  });

  const [proveedorForm, setProveedorForm] = useState({
    nombreEmpresa: "",
    contacto: "",
    telefono: "",
    categoria: "viveres" as CategoriaProducto,
    direccion: "",
  });

  const [productoForm, setProductoForm] = useState({
    codigo: "",
    nombre: "",
    categoria: "viveres" as CategoriaProducto,
    precioCosto: "",
    precioVenta: "",
    stockActual: "",
    stockMinimo: "5",
    unidad: "unid",
  });

  const [deudorForm, setDeudorForm] = useState({
    clienteNombre: "",
    telefono: "",
    montoTotal: "",
    montoAbonado: "0",
    fecha: new Date().toISOString().split("T")[0],
    detalle: "",
  });

  const [compraForm, setCompraForm] = useState({
    productoNombre: "",
    categoria: "viveres" as CategoriaProducto,
    cantidadRequerida: "",
    stockActual: "0",
    costoEstimado: "",
    proveedorSugerido: "",
    prioridad: "alta" as "alta" | "media" | "baja",
  });

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "personal") {
      if (!personalForm.nombre || !personalForm.cedula) return;
      addPersonal({
        nombre: personalForm.nombre,
        cedula: personalForm.cedula,
        cargo: personalForm.cargo,
        telefono: personalForm.telefono,
        salario: parseFloat(personalForm.salario) || 0,
        fechaIngreso: personalForm.fechaIngreso,
      });
      setPersonalForm({
        nombre: "",
        cedula: "",
        cargo: "Cajero / Atención",
        telefono: "",
        salario: "",
        fechaIngreso: new Date().toISOString().split("T")[0],
      });
    }

    if (type === "cliente") {
      if (!clienteForm.nombre) return;
      addCliente({
        nombre: clienteForm.nombre,
        documento: clienteForm.documento,
        telefono: clienteForm.telefono,
        direccion: clienteForm.direccion,
        saldoDeuda: parseFloat(clienteForm.saldoDeuda) || 0,
      });
      setClienteForm({
        nombre: "",
        documento: "",
        telefono: "",
        direccion: "",
        saldoDeuda: "0",
      });
    }

    if (type === "proveedor") {
      if (!proveedorForm.nombreEmpresa) return;
      addProveedor({
        nombreEmpresa: proveedorForm.nombreEmpresa,
        contacto: proveedorForm.contacto,
        telefono: proveedorForm.telefono,
        categoria: proveedorForm.categoria,
        direccion: proveedorForm.direccion,
      });
      setProveedorForm({
        nombreEmpresa: "",
        contacto: "",
        telefono: "",
        categoria: "viveres",
        direccion: "",
      });
    }

    if (type === "producto") {
      if (!productoForm.nombre) return;
      addProducto({
        codigo: productoForm.codigo || `P-${Date.now().toString().slice(-4)}`,
        nombre: productoForm.nombre,
        categoria: productoForm.categoria,
        precioCosto: parseFloat(productoForm.precioCosto) || 0,
        precioVenta: parseFloat(productoForm.precioVenta) || 0,
        stockActual: parseInt(productoForm.stockActual) || 0,
        stockMinimo: parseInt(productoForm.stockMinimo) || 5,
        unidad: productoForm.unidad,
      });
      setProductoForm({
        codigo: "",
        nombre: "",
        categoria: "viveres",
        precioCosto: "",
        precioVenta: "",
        stockActual: "",
        stockMinimo: "5",
        unidad: "unid",
      });
    }

    if (type === "deudor") {
      if (!deudorForm.clienteNombre || !deudorForm.montoTotal) return;
      addDeudor({
        clienteNombre: deudorForm.clienteNombre,
        telefono: deudorForm.telefono,
        montoTotal: parseFloat(deudorForm.montoTotal) || 0,
        montoAbonado: parseFloat(deudorForm.montoAbonado) || 0,
        fecha: deudorForm.fecha,
        detalle: deudorForm.detalle,
      });
      setDeudorForm({
        clienteNombre: "",
        telefono: "",
        montoTotal: "",
        montoAbonado: "0",
        fecha: new Date().toISOString().split("T")[0],
        detalle: "",
      });
    }

    if (type === "compra") {
      if (!compraForm.productoNombre || !compraForm.cantidadRequerida) return;
      addCompraProxima({
        productoNombre: compraForm.productoNombre,
        categoria: compraForm.categoria,
        cantidadRequerida: parseInt(compraForm.cantidadRequerida) || 1,
        stockActual: parseInt(compraForm.stockActual) || 0,
        costoEstimado: parseFloat(compraForm.costoEstimado) || 0,
        proveedorSugerido: compraForm.proveedorSugerido || undefined,
        prioridad: compraForm.prioridad,
      });
      setCompraForm({
        productoNombre: "",
        categoria: "viveres",
        cantidadRequerida: "",
        stockActual: "0",
        costoEstimado: "",
        proveedorSugerido: "",
        prioridad: "alta",
      });
    }

    onClose();
  };

  const getHeaderInfo = () => {
    switch (type) {
      case "personal":
        return {
          title: "Registrar Empleado / Personal",
          description: "Registra cajeros, ayudantes o personal de atención del negocio.",
          icon: <UserPlus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
          headerBg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/70 dark:border-indigo-800",
          submitBtn: "bg-indigo-600 hover:bg-indigo-700 text-white",
        };
      case "cliente":
        return {
          title: "Registrar Nuevo Cliente",
          description: "Añade los datos de clientes frecuentes para contacto y facturación.",
          icon: <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
          headerBg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/70 dark:border-emerald-800",
          submitBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
        };
      case "proveedor":
        return {
          title: "Registrar Proveedor o Distribuidor",
          description: "Guarda proveedores de víveres, ferretería, limpieza y más.",
          icon: <Truck className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
          headerBg: "bg-amber-50 border-amber-200 dark:bg-amber-950/70 dark:border-amber-800",
          submitBtn: "bg-amber-600 hover:bg-amber-700 text-white",
        };
      case "producto":
        return {
          title: "Registrar Nuevo Producto",
          description: "Ingresa artículos a las categorías de Víveres, Ferretería, Higiene o Extras.",
          icon: <PackagePlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
          headerBg: "bg-blue-50 border-blue-200 dark:bg-blue-950/70 dark:border-blue-800",
          submitBtn: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      case "deudor":
        return {
          title: "Registrar Cuenta Fiada / Deudor",
          description: "Control de clientes con compras fiadas, artículos llevados y saldos.",
          icon: <Receipt className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
          headerBg: "bg-rose-50 border-rose-200 dark:bg-rose-950/70 dark:border-rose-800",
          submitBtn: "bg-rose-600 hover:bg-rose-700 text-white",
        };
      case "compra":
        return {
          title: "Agregar a Lista de Compras Próximas",
          description: "Programa productos que hacen falta comprar o abastecer con distribuidores.",
          icon: <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
          headerBg: "bg-purple-50 border-purple-200 dark:bg-purple-950/70 dark:border-purple-800",
          submitBtn: "bg-purple-600 hover:bg-purple-700 text-white",
        };
      default:
        return {
          title: "",
          description: "",
          icon: null,
          headerBg: "bg-slate-50 border-slate-200",
          submitBtn: "bg-blue-600 text-white",
        };
    }
  };

  const info = getHeaderInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-3 sm:p-4 backdrop-blur-sm transition-opacity">
      {/* Contenedor Modal 100% Sólido (NO Transparente) */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl text-slate-900 dark:text-slate-100 flex flex-col">
        {/* Cabecera Sólida y Amigable */}
        <div className={`p-5 border-b flex items-start justify-between ${info.headerBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700">
              {info.icon}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {info.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {info.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cuerpo del Formulario con Scroll Suave */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-4 bg-white dark:bg-slate-900">
          <form id="modal-form" onSubmit={handleSubmit} className="space-y-4">
            {/* PERSONAL */}
            {type === "personal" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    👤 Nombre Completo del Empleado *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carlos Gómez"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                    value={personalForm.nombre}
                    onChange={(e) => setPersonalForm({ ...personalForm, nombre: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🪪 Cédula / Documento de Identidad *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: V-18.452.120"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                      value={personalForm.cedula}
                      onChange={(e) => setPersonalForm({ ...personalForm, cedula: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      💼 Cargo / Función *
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                      value={personalForm.cargo}
                      onChange={(e) => setPersonalForm({ ...personalForm, cargo: e.target.value })}
                    >
                      <option value="Cajero / Atención">Cajero / Atención</option>
                      <option value="Encargado de Inventario">Encargado de Inventario</option>
                      <option value="Despachador">Despachador</option>
                      <option value="Seguridad / Mantenimiento">Seguridad / Mantenimiento</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📞 Teléfono de Contacto
                    </label>
                    <input
                      type="text"
                      placeholder="0414-1234567"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                      value={personalForm.telefono}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, telefono: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      💵 Salario ($ o Bs)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="180.00"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                      value={personalForm.salario}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, salario: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* CLIENTE */}
            {type === "cliente" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    👤 Nombre o Razón Social del Cliente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Juan Pérez o Panadería San José"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                    value={clienteForm.nombre}
                    onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🪪 Cédula / RIF (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: V-14.882.311"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                      value={clienteForm.documento}
                      onChange={(e) =>
                        setClienteForm({ ...clienteForm, documento: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📞 Número de Teléfono
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 0412-9876543"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                      value={clienteForm.telefono}
                      onChange={(e) =>
                        setClienteForm({ ...clienteForm, telefono: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    📍 Dirección o Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Calle Principal Casa #12, sector El Centro"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                    value={clienteForm.direccion}
                    onChange={(e) =>
                      setClienteForm({ ...clienteForm, direccion: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {/* PROVEEDOR */}
            {type === "proveedor" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    🏢 Nombre de la Empresa Distribuidora *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Distribuidora Los Andes C.A."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                    value={proveedorForm.nombreEmpresa}
                    onChange={(e) =>
                      setProveedorForm({ ...proveedorForm, nombreEmpresa: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🏷️ Rubro Principal que Provee *
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                      value={proveedorForm.categoria}
                      onChange={(e) =>
                        setProveedorForm({
                          ...proveedorForm,
                          categoria: e.target.value as CategoriaProducto,
                        })
                      }
                    >
                      <option value="viveres">🍞 Víveres y Alimentos</option>
                      <option value="ferreteria">🔧 Ferretería y Materiales</option>
                      <option value="higiene">🧼 Higiene y Limpieza</option>
                      <option value="extras">⚡ Extras y Misceláneos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      👤 Persona de Contacto / Vendedor
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Roberto Sánchez"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                      value={proveedorForm.contacto}
                      onChange={(e) =>
                        setProveedorForm({ ...proveedorForm, contacto: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📞 Teléfono de Pedidos
                    </label>
                    <input
                      type="text"
                      placeholder="0414-9988776"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                      value={proveedorForm.telefono}
                      onChange={(e) =>
                        setProveedorForm({ ...proveedorForm, telefono: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📍 Ubicación / Galpón
                    </label>
                    <input
                      type="text"
                      placeholder="Zona Industrial Galpón #5"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                      value={proveedorForm.direccion}
                      onChange={(e) =>
                        setProveedorForm({ ...proveedorForm, direccion: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* PRODUCTO */}
            {type === "producto" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📦 Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Harina de Maíz Precocida 1kg"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.nombre}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🔢 Código (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: VIV-005"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.codigo}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, codigo: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🏷️ Categoría de Venta *
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.categoria}
                      onChange={(e) =>
                        setProductoForm({
                          ...productoForm,
                          categoria: e.target.value as CategoriaProducto,
                        })
                      }
                    >
                      <option value="viveres">🍞 Víveres (Comestibles, granos, bebidas)</option>
                      <option value="ferreteria">🔧 Ferretería (Herramientas, electricidad)</option>
                      <option value="higiene">🧼 Higiene (Jabones, cloro, limpieza)</option>
                      <option value="extras">⚡ Extras (Pilas, golosinas, varios)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      ⚖️ Unidad de Presentación
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.unidad}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, unidad: e.target.value })
                      }
                    >
                      <option value="unid">Unidad (unid)</option>
                      <option value="kg">Kilogramo (kg)</option>
                      <option value="paq">Paquete (paq)</option>
                      <option value="litro">Litro (lts)</option>
                      <option value="caja">Caja</option>
                      <option value="metro">Metro (m)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Costo ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.95"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.precioCosto}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, precioCosto: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Venta ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="1.35"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.precioVenta}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, precioVenta: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Stock Inicial
                    </label>
                    <input
                      type="number"
                      placeholder="20"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.stockActual}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, stockActual: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Stock Mínimo
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      value={productoForm.stockMinimo}
                      onChange={(e) =>
                        setProductoForm({ ...productoForm, stockMinimo: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* DEUDOR */}
            {type === "deudor" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    👤 Nombre de la Persona Deudora *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Pedro Ramírez o Doña Carmen"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                    value={deudorForm.clienteNombre}
                    onChange={(e) =>
                      setDeudorForm({ ...deudorForm, clienteNombre: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📞 Teléfono
                    </label>
                    <input
                      type="text"
                      placeholder="0414-7778899"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                      value={deudorForm.telefono}
                      onChange={(e) => setDeudorForm({ ...deudorForm, telefono: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      📅 Fecha del Fiado
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                      value={deudorForm.fecha}
                      onChange={(e) => setDeudorForm({ ...deudorForm, fecha: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      💵 Monto Total Fiado ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="25.50"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                      value={deudorForm.montoTotal}
                      onChange={(e) => setDeudorForm({ ...deudorForm, montoTotal: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      💰 Abono Inicial Realizado ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                      value={deudorForm.montoAbonado}
                      onChange={(e) =>
                        setDeudorForm({ ...deudorForm, montoAbonado: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    📝 Detalle de Artículos Llevados Fiados
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: 2 Harinas PAN, 1 Aceite 1L, 1 Bombillo LED"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                    value={deudorForm.detalle}
                    onChange={(e) => setDeudorForm({ ...deudorForm, detalle: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* COMPRAS PRÓXIMAS */}
            {type === "compra" && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    🛒 Producto a Comprar / Reponer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Bombillos LED, Azúcar 1kg, Jabón Líquido..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                    value={compraForm.productoNombre}
                    onChange={(e) =>
                      setCompraForm({ ...compraForm, productoNombre: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      🏷️ Categoría *
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                      value={compraForm.categoria}
                      onChange={(e) =>
                        setCompraForm({
                          ...compraForm,
                          categoria: e.target.value as CategoriaProducto,
                        })
                      }
                    >
                      <option value="viveres">🍞 Víveres</option>
                      <option value="ferreteria">🔧 Ferretería</option>
                      <option value="higiene">🧼 Higiene</option>
                      <option value="extras">⚡ Extras</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      ⚠️ Prioridad de Compra
                    </label>
                    <select
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                      value={compraForm.prioridad}
                      onChange={(e) =>
                        setCompraForm({
                          ...compraForm,
                          prioridad: e.target.value as "alta" | "media" | "baja",
                        })
                      }
                    >
                      <option value="alta">🔴 Alta (Urgente / Agotado)</option>
                      <option value="media">🟡 Media (Stock bajo)</option>
                      <option value="baja">🟢 Baja (Planificada)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Cantidad a Comprar *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="24"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                      value={compraForm.cantidadRequerida}
                      onChange={(e) =>
                        setCompraForm({ ...compraForm, cantidadRequerida: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Stock en Tienda
                    </label>
                    <input
                      type="number"
                      placeholder="2"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                      value={compraForm.stockActual}
                      onChange={(e) =>
                        setCompraForm({ ...compraForm, stockActual: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Costo Estimado ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.95"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                      value={compraForm.costoEstimado}
                      onChange={(e) =>
                        setCompraForm({ ...compraForm, costoEstimado: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    🚚 Proveedor Sugerido
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
                    value={compraForm.proveedorSugerido}
                    onChange={(e) =>
                      setCompraForm({ ...compraForm, proveedorSugerido: e.target.value })
                    }
                  >
                    <option value="">Selecciona un proveedor (opcional)</option>
                    {proveedores.map((pr) => (
                      <option key={pr.id} value={pr.nombreEmpresa}>
                        {pr.nombreEmpresa} — {pr.categoria}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Barra de Acciones Fija en la Parte Inferior */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="modal-form"
            className={`rounded-xl px-6 py-2.5 text-sm font-bold shadow-md transition-all flex items-center gap-2 ${info.submitBtn}`}
          >
            <Save className="h-4 w-4" />
            Guardar Registro
          </button>
        </div>
      </div>
    </div>
  );
}
