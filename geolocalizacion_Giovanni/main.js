const lat = 21.144788;
const lon = -98.398249;

const coordenadas = [lat, lon];

let map = L.map('map').setView(coordenadas, 17)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marcador = L.marker(coordenadas).addTo(map)
marcador.bindPopup(`
    <b>Casa de Giovanni</b>.
    <ul>
        <li><b>Latitud: </b>${lat}</li>
        <li><b>Longitud: </b>${lon}</li>
    </ul>`);

var polygon = L.polygon([
    [21.144973, -98.398215],
    [21.144973, -98.398207],
    [21.144791, -98.398044],
    [21.144777, -98.398040],
    [21.144749, -98.398032],
    [21.144484, -98.398134],
    [21.144784, -98.398468]
]).addTo(map);

polygon.bindPopup("Casa de Giovanni");