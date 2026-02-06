const coordenadas = document.getElementById("parrafo")
const enlace = document.getElementById("enlace")

const obtener = () => {
    //Verificamos si el navegador tiene soporte para geolocalización
    if (navigator.geolocation) {
        coordenadas.innerText = "Localizando..."
        
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                const longitud = posicion.coords.longitude
                const latitud = posicion.coords.latitude

                coordenadas.innerText = `Longitud: ${longitud} - Latitud: ${latitud}`
                enlace.href = `https://www.google.com/maps?q=${latitud},${longitud}`
                enlace.style.display = "block"
                //alert(`Longitud: ${longitud} - Latitud: ${latitud}`)
            }, 
            (error) => {
                coordenadas.innerText = `No se pudo obtener la ubicación: ${error.message}`
            })
    }
    else {

    }
}