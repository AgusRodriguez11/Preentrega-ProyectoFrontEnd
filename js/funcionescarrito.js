import { guardarCarrito, vaciarCarrito, obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();

  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado al carrito.");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();

  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado del carrito.");
};

export const vaciarCarritoStorage = (carrito) => {
  vaciarCarrito();
  actualizarContador([]);
  mostrarMensaje("Se limpió el carrito.");
};
