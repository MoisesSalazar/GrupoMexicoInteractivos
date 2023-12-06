var debuger = false;
var marcados = 0;
var fin = false;
var validar_modal = false;
var validar_segundo_modal = false;
var validar_tercero_modal = false;
var miAudio = document.getElementById("miAudio"); // Reemplaza "miAudio" con el ID de tu elemento de audio

//Actualizar data para nueva presentacion, solo cambiar las tarjetas, y la forma de crear su informacion
var data = {
    title: 'Plataformas',
    title2: 'Plataformas',
    status: false,
    src: 'audio/presentacion.mp3',
    tarjetas: [
        {
            text: 'Tipos',
            src: "audio/audio01.mp3",
            image: 'imagen/tipo.png',
            carousel: [
                {
                    src: "audio/audio01-1.mp3",
                    image: 'imagen/img01.png',
                    text: "Plataformas telescópicas",
                    narracion: "Estas plataformas su sistema de elevación se basa en una serie de brazos accionados hidráulicamente por un émbolo, los cuales entran y salen de otros más grandes que lo contienen.",
                },
                {
                    text: "Plataformas tipo tijeras",
                    narracion: "Este tipo de plataformas se elevan verticalmente, también pueden contener algún accesorio que le permita desplazarse frontalmente para poder saltar algún obstáculo, pero menor a 1.5 metros.",
                    src: "audio/audio01-2.mp3",
                    image: 'imagen/img02.png',
                },
                {
                    src: "audio/audio01-3.mp3",
                    image: 'imagen/img03.png',
                    text: "Plataformas articuladas",
                    narracion: "Este tipo de plataformas tienen mayor alcance de altura, la componen dos o más brazos articulados, uno de ellos se puede encontrar cercano a la cesta el cual le ayuda a salvar algunos obstáculos pequeños."
                }
            ]
        },
        {
            text: 'Inspección',
            src: "audio/audio02.mp3",
            image: 'imagen/inspeccion.png',
            imagen_2: 'imagen/Recurso 10.png',
            matriz: [
                [['c', 1], ['v'], ['c', 6], ['f', 'r'], ['c', 7], ['v'], ['c', 12], ['f', 'r'], ['c', 13]],
                [['f', 'd'], ['v'], ['f', 'u'], ['v'], ['f', 'd'], ['v'], ['f', 'u'], ['v'], ['f', 'd']],
                [['c', 2], ['v'], ['c', 5], ['v'], ['c', 8], ['v'], ['c', 11], ['v'], ['c', 14]],
                [['f', 'd'], ['v'], ['f', 'u'], ['v'], ['f', 'd'], ['v'], ['f', 'u'], ['v'], ['f', 'd']],
                [['c', 3], ['f', 'r'], ['c', 4], ['v'], ['c', 9], ['f', 'r'], ['c', 10], ['v'], ['c', 15]]]

        },
        {
            text: 'Recomendaciones de Uso',
            src: "audio/audio03.mp3",
            image: 'imagen/recomendacion.png',
            imagen_2: 'imagen/r5.png',
            point: [
                {
                    x: '135',
                    y: '-135',
                    audio: 'audio/plataforma-1.mp3',
                },
                {
                    x: '-70',
                    y: '122',
                    audio: 'audio/plataforma-2.mp3',
                },
                {
                    x: '-105',
                    y: '0',
                    audio: 'audio/plataforma-3.mp3',
                },
                {
                    x: '-185',
                    y: '20',
                    audio: 'audio/plataforma-4.mp3',
                },
                {
                    x: '-135',
                    y: '-50',
                    audio: 'audio/plataforma-5.mp3',
                },
                {
                    x: '-85',
                    y: '-155',
                    audio: 'audio/plataforma-6.mp3',
                }
            ]
        }
    ]
}

