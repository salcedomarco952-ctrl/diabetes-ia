function obtenerDatosFormulario() {
  return {
    edad: Number(document.getElementById("edad").value),
    glucosa: Number(document.getElementById("glucosa").value),
    presion: Number(document.getElementById("presion").value),
    imc: Number(document.getElementById("imc").value),
    antecedentes: document.getElementById("antecedentes").checked,
    sedentarismo: document.getElementById("sedentarismo").checked
  };
}

function calcularRiesgo(datos) {
  let puntaje = 0;

  if (datos.glucosa >= 126) puntaje += 35;
  if (datos.presion >= 140) puntaje += 15;
  if (datos.imc >= 30) puntaje += 20;
  if (datos.edad >= 45) puntaje += 10;
  if (datos.antecedentes) puntaje += 10;
  if (datos.sedentarismo) puntaje += 10;

  let nivel = "BAJO";
  let recomendacion = "Mantener monitoreo y habitos saludables.";
  let clase = "riesgo-bajo";

  if (puntaje >= 70) {
    nivel = "ALTO";
    recomendacion = "Derivar al paciente a evaluacion medica prioritaria.";
    clase = "riesgo-alto";
  } else if (puntaje >= 40) {
    nivel = "MEDIO";
    recomendacion = "Solicitar control de glucosa y seguimiento preventivo.";
    clase = "riesgo-medio";
  }

  return { puntaje, nivel, recomendacion, clase };
}

function diagnosticarManual() {
  const datos = obtenerDatosFormulario();

  const error = validarDatos(datos);

  if (error) {
    mostrarAdvertencia(error);
    return;
  }

  const prediccion = calcularRiesgo(datos);
  mostrarResultado(datos, prediccion);
}

function usarSimulador() {
  const datos = {
    edad: Math.floor(Math.random() * (75 - 25 + 1)) + 25,
    glucosa: Math.floor(Math.random() * (230 - 80 + 1)) + 80,
    presion: Math.floor(Math.random() * (170 - 110 + 1)) + 110,
    imc: Math.floor(Math.random() * (38 - 20 + 1)) + 20,
    antecedentes: Math.random() > 0.5,
    sedentarismo: Math.random() > 0.5
  };

  document.getElementById("edad").value = datos.edad;
  document.getElementById("glucosa").value = datos.glucosa;
  document.getElementById("presion").value = datos.presion;
  document.getElementById("imc").value = datos.imc;
  document.getElementById("antecedentes").checked = datos.antecedentes;
  document.getElementById("sedentarismo").checked = datos.sedentarismo;

  const prediccion = calcularRiesgo(datos);
  mostrarResultado(datos, prediccion);
}

function mostrarResultado(datos, prediccion) {
  const resultado = document.getElementById("resultado");

  resultado.className = `resultado ${prediccion.clase || ""}`;

  resultado.innerHTML = `
    <h2>Resultado del diagnostico</h2>
    <p><strong>Edad:</strong> ${datos.edad} anos</p>
    <p><strong>Glucosa:</strong> ${datos.glucosa} mg/dL</p>
    <p><strong>Presion:</strong> ${datos.presion} mmHg</p>
    <p><strong>Indice de masa corporal:</strong> ${datos.imc}</p>
    <p><strong>Antecedentes:</strong> ${datos.antecedentes ? "Si" : "No"}</p>
    <p><strong>Sedentarismo:</strong> ${datos.sedentarismo ? "Si" : "No"}</p>
    <hr>
    <h3>Riesgo: ${prediccion.nivel}</h3>
    <p><strong>Puntaje:</strong> ${prediccion.puntaje}/100</p>
    <p><strong>Recomendacion:</strong> ${prediccion.recomendacion}</p>
  `;
}

function validarDatos(datos) {
  if (datos.edad < 18 || datos.edad > 100) {
    return "La edad debe estar entre 18 y 100 años. Verifica el dato ingresado.";
  }

  if (datos.glucosa < 50 || datos.glucosa > 500) {
    return "La glucosa debe estar entre 50 y 500 mg/dL. El valor ingresado no es clínicamente válido.";
  }

  if (datos.presion < 70 || datos.presion > 250) {
    return "La presión arterial debe estar entre 70 y 250 mmHg. Verifica la lectura.";
  }

  if (datos.imc < 10 || datos.imc > 70) {
    return "El IMC debe estar entre 10 y 70. El valor ingresado no parece realista.";
  }

  return null;
}

function mostrarAdvertencia(mensaje) {
  const resultado = document.getElementById("resultado");

  resultado.className = "resultado riesgo-alto";

  resultado.innerHTML = `
    <h2>Advertencia</h2>
    <p><strong>Dato no válido:</strong></p>
    <p>${mensaje}</p>
    <p>Corrige el valor antes de realizar el diagnóstico.</p>
  `;
}