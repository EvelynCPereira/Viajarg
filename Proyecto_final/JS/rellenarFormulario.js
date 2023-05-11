const nombreInput = document.querySelector('.nombre_input');
const apellidoInput = document.querySelector('.apellido_input');
const emailInput = document.querySelector('.mail_input');
const telefonoInput = document.querySelector('.telefono_input');
let error_cont = 0

function quitarLetrasSimbolos(cadena) {
    // Patron para encontrar letras y símbolos
    let patron = /[^0-9]/g;
  
    // Utilizamos la función replace para reemplazar las letras y símbolos por una cadena vacía
    let resultado = cadena.replace(patron, '');
  
    return resultado;
  }

function rellenarFormulario() {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        const usuario = data.results[0];
        nombreInput.value = usuario.name.first;
        apellidoInput.value = usuario.name.last;
        emailInput.value = usuario.email;
        telefonoInput.value = quitarLetrasSimbolos(usuario.phone); 
        

      })
      .catch(error => {
        console.log('Error:', error);
        if(error_cont<2){  //En caso de fallar al obtener los datos de la API lo reintenta
          rellenarFormulario();
          error_cont++; 
        }
      });

  }