function generarPlantillaLudo(matriz, id) {
    // Recorremos la matriz
    var contador_interno = 1;
    var total = 15;
    var ValidarContenido = true;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            const elemento = matriz[i][j];

            console.log("Key: ", elemento[0]);
            console.log("Valor: ", elemento[1]);

            const nuevoElemento = document.createElement('div');
            if (elemento[0] == 'c') {
                nuevoElemento.className = 'content-item d-flex justify-content-center align-items-center';
                const item = document.createElement('div');
                item.className = "item-ludo d-flex justify-content-center align-items-center item-text text-center";
                item.textContent = "Criterio " + elemento[1];
                item.id = "item-ludo" + elemento[1];
                nuevoElemento.appendChild(item);
                console.log(`'c' encontrado en ${i}, ${j}`);
                item.addEventListener("click", function () {
                    if (contador_interno >= elemento[1]) {
                        // Validar si tiene la clase "clicked"
                        if (!item.classList.contains("clicked")) {
                            item.classList.add("clicked"); // Agrega la clase "clicked"
                            contador_interno += 1;
                            item.classList.add("animacion-crecer");
                        }
                        reproducirAudioItem(`audio/audio02-${elemento[1]}.mp3`);
                        //validar
                        if (contador_interno == total) {
                            if (ValidarContenido) {
                                console.log("valodar Contenido");
                                ValidarContenido = false;
                                marcados += 1;
                                validar_segundo_modal = false;
                            }
                        }
                    } else {
                        // $(`#item-ludo${contador_interno + 1}`).addClass("animacion-crecer");
                        aplicarAnimacion(`#item-ludo${contador_interno}`, 'animacion-crecer');
                    }
                });
            } else if (elemento[0] == 'f') {
                nuevoElemento.className = 'content-item d-flex justify-content-center align-items-center item-flecha';
                const item = document.createElement('div');
                const flecha = document.createElement('div');
                item.className = "d-flex justify-content-center align-items-center";
                if (elemento[1] == 'u') {
                    flecha.className = "flecha up";
                } else if (elemento[1] == 'd') {
                    flecha.className = "flecha down";
                } else if (elemento[1] == 'r') {

                    flecha.className = "flecha";
                }
                item.appendChild(flecha);
                nuevoElemento.appendChild(item);
                // Realizar acciones cuando el primer elemento es 'f'
                console.log(`'f' encontrado en ${i}, ${j}`);
            } else {
                nuevoElemento.className = 'content-item d-flex justify-content-center align-items-center item-flecha';
            }
            document.getElementById(id).appendChild(nuevoElemento);
        }
    }
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
    if (marcados == data.tarjetas.length) {
        if (!debuger) {
            console.log("Aqui logica para completar nivel");
            window.parent.validarPuntaje(20, "opcion");
            debuger = true;
        }
    }
}

miAudio.addEventListener("play", function () {
    if (!debuger) {
        if (validar_modal) {
            $("#close-primero").prop("disabled", true);
            document.querySelectorAll(".miniatura").forEach(elemento => elemento.style.pointerEvents = "none");
        }
        if (validar_segundo_modal) {
            console.log("Enter a validar el segundo molda");
            $("#inspeccion-close").prop("disabled", true);
            document.querySelectorAll(".item-ludo").forEach(elemento => elemento.style.pointerEvents = "none");
        }

        if (validar_tercero_modal) {
            console.log("Enter a validar el tercero molda");
            $("#recomendacion-close").prop("disabled", true);
            document.querySelectorAll(".text-point").forEach(elemento => elemento.style.pointerEvents = "none");
        }
    }
});

miAudio.addEventListener("ended", function () {

    if (!validar_modal) {
        $("#close-primero").prop("disabled", false);
        console.log("Entre al FInalizar");
    } else {
        document.querySelectorAll(".miniatura").forEach(elemento => elemento.style.pointerEvents = "auto");
    }

    if (!validar_segundo_modal) {
        $("#inspeccion-close").prop("disabled", false);
        console.log("Entre al segundo FInalizar");
    } else {
        document.querySelectorAll(".item-ludo").forEach(elemento => elemento.style.pointerEvents = "auto");
    }

    if (!validar_tercero_modal) {
        $("#recomendacion-close").prop("disabled", false);
        console.log("Entre al tercero FInalizar");
    } else {
        document.querySelectorAll(".text-point").forEach(elemento => elemento.style.pointerEvents = "auto");
    }

    document.querySelectorAll(".item").forEach(elemento => elemento.style.pointerEvents = "auto");
});

