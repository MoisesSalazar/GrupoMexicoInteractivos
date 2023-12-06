var debuger = false;
var marcados = 0;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio
var modal_validar = false;
var flipButton = document.getElementById("flipButton");
var flipButton2 = document.getElementById("flipButton_2");
var flipContent = document.querySelectorAll(".flip-content");
var total = 0;
var isFrontVisible = true; // Para rastrear si la cara frontal está visible inicialmente
//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion


var data = {
    title: 'Causas de Caídas en Trabajos en Altura',
    title2: 'Causas de Caídas en Trabajos en Altura',
    status: false,
    src: 'audio/leccion2.mp3',
    tarjetas: [
        {
            text: 'Actos personales',
            src: 'audio/leccion3-tarjeta1.mp3',
            grafica: [
                {
                    text: 'Falta de Conocimiento',
                    src: 'audio/leccion3-tarjeta1-1.mp3',
                    image: 'imagen/Recurso 7.png',
                    x: '57',
                    y: '-22',
                    narracion: 'Los trabajadores pueden no estar al tanto de los riesgos asociados con su trabajo en altura ni de las normas de seguridad que deben seguir. '
                },
                {
                    text: 'Falta de Capacidades',
                    src: 'audio/leccion3-tarjeta1-2.mp3',
                    image: 'imagen/Recurso 3.png',
                    x: '0',
                    y: '55',
                    narracion: 'Algunos trabajadores pueden no tener las habilidades físicas, fisiológicas o mentales necesarias para realizar tareas en altura de manera segura. Esto puede incluir problemas médicos que aumenten el riesgo de desmayos u otros incidentes.'
                },
                {
                    text: 'Falta de Valorización de la Seguridad',
                    src: 'audio/leccion3-tarjeta1-3.mp3',
                    image: 'imagen/Recurso 6.png',
                    x: '-57',
                    y: '-22',
                    narracion: 'Cuando la gerencia, los supervisores y los trabajadores no tienen una actitud positiva hacia la seguridad, es más probable que se tomen riesgos innecesarios. '
                }
            ]
        },
        {
            text: 'Condiciones Inseguras',
            src: 'audio/leccion3-tarjeta2.mp3',
            grafica: [
                {
                    text: 'Superficies de Trabajo Defectuosas',
                    src: 'audio/leccion3-tarjeta2-1.mp3',
                    image: 'imagen/Recurso 19.png',
                    x: '45',
                    y: '-52',
                    narracion: 'Las superficies en las que se realizan las tareas pueden estar en mal estado, desprotegidas o no señalizadas adecuadamente, lo que aumenta el riesgo de caídas. '
                },
                {
                    text: 'Condiciones Climáticas Adversas',
                    src: 'audio/leccion3-tarjeta2-2.mp3',
                    image: 'imagen/Recurso 20.png',
                    x: '65',
                    y: '25',
                    narracion: 'Las condiciones climáticas como lluvia, viento, frío extremo o calor excesivo pueden dificultar la realización segura de trabajos en altura. '
                },
                {
                    text: 'Equipos de Trabajo Inadecuados o en Mal Estado',
                    src: 'audio/leccion3-tarjeta2-3.mp3',
                    image: 'imagen/Recurso 5.png',
                    x: '0',
                    y: '73',
                    narracion: 'Utilizar equipos defectuosos, inadecuados o sin mantenimiento adecuado puede aumentar significativamente el riesgo de caídas. '
                },
                {
                    text: 'Improvi- saciones',
                    src: 'audio/leccion3-tarjeta2-4.mp3',
                    image: 'imagen/Recurso 4.png',
                    x: '-65',
                    y: '25',
                    narracion: 'Cuando se llevan a cabo tareas en altura sin un estudio técnico adecuado o debido a la falta de planificación, se pueden crear condiciones inseguras. '
                },
                {
                    text: 'Peligros Anexos',
                    src: 'audio/leccion3-tarjeta2-5.mp3',
                    image: 'imagen/Recurso 21.png',
                    x: '-40',
                    y: '-50',
                    narracion: 'La presencia de energía eléctrica, bordes cortantes, espacios reducidos, iluminación deficiente o sustancias peligrosas en el entorno de trabajo puede aumentar el riesgo de caídas y otros accidentes. '
                }
            ]
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
    // if (marcados == data.tarjetas.length) {
    //     $('#finInduccionModal').modal('show');
    // }
}

miAudio.addEventListener("play", function () {
    if (!debuger) {
        $(".btn-close-custom").prop("disabled", true);
        // Aplicar el estilo de fondo
        $(".btn-close-custom").css("background-color", "rgb(57, 57, 55)");
        document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "none");
        document.querySelectorAll(".circle").forEach(elemento => elemento.style.pointerEvents = "none");
    }
});

$(".btn-close-custom").on("click", function () {
    if (miAudio) {
        miAudio.pause(); // Detén la reproducción del audio
    }
    if (!isFrontVisible) {
        voltear("img-modal", "text-modal");
        voltear("img-modal-2", "text-modal-2");
    }
    total += 1;
    if (total == 2) {
        if (!debuger) {
            console.log("Aqui logica para completar nivel");
            window.parent.validarPuntaje(20, "opcion");
            debuger = true;
        }
    }
});

miAudio.addEventListener("ended", function () {
    if (!modal_validar) {
        $(".btn-close-custom").prop("disabled", false);
    }
    $(".btn-close-custom").css("background-color", "orange");

    document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "auto");
    document.querySelectorAll(".circle").forEach(elemento => elemento.style.pointerEvents = "auto");

});

