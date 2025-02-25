document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    cc_email: "",
    asunto: "",
    mensaje: "",
  };

  //Seleccionar elementos de interfaz
  const inputEmail = document.querySelector("#email");
  const inputCCEmail = document.querySelector("#cc_email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const cube = document.querySelector("#cube");

  //Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputCCEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetForm();
  });

  function enviarEmail(e) {
    e.preventDefault();

    cube.classList.remove("hidden");

    setTimeout(() => {
      cube.classList.add("hidden");

      resetForm();

      // Crear alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "" && e.target.id !== "cc_email") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (
      (e.target.id === "email" || e.target.id === "cc_email") &&
      e.target.value.trim() !== ""
    ) {
      if (
        (e.target.id === "email" || e.target.id === "cc_email") &&
        !validarEmail(e.target.value)
      ) {
        mostrarAlerta(
          `Debe ser un ${e.target.id} válido`,
          e.target.parentElement
        );
        email[e.target.name] = "";
        comprobarEmail();
        return;
      }
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "rounded-lg");

    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function resetForm() {
    // Reiniciar el objeto
    email.email = "";
    email.cc_email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    // console.log("No se");
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }
});