function aplicarAnimacion(selector, className) {
    var elementoAnimacion = document.querySelector(selector);
    elementoAnimacion.classList.remove(className);
    void elementoAnimacion.offsetWidth;
    elementoAnimacion.classList.add(className);
}

function ajustarPosicionTexto(textElement, elemento, id_imagen, id_modal) {
    // Define la función para ajustar la posición del texto
    const reposicionarTexto = () => {
        const { escalaCoordenadas, escalaFuente } = calcularEscala(id_imagen);
        textElement.style.transform = `scale(${escalaCoordenadas}) translate(${elemento.x}px, ${elemento.y}px)`;
        console.log("Escala", escalaCoordenadas);
    };

    // Calcula la escala en función de la altura de la imagen
    const calcularEscala = (id_imagen) => {
        let escalaCoordenadas, escalaFuente;

        // Obtener la altura de la imagen
        const imagen = document.getElementById(id_imagen);
        const alturaImagen = imagen ? imagen.clientHeight : 400; // Altura base

        escalaCoordenadas = alturaImagen / 400; // Escala en coordenadas basada en 400
        escalaFuente = alturaImagen / 400; // Escala en tamaño de fuente basada en 400

        return { escalaCoordenadas, escalaFuente };
    };

    // Agrega el evento resize para reposicionar el texto
    window.addEventListener('resize', reposicionarTexto);

    // Escucha el evento 'shown.bs.modal' del modal
    const modal = document.getElementById(id_modal);
    modal.addEventListener('shown.bs.modal', () => {
        // Llama a la función para calcular y establecer la escala antes de mostrar el modal
        reposicionarTexto();
    });
}


function createGraficaPoint(id_imagen, imagen, id_point, points, id_modal) {
    // Cambiar la imagen
    $(`#${id_imagen}`).attr('src', imagen);

    // Obtener el contenedor
    const pointsFotoContainer = document.getElementById(id_point);
    var total = points.length;
    var bandera = true;
    var contador = 0;
    // Recorrer el arreglo de points y agregar text-points
    points.forEach((point, index) => {
        // Crear el elemento div
        const textPointDiv = document.createElement('div');
        textPointDiv.className = 'text-point d-flex justify-content-center align-items-center animacion-aparecer';
        textPointDiv.textContent = index + 1;

        // Aplicar estilos
        textPointDiv.style.transform = `translate(${point.x}px, ${point.y}px)`;
        ajustarPosicionTexto(textPointDiv, point, id_imagen, id_modal);

        // Agregar el text-point al contenedor
        pointsFotoContainer.appendChild(textPointDiv);
        textPointDiv.id = `elemento-${id_imagen}-${index}`;
        // Agregar el evento click
        textPointDiv.addEventListener('click', () => {
            // Aplicar una clase extra al hacer clic
            console.log(index);

            if (contador >= index) {
                if (!textPointDiv.classList.contains('clicked')) {
                    textPointDiv.classList.add('clicked');
                    contador += 1;
                }
                if (contador == total && bandera) {
                    console.log("validar todo");
                    bandera = false;
                    marcados += 1;
                    validar_tercero_modal = false;
                }
                reproducirAudioItem(point.audio);
            }
        });
    });
}


