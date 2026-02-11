const apikey = '0e365973f2ca47cd88fe3ebe1f2ea110';

const selectCategoria = document.getElementById('categoria');
const juegosContainer = document.getElementById('juegos');
const buscar = document.getElementById('buscar');

fetch(`https://api.rawg.io/api/genres?key=${apikey}`)
    .then(respuesta => respuesta.json())
    .then(categorias => {
        selectCategoria.innerHTML = '<option value="">Todas las categorías</option>';
        categorias.results.forEach(categoria => {
            console.log(categoria);
            selectCategoria.innerHTML += `<option value="${categoria.slug}">${categoria.name}</option>`;
        });
    })

const cargarJuegos = () => {
    const categoriaSeleccionada = selectCategoria.value;
    const busqueda = buscar.value;

    let url = `https://api.rawg.io/api/games?key=${apikey}`;

    if (categoriaSeleccionada) {
        url += `&genres=${categoriaSeleccionada}`;
    }
    if (busqueda) {
        url += `&search=${busqueda}`;
    }
    actualizarCatalogo(url);
}

const actualizarCatalogo = (url) => {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(juegos => {
            juegosContainer.innerHTML = '';
            juegos.results.forEach(juego => {
                juegosContainer.innerHTML += `
                    <article class="tarjeta-juego">
                        <div class="imagen-tarjeta">
                            <img src="${juego.background_image}" alt="${juego.name}">
                            <span class="etiqueta-plataforma">${juego.platforms[0].platform.name}</span>
                        </div>
                        <div class="contenido-tarjeta">
                            <h3>${juego.name}</h3>
                            <p class="genero">${juego.genres[0].name}</p>
                            <p class="descripcion"><i class="fa-solid fa-star"></i>${juego.rating}</p>
                            <button onclick="window.location.href='./vistaDetalle.html?id=${juego.id}'" class="boton-detalles">Ver detalles</button>
                        </div>
                    </article>
                `;
            });
        })
}

cargarJuegos();