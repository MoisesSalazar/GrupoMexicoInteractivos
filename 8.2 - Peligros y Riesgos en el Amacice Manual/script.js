var debuger = true;
var marcados = 0;
var fin = false;
var validar_modal = false;
var susbcount = 1;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio
var countblock = 1;
var habilitarBoton = false;
//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion
var data = {
  title: "Estilos de Liderazgo",
  title2: "Definiciones Generales",
  status: false,
  src: "audio/audio01.mp3",
  srcfinal: "audio/audio_end.mp3",
  srcimagecircle: "imagen/img01.jpg",
  imagen01: "imagen/huellas.png",
  imagen02: "imagen/diapo-17-20-23-25-27-29-31-33.png",
  tarjetas: [
    {
      text: "Entrenamiento Continuo​",
      src: "audio/audio02.mp3",
      image: "imagen/diapo-18.png",
      carouselimg: true,
      narracion: "Todos los trabajadores involucrados en el amacizado deben recibir entrenamiento completo y continuo sobre los procedimientos de seguridad, la identificación de peligros, evaluación de riesgos y la correcta ejecución del amacizado.",
      xy: [20, 30],
    },
    {
      text: "Planificación de Respuesta a Emergencias​​",
      src: "audio/audio03.mp3",
      image: "imagen/diapo-19.png",
      carouselimg: true,
      narracion: "Es necesario que tengamos un plan de respuesta a emergencias específico para situaciones relacionadas con el amacice.​",
      xy: [30, 35],
    },
    {
      text: "Equipo de Protección Personal​​​",
      src: "audio/audio04.mp3",
      image: "imagen/diapo-21.png",
      carouselimg: true,
      narracion: "Es necesario que los trabajadores involucrados en el amacizado utilicemos el EPP adecuado: casco, lentes de protección, respirador, guantes y botas de seguridad.​​",
      xy: [25, 50],
    },
    {
      text: "Monitoreo Ambiental​​​",
      src: "audio/audio05.mp3",
      image: "imagen/diapo 22_ok.png",
      carouselimg: true,
      narracion: "Debemos Realizar el monitoreo ambiental para detectar gases tóxicos como monóxido de carbono, que puedan acumularse en el área de trabajo y poner en peligro nuestra vida.​​",
      xy: [15, 65],
    },
    {
      text: "Comunicación permanente​​",
      src: "audio/audio06.mp3",
      image: "imagen/diapo 24_ok.png",
      carouselimg: true,
      narracion: "Estableceremos canales de comunicación efectivos entre los trabajadores y los supervisores, de modo que cualquier problema o situación de riesgo pueda ser reportado y abordado de inmediato.",
      xy: [20,78],
    },
    {
      text: "Mantenimiento de Herramientas​​",
      src: "audio/audio07.mp3",
      image: "imagen/diapo 26_ok.png",
      carouselimg: true,
      narracion: "Debemos dar mantenimiento regular a las herramientas de amacizado, asegurando que estén afiladas y en buen estado recuerda que las herramientas en mal estado pueden aumentar los riesgos y dificultar el amacizado seguro.",
      xy: [35, 79],
    },
    {
      text: "Participación Activa​​",
      src: "audio/audio08(1)(1).mp3",
      image: "imagen/diapo-28.png",
      carouselimg: true,
      narracion: "Debemos participar activamente en la mejora continua de los procedimientos de seguridad, compartiendo nuestras experiencias y sugerencias para mitigar riesgos.",
      xy: [55, 80],
    },
    {
      text: "Fomentar una cultura de Seguridad​​​",
      src: "audio/audio08(1).mp3",
      image: "imagen/diapo-30.png",
      carouselimg: true,
      narracion: "Mantener activa una cultura de seguridad en toda la organización, enfocándonos en la responsabilidad individual y colectiva para asegurar la seguridad en el amacizado y en todas las actividades mineras.",
      xy: [70, 80],
    },
  ],
};

