const productosDiv = document.getElementById('productos');
const selectCategoria = document.getElementById('select-categoria');

const cargarProductos = () => {
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
}

const cargarCategorias = () => {
    fetch('https://dummyjson.com/products/category-list')
        .then(response => response.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                selectCategoria.innerHTML += `
                    <option value="${categoria}">${categoria}</option>
                `;
            })
        })
}


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

const filtrarPorCategoria = () => {
    const categoria = selectCategoria.value;
    const selectOrdenar = document.getElementById('select-ordenar').value;

    if(!categoria) {
        cargarProductos();
        return;
    }

    if(selectOrdenar) {
        ordenar();
        return;
    }

    fetch(`https://dummyjson.com/products/category/${categoria}`)
        .then(respuesta => respuesta.json())
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

const ordenar = () => {
    const selectOrdenar = document.getElementById('select-ordenar').value;
    let url = 'https://dummyjson.com/products';
    const categoria = selectCategoria.value;

    if(categoria) url = `https://dummyjson.com/products/category/${categoria}`; 
    
    switch(selectOrdenar) {
        case "precio-asc":
            ordenarPorPrecio('asc', url);
            break;
        case "precio-desc":
            ordenarPorPrecio('desc', url);
            break;
        case "titulo-asc":
            ordenarPorTitulo('asc', url);
            break;
        case "titulo-desc":
            ordenarPorTitulo('desc', url);
            break;
    }
}

const ordenarPorTitulo = (orden, url) => {
    fetch(`${url}?sortBy=title&order=${orden}`)
        .then(respuesta => respuesta.json())
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

const ordenarPorPrecio = (orden, url) => {
    fetch(`${url}?sortBy=price&order=${orden}`)
        .then(respuesta => respuesta.json())
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

//Cargar productos y categorias al cargar la página
cargarProductos();
cargarCategorias();