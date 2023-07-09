/* AGREGA EL HEADER Y FOOTER A LAS PAGINAS */

document.getElementById(
  "header"
).innerHTML = ` 
<nav class="navbar navbar-expand-sm navbar-light">
  <div class="container">
    <a class="navbar-brand" href="index.html"><img class="img-logo" src="img/logo.png" alt=""></a>
    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
      data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="usuarios.html" aria-current="page">Lista de Usuarios<span
            class="visually-hidden">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="nuevo_usuario.html">Añadir Usuario</a>
        </li>
      </ul>
      

    </div>
    <div>

    <button type="button" id="cerrar_sesion" onclick="cerrarSesion()"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</button>
    </div>
  </div>
</nav>
`;
document.getElementById(
  "footer"
).innerHTML = `
<div class="text-center p-1 text-white" style="background-color: #0A56BD;">
    MODO ADMINISTRADOR
  </div>
`;