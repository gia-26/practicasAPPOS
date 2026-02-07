const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            document.getElementById("categoria").innerHTML += `<option value='${categoria.slug}'>${categoria.name}</option>`;
        })  
    })

fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(producto => {
        document.getElementById("titulo").value = producto.title;
        document.getElementById("descripcion").value = producto.description;
        document.getElementById("precio").value = producto.price;
        document.getElementById("categoria").value = producto.category;
    })

const editarProducto = () => {
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const selectCategoria = document.getElementById("categoria").value;
    const cajaMensaje = document.getElementById('mensaje-exito');

    const productoActualizado = {
        title: titulo,
        description: descripcion,
        price: precio,
        category: selectCategoria,
    }


    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta de la API: ", data);
            cajaMensaje.style.display = "block";
            cajaMensaje.innerHTML = `
                <strong>Producto actualizado exitosamente!</strong><br>
                ID: ${data.id}<br>
                Título: ${data.title}<br>
                Precio: $${data.price}.00
            `;
            setTimeout(()=>{ window.location.href = `../vistaDetalle.html?id=${id}` },2000);
        })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        cajaMensaje.style.display = 'block';
        cajaMensaje.innerHTML = 'Error al actualizar el producto.';
    });
}