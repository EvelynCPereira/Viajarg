// Botón de Menu

function openNav(){
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0";
}
//

//Funciones del carrusel

window.onload = function () {

    // Array que contiene las rutas de las imágenes del carrusel
    const IMAGENES = [
        'img/NahuelHuapi.jpg',
        'img/PuertoMadryn.jpg',
        'img/Bariloche.jpg',
        'img/Andes.webp'
    ];
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 3000;
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#imagen_carrusel');
    let intervalo;

    
 // Funcion que cambia la foto en la siguiente posicion

    function pasarFoto() {
        if(posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }


 // Funcion que cambia la foto en la anterior posicion

    function retrocederFoto() {
        if(posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }


// Funcion que actualiza la imagen de imagen dependiendo de posicionActual

    function renderizarImagen () {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }


// Activa el autoplay de la imagen

    function playIntervalo() {
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
    }

// Eventos
    $botonAvanzar.addEventListener('click', pasarFoto);
    $botonRetroceder.addEventListener('click', retrocederFoto);

// Iniciar
    playIntervalo();
    renderizarImagen();
} 


