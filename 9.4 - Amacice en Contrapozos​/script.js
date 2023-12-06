var debuger = true;
var marcados = 0;
var fin = false;
var validar_modal = false;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio
//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion
var data = {
    title: 'Amacice en Contrapozos',
    title2: 'Amacice en Contrapozos​',
    status: false,
    src: 'audio/leccion.mp3',
    tarjetas: [
        {
            text: 'Tubería de ventilación​​​',
            src: "audio/leccion01.mp3",
            image: 'imagen/Amacice en Contrapozos.png',
            narracion: `Al realizar el amacice en contrapozo debemos asegurarnos que la tubería de ventilación se encuentre instalada de manera correcta.​
            Además de señalizar la zona para evitar que sucedan accidentes.​`
        },
        {
            text: 'Equipo de protección personal​​',
            src: "audio/leccion02.mp3",
            image: 'imagen/Amacice en Contrapozos.png',
            narracion: `Debemos portar los equipos de seguridad necesarios, especialmente el arnés de seguridad y la línea de vida.​`
        }
    ]
}

function mostrarRotacionTemp() {
    var rotateInstruction = $('#rotateInstruction');

    // Mostrar el elemento
    rotateInstruction.show();

    // Ocultar el elemento después de 2 segundos (ajusta este valor según tus necesidades)
    setTimeout(function () {
        rotateInstruction.hide();
        reproducirAudioItem(data.src);
    }, 5);
}

function updateTitle() {
    const elementoPadre = window.parent.document.getElementById('title-padre');
    if (elementoPadre) {
        elementoPadre.textContent = data.title;
    }

    const elementoPadre2 = window.parent.document.getElementById('title-mobile');
    if (elementoPadre2) {
        elementoPadre2.textContent = data.title;
    }
}

function ocultarTitulos() {
    const titulo = document.querySelector('#title-theme');
    titulo.setAttribute('hidden', true);

}

function mostrarTitulos() {
    const titulo = document.querySelector('#title-theme');
    titulo.removeAttribute('hidden');

}

function reproducirAudioItem(src) {
    miAudio.src = src;
    miAudio.play();
}

function reproducirFirst() {
    $('#miModal').modal("hide");
    mostrarRotacionTemp();
    if (window.parent.tienePointerEventsNone2()) {
        debuger = true;
    }
    if (window.parent.isMobile) {
        mostrarRotacionTemp();
    }
}

// Función para continuar después del modal de fin de inducción
function continuarInduccion() {
    // Coloca aquí la lógica para continuar con la inducción o redirigir a la siguiente página
}

function finalizar() {
    if (marcados == data.tarjetas.length && !fin) {
        fin = true;
        debuger = true;
    }
}

miAudio.addEventListener("play", function () {
    if (!debuger) {
        $(".btn-close-custom").prop("disabled", true);
        document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "none");
    }
});
$(".btn-close-custom").on("click", function () {
    $('#img-modal').attr('src', '');
    if (miAudio) {
        miAudio.pause(); // Detén la reproducción del audio
    }
    if (!isFrontVisible) {
        voltear();
    }

});
miAudio.addEventListener("ended", function () {
    if (!validar_modal) {
        $(".btn-close-custom").prop("disabled", false);
    }
    if (marcados == 2) {
        if (!debuger) {
            console.log("Aqui logica para completar nivel");
            window.parent.validarPuntaje(20, "opcion");
            debuger = true;
        }
    }
    document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "auto");
});

function aplicarAnimacion(selector, className) {
    var elementoAnimacion = document.querySelector(selector);
    elementoAnimacion.classList.remove(className);
    void elementoAnimacion.offsetWidth;
    elementoAnimacion.classList.add(className);
}

function crearDivCentradosStep4(id, elementos) {
    var contenedor = document.getElementById(id);
    const div = document.createElement("div");
    div.className = "row justify-content-center mt-3 gap-2"; // Justificar todos los elementos a la derecha
    var numColumnas = 5; // Inicializamos con 12 columnas
    var num_elementos = Math.ceil(elementos.length / 2);
    elementos.forEach((elemento, index) => {
        const item = document.createElement("div");
        item.className = `item col-md-${numColumnas} d-flex justify-content-center align-items-center lh-sm`;
        item.textContent = elemento.text;
        item.id = `elemento-${index}`;
        item.addEventListener("click", function () {
            if (debuger) {
                item.classList.add('clicked');

                $('#modal-primary').modal('show');
                $('#img-modal').attr('src', elemento.image);
                $('#title-secondary-modal').text(elemento.text);
                $('#text-modal').text(elemento.narracion);
                reproducirAudioItem(elemento.src);
            } else {
                if (marcados >= index) {
                    if (!item.classList.contains('clicked')) {
                        item.classList.add('clicked');
                        marcados += 1;
                    }
                    $('#modal-primary').modal('show');
                    $('#img-modal').attr('src', elemento.image);
                    $('#title-secondary-modal').text(elemento.text);
                    $('#text-modal').text(elemento.narracion);
                    reproducirAudioItem(elemento.src);
                } else {
                    aplicarAnimacion(`#elemento-${marcados}`, 'animacion-crecer');
                }
            }
        });
        item.setAttribute("data-src", elemento.src);
        item.setAttribute("data-step", index);
        item.setAttribute("data-image", elemento.image);

        const numero = document.createElement("div");
        numero.className = "numero fw-bold";
        numero.textContent = index + 1;

        item.appendChild(numero);
        div.appendChild(item);
    });

    contenedor.appendChild(div);
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function main() {
    updateTitle();
    ocultarTitulos();
    $('#miModal').modal('show');
    $('#title-theme').text(data.title2);
    $('#modalLabel').text(data.title2);
    crearDivCentradosStep4('content', data.tarjetas);
}

// Mostrar el modal de carga al inicio
$(window).on('load', function () {
    $('#cargaModal').modal('hide');
});

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