function mostrarRotacionTemp() {
  var rotateInstruction = $("#rotateInstruction");

  // Mostrar el elemento
  rotateInstruction.show();

  // Ocultar el elemento después de 2 segundos (ajusta este valor según tus necesidades)
  setTimeout(function () {
    rotateInstruction.hide();
    reproducirAudioItem(data.src);
  }, 5);
}

function updateTitle() {
  const elementoPadre = window.parent.document.getElementById("title-padre");
  if (elementoPadre) {
    elementoPadre.textContent = data.title;
  }

  const elementoPadre2 = window.parent.document.getElementById("title-mobile");
  if (elementoPadre2) {
    elementoPadre2.textContent = data.title;
  }
}

function ocultarTitulos() {
  const titulo = document.querySelector("#title-theme");
  titulo.setAttribute("hidden", true);
}

function mostrarTitulos() {
  const titulo = document.querySelector("#title-theme");
  titulo.removeAttribute("hidden");
}

function reproducirAudioItem(src) {
  miAudio.src = src;
  miAudio.play();
}

function reproducirFirst() {
  $("#miModal").modal("hide");
  mostrarRotacionTemp();
  if (window.parent.tienePointerEventsNone2()) {
    debuger = true;
  }
}

function checkFinish() {
  if (marcados == data.tarjetas.length && !fin) {
    fin = true;
    return true;
  }
  return false;
}

$(".btn-close-custom").on("click", function () {
  susbcount = 1;
  $("#img-modal").attr("src", "");
  if (miAudio) {
    miAudio.pause(); // Detén la reproducción del audio
  }
  if (!isFrontVisible) {
    voltear();
  }
  var elementos = document.querySelectorAll(".miniatura");

  // Itera a través de los elementos y elimínalos uno por uno
  elementos.forEach(function (elemento) {
    elemento.remove();
  });

  if (checkFinish()) {
    reproducirAudioItem(data.srcfinal);
    console.log("TERMINASTE");
    if (!debuger) {
      console.log("Aqui logica para completar nivel");
      window.parent.validarPuntaje(20, "opcion");
      debuger = true;
    }
  }
});

miAudio.addEventListener("play", function () {
  if (!debuger) {
    $(".btn-close-custom").prop("disabled", true);
    document
      .querySelectorAll(".punto")
      .forEach((elemento) => (elemento.style.pointerEvents = "none"));
    if (habilitarBoton) {
      $(".btn-close-custom").prop("disabled", false);
      document
        .querySelectorAll(".punto")
        .forEach((elemento) => (elemento.style.pointerEvents = "auto"));
    }
  }

});

miAudio.addEventListener("ended", function () {
  if (!validar_modal && susbcount) {
    $(".btn-close-custom").prop("disabled", false);
  }
  document
    .querySelectorAll(".punto")
    .forEach((elemento) => (elemento.style.pointerEvents = "auto"));

});

