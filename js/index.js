import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { agregarAlCarrito } from "./funcionescarrito.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Seleccionamos el contenedor donde van los productos
  const sectionContainer = document.getElementById("section-productos");
  // 🔹 Creamos un div contenedor para todas las tarjetas

  let divTarjetas = document.createElement("div");
  divTarjetas.classList.add("contenedor-juegos");

  const carrito = obtenerCarrito();
  actualizarContador(carrito);


fetch("./data/productos.json")
.then((res)=>{
  if(!res.ok){
throw new Error (`ERROR HTTP status:${res.status}`)
  }
  return res.json();
}
)
.then((data)=>{
   data.forEach((producto) => {
    // Article
    const tarjetaProducto = document.createElement("article");
    tarjetaProducto.classList.add("juego-producto");

    // Imagen
    const imgJuego = document.createElement("img");
    imgJuego.src = producto.img;
    imgJuego.alt = producto.nombre;

    // Título
    const tituloJuego = document.createElement("h3");
    tituloJuego.textContent = producto.nombre;

    // Precio
    const precioJuego = document.createElement("p");
    precioJuego.textContent = `$${producto.precio}`;

    // Botón
    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.classList.add("boton-Producto");
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    // Ensamblamos todo
    tarjetaProducto.appendChild(imgJuego);
    tarjetaProducto.appendChild(tituloJuego);
    tarjetaProducto.appendChild(precioJuego);
    tarjetaProducto.appendChild(boton);

    // Agregamos la tarjeta al contenedor
    divTarjetas.appendChild(tarjetaProducto);
  });
  sectionContainer.appendChild(divTarjetas);
  })
.catch((err)=>{console.log(err)})
});