var debuger = false;
var marcados = 0;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio

//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion
var data = {
    title: 'Requisitos para los trabajos en altura',
    title2: 'Requisitos para los trabajos en altura',
    status: false,
    src: 'audio/a-0.mp3',
    tarjetas: [
        {
            text: "Los empleadores deben diseñar perfiles específicos para trabajadores expuestos a riesgos de caída, teniendo en cuenta formación, experiencia y condición física para trabajar en altura de manera segura.",
            src: "audio/a-1.mp3",
            image: "imagen/img01.jpg"
        },
        {
            text: "Los trabajadores que realicen labores en altura no deben tener historial médico con patologías metabólicas, cardiovasculares, neurológicas, mentales u otras condiciones restrictivas.",
            src: "audio/a-2.mp3",
            image: "imagen/img02.jpg"
        },
        {
            text: "Vértigo o mareos.",
            src: "audio/a-3.mp3",
            image: "imagen/vertigo.jpg"
        },
        {
            text: "Alteraciones del equilibrio.",
            src: "audio/a-4.mp3",
            image: "imagen/equilibrio.jpg"
        },
        {
            text: "Alteraciones de la conciencia.",
            src: "audio/a-5.mp3",
            image: "imagen/consciencia.jpg"
        },
        {
            text: "Problemas de audición que afecten la comunicación verbal.",
            src: "audio/a-6.mp3",
            image: "imagen/elsordo.jpg"
        },
        {
            text: "Ceguera temporal o permanente.",
            src: "audio/a-7.mp3",
            image: "imagen/img07.png"
        },
        {
            text: "Alteraciones en la agudeza visual, percepción de color o profundidad.",
            src: "audio/a-8.mp3",
            image: "imagen/agudeza visual.jpg"
        },
        {
            text: "Problemas de comportamiento mentales derivados de fobias a las alturas u otros factores.",
            src: "audio/a-9.mp3",
            image: "imagen/fobia.jpg"
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
    }, 4000);
}

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
    reproducirAudioItem(data.src);
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
    if (marcados == data.tarjetas.length) {
        $('#finInduccionModal').modal('show');
    }
}

miAudio.addEventListener("play", function () {
    if (!debuger) {
        $(".btn-close-custom").prop("disabled", true);
        // Aplicar el estilo de fondo
        $(".btn-close-custom").css("background-color", "rgb(57, 57, 55)");
        document.querySelectorAll(".miniatura").forEach(elemento => elemento.style.pointerEvents = "none");
    }
});

miAudio.addEventListener("ended", function () {
    $(".btn-close-custom").prop("disabled", false);
    $(".btn-close-custom").css("background-color", "orange");

    document.querySelectorAll(".miniatura").forEach(elemento => elemento.style.pointerEvents = "auto");
});

function aplicarAnimacion(selector, className) {
    var elementoAnimacion = document.querySelector(selector);
    elementoAnimacion.classList.remove(className);
    void elementoAnimacion.offsetWidth;
    elementoAnimacion.classList.add(className);
}

function crearDivCentrados(id, elementos) {
    var contenedor = document.getElementById(id);
    elementos.forEach((elemento, index) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-4 col-sm-4 col-6 mb-3 mt-3";

        const item = document.createElement("div");
        item.className = "item rounded-3 text-center d-flex justify-content-center align-items-center h-100";
        item.textContent = elemento.text;
        item.id = `elemento-${index}`;
        item.addEventListener("click", function () {
            if (debuger) {
                item.classList.add('clicked');

                $('#modal-primary').modal('show');
                $('#img-modal').attr('src', elemento.image);

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



function main() {
    updateTitle();
    ocultarTitulos();
    $('#miModal').modal('show');
    $('#title-theme').text(data.title2);
    $('#modalLabel').text(data.title2);
}

// Mostrar el modal de carga al inicio
$(window).on('load', function () {
    $('#cargaModal').modal('hide');
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
// Función para mostrar información adicional en la tarjeta posterior al hacer clic en la imagen
function mostrarInformacionAdicional() {
    // Actualiza el contenido de la tarjeta posterior si es necesario
    document.querySelector('.back #informacion-adicional').textContent = 'Información adicional que deseas mostrar al hacer clic en la imagen.';
}


var flipButton = document.getElementById("flipButton");
var flipContent = document.querySelector(".flip-content");

var isFrontVisible = true; // Para rastrear si la cara frontal está visible inicialmente

function voltear() {
    var imgModal = document.getElementById("img-content");
    var textModal = document.getElementById("text-content");

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


function seleccionarImagen(elemento) {
    // Obtener todas las miniaturas
    var miniaturas = document.querySelectorAll('.miniatura');

    // Quitar la clase 'active' de todas las miniaturas
    miniaturas.forEach(function (miniatura) {
        miniatura.classList.remove('active');
    });

    // Agregar la clase 'active' al elemento que hizo clic
    elemento.classList.add('active');
}

function generarMiniaturas(data, carouselId, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    var contador = 1;
    data.forEach((data, i) => {
        var click = false;
        const miniatura = document.createElement('div');
        miniatura.classList.add('col-12', 'miniatura', 'd-flex', 'justify-content-center');
        // if (i === 0) {
        //     miniatura.classList.add('active');
        //     $('#img-content').attr('src', data.image);
        //     $('#text-content').text(data.text);
        //     click = true;
        // }
        miniatura.onclick = function () {
            if (!click) {
                contador += 1;
                click = true;
            }

            if (!isFrontVisible) {
                voltear();
            }
            var miniaturas = document.querySelectorAll('.miniatura');

            // Quitar la clase 'active' de todas las miniaturas
            // miniaturas.forEach(function (miniatura) {
            //     miniatura.classList.remove('active');
            // });

            // Agregar la clase 'active' al elemento que hizo clic
            this.classList.add('active');
            $("#img-modal").on("load", function () {
                $(".container-loading-img").removeClass("loading-image");
            });

            $(".container-loading-img").addClass("loading-image");

            $('#img-content').attr('src', data.image);
            $('#text-content').text(data.text);
            reproducirAudioItem(data.src);
            if (contador == 9) {
                if (!debuger) {
                    console.log("Aqui logica para completar nivel");
                    window.parent.validarPuntaje(20, "opcion");
                    debuger = true;
                }
            }
        };
        miniatura.setAttribute('data-bs-target', `#${carouselId}`);
        miniatura.setAttribute('data-bs-slide-to', i);

        const img = document.createElement('img');
        img.className = "loading-image";
        img.src = data.image;
        img.alt = data.text;

        miniatura.appendChild(img);
        contenedor.appendChild(miniatura);
    });
}



// Llama a la función y pasa la colección de imágenes, el ID del carrusel y el ID del contenedor como parámetros
generarMiniaturas(data.tarjetas, 'carouselExampleCaptions', 'miniatura-content'); // Reemplaza 'tu-contenedor' con el ID de tu contenedor
