console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.substr(4);
console.log(id);


const { createApp } = Vue;

createApp({
  
  data() {
    return {
      id: 0,
      name: "",
      username: "",
      mail: "",
      password: "",
      showPassword: false,
      url: "https://juank732.pythonanywhere.com/usuarios/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.name = data.name;
          this.username = data.username;
          this.mail = data.mail;
          this.password = data.password;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    modificar() {
      let usuario = {
        name: this.name,
        username: this.username,
        mail: this.mail,
        password: this.password,
      };
      var options = {
        body: JSON.stringify(usuario),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href = "./usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
// Obtener referencia al elemento del ojo y al campo de contraseña
const eyeIcon = document.getElementById("eye-icon");
const passwordField = document.getElementById("password");

// Agregar evento de clic al ojo
eyeIcon.addEventListener("click", function () {
  // Cambiar el tipo del campo de contraseña
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
});
