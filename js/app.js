// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); // Obtiene el año actual
const min = max - 10;

// ------- Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// --------- Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los automoviles al cargar

    // Llena las opciones de años
    llenarSelect();
})

// ----------- EventListener para los selectores de busqueda
marca.addEventListener('change', evt => {
    datosBusqueda.marca = evt.target.value;
    filtrarAuto(); // Una ves ocurra el evento filtramos el auto en tiempo real
})
year.addEventListener('change', evt => {
    datosBusqueda.year = parseInt(evt.target.value);
    filtrarAuto();
})
minimo.addEventListener('change', evt => {
    datosBusqueda.minimo = evt.target.value;
    filtrarAuto();
})
maximo.addEventListener('change', evt => {
    datosBusqueda.maximo = evt.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', evt => {
    datosBusqueda.puertas = evt.target.value;
    filtrarAuto();
})
transmision.addEventListener('change', evt => {
    datosBusqueda.transmision = evt.target.value;
    filtrarAuto();
})
color.addEventListener('change', evt => {
    datosBusqueda.color = evt.target.value;
    filtrarAuto();  
})

// -------- Funciones
function mostrarAutos(autos) {
    limpiarHTML(); //Elimina el HTML previo

    autos.forEach( auto => {

        const {marca, modelo, year, precio, puertas, color, transmision} = auto; 
        const autoHTML = document.createElement('P');

        autoHTML.textContent = ` 
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Color: ${color} - Precio: ${precio}
        `;

        // Insertar el HTML:
        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for (let i=max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i; 
        year.appendChild(opcion);
    }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    if(resultado.length) {
        mostrarAutos(resultado);
    }else {
        noResultado();
    }
}

// Si no hay resultados en la filtracion
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

// Filtros
function filtrarMarca(auto) {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto; // Si no, devuelve el auto completo para no perderlo
}
function filtrarYear(auto) {
    if(datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    }
    return auto;
}
function filtrarMinimo(auto) {
    if(datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if(datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas) {
        return auto.puertas == datosBusqueda.puertas;
    }
    return auto;
}
function filtrarTransmision(auto) {
    if(datosBusqueda.transmision) {
        return auto.transmision == datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    if(datosBusqueda.color) {
        return auto.color == datosBusqueda.color;
    }
    return auto;
}