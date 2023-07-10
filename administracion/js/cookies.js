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
              
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Por favor completa todos los campos',
                showConfirmButton: false,
                timer: 2400,
                timerProgressBar: true
              });
              
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
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro Exitoso',
                    showConfirmButton: false,
                    timer: 2400,
                    timerProgressBar: true
                  });
                  setTimeout(function () {
                    window.location.href = "./usuarios.html";
                  }, 2800);
                })
                .catch((err) => {
                  console.error(err);
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Grabar',
                    showConfirmButton: false,
                    timer: 2400,
                    timerProgressBar: true
                  });
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
                        window.location.href = '/Viajarg'
                    }
                    else{
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Contraseña incorrecta',
                        showConfirmButton: false,
                        timer: 2400,
                        timerProgressBar: true
                      });
                    }
                }else{
                    return;
                }
            
            }else if(this.usernameLogin === "$admin" && this.passwordLogin === "$admin"){
              document.cookie = "sessionID=viajargCAC2023; expires=Wed, 05 Jul 2023; path=/";
              window.location.href = './usuarios.html';
          }
            else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El usuario ingresado no se encuentra registrado',
                showConfirmButton: false,
                timer: 2400,
                timerProgressBar: true
              });
                return;
            }
          },
        
    },
    created(){
        this.fetchData(this.url);
    },
}).mount("#app")
