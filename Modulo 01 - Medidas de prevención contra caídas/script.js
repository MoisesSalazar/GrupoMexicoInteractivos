var debuger = false;
var marcados = 0;
var fin = false;
var validar_modal = false;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio
var mostrar = true;
//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion
var data = {
    title: 'Medidas de prevención contra caídas',
    title2: 'Medidas de prevención contra caídas',
    status: false,
    src: 'audio/leccion03.mp3',
    tarjetas: [
        {
            text: 'Sistema de Ingeniería',
            src: "audio/leccion03-1.mp3",
            image: 'imagen/Recurso 5.png',
            narracion: 'Aquí nos referimos a soluciones que involucran cambios en la infraestructura, diseños, modificaciones en las instalaciones o la implementación de sistemas con el objetivo de reducir o eliminar riesgos. Estas medidas pueden aislar a los trabajadores de peligros potenciales y reducir el tiempo que están expuestos a ellos. Todos estos sistemas deben ser documentados y respaldados en el programa de salud ocupacional de la organización. '
        },
        {
            text: 'Programa de Prevención contra caídas',
            src: "audio/leccion03-2.mp3",
            image: 'imagen/Recurso 8.png',
            narracion: 'Este programa abarca la planificación, organización, ejecución y evaluación de todas las actividades que puedan conllevar riesgos de caídas desde alturas, con el propósito de disminuir la incidencia de incidentes o accidentes. Estos programas proporcionan pautas para llevar a cabo trabajos en altura y pueden convertirse en manuales de procedimientos estándar. Es importante revisar y ajustar continuamente el programa para adaptarlo a cambios en la organización, en la legislación o en las operaciones que puedan surgir con el tiempo. '
        },
        {
            text: 'Delimitación del área',
            src: "audio/leccion03-3.mp3",
            image: 'imagen/07.png',
            narracion: 'La delimitación de áreas tiene como objetivo prevenir que los trabajadores se acerquen a zonas donde podrían estar expuestos a riesgos de caídas. Ninguna persona que no cuente con el permiso de trabajo correspondiente y los Equipos de Protección Personal (EPP) adecuados debe ingresar a una zona de trabajo en altura. Se pueden utilizar medios como marcas en el suelo para indicar las rutas peatonales o mallas de protección para evitar la caída de objetos.'
        },
        {
            text: 'Instalación de barandas',
            src: "audio/b-1.mp3",
            image: 'imagen/img01.png',
            narracion: '',
            carousel: [
                {
                    text: 'Programa de Prevención contra caídas',
                    src: "audio/b-1.mp3",
                    image: 'imagen/img01.png',
                    narracion: 'Las barandas son una herramienta esencial para prevenir caídas. Al restringir los movimientos, mantienen a los trabajadores a salvo de posibles riesgos de caídas.'
                },
                {
                    text: 'Delimitación del área',
                    src: "audio/b-2.mp3",
                    image: 'imagen/img02.png',
                    narracion: 'Las barandas deben ser lo suficientemente robustas como para soportar al menos 90 kg en la dirección de una posible caída. '
                },
                {
                    text: 'Instalación de barandas',
                    src: "audio/b-3.mp3",
                    image: 'imagen/img03.png',
                    narracion: 'Su altura debe oscilar entre 1 y 1.2 metros desde la superficie en la que se camina o trabaja.'
                },
                {
                    text: 'Inspector de Seguridad',
                    src: "audio/b-4.mp3",
                    image: 'imagen/img04.png',
                    narracion: 'También, deben contar con rodapiés de 15 a 20 cm para brindar protección adicional. '
                },
            ]
        },
        {
            text: 'Inspector de Seguridad',
            src: "audio/leccion03-5.mp3",
            image: 'imagen/08.png',
            narracion: 'Designar a un inspector de seguridad competente es crucial para verificar las condiciones de seguridad en el trabajo en altura y controlar el acceso a áreas de riesgo durante la realización de tareas. Esta persona desempeña un papel vital en la supervisión y el cumplimiento de los protocolos de seguridad. '
        },
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
    mostrarRotacionTemp();
    if (!debuger) {
        if (window.parent.tienePointerEventsNone2()) {
            debuger = true;
        }
    }
}

// Función para continuar después del modal de fin de inducción
function continuarInduccion() {
    // Coloca aquí la lógica para continuar con la inducción o redirigir a la siguiente página
}

function finalizar() {
    if (marcados == data.tarjetas.length) {
        console.log("Aqui logica para completar nivel");
        debuger = true;
        window.parent.validarPuntaje(20, "opcion");
    }
}

$(".btn-close-custom").on("click", function () {
    $('#img-modal').attr('src', '');
    if (miAudio) {
        miAudio.pause(); // Detén la reproducción del audio
    }
    if (!isFrontVisible) {
        voltear();
    }
});


miAudio.addEventListener("play", function () {
    if (!debuger) {
        $(".btn-close-custom").prop("disabled", true);
        document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "none");
    }
});

