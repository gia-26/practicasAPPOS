const urlApi = "https://giovanni.grupoctic.com/bibliotecamovil/api/apiLibros.php";

// Función asíncrona para pedir los datos
const cargarLibros = () => {
    // Usamos fetch para hacer la petición HTTP
    fetch(urlApi)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            const libros = data;
           
            console.log("Datos recibidos:", libros); // Debugging en consola
           
            // Llamamos a la función que se encarga de dibujar en pantalla
            mostrarLibros(libros);
        })
        .catch(error => {
            console.error("Error al cargar los libros:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}

// Función encargada de manipular el DOM
const mostrarLibros = (libros) => {
    // 1. Seleccionamos el contenedor del HTML
    const contenedorLibros = document.getElementById("contenedor-libros");
   
    // 2. Limpiamos el contenedor por si ya tenía contenido previo
    contenedorLibros.innerHTML = "";

    // 3. Recorremos cada libro del array
    libros.forEach(libro => {
        const tarjeta = document.createElement("div");
       
        tarjeta.classList.add("card");
       
        tarjeta.innerHTML = `
            <img src="https://biblioteca.grupoctic.com/libros_img/${libro.imagen}" alt="${libro.titulo}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="card-title">${libro.titulo}</h3>
            <p class="card-description">${libro.sinopsis}</p>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>Editorial:</strong> ${libro.editorial}</p>
            <div class='${libro.estado}'>${libro.estado}</div>
        `;

        contenedorLibros.appendChild(tarjeta);
    })
}