// Variables globales
var debuger = true; // Variable de depuración
var marcados = 0; // Contador de elementos marcados
var miAudio = document.getElementById("miAudio"); // Elemento de audio (reemplaza "miAudio" con el ID de tu elemento de audio)

// Datos para la presentación
var data = {
    title: 'Lección 01: Definiciones Generales',
    title2: 'Definiciones Generales',
    status: false,
    src: 'audio/presentacion.mp3',
    tarjetas: [
        {
            text: "Cuadros Rectos​",
            icon: "imagen/item04.png",
            src: "audio/audio04.mp3",
            image: "imagen/img04.jpg",
            narracion: `Utilizados cuando la mayor presión es del techo y los postes forman 90 grados con la viga.`
        },
        {
            text: "Cuadros Cónicos​",
            icon: "imagen/item05.png",
            src: "audio/audio05.mp3",
            image: "imagen/img05.jpg",
            narracion: `Utilizados cuando la mayor presión proviene del techo, tienen la viga más corta y sus postes inclinados.`
        },
        {
            text: "Cuadros Cojos​",
            icon: "imagen/item06.png",
            src: "audio/audio06.mp3",
            image: "imagen/img06.jpg",
            narracion: `Compuestos por un poste y una viga, ideales para espacios estrechos  menores a 3 metros.`
        }
    ]
}

// Función para mostrar una animación de rotación temporal
function mostrarRotacionTemp() {
    var rotateInstruction = $('#rotateInstruction');

    // Mostrar el elemento
    rotateInstruction.show();

    // Ocultar el elemento después de 4 segundos (ajusta este valor según tus necesidades)
    setTimeout(function () {
        rotateInstruction.hide();
        reproducirAudioItem(data.src);
    }, 4000);
}

// Función para actualizar el título en el documento padre
function updateTitle() {
    const elementoPadre = window.parent.document.getElementById('title-padre');
    if (elementoPadre) {
        elementoPadre.textContent = data.title2;
    }

    const elementoPadre2 = window.parent.document.getElementById('title-mobile');
    if (elementoPadre2) {
        elementoPadre2.textContent = data.title2;
    }
}

// Función para ocultar títulos
function ocultarTitulos() {
    const titulo = document.querySelector('#title-theme');
    titulo.setAttribute('hidden', true);
}

// Función para mostrar títulos
function mostrarTitulos() {
    const titulo = document.querySelector('#title-theme');
    titulo.removeAttribute('hidden');
}

// Función para reproducir un elemento de audio
function reproducirAudioItem(src) {
    miAudio.src = src;
    miAudio.play();
}

// Función para reproducir el primer elemento
function reproducirFirst() {
    $('#miModal').modal("hide");
    reproducirAudioItem(data.src);
    if (window.parent.tienePointerEventsNone2()) {
        debuger = true;
    }
    if (window.parent.isMobile) {
        mostrarRotacionTemp();
    }
}


// Función para finalizar la inducción
function finalizar() {
    if (marcados == data.tarjetas.length) {
        $('#finInduccionModal').modal('show');
    }
}

// Evento cuando el audio comienza a reproducirse
miAudio.addEventListener("play", function () {
    if (!debuger) {
        $(".btn-close-custom").prop("disabled", true);
        // Aplicar el estilo de fondo
        $(".btn-close-custom").css("background-color", "rgb(57, 57, 55)");
        document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "none");
    }
});

// Evento cuando el audio termina de reproducirse
miAudio.addEventListener("ended", function () {
    $(".btn-close-custom").prop("disabled", false);
    $(".btn-close-custom").css("background-color", "orange");

    document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "auto");
});

// Función para aplicar una animación CSS a un elemento
function aplicarAnimacion(selector, className) {
    var elementoAnimacion = document.querySelector(selector);
    elementoAnimacion.classList.remove(className);
    void elementoAnimacion.offsetWidth;
    elementoAnimacion.classList.add(className);
}

// Función para crear divs centrados con tarjetas
function crearDivCentrados(id, elementos) {
    var contenedor = document.getElementById(id);
    elementos.forEach((elemento, index) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-4 col-sm-4 col-6 mb-3 mt-3 d-flex justify-content-center";

        const item = document.createElement("div");
        item.className = "item card";
        item.style.width = "18rem";
        item.style.borderRadius = "35px";

        const img = document.createElement("img");
        img.src = elemento.icon; // Asegúrate de que 'elemento.image' contiene la ruta correcta a la imagen
        img.className = "card-img-top card-img-top-custom";
        img.alt = "Imagen de la tarjeta";

        item.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex align-items-center justify-content-center";

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = elemento.text; // Asegúrate de que 'elemento.text' contiene el texto correcto
        cardBody.appendChild(cardText);

        item.appendChild(cardBody);
        item.id = `elemento-${index}`;
        item.addEventListener("click", function () {
            if (debuger) {
                item.classList.add('clicked');

                $('#modal-primary').modal('show');
                $('#img-modal').attr('src', elemento.image);
                $('#text-modal').text(elemento.narracion);
                $('#title-secondary-modal').text(elemento.text);
                reproducirAudioItem(elemento.src);

            } else {
                if (marcados >= index) {
                    if (!item.classList.contains('clicked')) {
                        item.classList.add('clicked');
                        marcados += 1;
                    }
                    $('#modal-primary').modal('show');
                    $('#img-modal').attr('src', elemento.image);
                    $('#text-modal').text(elemento.narracion);
                    $('#title-secondary-modal').text(elemento.text);
                    reproducirAudioItem(elemento.src);
                } else {
                    aplicarAnimacion(`#elemento-${marcados}`, 'animacion-crecer');
                }
            }
            if (marcados == 9) {
                window.parent.validarPuntaje(20, "opcion");
                debuger = true;
            }
        });
        const numero = document.createElement("div");
        numero.className = "numero";
        numero.textContent = index + 1;

        item.appendChild(numero);
        div.appendChild(item);

        contenedor.appendChild(div);
    });
}

// Función principal
function main() {
    updateTitle();
    ocultarTitulos();
    $('#miModal').modal('show');
    $('#title-theme').text(data.title2);
    $('#modalLabel').text(data.title2);
    crearDivCentrados('content', data.tarjetas);
}

// Evento cuando se carga la página

// Evento de clic en el botón de cierre
$(".btn-close-custom").on("click", function () {
    $('#img-modal').attr('src', '');
    if (miAudio) {
        miAudio.pause(); // Detén la reproducción del audio
    }
    if (!isFrontVisible) {
        voltear();
    }
});

// Evento de cambio de pantalla completa
$(document).ready(function () {
    main();
    window.parent.document.addEventListener('fullscreenchange', () => {
        if (window.parent.document.fullscreenElement) {
            mostrarTitulos();
        } else {
            ocultarTitulos();
        }
    });
});


// Evento para voltear la tarjeta
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

// Evento de clic en el botón para voltear la tarjeta
flipButton.addEventListener("click", function () {
    voltear();
});

window.parent.validarPuntaje(20, "opcion");
