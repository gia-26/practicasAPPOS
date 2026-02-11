const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');
const apikey = '0e365973f2ca47cd88fe3ebe1f2ea110';

const divImagen = document.getElementById('imagen');
const metacriticSpan = document.getElementById('metacritic');
const lanzamientoSpan = document.getElementById('lanzamiento');
const duracionSpan = document.getElementById('duracion');
const generoSpan = document.getElementById('genero');
const tiendasDiv = document.getElementById('tiendas');
const tituloH1 = document.getElementById('titulo');
const etiquetasDiv = document.getElementById('etiquetas');
const capturasDiv = document.getElementById('capturasJuego');
const requisitosRecP = document.getElementById('requisitosRec');
const descripcionP = document.getElementById('descripcion');

fetch(`https://api.rawg.io/api/games/${id}?key=${apikey}`)
    .then(respuesta => respuesta.json())
    .then(datos => {
        divImagen.innerHTML = `
            <img src="${datos.background_image}" alt="${datos.name} Portada">
        `;
        metacriticSpan.textContent = datos.metacritic;
        lanzamientoSpan.textContent = datos.released;
        duracionSpan.textContent = `${datos.playtime} h`;
        datos.genres.forEach(genero => {
            generoSpan.textContent += `${genero.name} `;
        });

        tiendasDiv.innerHTML = '';
        datos.stores.forEach(tienda => {
            tiendasDiv.innerHTML += `
                <a href="https://${tienda.store.domain}" target="_blank" class="boton-tienda">Comprar en ${tienda.store.name}</a>
            `;
        });

        tituloH1.textContent = datos.name;
        etiquetasDiv.innerHTML = '';
        datos.tags.forEach(etiqueta => {
            etiquetasDiv.innerHTML += `<span>${etiqueta.name}</span>`;
        });

        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${apikey}`)
            .then(respuesta => respuesta.json())
            .then(datosCapturas => {
                capturasDiv.innerHTML = '';
                datosCapturas.results.forEach(captura => {
                    capturasDiv.innerHTML += `
                        <img src="${captura.image}" alt="Captura de ${datos.name}">
                    `;
                });
            });

        datos.platforms.forEach(plataforma => {
            console.log(plataforma.platform.name);
            if (plataforma.platform.name === 'PC') {
                if (plataforma.requirements.recommended === undefined && plataforma.requirements.minimum !== undefined) {
                    requisitosRecP.innerHTML = `<strong>Mínimos</strong><br>
                    ${plataforma.requirements.minimum}`;
                }
                else if (plataforma.requirements.minimum !== undefined) {
                    requisitosRecP.innerHTML = `<strong>Recomendados:</strong><br>
                    ${plataforma.requirements.recommended}`;
                }
                else {
                    requisitosRecP.textContent = 'No hay requisitos disponibles';
                }
            }
        });
    })