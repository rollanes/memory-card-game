const tarjetas = document.querySelectorAll('.tarjeta-memoria')
const tarjetasColeccion = Array.from(tarjetas)

let volteoLaTarjeta = false
let tableroBloqueado = false
let primerTarjeta, segundaTarjeta

function voltearTarjeta() {
    contarMovimientos()
    contarEstrellas()
    if(tableroBloqueado) {return};
    if(this === primerTarjeta) {return};
    if(empezarTiempo === false){
        empezarTiempo = true
        cronometrar()
    }
    this.classList.add("girada");

    if (!volteoLaTarjeta) {
        //primer click
        volteoLaTarjeta = true;
        primerTarjeta = this;

        return;
    } 
        //segundo click
        volteoLaTarjeta = false;
        segundaTarjeta = this;
        validarCoincidencia()
}

function validarCoincidencia(){
    let esCoincidencia = primerTarjeta.dataset.personaje === segundaTarjeta.dataset.personaje;
    esCoincidencia ? (desactivarTarjetas(), mostradas++, ganarJuego())  : desvoltearTarjetas()
}

function desactivarTarjetas(){
    primerTarjeta.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);

    resetearTablero()
}

function desvoltearTarjetas(){
    tableroBloqueado = true;

    setTimeout(() => {
        primerTarjeta.classList.remove("girada");
        segundaTarjeta.classList.remove("girada");
        
        resetearTablero()
        }, 1500)
}

function resetearTablero(){
    [volteoLaTarjeta, tableroBloqueado] = [false, false];
    [primerTarjeta,segundaTarjeta] = [null, null];
}

(function mezclar(){
    tarjetas.forEach( tarjeta => {
        const ordenRandom = Math.floor(Math.random() * tarjetas.length);
        tarjeta.style.order = ordenRandom
    })
})()

function mezclarTarjetas(){
    tarjetas.forEach( tarjeta => {
        const ordenRandom = Math.floor(Math.random() * tarjetas.length);
        tarjeta.style.order = ordenRandom
    })
}

tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta))

let mostradas = 0

const modal = document.getElementById("modal")
const botonReset = document.querySelector(".reset-btn")
const botonJugarDeNuevo = document.querySelector('.play-again-btn')
const contadorMovimientos = document.querySelector('.contador-movimientos')

let movimientos = 0

const estrella = document.getElementById("puntuacion-estrellas").querySelectorAll(".estrella")
let contadorEstrellas = 3

const cronometro = document.querySelector(".cronometro")
let tiempo;
let minutos = 0
let segundos = 0
let empezarTiempo = false

function cronometrar(){
    tiempo = setInterval(function() {
        segundos++;
        if(segundos === 60) {
            minutos++;
            segundos = 0
        }
        cronometro.innerHTML = `<i class="fa fa-hourglass-start"></i> Tiempo: ${minutos}:${segundos}`
    }, 1000)
    
}

function pararCronometro(){
    clearInterval(tiempo)
}

function reiniciarTodo(){
    pararCronometro()
    limpiarTarjetas()
    tableroBloqueado = false
    empezarTiempo = false
    segundos = 0
    minutos = 0
    cronometro.innerHTML = `<i class="fa fa-hourglass-start"></i> Tiempo: 00:00`
    estrella[1].firstElementChild.classList.add("fa-star")
    estrella[2].firstElementChild.classList.add("fa-star")
    contadorEstrellas = 3
    contadorMovimientos.innerHTML = 0
    mostradas = 0
    mezclarTarjetas()

}

function contarMovimientos(){
    contadorMovimientos.innerHTML++
    movimientos++
}

function contarEstrellas(){
    if(movimientos === 14){
        estrella[2].firstElementChild.classList.remove('fa-star')
        contadorEstrellas--
    } else if (movimientos === 20){
        estrella[1].firstElementChild.classList.remove("fa-star")
        contadorEstrellas--
    }
}

function mostrarModal(){
    const cierreModal = document.getElementsByClassName("cerrar")[0]
    modal.style.display = "block"
    cierreModal.onclick = function(){
        ocultarModal()
    }
    window.onclick = function(event){
        if(event.target == modal){
            ocultarModal()
        }
    }
}

function ganarJuego(){
    if(mostradas === 6){
        pararCronometro()
        mostrarModal()
    }
}


botonReset.addEventListener('click', reiniciarTodo)
botonJugarDeNuevo.addEventListener("click", jugarOtraVez)

function limpiarTarjetas(){
    for (let i = 0; i < tarjetasColeccion.length; i++) {
    const element = tarjetasColeccion[i];
    element.classList.remove("girada")
    primerTarjeta = null
    segundaTarjeta = null
}
}

function ocultarModal() {
    modal.style.display = "none"
}

function jugarOtraVez(){
    ocultarModal()
    reiniciarTodo()
}