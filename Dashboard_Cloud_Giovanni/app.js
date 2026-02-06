const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios = () => {
    //Recuperar el contenedor
    const contenedor = document.getElementById("contenedor-servicios")

    contenedor.innerHTML = ""
    baseDeDatosCloud.forEach((servicio) => {
        if (servicio.estado == "Activo")
            contenedor.innerHTML += `
                <div class='card'>
                    <h3>Servicio: ${servicio.nombre}</h3>
                    <p class='tipo'>Tipo: ${servicio.tipo}</p>
                    <p>Costo: ${servicio.costo}</p>
                    <p>Estado: <span class='activo'>Activo</span></p>
                </div>`;
        else
            contenedor.innerHTML += `<div class='card'>
                    <h3>Servicio: ${servicio.nombre}</h3>
                    <p class='tipo'>Tipo: ${servicio.tipo}</p>
                    <p>Costo: ${servicio.costo}</p>
                    <p>Estado: <span class='inactivo'>Inactivo</span></p>
                </div>`;
    })
}