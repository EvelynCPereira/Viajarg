function openNav(){
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0%";
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Obtener el elemento del botón de usuario y el botón para borrar las cookies
  const botonLogin = document.getElementById("boton_login");
  const usuarioActivo = document.getElementById("usuario_activo");
  const borrarCookies = document.getElementById("borrar_cookies");

  // Verificar si la cookie está presente
  const authorizedCookie = getCookie("sessionID");
  if (authorizedCookie === "viajargCAC2023") {
    // Si la cookie está presente, ocultar el botón de inicio de sesión y mostrar el botón de usuario y el botón para borrar las cookies
    botonLogin.style.display = "none";
    usuarioActivo.style.display = "inline-block";
    borrarCookies.style.display = "inline-block";

    // Obtener el valor de la cookie "usuario" y establecerlo como el contenido del botón de usuario
    const usuarioCookie = getCookie("usuario");
    usuarioActivo.textContent = "Hola! " + usuarioCookie;
  } else {
    // Si la cookie no está presente, mostrar el botón de inicio de sesión y ocultar el botón de usuario y el botón para borrar las cookies
    botonLogin.style.display = "inline-block";
    usuarioActivo.style.display = "none";
    borrarCookies.style.display = "none";
  }

  // Función para borrar las cookies para que se cierra la sesion
  function borrarCookiesFunc() {
    document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload(); // Recargar la página para reflejar los cambios
  }

  // Asignar la función al evento click del botón para borrar las cookies
  borrarCookies.addEventListener("click", borrarCookiesFunc);
