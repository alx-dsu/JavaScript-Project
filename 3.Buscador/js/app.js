// Variables

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// Contenedor de resultados
const resultado = document.querySelector("#resultado");

const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;

//Generar objeto con la búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);

  //LLena opción años
  llenarSelect();
});

// Event listener para los select de búsqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;

  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;

  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;

    const autoHTML = document.createElement("P");
    autoHTML.textContent = `
        ${marca}
        ${modelo} - ${year} - ${puertas} - Transmisión:${transmision} - Precio:${precio} - Color:${color}
    `;

    // Insertar HTML
    resultado.appendChild(autoHTML);
  });
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = yearMax; i >= yearMin; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    sinAutos();
  }
  // console.log(resultado);
}

function sinAutos() {
  limpiarHTML();

  const sinAutos = document.createElement("div");
  sinAutos.classList.add("alert", "error");
  sinAutos.textContent = "No Existen autos con la busqueda relacionada";

  resultado.appendChild(sinAutos);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }

  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }

  return auto;
}

function filtrarMin(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }

  return auto;
}

function filtrarMax(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }

  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }

  return auto;
}
function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }

  return auto;
}
function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }

  return auto;
}
