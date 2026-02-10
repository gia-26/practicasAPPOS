const perfilDiv = document.getElementById('perfil');
const seguidoresDiv = document.getElementById('followers');
const repositoriosDiv = document.getElementById('repos-container');
let usuario = "microsoft";

fetch(`https://api.github.com/users/${usuario}`)
    .then(response => response.json())
    .then(datos => {
        perfilDiv.innerHTML = "";
        perfilDiv.innerHTML = `
            <img src="${datos.avatar_url}" alt="Foto de perfil" class="profile-img" id="avatar">
            <div class="profile-info">
                <h1 id="name">${datos.name}</h1>
                <p class="username">@${datos.login}</p>
                <p class="bio" id="bio">${(datos.bio !== null ? datos.bio : "Sin biografía")}</p>
                <div class="location">${datos.location}</div>
            </div>
        `;
    })

fetch(`https://api.github.com/users/${usuario}/followers?per_page=5`)
    .then(response => response.json())
    .then(seguidores => {
        seguidoresDiv.innerHTML = "";
        seguidores.forEach(seguidor => {
            seguidoresDiv.innerHTML += `
                <img src="${seguidor.avatar_url}" alt="Seguidor">
            `;
        })
    })

fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&per_page=10&type=owner&direction=desc`)
    .then(response => response.json())
    .then(repositorios => {
        repositoriosDiv.innerHTML = "";
        repositorios.forEach(repo => {
            repositoriosDiv.innerHTML += `
                <article class="repo-card">
                    <div class="repo-header">
                        <h3>${repo.name}</h3>
                        <span class="visibility">${repo.visibility}</span>
                    </div>
                    <p class="repo-desc">${repo.description !== null ? repo.description : "Sin descripción"}</p>
                    <div class="repo-footer">
                        <span class="language">
                            <i class="fa-solid fa-code"></i> ${repo.language}
                        </span>
                        <span class="stars">
                            <i class="fa-solid fa-star"></i> ${repo.stargazers_count}
                        </span>
                    </div>
                </article>
            `;
        })
    })