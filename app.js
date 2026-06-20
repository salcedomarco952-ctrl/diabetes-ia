function obtenerDatosFormulario() {
  return {
    edad: Number(document.getElementById("edad").value),
    glucosa: Number(document.getElementById("glucosa").value),
    presion: Number(document.getElementById("presion").value),
    imc: Number(document.getElementById("imc").value),
    antecedentes: document.getElementById("antecedentes").checked,
    sedentarismo: document.getElementById("sedentarismo").checked,
    muchaSed: document.getElementById("muchaSed").checked,
    orinaFrecuente: document.getElementById("orinaFrecuente").checked,
    perdidaPeso: document.getElementById("perdidaPeso").checked,
    cansancio: document.getElementById("cansancio").checked
  };
}

function calcularRiesgo(datos) {
  let puntaje = 0;

  if (datos.glucosa >= 200) puntaje += 45;
  else if (datos.glucosa >= 126) puntaje += 35;
  else if (datos.glucosa >= 100) puntaje += 15;

  if (datos.presion >= 140) puntaje += 15;
  if (datos.imc >= 30) puntaje += 20;
  if (datos.edad >= 45) puntaje += 10;
  if (datos.antecedentes) puntaje += 10;
  if (datos.sedentarismo) puntaje += 10;

  if (datos.muchaSed) puntaje += 10;
  if (datos.orinaFrecuente) puntaje += 10;
  if (datos.perdidaPeso) puntaje += 15;
  if (datos.cansancio) puntaje += 5;

  let esNino = datos.edad < 18;

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

  if (esNino) {
    recomendacion =
      "Paciente pediatrico: en ninos puede presentarse diabetes tipo 1 o tipo 2. " +
      "Si hay mucha sed, orina frecuente, perdida de peso o cansancio excesivo, " +
      "se recomienda evaluacion medica pediatrica lo antes posible. " +
      recomendacion;
  }

  if (esNino && datos.glucosa >= 200 && (datos.muchaSed || datos.orinaFrecuente || datos.perdidaPeso)) {
    nivel = "ALTO";
    clase = "riesgo-alto";
    recomendacion =
      "ALERTA PEDIATRICA: glucosa muy elevada con sintomas compatibles. " +
      "Acudir a evaluacion medica urgente. En ninos puede relacionarse especialmente con diabetes tipo 1.";
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

function simularArduino() {
  const lecturaArduino = generarLecturaArduino();

  document.getElementById("edad").value = lecturaArduino.edad;
  document.getElementById("glucosa").value = lecturaArduino.glucosa;
  document.getElementById("presion").value = lecturaArduino.presion;
  document.getElementById("imc").value = lecturaArduino.imc;
  document.getElementById("antecedentes").checked = lecturaArduino.antecedentes;
  document.getElementById("sedentarismo").checked = lecturaArduino.sedentarismo;
  document.getElementById("muchaSed").checked = lecturaArduino.muchaSed;
  document.getElementById("orinaFrecuente").checked = lecturaArduino.orinaFrecuente;
  document.getElementById("perdidaPeso").checked = lecturaArduino.perdidaPeso;
  document.getElementById("cansancio").checked = lecturaArduino.cansancio;

  const prediccion = calcularRiesgo(lecturaArduino);
  mostrarResultado(lecturaArduino, prediccion);

  alert("Arduino simulado conectado. Lectura recibida correctamente.");
}

function generarLecturaArduino() {
  const perfiles = ["BAJO", "MEDIO", "ALTO"];
  const perfil = perfiles[Math.floor(Math.random() * perfiles.length)];

  if (perfil === "BAJO") {
    return {
      edad: numeroAleatorio(18, 40),
      glucosa: numeroAleatorio(75, 110),
      presion: numeroAleatorio(100, 125),
      imc: numeroAleatorio(18, 24),
      antecedentes: false,
      sedentarismo: false,
      muchaSed: false,
      orinaFrecuente: false,
      perdidaPeso: false,
      cansancio: false
    };
  }

  if (perfil === "MEDIO") {
    return {
      edad: numeroAleatorio(35, 60),
      glucosa: numeroAleatorio(111, 160),
      presion: numeroAleatorio(126, 145),
      imc: numeroAleatorio(25, 32),
      antecedentes: Math.random() > 0.5,
      sedentarismo: true,
      muchaSed: Math.random() > 0.5,
      orinaFrecuente: Math.random() > 0.5,
      perdidaPeso: false,
      cansancio: true
    };
  }

  return {
    edad: numeroAleatorio(45, 85),
    glucosa: numeroAleatorio(180, 280),
    presion: numeroAleatorio(145, 180),
    imc: numeroAleatorio(30, 42),
    antecedentes: true,
    sedentarismo: true,
    muchaSed: true,
    orinaFrecuente: true,
    perdidaPeso: Math.random() > 0.4,
    cansancio: true
  };
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    <p><strong>Mucha sed:</strong> ${datos.muchaSed ? "Si" : "No"}</p>
<p><strong>Orina frecuente:</strong> ${datos.orinaFrecuente ? "Si" : "No"}</p>
<p><strong>Perdida de peso:</strong> ${datos.perdidaPeso ? "Si" : "No"}</p>
<p><strong>Cansancio excesivo:</strong> ${datos.cansancio ? "Si" : "No"}</p>
    <h3>Riesgo: ${prediccion.nivel}</h3>
    <p><strong>Puntaje:</strong> ${prediccion.puntaje}/100</p>
    <p><strong>Recomendacion:</strong> ${prediccion.recomendacion}</p>
  `;

  cambiarImagenDiagnostico(prediccion.nivel);
}

function cambiarImagenDiagnostico(nivel) {
  const imagen = document.getElementById("imagenRiesgo");
  const texto = document.getElementById("textoImagen");

  if (nivel === "BAJO") {
    imagen.src = "imagenes/bajo.jpg";
    texto.textContent = "Riesgo bajo: se recomienda mantener controles preventivos.";
  } else if (nivel === "MEDIO") {
    imagen.src = "imagenes/medio.jpg";
    texto.textContent = "Riesgo medio: se recomienda seguimiento y control médico.";
  } else if (nivel === "ALTO") {
    imagen.src = "imagenes/alto.jpg";
    texto.textContent = "Riesgo alto: se recomienda evaluación médica prioritaria.";
  }
}
function validarDatos(datos) {
  if ( datos.edad > 100) {
    return "La edad no debe superar los 100 años. Verifica el dato ingresado.";
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