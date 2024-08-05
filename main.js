/*--------------------------------Calcular el Indice de Masa Corporal-----------------------------------*/

const calcularIMC = () => {
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;

    if (altura && peso) {
        const alturaMetros = altura / 100;
        const imc = (peso / (alturaMetros * alturaMetros)).toFixed(2);
        document.getElementById('resultado').value = imc;
    } else {
        document.getElementById('resultado').value = 'Por favor, ingrese su estatura y peso.';
    }
}

/*--------------------------------Calcular Tasa de Cambio USD -> COP-----------------------------------*/

const exchangeRate = 4052;

const convertCurrency = () => {
    const dollars = document.getElementById('dollars').value;
    const pesos = document.getElementById('pesos').value;

    if (document.activeElement.id === 'dollars') {
        document.getElementById('pesos').value = (dollars * exchangeRate).toFixed(2);
    } else {
        document.getElementById('dollars').value = (pesos / exchangeRate).toFixed(2);
    }
}

document.getElementById('dollars').addEventListener('input', convertCurrency);
document.getElementById('pesos').addEventListener('input', convertCurrency);

/*------------------------------------Aplicación de Notas---------------------------------*/

let ArrayNotas = [
    { id: 1, titulo: 'Sacar la basura', texto: 'Mi mamá me va a retar sino lo hago', realizada: false },
    { id: 2, titulo: 'Hacer la tarea', texto: 'Terminar los ejercicios de matemáticas', realizada: true }
];

let idGlobal = ArrayNotas[ArrayNotas.length - 1].id;

const mostrarNotas = () => {
    const container = document.getElementById('notasContainer');
    container.innerHTML = '';
    
    const filtroTexto = document.getElementById('filtroTexto').value.toLowerCase();
    const filtroRealizadas = document.getElementById('filtroRealizadas').checked;
    
    const notasFiltradas = ArrayNotas.filter(nota => {
        const cumpleTexto = nota.titulo.toLowerCase().includes(filtroTexto) || nota.texto.toLowerCase().includes(filtroTexto);
        const cumpleRealizada = !filtroRealizadas || nota.realizada;
        return cumpleTexto && cumpleRealizada;
    });

    if (notasFiltradas.length === 0) {
        container.innerHTML = '<p class="text-center">NO HAY NOTAS PARA MOSTRAR</p>';
        return;
    }

    notasFiltradas.forEach(nota => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'card mb-3 ms-3';
        noteDiv.innerHTML = `
            <div class="card-header">
                <div class="list-group w-100 d-flex justify-content-between align-items-center">
                    <label class="list-group-item w-100 d-flex align-items-center">
                        <input onClick="marcarRealizada(${nota.id})" class="form-check-input me-1" type="checkbox" ${nota.realizada ? "checked" : ""}>
                        <h2 class="titulo mb-0">${nota.titulo}</h2>
                    </label>
                </div>
            </div>
            <div class="card-body d-flex flex-column flex-grow-1">
                <p class="card-text">${nota.texto}</p>
                <div class="mt-auto text-center">
                    <button class="btn btn-danger btn-lg" onclick="borrarNota(${nota.id})">Borrar nota</button>
                </div>
            </div>
        `;
        container.appendChild(noteDiv);
    });
};


const agregarNota = () => {
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('nota').value;

    if (titulo && texto) {
        idGlobal++;
        ArrayNotas.push({
            id: idGlobal,
            titulo: titulo,
            texto: texto,
            realizada: false
        });
        mostrarNotas();
        limpiarForm();
    } else {
        alert('Por favor, completa ambos campos.');
    }
};

const borrarNota = (id) => {
    ArrayNotas = ArrayNotas.filter(nota => nota.id !== id);
    mostrarNotas();
};

const limpiarForm = () => {
    document.getElementById('titulo').value = '';
    document.getElementById('nota').value = '';
};

const marcarRealizada = (id) => {
    const nota = ArrayNotas.find(nota => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        mostrarNotas();
    }
};

document.getElementById('filtroTexto').addEventListener('input', mostrarNotas);
document.getElementById('filtroRealizadas').addEventListener('change', mostrarNotas);

window.onload = () => {
    mostrarNotas();
    convertCurrency();
};