function crearTarjetasEnDiv(divId, elementos) {
    // Obtén la referencia al div donde se agregarán las tarjetas
    const contenedorDiv = document.getElementById(divId);

    // Crea un div con la clase "row" para una fila de tarjetas
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row d-flex justify-content-center';
    // Recorre el array de elementos y crea una tarjeta para cada uno
    elementos.forEach(function (elemento, index) {
        // Crea elementos HTML para la tarjeta
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-6 col-md-4 mb-4'; // 3 tarjetas por fila

        const card = document.createElement('div');
        card.className = 'card mb-3 h-100'; // Añadir margen inferior
        card.style.borderRadius = "25px";
        card.style.border = "solid 2px transparent";

        const cardImg = document.createElement('img');
        cardImg.src = elemento.image; // Reemplaza 'elemento.image' con la URL de la imagen adecuada
        cardImg.className = 'card-img-top rounded-circle'; // Imágenes redondas
        cardImg.alt = '...';
        cardImg.style.padding = "15%";



        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body text-center card-body-click d-flex align-items-center justify-content-center';
        if (index == 0) {
            generarMiniaturas(elemento.carousel, 'carouselExampleCaptions', 'miniatura-content'); // Reemplaza 'tu-contenedor' con el ID de tu contenedor
        }
        if (index == 1) {
            generarPlantillaLudo(elemento.matriz, 'inspeccion_content');
        }
        if (index == 2) {
            createGraficaPoint('foto-point-2', elemento.imagen_2, 'points-foto-2', elemento.point, 'recomendacion');
        }
        var bandera = true;

        // Agrega un evento click a la tarjeta individual
        card.addEventListener('click', function (event) {
            if (!card.classList.contains('clicked')) {
                card.classList.add('clicked');
            }
            if (index == 1) {
                if (debuger) {
                    validar_segundo_modal = false;
                } else {
                    if (bandera) {
                        validar_segundo_modal = true;
                        bandera = false;
                    }
                }
                $('#inspeccion').modal("show");
                $("#andamios-title-modal").text('Inspección​');
                reproducirAudioItem(elemento.src);

            } else if (index == 0) {
                if (debuger) {
                    validar_modal = false;
                } else {
                    if (bandera) {
                        validar_modal = true;
                        bandera = false;
                    }
                }
                $('#modal-primary').modal("show");
                reproducirAudioItem(elemento.src);
                $("#escaleras-title-modal").text('Recomendaciones de uso');
            } else if (index == 2) {
                if (debuger) {
                    validar_tercero_modal = false;
                } else {
                    if (bandera) {
                        validar_tercero_modal = true;
                        bandera = false;
                    }
                }
                $('#recomendacion').modal("show");
                reproducirAudioItem(elemento.src);
                $("#plataformas-title-modal").text('Recomendaciones de uso');
            }
        });

        const cardTitle = document.createElement('h6');
        cardTitle.className = 'card-title';
        cardTitle.textContent = elemento.text; // Reemplaza 'elemento.text' con el texto adecuado

        // Agrega los elementos a la estructura de la tarjeta
        cardBodyDiv.appendChild(cardTitle);
        card.appendChild(cardImg);
        card.appendChild(cardBodyDiv);
        cardDiv.appendChild(card);

        // Agrega la tarjeta a la fila
        rowDiv.appendChild(cardDiv);
    });

    // Agrega la fila al contenedor
    contenedorDiv.appendChild(rowDiv);
}

function generarMiniaturas(data, carouselId, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    var contadorClics = 0;
    var total = data.length;
    var validarClic = true; // Estado para validar el clic

    data.forEach((data, i) => {
        const miniatura = document.createElement('div');
        miniatura.classList.add('col-12', 'miniatura', 'd-flex', 'justify-content-center');

        if (i === 0) {
            $('#text-content').text(data.text);
        }

        miniatura.onclick = function () {

            if (validarClic) {
                contadorClics += 1;
            }

            if (!isFrontVisible) {
                voltear();
            }

            var miniaturas = document.querySelectorAll('.miniatura');

            // Agregar la clase 'active' al elemento que hizo clic
            this.classList.add('active');
            $('#img-modal').attr('src', data.image);
            $('#text-modal').text(data.narracion);
            reproducirAudioItem(data.src);
            if (!debuger) {
                if (contadorClics == total) {
                    console.log("Se hizo clic en todas las miniaturas.");
                    validar_modal = false;
                    marcados += 1;
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



function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function main() {
    updateTitle();
    ocultarTitulos();
    $('#miModal').modal('show');
    $('#title-theme').text(data.title2);
    $('#modalLabel').text(data.title2);
    crearTarjetasEnDiv('content', data.tarjetas);
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