miAudio.addEventListener("ended", function () {
    if (!validar_modal) {
        $(".btn-close-custom").prop("disabled", false);
        if (mostrar) {
            $(".btn-close-custom").prop("disabled", true);
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
    var numColumnas = 10; // Inicializamos con 12 columnas
    var num_elementos = Math.ceil(elementos.length / 2);
    $('#miniatura-content-modal').css('display', 'none !important');
    var miElemento = document.getElementById('miniatura-content-modal');
    elementos.forEach((elemento, index) => {
        const item = document.createElement("div");
        item.className = `item col-md-${numColumnas} d-flex justify-content-center align-items-center`;
        item.textContent = elemento.text;
        item.id = `elemento-${index}`;
        if (index == 3) {
            generarMiniaturas(elemento.carousel, 'carouselExampleCaptions', 'miniatura-content'); // Reemplaza 'tu-contenedor' con el ID de tu contenedor
        }
        item.addEventListener("click", function () {

            if (index == 3) {
                miElemento.style.display = 'block'; // Mostrar el elemento
                miElemento.classList.add('d-flex'); // Agregar la clase d-flex
                mostrar = true;
                $('#text-modal').text(elemento.carousel[0].narracion);
            } else {
                miElemento.style.display = 'none'; // Ocultar el elemento
                miElemento.classList.remove('d-flex'); // Quitar la clase d-flex
                $('#text-modal').text(elemento.narracion);
                mostrar = false;
            }

            if (debuger) {
                item.classList.add('clicked');

                $('#modal-primary').modal('show');
                $('#img-modal').attr('src', elemento.image);
                $('#title-secondary-modal').text(elemento.text);
                // $('#title-modal').text('Medidas de prevención contra caídas');
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
                    // $('#title-modal').text('Medidas de prevención contra caídas');
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
        numero.className = "numero";
        numero.textContent = index + 1;

        item.appendChild(numero);
        div.appendChild(item);
    });

    contenedor.appendChild(div);
}

function generarMiniaturas(data, carouselId, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    var contador = 1;
    data.forEach((data, i) => {
        var click = false;
        const miniatura = document.createElement('div');
        miniatura.classList.add('col-12', 'miniatura', 'd-flex', 'justify-content-center');
        if (i == 0) {
            miniatura.classList.add('active');
            $('#text-content').text(data.text);
            click = true;
            $('#text-modal').text(data.narracion);

        }
        miniatura.onclick = function () {
            if (!click) {
                contador += 1;
                click = true;
            }

            if (!isFrontVisible) {
                voltear();
            }
            // var miniaturas = document.querySelectorAll('.miniatura');

            // // Quitar la clase 'active' de todas las miniaturas
            // miniaturas.forEach(function (miniatura) {
            //     miniatura.classList.remove('active');
            // });

            // Agregar la clase 'active' al elemento que hizo clic
            this.classList.add('active');
            $('#img-modal').attr('src', data.image);
            $('#text-modal').text(data.narracion);
            reproducirAudioItem(data.src);
            if (contador >= 4) {
                console.log("Aqui logica para completar nivel");
                mostrar = false;
            } else {
                if (!debuger) {

                    mostrar = true;
                }
            }
        };
        miniatura.setAttribute('data-bs-target', `#${carouselId}`);
        miniatura.setAttribute('data-bs-slide-to', i);

        const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.text;

        miniatura.appendChild(img);
        contenedor.appendChild(miniatura);
    });
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
    // if (!window.parent.isMobile) {
    //     $(".mobile").css("height", "320px");
    // }
});

$(document).ready(function () {
    main();
    window.parent.document.addEventListener('fullscreenchange', () => {
        if (window.parent.document.fullscreenElement) {
            mostrarTitulos();
            // if (!window.parent.isMobile) {
            //     $(".mobile").css("height", "400px");
            // } else {
            //     if ($(window).height() < 400) {
            //         $(".mobile").css("height", "320px");
            //     }
            // }
        } else {
            ocultarTitulos();
            // if (!window.parent.isMobile) {
            //     $(".mobile").css("height", "320px");
            // } else {
            //     if ($(window).height() < 400) {
            //         $(".mobile").css("height", "320px");
            //     }
            // }
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

