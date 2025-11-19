import { obtenerCarrito } from "./storage.js";
import {
  eliminarProducto,
  vaciarCarritoStorage,
  comprarProductos,
  retornarTotal,
} from "./funcionescarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  //Leemos cantidad de productos en carrito para mostrar
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  //Accedemos al nodo donde vamos a mostrar las tarjetas de producto
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.classList.add("contenedor-carrito");
  // Botones de acciones
  const divAcciones = document.getElementById("acciones-carrito");

  //Esta lineas limpian los contenedor antes de renderizar tarjetas y botones
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  //❌Si no hay productos en el carrito mostramos un mensaje
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);
    return; //⚠️salimos de la funcion para no intentar renderizar productos
  }

  //✅Si hay productos en el carrito los renderizamos
  //💡El forEach nos puede dar el indice del producto en el array
  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
   tarjeta.classList.add("item-carrito");

   const info = document.createElement("div");
info.classList.add("info-carrito");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
   precio.textContent = `$${producto.precio} x ${producto.cantidad}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("boton-Producto");

    //💡Aca nos sirve el indice, para poder pasarselo a la funcion de eliminar
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);

      //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
      // ya que sino quedaria con el producto eliminado porque solo borramos del storage
      renderizarCarrito();
    });

    

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(info);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("boton-Producto");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarritoStorage();

    //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
    // ya que sino quedaria con los productos viejos porque solo borramos del storage
    renderizarCarrito();
  });

  const btnComprar = document.createElement("button");
  btnComprar.classList.add("boton-Producto");
  btnComprar.classList.add("btn-vaciar-carrito");
  btnComprar.textContent = "Comprar";
  btnComprar.addEventListener("click", () => {
    comprarProductos();

    //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
    // ya que sino quedaria con los productos viejos porque solo borramos del storage
    renderizarCarrito();
  });

  const totalCompra = document.createElement("p");
  const total=retornarTotal();
  totalCompra.classList.add("compra-total")
  totalCompra.textContent = `Compra Total: $${total}`;
 
  divAcciones.appendChild(btnVaciar);
  divAcciones.appendChild(btnComprar);
  divAcciones.appendChild(totalCompra);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
