export type CategoriaProducto = "viveres" | "ferreteria" | "higiene" | "extras";

export interface Personal {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  telefono: string;
  salario: number;
  fechaIngreso: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  saldoDeuda: number;
}

export interface Proveedor {
  id: string;
  nombreEmpresa: string;
  contacto: string;
  telefono: string;
  categoria: CategoriaProducto;
  direccion: string;
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  categoria: CategoriaProducto;
  precioCosto: number;
  precioVenta: number;
  stockActual: number;
  stockMinimo: number;
  unidad: string; // "unid", "kg", "paq", "litro"
}

export interface Deudor {
  id: string;
  clienteNombre: string;
  telefono: string;
  montoTotal: number;
  montoAbonado: number;
  saldoPendiente: number;
  fecha: string;
  detalle: string; // p. ej. "1 Harina PAN, 1 Aceite, 1 Bombillo LED"
  estado: "pendiente" | "parcial" | "pagado";
}

export interface ItemCompraProxima {
  id: string;
  productoNombre: string;
  categoria: CategoriaProducto;
  cantidadRequerida: number;
  stockActual: number;
  costoEstimado: number;
  proveedorSugerido?: string;
  prioridad: "alta" | "media" | "baja";
  comprado: boolean;
}

