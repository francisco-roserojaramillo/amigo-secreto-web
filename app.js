// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar nombres de amigos
let amigos = [];

// Función para actualizar el contador de amigos
function actualizarContadorAmigos() {
    let mostrarContadorAmigos = document.getElementById('contadorAmigos');
    let botonSortear = document.querySelector('.button-draw');
    
    // Actualizar contador de amigos
    mostrarContadorAmigos.textContent = `Total de amigos: ${amigos.length}`;
    
    // Deshabilitar/habilitar botón de sorteo según cantidad de amigos
    botonSortear.disabled = amigos.length < 1;
    botonSortear.style.opacity = amigos.length < 2 ? '0.5' : '1';
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    // 1. Obtener el elemento de la lista
    let listaAmigos = document.getElementById('listaAmigos');
    
    // 2. Limpiar la lista existente
    listaAmigos.innerHTML = "";
    
    // 3. Iterar sobre el arreglo de amigos
    for (let i = 0; i < amigos.length; i++) {
        // 4. Agregar elementos a la lista
        let elementoLista = document.createElement('li');
        elementoLista.innerHTML = `
            ${amigos[i]} 
            <button onclick="eliminarAmigo('${amigos[i]}')" class="delete-friend">✖</button>
        `;
        listaAmigos.appendChild(elementoLista);
    }
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let campoAmigo = document.getElementById('amigo');
    let nombreAmigo = campoAmigo.value.trim();
    let listaAmigos = document.getElementById('listaAmigos');
    let listaResultados = document.getElementById('resultado');

    // Validar entrada
    if (nombreAmigo === '') {
        alert('Por favor, ingrese un nombre válido');
        return;
    }

    // Verificar nombres duplicados (sin distinguir mayúsculas/minúsculas)
    if (amigos.some(amigo => amigo.toLowerCase() === nombreAmigo.toLowerCase())) {
        alert('Este nombre ya ha sido agregado. Por favor, ingrese un nombre diferente.');
        campoAmigo.value = '';
        return;
    }

    // Agregar amigo al array
    amigos.push(nombreAmigo);
    
    // Actualizar la lista visual
    actualizarListaAmigos();

    // Limpiar campo de entrada
    campoAmigo.value = '';
    
    // Reiniciar lista de resultados
    listaResultados.innerHTML = '';

    // Actualizar contador de amigos y estado del botón
    actualizarContadorAmigos();
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(nombreAmigo) {
    let listaAmigos = document.getElementById('listaAmigos');
    let listaResultados = document.getElementById('resultado');

    // Eliminar del array
    amigos = amigos.filter(amigo => amigo !== nombreAmigo);

    // Actualizar la lista visual
    actualizarListaAmigos();

    // Reiniciar lista de resultados
    listaResultados.innerHTML = '';

    // Actualizar contador de amigos y estado del botón
    actualizarContadorAmigos();
}

// Función para reiniciar el juego después del sorteo
function reiniciarJuego() {
    // Limpiar array de amigos
    amigos = [];
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar campo de entrada
    document.getElementById('amigo').value = '';
    
    // Reiniciar lista de resultados
    // document.getElementById('resultado').innerHTML = '';
    
    // Actualizar contador
    actualizarContadorAmigos();
}

// Función para sortear un amigo aleatorio
function sortearAmigo() {
    let listaResultados = document.getElementById('resultado');

    // Validar número de amigos
    if (amigos.length === 0) {
        alert('Por favor, agregue al menos un amigo');
        return;
    }

    // Validar mínimo de amigos para el sorteo
    if (amigos.length < 2) {
        alert('Se necesitan al menos dos amigos para realizar el sorteo');
        return;
    }

    // Seleccionar un amigo aleatorio
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSeleccionado = amigos[indiceAleatorio];

    // Mostrar resultado
    listaResultados.innerHTML = `El amigo sorteado es: ${amigoSeleccionado}`;
    
    // Reiniciar el juego después de mostrar el resultado
    reiniciarJuego();
}

// Agregar event listener para la tecla Enter en el campo de entrada
document.addEventListener('DOMContentLoaded', () => {
    let campoAmigo = document.getElementById('amigo');
    let botonSortear = document.querySelector('.button-draw');

    // Agregar amigo al presionar Enter
    campoAmigo.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            agregarAmigo();
        }
    });

    // Crear elemento para mostrar contador de amigos
    let mostrarContador = document.createElement('div');
    mostrarContador.id = 'contadorAmigos';
    mostrarContador.textContent = 'Total de amigos: 0';
    document.querySelector('.input-section').insertBefore(
        mostrarContador, 
        document.querySelector('.button-container')
    );

    // Estado inicial del botón
    botonSortear.disabled = true;
    botonSortear.style.opacity = '0.5';
});