// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let listaDeNombres = []
let nombresYaElegidos = [] // Lista para guardar nombres ya sorteados

// FUNCIÓN PARA VERIFICAR SI ES SOLO NÚMEROS
function esSoloNumeros(texto) {
    // Expresión regular que verifica si el texto contiene SOLO números (y espacios opcionales)
    return /^\s*\d+\s*$/.test(texto);
}

// FUNCIÓN PARA CONTROLAR EL ESTADO DEL BOTÓN
function actualizarEstadoBoton() {
    const input = document.getElementById('amigo');
    const botonAñadir = document.querySelector('.button-add');
    
    if (input && botonAñadir) {
        const valor = input.value.trim();
        
        // Verificar que no esté vacío Y que no sean solo números
        if (valor !== '' && !esSoloNumeros(valor)) {
            botonAñadir.disabled = false;
        } else {
            botonAñadir.disabled = true;
        }
    }
}

// EVENTOS PARA DETECTAR CAMBIOS EN EL INPUT
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('amigo');
    
    if (input) {
        // Escuchar cambios mientras escribe
        input.addEventListener('input', actualizarEstadoBoton);
        input.addEventListener('keyup', actualizarEstadoBoton);
        
        // También escuchar cuando pega texto
        input.addEventListener('paste', function() {
            setTimeout(actualizarEstadoBoton, 10);
        });
        
        // Estado inicial del botón
        actualizarEstadoBoton();
    }
});

function asignarNombres(){
    let nombres = document.getElementById('amigo').value.trim()
    
    if (nombres==''){
        alert('Por favor inserte un nombre')
    } else if (esSoloNumeros(nombres)) {
        alert('No se permiten solo números. Ingresa un nombre válido.')
    } else {
        listaDeNombres.push(nombres)
        agregarNombresLista();
        limpiarCaja()
    }
}

function agregarNombresLista(){
    let asignarNombres = document.getElementById('listaAmigos')
    asignarNombres.innerHTML = "";

    for (let i = 0 ; listaDeNombres.length>i;i++){
        let li = document.createElement("li")
        li.textContent = listaDeNombres[i]
        asignarNombres.appendChild(li);
    }
}

function limpiarCaja(){
    const input = document.getElementById('amigo');
    if (input) {
        input.value = '';
        actualizarEstadoBoton(); // Actualizar estado del botón después de limpiar
    }
}

function sortearAmigo (){
    const resultado = document.getElementById('resultado');
    
    if(listaDeNombres.length > 1){
        // Crear lista de nombres disponibles (no elegidos aún)
        let nombresDisponibles = listaDeNombres.filter(nombre => !nombresYaElegidos.includes(nombre));
        
        // Si ya se eligieron todos, reiniciar y mostrar mensaje
        if (nombresDisponibles.length === 0) {
            nombresYaElegidos = []; // Reiniciar lista de elegidos
            nombresDisponibles = [...listaDeNombres]; // Copiar todos los nombres
            alert('¡Todos los amigos ya fueron elegidos! Reiniciando sorteos...');
        }
        
        // Elegir aleatoriamente de los disponibles
        let numeroRandom = Math.floor(Math.random() * nombresDisponibles.length);
        let amigoElegido = nombresDisponibles[numeroRandom];
        
        // Agregar a la lista de elegidos
        nombresYaElegidos.push(amigoElegido);
        
        console.log('Amigo elegido:', amigoElegido);
        console.log('Nombres ya elegidos:', nombresYaElegidos);
        console.log('Nombres disponibles restantes:', nombresDisponibles.length - 1);
        
        if (resultado) {
            resultado.textContent = amigoElegido;  
        }
    } else {
        alert('Ingrese como mínimo 2 nombres')
    }
}

// FUNCIÓN PARA REINICIAR LOS SORTEOS MANUALMENTE
function reiniciarSorteos() {
    nombresYaElegidos = [];
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.textContent = '';
    }
    alert('Sorteos reiniciados. Todos los nombres están disponibles nuevamente.');
    console.log('Sorteos reiniciados');
}