function aplicarAnimacion(selector, className) {
    var elementoAnimacion = document.querySelector(selector);
    elementoAnimacion.classList.remove(className);
    void elementoAnimacion.offsetWidth;
    elementoAnimacion.classList.add(className);
}

function grafico_radial(id, items, polygon, inicio, rango, num) {
    const graficoRadial = document.getElementById(id);
    const tajada_base = document.createElement("div");
    tajada_base.className = "circle-base";
    graficoRadial.appendChild(tajada_base);
    contador = 0;
    // Array de colores para las tajadas
    items.forEach((elemento, index) => {
        const tajada = document.createElement("div");
        tajada.className = "circle";

        // Calcula el ángulo para cada tajada en función de inicio y rango
        const angulo = inicio + index * rango;

        // Calcula el clip-path para cada tajada en función del ángulo
        const clipPathValue = polygon;
        tajada.style.clipPath = clipPathValue;
        tajada.style.transform = `rotate(${angulo}deg) translate(0px, -1px)`; // Cambia la transformación aquí

        // Agrega un evento click para cambiar el color y realizar una transformación
        tajada.addEventListener("click", () => {
            if (!tajada.classList.contains('clicked')) {
                tajada.classList.add('clicked');
                contador += 1;
                tajada.style.transform = `rotate(${angulo}deg) translate(0px, -5px)`; // Cambia la transformación aquí
            }
            if (contador == num) {
                modal_validar = false;
            }
            if (num == 3) {
                $('#img-modal').attr('src', elemento.image);
                $('#text-modal').text(elemento.narracion);
                if (!isFrontVisible) {
                    voltear("img-modal", "text-modal");
                }
            }
            if (num == 5) {
                $('#img-modal-2').attr('src', elemento.image);
                $('#text-modal-2').text(elemento.narracion);
                if (!isFrontVisible) {
                    voltear("img-modal-2", "text-modal-2");
                }
            }

            reproducirAudioItem(elemento.src);
        });

        graficoRadial.appendChild(tajada);
    });

    items.forEach((elemento) => {
        const text = document.createElement("p");
        text.textContent = elemento.text;
        text.classList.add('text-circle');

        // Llama a la función para ajustar la posición del texto
        ajustarPosicionTexto(text, elemento);

        graficoRadial.appendChild(text);
    });


}

