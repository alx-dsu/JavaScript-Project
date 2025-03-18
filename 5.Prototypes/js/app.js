// Constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
  /**
   * 1 = Americano 1.15
   * 2 = Asiatico 1.05
   * 3 = Europeo 1.35
   */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  // Leer el año
  const dif = new Date().getFullYear() - this.year;

  cantidad -= (dif * 3 * cantidad) / 100;

  /**
   * Básica 30% más
   * Completa 50% más
   */

  if (this.tipo == "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;

  console.log(cantidad);
};

function UI() {}

// Llena select de años
UI.prototype.addYear = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Muestra alertas en pantalla
UI.prototype.mostrarMsj = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.classList.add("mensaje", "mt-10", "rounded-lg");
  div.textContent = mensaje;

  // Insertar HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = function (total, seguro) {
  const { marca, año, tipo } = seguro;

  switch (marca) {
    case "1":
      txtMarca = "Americana";
    case "2":
      txtMarca = "Asiática";
    case "3":
      txtMarca = "Europea";
    default:
      break;
  }

  // Crear resultado
  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold text-white">Marca: <span class="font-normal"> ${txtMarca} </span></p>
        <p class="font-bold text-white">Año: <span class="font-normal"> ${año} </span></p>
        <p class="font-bold text-white">Tipo Seguro: <span class="font-normal capitalize"> ${tipo} </span></p>
        <p class="font-bold text-white">Total: <span class="font-normal"> $ ${total} </span></p>
    `;

  const resultadoDiv = document.querySelector("#resultado");
  //   resultadoDiv.appendChild(div);

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};

// Instanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.addYear();
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // Leer marca
  const marca = document.querySelector("#marca").value;

  // Leer año
  const year = document.querySelector("#year").value;

  // Leer tipo
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMsj("Todos los campos son obligatorios", "error");
    return;
  }
  //   ui.mostrarMsj("Cotizando ...", "exito");

  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }

  // Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  // Utilizar el prototype que va a cotizar
  ui.mostrarResultado(total, seguro);
}
