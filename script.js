/* ==========================================
   CINTIA & HUGO · NUESTRA BODA
   SCRIPT PRINCIPAL
========================================== */

document.addEventListener('DOMContentLoaded', () => {


    /* ==========================================
       01 · ANIMACIONES AL HACER SCROLL
    ========================================== */

    const elementosRevelar =
        document.querySelectorAll('.revelar');

    if ('IntersectionObserver' in window) {

        const observador = new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add('visible');

                        observador.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elementosRevelar.forEach((elemento) => {
            observador.observe(elemento);
        });

    } else {

        elementosRevelar.forEach((elemento) => {
            elemento.classList.add('visible');
        });

    }



    /* ==========================================
       02 · INVITACIÓN PERSONALIZADA
    ========================================== */

    const parametros =
        new URLSearchParams(window.location.search);

    const nombreURL =
        parametros.get('invitado');

    const adultosURL =
        parametros.get('adultos');

    const ninosURL =
        parametros.get('ninos');

    /* Compatibilidad con links anteriores */
    const lugaresURL =
        parametros.get('lugares');


    const nombreInvitado =
        document.getElementById('nombreInvitado');

    const numeroLugares =
        document.getElementById('numeroLugares');

    const textoLugares =
        document.getElementById('textoLugares');

    const desgloseLugares =
        document.getElementById('desgloseLugares');


    /* NOMBRE */

    if (nombreURL && nombreInvitado) {

        nombreInvitado.textContent =
            nombreURL.trim();

    }



    /* ==========================================
       03 · ADULTOS Y NIÑOS
    ========================================== */

    let adultos = 0;
    let ninos = 0;


    if (adultosURL !== null) {

        const cantidadAdultos =
            parseInt(adultosURL, 10);

        if (!isNaN(cantidadAdultos) && cantidadAdultos >= 0) {

            adultos = cantidadAdultos;

        }

    }


    if (ninosURL !== null) {

        const cantidadNinos =
            parseInt(ninosURL, 10);

        if (!isNaN(cantidadNinos) && cantidadNinos >= 0) {

            ninos = cantidadNinos;

        }

    }


    /*
     * Si usamos el sistema nuevo:
     * adultos + niños = total de lugares
     */

    const usaDesglose =
        adultosURL !== null || ninosURL !== null;


    let totalLugares = 0;


    if (usaDesglose) {

        totalLugares =
            adultos + ninos;

    } else if (lugaresURL !== null) {

        /*
         * Esto permite que los links viejos
         * que todavía tengan ?lugares=4
         * sigan funcionando.
         */

        const cantidadAnterior =
            parseInt(lugaresURL, 10);

        if (!isNaN(cantidadAnterior) && cantidadAnterior > 0) {

            totalLugares =
                cantidadAnterior;

            adultos =
                cantidadAnterior;

        }

    } else {

        /*
         * Valores que aparecen por defecto
         * cuando abrimos index.html sin parámetros.
         */

        totalLugares = 4;
        adultos = 4;
        ninos = 0;

    }



    /* TOTAL DE LUGARES */

    if (numeroLugares && totalLugares > 0) {

        numeroLugares.textContent =
            totalLugares;

    }


    if (textoLugares && totalLugares > 0) {

        textoLugares.textContent =
            totalLugares === 1
                ? 'lugar'
                : 'lugares';

    }



    /* DESGLOSE */

    if (desgloseLugares) {

        const partes = [];


        if (adultos > 0) {

            partes.push(
                adultos === 1
                    ? '1 adulto'
                    : `${adultos} adultos`
            );

        }


        if (ninos > 0) {

            partes.push(
                ninos === 1
                    ? '1 niño'
                    : `${ninos} niños`
            );

        }


        desgloseLugares.textContent =
            partes.join(' · ');

    }



    /* ==========================================
       04 · WHATSAPP · CONFIRMACIÓN
    ========================================== */

    const botonWhatsapp =
        document.getElementById('botonWhatsapp');


    if (botonWhatsapp) {

        const nombreActual =
            nombreInvitado
                ? nombreInvitado.textContent.trim()
                : 'Invitado';


        const partesWhatsapp = [];


        if (adultos > 0) {

            partesWhatsapp.push(
                adultos === 1
                    ? '1 adulto'
                    : `${adultos} adultos`
            );

        }


        if (ninos > 0) {

            partesWhatsapp.push(
                ninos === 1
                    ? '1 niño'
                    : `${ninos} niños`
            );

        }


        const desgloseWhatsapp =
            partesWhatsapp.join(' y ');


        const mensajeWhatsapp =
    `Hola, somos ${nombreActual}. ` +
    `Nuestra invitación contempla ${desgloseWhatsapp}. ` +
    `Queremos confirmar nuestra asistencia a la boda de Cintia & Hugo.`;


        const numeroWhatsapp =
            '522223396974';


        const enlaceWhatsapp =
            `https://wa.me/${numeroWhatsapp}` +
            `?text=${encodeURIComponent(mensajeWhatsapp)}`;


        botonWhatsapp.href =
            enlaceWhatsapp;

    }



    /* ==========================================
       05 · SEGURIDAD PARA ELEMENTOS REVELAR
    ========================================== */

    setTimeout(() => {

        elementosRevelar.forEach((elemento) => {

            const rect =
                elemento.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {

                elemento.classList.add('visible');

            }

        });

    }, 150);
/* ==========================================
   06 · CUENTA REGRESIVA
========================================== */

const elementoDias =
    document.getElementById('dias');

const elementoHoras =
    document.getElementById('horas');

const elementoMinutos =
    document.getElementById('minutos');

const elementoSegundos =
    document.getElementById('segundos');

const contador =
    document.getElementById('contador');

const tituloCuenta =
    document.querySelector('.cuenta-titulo');


/*
 * Fecha de la boda
 * 05 de diciembre de 2026
 */

const fechaBoda =
    new Date(2026, 11, 5, 17, 45, 0);


function actualizarCuentaRegresiva() {

    const ahora =
        new Date();

    const diferencia =
        fechaBoda - ahora;


    /* Llegó el gran día */

    if (diferencia <= 0) {

        if (contador) {
            contador.style.display = 'none';
        }

        if (tituloCuenta) {
            tituloCuenta.textContent =
                '¡Hoy es el gran día!';
        }

        return;
    }


    const dias =
        Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

    const horas =
        Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );

    const minutos =
        Math.floor(
            (diferencia / (1000 * 60)) % 60
        );

    const segundos =
        Math.floor(
            (diferencia / 1000) % 60
        );


    if (elementoDias) {
        elementoDias.textContent =
            String(dias).padStart(3, '0');
    }

    if (elementoHoras) {
        elementoHoras.textContent =
            String(horas).padStart(2, '0');
    }

    if (elementoMinutos) {
        elementoMinutos.textContent =
            String(minutos).padStart(2, '0');
    }

    if (elementoSegundos) {
        elementoSegundos.textContent =
            String(segundos).padStart(2, '0');
    }

}


/* Ejecutar inmediatamente */

actualizarCuentaRegresiva();


/* Actualizar cada segundo */

setInterval(
    actualizarCuentaRegresiva,
    1000
);

/* ==========================================
   07 · MÚSICA
========================================== */

const musicaBoda =
    document.getElementById('musicaBoda');

const botonMusica =
    document.getElementById('botonMusica');

let intervaloVolumen = null;


/* FADE IN */

function subirVolumen() {

    clearInterval(intervaloVolumen);

    musicaBoda.volume = 0;

    intervaloVolumen = setInterval(() => {

        if (musicaBoda.volume < 0.35) {

            musicaBoda.volume =
                Math.min(
                    musicaBoda.volume + 0.02,
                    0.35
                );

        } else {

            clearInterval(intervaloVolumen);

        }

    }, 80);
}


/* FADE OUT */

function bajarVolumenYPausar() {

    clearInterval(intervaloVolumen);

    intervaloVolumen = setInterval(() => {

        if (musicaBoda.volume > 0.03) {

            musicaBoda.volume =
                Math.max(
                    musicaBoda.volume - 0.03,
                    0
                );

        } else {

            clearInterval(intervaloVolumen);

            musicaBoda.pause();

            musicaBoda.volume = 0.35;

        }

    }, 60);
}


/* BOTÓN PLAY / PAUSA */

if (musicaBoda && botonMusica) {

    musicaBoda.volume = 0.35;

    botonMusica.addEventListener('click', function () {

    if (musicaBoda.paused) {

        musicaBoda.play()
            .then(function () {
                botonMusica.textContent = 'Ⅱ';
                botonMusica.classList.add('reproduciendo');
                botonMusica.setAttribute('aria-label', 'Pausar música');
            })
            .catch(function (error) {
                console.log('No se pudo reproducir la música:', error);
            });

    } else {

        musicaBoda.pause();

        botonMusica.textContent = '♪';
        botonMusica.classList.remove('reproduciendo');
        botonMusica.setAttribute('aria-label', 'Reproducir música');

    }

});

}

});

/* =========================================
   ANIMACIÓN — ABRIR SOBRE
========================================= */

const botonAbrirInvitacion = document.getElementById('abrirInvitacion');
const sobreInvitacion = document.querySelector('.sobre');
const entradaSobre = document.getElementById('entradaSobre');
const portadaInvitacion = document.querySelector('.portada');

if (
    botonAbrirInvitacion &&
    sobreInvitacion &&
    entradaSobre &&
    portadaInvitacion
) {

    botonAbrirInvitacion.addEventListener('click', function () {

        // 1. Abrir sobre
        sobreInvitacion.classList.add('abierto');
        // Iniciar música al abrir la invitación
const musicaBoda = document.getElementById('musicaBoda');

if (musicaBoda) {
    musicaBoda.play().catch(function (error) {
        console.log('El navegador no permitió iniciar la música:', error);
    });
}

        // 2. Esperar a que salga la carta
        setTimeout(function () {

            // 3. Desvanecer pantalla del sobre
            entradaSobre.classList.add('saliendo');

            // 4. Esperar a que termine el fundido
            setTimeout(function () {

                // Quitar completamente la pantalla del sobre
                entradaSobre.style.display = 'none';

                // Mostrar la portada desde arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });

            }, 700);

        }, 1250);

    });

}