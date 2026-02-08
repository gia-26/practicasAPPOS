const productosDiv = document.getElementById('productos');
const selectCategoria = document.getElementById('select-categoria');
const selectOrdenar = document.getElementById('select-ordenar');
const paginaActualSpan = document.getElementById('pagina-actual');
const totalPaginasSpan = document.getElementById('total-paginas');
let skip = 0;
let paginaActual = 1;
let totalPaginas = 0;
let totalProductos = 0;
const limit = 10;

const cargarProductos = () => {
    const buscar = document.getElementById('buscar').value.toLowerCase();
    const orden = document.getElementById('select-ordenar').value;
    const categoria = document.getElementById('select-categoria').value;
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    if(buscar) {
        selectCategoria.value = "";
        selectOrdenar.value = "";
        url = `https://dummyjson.com/products/search?q=${buscar}&limit=${limit}&skip=${skip}`;
    }
    else if(categoria && orden){
        url = `https://dummyjson.com/products/category/${categoria}?limit=${limit}&skip=${skip}`;
        url += urlOrdenada(orden);
    }
    else if(categoria) {
        url = `https://dummyjson.com/products/category/${categoria}?limit=${limit}&skip=${skip}`;
    }
    else if (orden){
        url += urlOrdenada(orden);
    }

    actualizarProductos(url);
}

const urlOrdenada = (orden) => {
    switch(orden) {
        case "precio-asc":
            return `&sortBy=price&order=asc`;
        case "precio-desc":
            return `&sortBy=price&order=desc`;
        case "titulo-asc":
            return `&sortBy=title&order=asc`;
        case "titulo-desc":
            return `&sortBy=title&order=desc`;
    }
}

const actualizarProductos = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(productos => {
            totalProductos = productos.total;
            totalPaginas = Math.ceil(totalProductos / limit);
            totalPaginasSpan.textContent = totalPaginas;
            if (paginaActual > totalPaginas) {
                paginaActual = 1;
                skip = 0;
                cargarProductos();
            }
            paginaActualSpan.textContent = paginaActual;
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

const anterior = () => {
    if(skip > 0) {
        skip -= limit;
        paginaActual--;
        cargarProductos();
    }
}

const siguiente = () => {
    if(skip < totalProductos - limit) {
        skip += limit;
        paginaActual++;
        cargarProductos();
    }
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

//Cargar productos y categorias al cargar la página
cargarProductos();
cargarCategorias();