function ajustarPosicionTexto(textElement, elemento) {
    // Define la función para ajustar la posición del texto
    const reposicionarTexto = () => {
        const { escalaCoordenadas, escalaFuente } = calcularEscala();
        textElement.style.transform = `scale(${escalaCoordenadas}) translate(${elemento.x}px, ${elemento.y}px)`;
    };

    // Calcula la escala en función del tamaño de pantalla
    const calcularEscala = () => {
        let escalaCoordenadas, escalaFuente;

        if (window.innerWidth <= 575.98) {
            escalaCoordenadas = 1.3; // Escala para móvil en coordenadas (x e y)
            escalaFuente = 25; // Escala para móvil en tamaño de fuente
        } else if (window.innerWidth <= 767.98) {
            escalaCoordenadas = 0.75; // Escala para móvil en orientación horizontal en coordenadas (x e y)
            escalaFuente = 0.7; // Escala para móvil en orientación horizontal en tamaño de fuente
        } else if (window.innerWidth <= 991.98) {
            escalaCoordenadas = 0.75; // Escala para pantalla mediana en coordenadas (x e y)
            escalaFuente = 0.8; // Escala para pantalla mediana en tamaño de fuente
        } else {
            if (window.innerHeight <= 600) {
                escalaCoordenadas = 1.2; // Escala para pantalla de escritorio en coordenadas (x e y)
                escalaFuente = 1.0; // Escala para pantalla de escritorio en tamaño de fuente
            } else {
                escalaCoordenadas = 2.2; // Escala para pantalla de escritorio en coordenadas (x e y)
                escalaFuente = 1.0; // Escala para pantalla de escritorio en tamaño de fuente

            }
        }
        return { escalaCoordenadas, escalaFuente };
    };

    // Agrega el evento resize para reposicionar el texto
    window.addEventListener('resize', reposicionarTexto);

    // Llama a la función inicialmente para establecer la posición
    reposicionarTexto();
}

function crearDivCentrados(id, elementos) {
    var contenedor = document.getElementById(id);
    const div = document.createElement("div");
    div.className = "row justify-content-center mt-3"; // Justificar todos los elementos a la derecha
    var numColumnas = 10; // Inicializamos con 12 columnas
    var num_elementos = Math.ceil(elementos.length / 2);
    elementos.forEach((elemento, index) => {
        const item = document.createElement("div");
        item.className = `item col-md-${numColumnas} mt-3 d-flex justify-content-center align-items-center`;
        item.textContent = elemento.text;
        item.id = `elemento-${index}`;
        item.addEventListener("click", function () {
            if (marcados >= index) {
                if (!item.classList.contains('clicked')) {
                    item.classList.add('clicked');
                    marcados += 1;
                    modal_validar = true
                }
                reproducirAudioItem(elemento.src);
                if (index == 0) {
                    $('#modal-primary').modal('show');
                    // $('#img-modal').attr('src', elemento.image);
                    $('#title-secondary-modal').text(elemento.text);
                } else {
                    $('#modal-secondary').modal('show');
                    // $('#img-modal').attr('src', elemento.image);
                    $('#title-secondary-modal_2').text(elemento.text);
                }
            } else {
                aplicarAnimacion(`#elemento-${marcados}`, 'animacion-crecer');
            }
        });

        const numero = document.createElement("div");
        numero.className = "numero";
        numero.textContent = index + 1;

        item.appendChild(numero);
        div.appendChild(item);
    });

    contenedor.appendChild(div);
}
function main() {
    updateTitle();
    ocultarTitulos();
    grafico_radial('grafico_radial', data.tarjetas[0].grafica, "polygon(0% 0%, 100% 0%, 100% 21%, 50% 50%, 0% 21%)", 60, 120, 3);
    grafico_radial('grafico_radial_2', data.tarjetas[1].grafica, "polygon(14.2% 0%, 86.8% 0%, 50% 50%)", 35, 72, 5);
    $('#miModal').modal('show');
    $('#title-theme').text(data.title2);
    $('#modalLabel').text(data.title2);
    crearDivCentrados('content', data.tarjetas);
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

function voltear(id1, id2) {
    var imgModal = document.getElementById(id1);
    var textModal = document.getElementById(id2);

    // Detectar si el navegador es Firefox
    var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

    if (isFrontVisible) {
        // Gira hacia la cara trasera (texto)
        if (isFirefox) {
            imgModal.style.display = 'none';
            textModal.style.display = 'block';
        }

        flipContent.forEach(function (flipContent) {
            flipContent.style.transform = "rotateY(180deg)";
        });
        flipButton.innerHTML = '<i class="fa-solid fa-text-slash"></i>';
    } else {
        // Gira hacia la cara frontal (imagen)
        if (isFirefox) {
            textModal.style.display = 'none';
            imgModal.style.display = 'block';
        }

        flipContent.forEach(function (flipContent) {
            flipContent.style.transform = "rotateY(0deg)";
        });
        flipButton.innerHTML = '<i class="fa-solid fa-text-height"></i>';
    }

    // Cambia el estado de visibilidad
    isFrontVisible = !isFrontVisible;
}
flipButton.addEventListener("click", function () {
    voltear("img-modal", "text-modal");
});

flipButton2.addEventListener("click", function () {
    voltear("img-modal-2", "text-modal-2");
});

