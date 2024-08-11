const contenedorTarjetas = document.getElementById("productos-container-cart");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById ("reiniciar");
const comprarElement = document.getElementById ("comprar");





function crearTarjetaProducto(producto) {
    const productCard = document.createElement("div");
    productCard.classList = "tarjeta-producto-cart";
    productCard.innerHTML = `
        <img src="./img/productos/${producto.id}.png">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div class="botones">
            <button class="btn-disminuir">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="btn-aumentar">+</button>
        </div>
    `;
    const btnDisminuir = productCard.querySelector(".btn-disminuir");
    const btnAumentar = productCard.querySelector(".btn-aumentar");
    const cantidadSpan = productCard.querySelector(".cantidad");

    btnDisminuir.addEventListener("click", () => {
        const nuevaCantidad = parseInt(cantidadSpan.textContent) - 1;

        if (nuevaCantidad <= 0) {
            contenedorTarjetas.removeChild(productCard);
            disminuirDelCarrito(producto);
        } else {
            cantidadSpan.textContent = nuevaCantidad;
            disminuirDelCarrito(producto);
        }
        actualizarTotales();
    });

    btnAumentar.addEventListener("click", () => {
        agregarAlCarrito(producto);
        cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
        actualizarTotales();
    });

    return productCard;
}


function crearTarjetasProductosInicio() {
    const productos = JSON.parse(localStorage.getItem("libreria"));
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const productCard = crearTarjetaProducto(producto);
            contenedorTarjetas.appendChild(productCard);
        });
    }
}

crearTarjetasProductosInicio();
actualizarTotales();


// Función para actualizar los totales
function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("libreria")) || []; // Maneja el caso cuando no hay datos
    let unidades = 0;
    let precio = 0;

    if (productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
        unidadesElement.innerText = unidades;
        precioElement.innerText = `$${precio.toFixed(2)}`;
    } else {
        unidadesElement.innerText = 0;
        precioElement.innerText = `$0.00`;
    }
}

// Función texto cuando el carrito esta vacío
const revisarMensajeVacio = () => {
    const productos = JSON.parse(localStorage.getItem("libreria"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}





// Función para reiniciar el carrito
const reiniciarCarrito = () => {
    localStorage.removeItem("libreria");
    if (contenedorTarjetas) {
        contenedorTarjetas.innerHTML = ""; 
    }
    actualizarTotales();
    revisarMensajeVacio();
}

// Alert Boton reiniciar carrito y comprar
reiniciarCarritoElement.addEventListener("click", () => {
    Swal.fire ({
        title: "¿Está seguro?",
        icon: "warning",
        text: "Va a reiniciar el carrito",
        showCancelButton: true,
        confirmButtonColor: "rgb(208, 44, 44)",
        cancelButtonColor: "rgb(208, 44, 44)",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire({
                title:"Eliminado!",
                text:"Los productos del carrito han sido eliminados",
                icon: "success",
                confirmButtonColor: "rgb(208, 44, 44)",
            });
            reiniciarCarrito();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarTotales();
    revisarMensajeVacio();
});

comprarElement.addEventListener("click", () => {
    Swal.fire ({
        title: "Éxito",
        icon: "success",
        text: "¡Su compra se realizó con éxito!",
        confirmButtonColor: "rgb(208, 44, 44)",
    });
});





