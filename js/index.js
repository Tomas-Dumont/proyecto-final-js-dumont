const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
  productos.forEach(producto => {
    const productCard = document.createElement("div");
    productCard.classList = "tarjeta-producto";
    productCard.innerHTML = `
      <img src="./img/productos/${producto.id}.png">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="comprar-btn">Comprar</button>
    `;
    
    contenedorTarjetas.appendChild(productCard);
    
    productCard.querySelector(".comprar-btn").addEventListener("click", () => {
      agregarAlCarrito(producto);
      
      Toastify({
        text: "¡Producto agregado al carrito!",
        duration: 1500,
        backgroundColor: "rgba(7, 204, 7, 0.7)",
        close: true, 
        gravity: "top", 
        position: "right", 
        offset: {
          y: "50px" 
        }
      }).showToast();
    });
  });
}
crearTarjetasProductosInicio(libreria);


