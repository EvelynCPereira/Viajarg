const { createApp } = Vue;
createApp({
    data(){
        return {
            usuarios: [],
            url: 'https://juank732.pythonanywhere.com/usuarios',
            id: 0,
            name: "",
            username: "",
            mail: "",
            password: "",
            usernameLogin: "",
            passwordLogin: "",
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
              
              })
              .catch((err) => {
                console.error(err);
                this.error = true;
              });
          },
          imprimirDatos(){
            console.log(this.usuarios)

          },
          usernameRepetido(username){
            return this.usuarios.some((usuario) => usuario.username === username)
          },
      
          /* VALIDACION DE CORREO ELECTRONICO CORRECTO */
          validarEmail(email) {
            // Expresión regular para validar el formato de correo electrónico
            const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        
            return regex.test(email);
          },
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
              console.log("Email invalido")
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
          iniciarSesion() {
            const usuarioEncontrado = this.usuarios.find((usuario) => usuario.username === this.usernameLogin);
            if(usuarioEncontrado){
                if(this.passwordLogin!==""){
                    if(usuarioEncontrado.password === this.passwordLogin){
                        console.log("Exitoso")
                        document.cookie = "sessionID=viajargCAC2023; expires=Wed, 05 Jul 2023; path=/";
                        document.cookie = "usuario=" + usuarioEncontrado.username + "; expires=Wed, 05 Jul 2023; path=/";
                        window.location.href = '/index.html'
                    }
                    else{
                        alert("La contraseña ingresada no es correcta")
                    }
                }else{
                    return;
                }
            
            }else if(this.usernameLogin === "$admin" && this.passwordLogin === "$admin"){
              document.cookie = "sessionID=viajargCAC2023; expires=Wed, 05 Jul 2023; path=/";
              window.location.href = './usuarios.html';
          }
            else{
                alert("El usuario ingresado no se encuentra registrado")
                return;
            }
          },
        
    },
    created(){
        this.fetchData(this.url);
    },
}).mount("#app")