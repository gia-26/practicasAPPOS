let lat
let lon

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            lat = respuesta.coords.latitude
            lon = respuesta.coords.longitude

            const coordenadas = [lat, lon]

            let map = L.map('map').setView(coordenadas, 15)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marcador = L.marker(coordenadas).addTo(map)
            marcador.bindPopup("<b>Estoy aquí</b>.");

            var polygon = L.polygon([
                [coordenadas[0]-0.001, coordenadas[1]-0.001],
                [coordenadas[0]-0.001, coordenadas[1]+0.001],
                [coordenadas[0]+0.001, coordenadas[1]+0.001],
                [coordenadas[0]+0.001, coordenadas[1]-0.001]
            ]).addTo(map);

            polygon.bindPopup("Área aproximada");
        },
        () => {}
    )
}
else {

}