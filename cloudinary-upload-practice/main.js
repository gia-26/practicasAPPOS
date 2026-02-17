// Configuración
const CLOUD_NAME = "dpxukm9oe";
const PRESET = "presset5C";

const inputf = document.getElementById('fileInput');
const imagen = document.getElementById('imagen');
const loader = document.getElementById('loader');
const labelInput = document.getElementById('lblFile');
const btnSubir = document.getElementById('btnSubir');

const subirimg = () => {
    if (!validarInput()) return;

    btnSubir.disabled = true;

    const foto = inputf.files[0]; //Obtenemos el archivo seleccionado por el usuario
    loader.style.display = 'block';
    labelInput.textContent = foto.name; // Mostrar el nombre del archivo seleccionado
    const formData = new FormData(); //Objeto que se va a enviar a Cloudinary
    formData.append('file', foto); //Archivo que se va a subir
    formData.append('upload_preset', PRESET); //Lugar donde se encuentra el preset y se va a ir la foto

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error("Fallo al subir la imagen");
        return response.json(); // Convertir respuesta a JSON
    })
    .then(data => {
        loader.style.display = 'none';
        imagen.src = data.secure_url;
        imagen.style.display = 'block'; 
        btnSubir.disabled = false;
        alert("Imagen subida con éxito");
    })
    .catch(error => {
        // Capturar errores de red o de proceso
        console.error("Error detectado:", error);
        loader.style.display = 'none';
        btnSubir.disabled = false;
        alert("Ha ocurrido un error al subir la imagen. Por favor, inténtalo de nuevo.");
    });
}

const validarInput = () => {
    const foto = inputf.files[0]; //Obtenemos el archivo seleccionado por el usuario
    if (!foto) {
        alert("Por favor, selecciona un archivo primero.");
        return false;
    }

    if (!foto.type.startsWith('image/')) {
        alert("El archivo seleccionado NO es una imagen. Por favor sube un .jpg, .png, etc.");
        labelInput.textContent = "Selecciona una imagen";
        inputf.value = "";
        return false;
    }
    labelInput.textContent = foto.name; // Mostrar el nombre del archivo seleccionado
    return true;
}

const nuevaimg = () => {
    imagen.src = ""; // Limpiar la imagen mostrada
    inputf.value = ""; // Limpiar el input file
    labelInput.textContent = "Selecciona una imagen";
    imagen.style.display = 'none';
}
