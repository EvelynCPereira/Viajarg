const { createApp } = Vue;
createApp({
  data() {
    return {
      usuarios: [],
      url:'https://juank732.pythonanywhere.com/usuarios', /* CONEXION CON EL BACKEND ALOJADO EN PYTHONANYWHERE */
      error: false,
      cargando: true,
      /*atributos para guardar los valores del formulario */
      id: 0,
      name: "",
      username: "",
      mail: "",
      password: "",
      usernameExiste: false,
      mailInvalido: false,
    };
  },
  computed: {
    camposCompletos() {
      return this.name && this.username && this.mail && this.password;
    },
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.usuarios = data;
          this.cargando = false;
        
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    remove(usuario) {
      const url = this.url + "/" + usuario;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          location.reload();
        });
    },

    /* VERIFICA SI EL USUARIO A AÑADIR YA EXISTE EN LA BASE DE DATOS */

    usernameRepetido(username){
      return this.usuarios.some((usuario) => usuario.username === username)
    },

    /* VALIDACION DE CORREO ELECTRONICO CORRECTO */
    validarEmail(email) {
      // Expresión regular para validar el formato de correo electrónico
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  
      return regex.test(email);
    },
    /* AÑADIR NUEVO USUARIO */
    add() {
      if (!this.name || !this.username || !this.mail || !this.password) {
        // Detener el envío del formulario si los campos obligatorios están vacíos
        
        alert('Por favor, completa todos los campos');
        
        return;
      }

      if (this.usernameRepetido(this.username)){
        this.usernameExiste = true;
        
        return;
      }

      this.usernameExiste = false; 

      if (!this.validarEmail(this.mail)) {
        this.mailInvalido = true;
        return;
      }

      this.mailInvalido = false;

      
      
      let usuario = {
        name: this.name,
        username: this.username,
        mail: this.mail,
        password: this.password,
        
      };
      
      var options = {
        body: JSON.stringify(usuario),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
        fetch(this.url, options)
          .then(function () {
            alert("Registro grabado");
            window.location.href = "./usuarios.html";
          })
          .catch((err) => {
            console.error(err);
            alert("Error al Grabar");
          });
      
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");


window.addEventListener('DOMContentLoaded', function() {
  // Verificar la validez de la cookie de sesión
  if (!validarCookieDeSesion()) {
    // La cookie de sesión no es válida o está ausente
    // Redirigir al usuario a la página de inicio de sesión o a otra página apropiada
    window.location.href = "login.html";
  }
});

function validarCookieDeSesion() {
  // Obtener todas las cookies
  var cookies = document.cookie.split(";");

  // Buscar la cookie de sesión
  var sessionCookie = cookies.find(function(cookie) {
    return cookie.trim().startsWith("sessionID=");
  });

  // Verificar si se encontró la cookie de sesión y si su valor es "viajargCAC2023"
  if (sessionCookie && sessionCookie.split("=")[1].trim() === "viajargCAC2023") {
    return true;
  }

  return false;
}

function cerrarSesion() {
  // Eliminar la cookie estableciendo una fecha de caducidad pasada
  document.cookie = "sessionID=viajargCAC2023; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "login.html";
}
