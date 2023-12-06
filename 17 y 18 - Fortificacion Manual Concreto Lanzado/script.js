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
  src: "audio/presentacion.mp3",
  srcfinal: "audio/audio_end.mp3",
  srcimagecircle: "imagen/img01.jpg",
  imagen01: "imagen/fondos-Manguera.png",
  imagen02: "imagen/fondos-Manguera.png",
  tarjetas: [
    {
      text: "Identificación de Riesgos​",
      src: "audio/audio01.mp3",
      image: "imagen/1.jpg",
      carouselimg: true,
      narracion: "Inspeccionamos el lugar de trabajo para identificar posibles riesgos y eliminarlos.​",
      xy: [3, 65],
    },
    {
      text: "Ventilación y Preparación​",
      src: "audio/audio02.mp3",
      image: "imagen/2.jpg",
      carouselimg: true,
      narracion: "Ventilamos el área si es necesario, asegurando un flujo de aire constante.​",
      xy: [6.5, 19],
    },
    {
      text: "Amacizado Completo​",
      src: "audio/audio03.mp3",
      image: "imagen/3.jpg",
      carouselimg: true,
      narracion: "Realizamos un amacizado completo del sitio de trabajo.​",
      xy: [13.5, 84],
    },
    {
      text: "Protección de cables y tuberías​",
      src: "audio/audio04.mp3",
      image: "imagen/4.jpg",
      carouselimg: true,
      narracion: "Aislamos o protegemos cables y tuberías de servicio de agua, aire o diesel, para prevenir dañarlos .​",
      xy: [20.5, 22],
    },
    {
      text: "Instalar equipo de lanzado​",
      src: "audio/audio05.mp3",
      image: "imagen/5.jpg",
      carouselimg: true,
      narracion: "Instalamos con cuidado el equipo de lanzado, ya sea neumático o eléctrico.​",
      xy: [27.5, 81.2],
    },
    {
      text: "Presión de aire​",
      src: "audio/audio06.mp3",
      image: "imagen/6.jpg",
      carouselimg: true,
      narracion: "Verificamos y ajustamos la presión de aire para garantizar la calidad del concreto lanzado.​",
      xy: [34.5, 14],
    },
    {
      text: "Revisión del Suministro de Agua​",
      src: "audio/audio07.mp3",
      image: "imagen/7.jpg",
      carouselimg: true,
      narracion: "Asegurémonos de tener suficiente agua disponible para el suministro del equipo de lanzado.​",
      xy: [42., 82],
    },
    {
      text: "Arranque del Equipo​",
      src: "audio/audio08.mp3",
      image: "imagen/8.jpg",
      carouselimg: true,
      narracion: "Al poner en marcha el equipo, proporcionamos primero el agua y luego el aire.​",
      xy: [49.3, 20],
    },
    {
      text: "Limpieza del área que se zarpeará​",
      src: "audio/audio09.mp3",
      image: "imagen/9.jpg",
      carouselimg: true,
      narracion: "Limpiar con agua y aire del equipo el área a zarpear.​",
      xy: [56.4, 77.6],
    },
    {
      text: "Suministro de Cemento​",
      src: "audio/audio10.mp3",
      image: "imagen/10.jpg",
      carouselimg: true,
      narracion: "Suministramos el cemento al equipo de acuerdo con la capacidad de control del equipo lanzador.​",
      xy: [63.5, 23.5],
    },
    {
      text: "Distancia para el zarpeado​",
      src: "audio/audio11.mp3",
      image: "imagen/11.jpg",
      carouselimg: true,
      narracion: "Posicionamos la punta de la manguera de lanzado a una distancia entre 1 y 1.5 metros de la superficie a zarpear.​",
      xy: [70.5, 81],
    },
    {
      text: "Evitar Lanzado Falso​",
      src: "audio/audio12.mp3",
      image: "imagen/12.jpg",
      carouselimg: true,
      narracion: "La primera capa de concreto debe cubrir completamente los elementos de refuerzo.​ Esta técnica evita el fenómeno del lanzado falso, donde el rebote no se adhiere adecuadamente a la superficie rocosa.​",
      xy: [77.5, 27.5],
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

  // Selecciona los divs por su id
  var divImagen01 = document.getElementById('image1');

  // Cambia el contenido interno de los divs a una etiqueta de imagen con la ruta de la imagen como su atributo src
  divImagen01.innerHTML = '<img src="' + imagen01 + '" alt="Imagen 1" class="img-fluid img-fondo">';

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