function crearPuntosModalImageTexto(id, data) {
  var elementos = data.tarjetas;
  var imagen01 = data.imagen01;
  var imagen02 = data.imagen02;

  // Selecciona los divs por su id
  var divImagen01 = document.getElementById('image1');
  var divImagen02 = document.getElementById('image2');

  // Cambia el contenido interno de los divs a una etiqueta de imagen con la ruta de la imagen como su atributo src
  divImagen01.innerHTML = '<img src="' + imagen01 + '" alt="Imagen 1" class="img-fluid">';
  divImagen02.innerHTML = '<img src="' + imagen02 + '" alt="Imagen 2" class="img-fluid">';

  // Índice del último punto que se hizo clic
  var ultimoPuntoClic = 0;

  // Para cada elemento en el array elementos, crea un punto
  elementos.forEach(function (elemento, index) {
    // Asume que el elemento tiene las coordenadas x e y
    var coordenadas = elemento.xy;

    // Crea un elemento para representar el punto
    var punto = document.createElement('div');
    punto.className = 'punto';
    punto.id = 'punto-' + index; // Agrega un id al punto

    // Agrega un número al punto
    punto.textContent = index + 1;

    // Posiciona el punto en la imagen
    punto.style.top = coordenadas[1] + '%';
    punto.style.left = coordenadas[0] + '%';

    // Añade el punto a la imagen
    divImagen01.appendChild(punto);

    punto.addEventListener('click', function () {
      habilitarBoton = false;
      console.log("Index: ", index, "Ultimo: ", ultimoPuntoClic);
      // Verifica si el punto es el siguiente en el orden o si ya ha sido clickeado
      if (index <= ultimoPuntoClic) {
        // Si el punto es el siguiente en el orden y no tiene la clase 'clicked'
        if (index == ultimoPuntoClic && !this.classList.contains('clicked')) {
          // Incrementa el último punto que se hizo clic
          ultimoPuntoClic++;

          // Agrega la clase 'clicked' al punto
          this.classList.add('clicked');
        } else {
          habilitarBoton = true;
        }

        // Invoca una función para hacer ajustes al modal
        ajustarModal(elemento.narracion, elemento.image, elemento.text);
        reproducirAudioItem(elemento.src);

        // Si todos los puntos han sido clickeados, haz algo más
        if (ultimoPuntoClic === elementos.length) {
          console.log("Aqui logica para completar nivel");
          window.parent.validarPuntaje(20, "opcion");
          debuger = true;
        }
      } else {
        // Aplica la animación al punto
        aplicarAnimacion('#punto-' + (ultimoPuntoClic), 'animacion-crecer');
      }
    });
  });
}

function aplicarAnimacion(selector, className) {
  console.log(selector); //#punto-6
  var elementoAnimacion = document.querySelector(selector);
  elementoAnimacion.classList.remove(className);
  void elementoAnimacion.offsetWidth;
  elementoAnimacion.classList.add(className);
}


function ajustarModal(text, imagen, title) {
  $('#modal-primary').modal('show');
  $('#text-modal').text(text);
  $('#img-modal').attr('src', imagen);
  $('#title-modal').text(title);
}


function main() {
  updateTitle();
  ocultarTitulos();
  $("#miModal").modal("show");
  $("#title-theme").text(data.title);
  $("#modalLabel").text(data.title2);
  crearPuntosModalImageTexto("content", data);
}

// Mostrar el modal de carga al inicio
$(window).on("load", function () {
  $("#cargaModal").modal("hide");
});

$(document).ready(function () {
  main();
  window.parent.document.addEventListener("fullscreenchange", () => {
    if (window.parent.document.fullscreenElement) {
      mostrarTitulos();
    } else {
      ocultarTitulos();
    }
  });

});

var flipButton = document.getElementById("flipButton");
var flipContent = document.querySelector(".flip-content");

var isFrontVisible = true; // Para rastrear si la cara frontal está visible inicialmente

function voltear() {
  var imgModal = document.getElementById("img-modal");
  var textModal = document.getElementById("text-modal");

  // Detectar si el navegador es Firefox
  var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  if (isFrontVisible) {
    // Gira hacia la cara trasera (texto)
    if (isFirefox) {
      imgModal.style.display = 'none';
      textModal.style.display = 'block';
    }

    flipContent.style.transform = "rotateY(180deg)";
    flipButton.innerHTML = '<i class="fa-solid fa-text-slash"></i>';
  } else {
    // Gira hacia la cara frontal (imagen)
    if (isFirefox) {
      textModal.style.display = 'none';
      imgModal.style.display = 'block';
    }

    flipContent.style.transform = "rotateY(0deg)";
    flipButton.innerHTML = '<i class="fa-solid fa-text-height"></i>';
  }

  // Cambia el estado de visibilidad
  isFrontVisible = !isFrontVisible;
}

flipButton.addEventListener("click", function () {
  voltear();
});


window.parent.validarPuntaje(20, "opcion");
