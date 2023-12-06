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
  imagen01: "imagen/fondos-malla-metálica.png",
  tarjetas: [
    {
      text: "Marcar Plantilla​",
      text2: "Marcar Plantilla de Barrenación​",
      src: "audio/audio02.mp3",
      image: "imagen/1.jpg",
      carouselimg: true,
      narracion: "Marcar la plantilla de barrenación de acuerdo con el diseño proporcionado.​",
      xy: [10, 15],
    },
    {
      text: "Montar Equipo​​​",
      text2: "Montar Equipo​",
      src: "audio/audio03.mp3",
      image: "imagen/2.jpg",
      carouselimg: true,
      narracion: "Montar el equipo de barrenación en la posición adecuada.​",
      xy: [10, 70],
    },
    {
      text: "Realizar los Barrenos​​",
      text2: "Perforación de Barrenos​",
      src: "audio/audio04.mp3",
      image: "imagen/3.jpg",
      carouselimg: true,
      narracion: "Realizar los barrenos de acuerdo con la plantilla marcada previamente por el Departamento de Mecánica de Rocas o el supervisor.​",
      xy: [35, 40],
    },
    {
      text: "Posicionar Ancla​​​​",
      text2: "Posicionar Ancla​​​​",
      src: "audio/audio05.mp3",
      image: "imagen/4.jpg",
      carouselimg: true,
      narracion: "Colocar el ancla en la ubicación específica del cuadro de la malla y luego en el barreno designado para fijarla al terreno.​",
      xy: [65, 15],
    },
    {
      text: "Empujar Ancla​​​",
      text: "Empujar Ancla​​​",
      src: "audio/audio06.mp3",
      image: "imagen/5.jpg",
      carouselimg: true,
      narracion: "Cambiar la barra de perforación por el zanco destinado al anclaje y empujar el ancla junto con la malla, asegurándose de alinearla con el barreno según sea necesario.​",
      xy: [65, 70],
    }
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

  elementos.forEach(function (elemento, index) {
    var coordenadas = elemento.xy;

    // Crea un nuevo div para el contenedor
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor';
    contenedor.style.top = coordenadas[1] + '%';
    contenedor.style.left = coordenadas[0] + '%';

    var punto = document.createElement('div');
    punto.className = 'punto';
    punto.id = 'punto-' + index;
    punto.textContent = index + 1;
    contenedor.appendChild(punto);

    // Crea un nuevo div para la etiqueta
    const etiqueta = document.createElement('div');
    etiqueta.className = 'etiqueta';
    etiqueta.textContent = elemento.text;
    contenedor.appendChild(etiqueta);

    divImagen01.appendChild(contenedor);

    punto.addEventListener('click', function () {
      habilitarBoton = false;
      console.log("Index: ", index, "Ultimo: ", ultimoPuntoClic);
      if (index <= ultimoPuntoClic) {
        if (index == ultimoPuntoClic && !this.classList.contains('clicked')) {
          ultimoPuntoClic++;
          this.classList.add('clicked');

          // Cambia el contenido de la etiqueta
          etiqueta.textContent = elemento.text;
        } else {
          habilitarBoton = true;
        }

        ajustarModal(elemento.narracion, elemento.image, elemento.text);
        reproducirAudioItem(elemento.src);

        if (ultimoPuntoClic === elementos.length) {
          console.log("Aqui logica para completar nivel");
          window.parent.validarPuntaje(20, "opcion");
          debuger = true;
        }
      } else {
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
