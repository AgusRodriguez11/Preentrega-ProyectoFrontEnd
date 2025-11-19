import { guardarCarrito, vaciarCarrito, obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();

  // Buscar si ya existe el producto
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    // Si ya existe, incremento cantidad
    existente.cantidad += 1;
  } else {
    // Si es nuevo, agrego con cantidad 1
    producto.cantidad = 1;
    carrito.push(producto);
  }

  Toastify({
    text: "Producto agregado al carrito",
    duration: 1000,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #b06a00ff, #c7c93dff)",
    },
  }).showToast();

  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);

};

export const vaciarCarritoStorage = (carrito) => {
  vaciarCarrito();
  actualizarContador([]);
  mostrarMensaje("Se limpió el carrito.");
};

export const vaciarCarritoStorageSinMensaje = (carrito) => {
  vaciarCarrito();
  actualizarContador([]);
};

export const comprarProductos = (carrito) => {
  vaciarCarritoStorageSinMensaje();
  actualizarContador([]);
  mostrarMensaje("Muchas gracias por su compra");
  
};


export const retornarTotal = () => {
  const carrito = obtenerCarrito();

  const total = carrito.reduce((acum, prod) => {
    const cantidad = prod.cantidad ?? 1; 
    return acum + prod.precio * cantidad;
  }, 0);

  return total;
};