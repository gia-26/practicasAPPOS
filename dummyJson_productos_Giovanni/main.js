const productosDiv = document.getElementById('productos');

fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(productos => {
        productosDiv.innerHTML = "";
        productos.products.forEach(producto => {
            productosDiv.innerHTML += `
                <div onclick="window.location.href='vistaDetalle.html?id=${producto.id}'" class="producto">
                    <h2 class="nombreProducto">${producto.title}</h2>
                    <img class="imagenProducto" src="${producto.thumbnail}" alt="${producto.title}">
                    <p class="precioProducto">Precio: $${producto.price}</p>
                    <p class="ratingProducto">Rating: ${producto.rating}</p>
                    <p class="categoriaProducto">Categoría: ${producto.category}</p>
                    <p class="stockProducto">Stock: ${producto.stock}</p>
                </div>
            `;
        })
    })

const buscarProducto = () => {
    const buscar = document.getElementById('buscar').value.toLowerCase();

    fetch(`https://dummyjson.com/products/search?q=${buscar}`)
        .then(response => response.json())
        .then(productos => {
            productosDiv.innerHTML = "";
            productos.products.forEach(producto => {
                productosDiv.innerHTML += `
                    <div onclick="window.location.href='vistaDetalle.html?id=${producto.id}'" class="producto">
                        <h2 class="nombreProducto">${producto.title}</h2>
                        <img class="imagenProducto" src="${producto.thumbnail}" alt="${producto.title}">
                        <p class="precioProducto">Precio: $${producto.price}</p>
                        <p class="ratingProducto">Rating: ${producto.rating}</p>
                        <p class="categoriaProducto">Categoría: ${producto.category}</p>
                        <p class="stockProducto">Stock: ${producto.stock}</p>
                    </div>
                `;
            })
        })
}