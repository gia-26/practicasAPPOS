const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const detalleDiv = document.getElementById('vistaDetalle');

fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(productos => {
        detalleDiv.innerHTML = "";
        detalleDiv.innerHTML += `
            <div class="productoDetalle">
                <h2 class="nombreProductoDetalle">${productos.title}</h2>
                <img class="imagenProductoDetalle" src="${productos.thumbnail}" alt="${productos.title}">
                <p class="descripcionProductoDetalle">Descripción: ${productos.description}</p>
                <p class="precioProductoDetalle">Precio: $${productos.price}</p>
                <div class="infoExtra">
                    <div class="infoItem">
                        <span>${productos.warrantyInformation}</span>
                    </div>

                    <div class="infoItem">
                        <span>${productos.shippingInformation}</span>
                    </div>

                    <div class="infoItem">
                        <span>${productos.availabilityStatus}</span>
                    </div>
                </div>
                <p class="marcaProductoDetalle">Marca: ${productos.brand}</p>
            </div>
            <h3>Comentarios:</h3>
        `;
        const comentarios = productos.reviews;

        comentarios.forEach(comentario => {
            detalleDiv.innerHTML += `
                <div class="comentarioDetalle">
                    <p class="usuarioComentarioDetalle">${comentario.reviewerName}</p>
                    <p class="textoComentarioDetalle">${comentario.comment}</p>
                    <small>Fecha: ${comentario.date}</small>
                </div>
            `;
        })

    })

const editar = () => {
    window.location.href = `./editProduct/editarProducto.html?id=${id}`;
}

const eliminar = () => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`)) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            alert(`Producto: ${datos.title}, eliminado exitosamente.`);
            window.location.href = './index.html';
        })
}