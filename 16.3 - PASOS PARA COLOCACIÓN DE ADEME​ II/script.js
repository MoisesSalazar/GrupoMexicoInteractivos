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
  imagen01: "imagen/fondos-Socavónmadera.png",
  imagen02: "imagen/fondo2.png",
  tarjetas: [
    {
      text: "Colocación de Viga Horizontal​​",
      text2: "Colocación de Viga Horizontal​​",
      src: "audio/audio8.mp3",
      image: "imagen/8.jpg",
      carouselimg: true,
      narracion: "Sobre los primeros dos postes, colocamos una viga horizontal y la sujetamos firmemente con tornillería o clavos.​​​",
      xy: [52 + 5, 10 + 12], // Modificado
    },
    {
      text: "Posicionamiento de Postes​​",
      text2: "Posicionamiento de Postes​​​",
      src: "audio/audio9.mp3",
      image: "imagen/9.jpg",
      carouselimg: true,
      narracion: `Continuamos colocando los siguientes postes a una distancia de entre 1 y 1.5 metros.​`,
      xy: [52 + 5, 30 + 12], // Modificado
    },
    {
      text: "Montaje de Plataformas​​",
      text2: "Montaje de Plataformas​",
      src: "audio/audio10.mp3",
      image: "imagen/10.jpg",
      carouselimg: true,
      narracion: `Colocamos vigas horizontales entre el primer par de postes y el segundo.​​`,
      xy: [52 + 5, 50 + 12], // Modificado
    },
    {
      text: "Calzar Viga Horizontal​",
      text2: "Calzar Viga Horizontal​",
      src: "audio/audio11.mp3",
      image: "imagen/11.jpg",
      carouselimg: true,
      narracion: "Si la viga horizontal no toca las paredes, la calzamos con madera para asegurar su estabilidad.​",
      xy: [52 + 5, 70 + 12], // Modificado
    },
    {
      text: "Capa de Apoyo​",
      text2: "Capa de Apoyo​​",
      src: "audio/audio12.mp3",
      image: "imagen/12.jpg",
      carouselimg: true,
      narracion: "Sobre la base creada, colocamos una capa de madera y/o vigas de acero. Aseguramos esta capa a la base con tornillos y/o clavos.​",
      xy: [75 + 5, 10 + 12], // Modificado
    },
    {
      text: "Relleno de madera​​​​​​",
      text2: "Relleno de madera​​​",
      src: "audio/audio13.mp3",
      image: "imagen/13.jpg",
      carouselimg: true,
      narracion: "Añadimos un relleno de madera ligera entre el ademe y el contracielo para cerrar el hueco entre ambas estructuras.​",
      xy: [75 + 5, 30 + 12], // Modificado
    }
    ,
    {
      text: "Selección del material​​​​​​",
      text2: "Selección del material​​​",
      src: "audio/audio14.mp3",
      image: "imagen/15.jpg",
      carouselimg: true,
      narracion: "Seleccionamos los materiales de acuerdo con las dimensiones del terreno y las necesidades específicas de la obra.​​",
      xy: [75 + 5, 50 + 12], // Modificado
    }
    ,
    {
      text: "Comunicación con el supervisor​​",
      text2: "Comunicación con el supervisor​​",
      src: "audio/audio15.mp3",
      image: "imagen/15.jpg",
      carouselimg: true,
      narracion: "En caso de detectar daños en el ademe, informamos de inmediato al supervisor para tomar las medidas necesarias.​",
      xy: [75 + 5, 70 + 12], // Modificado
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
    punto.textContent = index + 8;
    contenedor.appendChild(punto);

    // Crea un nuevo div para la etiqueta
    // const etiqueta = document.createElement('div');
    // etiqueta.className = 'etiqueta etiqueta' + index;
    // etiqueta.textContent = elemento.text;
    // contenedor.appendChild(etiqueta);

    divImagen01.appendChild(contenedor);

    punto.addEventListener('click', function () {
      habilitarBoton = false;
      console.log("Index: ", index, "Ultimo: ", ultimoPuntoClic);
      if (index <= ultimoPuntoClic) {
        if (index == ultimoPuntoClic && !this.classList.contains('clicked')) {
          ultimoPuntoClic++;
          this.classList.add('clicked');

          // Cambia el contenido de la etiqueta
          // etiqueta.textContent = elemento.text;
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
