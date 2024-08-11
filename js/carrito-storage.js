function agregarAlCarrito(producto) {
    // Almacenar los productos en el localStorage
    const productosStorage = localStorage.getItem("libreria") ? JSON.parse(localStorage.getItem("libreria")) : [];

    const indiceProducto = productosStorage.findIndex(librerias => librerias.id === producto.id);

    // Si no existe lo agrego
    if (indiceProducto === -1) {
        productosStorage.push(getNuevoProductoMemoria(producto));
    } else {
        // Si el producto ya existe, aumentar la cantidad
        productosStorage[indiceProducto].cantidad++;
    }

    // Guardar el array actualizado en el localStorage
    localStorage.setItem("libreria", JSON.stringify(productosStorage));
    actualizarCuentaCarrito();
}

function disminuirDelCarrito(producto) {
    // Obtener los productos almacenados en localStorage
    const productosStorage = localStorage.getItem("libreria") ? JSON.parse(localStorage.getItem("libreria")) : [];

    // Encontrar el índice del producto en el almacenamiento
    const indiceProducto = productosStorage.findIndex(librerias => librerias.id === producto.id);

    if (indiceProducto !== -1) {
        if (productosStorage[indiceProducto].cantidad === 1) {
            productosStorage.splice(indiceProducto, 1);
        } else {
            productosStorage[indiceProducto].cantidad--;
        }   
    }

    localStorage.setItem("libreria", JSON.stringify(productosStorage));
    actualizarCuentaCarrito();
}

function getNuevoProductoMemoria(producto) {
    // Crear un nuevo objeto de producto con la cantidad inicial de 1
    return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
    };
}

function actualizarCuentaCarrito() {
    const productosStorage = localStorage.getItem("libreria") ? JSON.parse(localStorage.getItem("libreria")) : [];
    const cuentaCarrito = productosStorage.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById("cuenta-carrito").textContent = cuentaCarrito;
}