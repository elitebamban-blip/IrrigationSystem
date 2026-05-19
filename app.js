const API_URL = "https://zxov7zriwi.execute-api.us-east-2.amazonaws.com";

const API_BOMBA = "https://o551s4jg05.execute-api.us-east-2.amazonaws.com/ControlBomba";

let graficaTemperatura;
let graficaHumedadAire;
let graficaHumedadSuelo;
let graficaRadiacion;

async function obtenerDatos() {

    try {

        const response = await fetch(API_URL);

        const datos = await response.json();

        console.log(datos);

        if (!datos || datos.length === 0) return;

        datos.reverse();

        const labels = datos.map(d => d.fecha_hora);

        const temperaturas = datos.map(d => d.temperatura);

        const humedadAire = datos.map(d => d.humedad_aire);

        const humedadSuelo = datos.map(d => d.humedad_suelo);

        const radiacion = datos.map(d => d.radiacion);

        document.getElementById("temperatura").innerText =
            temperaturas[temperaturas.length - 1] + " °C";

        document.getElementById("humedadAire").innerText =
            humedadAire[humedadAire.length - 1] + " %";

        document.getElementById("humedadSuelo").innerText =
            humedadSuelo[humedadSuelo.length - 1] + " %";

        document.getElementById("radiacion").innerText =
            radiacion[radiacion.length - 1] + " W/m²";

        crearGraficaTemperatura(labels, temperaturas);

        crearGraficaHumedadAire(labels, humedadAire);

        crearGraficaHumedadSuelo(labels, humedadSuelo);

        crearGraficaRadiacion(labels, radiacion);

    } catch (error) {

        console.error(error);

    }
}


function crearGraficaTemperatura(labels, data) {

    if (graficaTemperatura) {
        graficaTemperatura.destroy();
    }

    const ctx = document.getElementById("graficaTemperatura");

    graficaTemperatura = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura °C',
                data: data,
                borderWidth: 2
            }]
        }
    });
}


function crearGraficaHumedadAire(labels, data) {

    if (graficaHumedadAire) {
        graficaHumedadAire.destroy();
    }

    const ctx = document.getElementById("graficaHumedadAire");

    graficaHumedadAire = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humedad Relativa %',
                data: data,
                borderWidth: 2
            }]
        }
    });
}


function crearGraficaHumedadSuelo(labels, data) {

    if (graficaHumedadSuelo) {
        graficaHumedadSuelo.destroy();
    }

    const ctx = document.getElementById("graficaHumedadSuelo");

    graficaHumedadSuelo = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humedad Suelo %',
                data: data,
                borderWidth: 2
            }]
        }
    });
}


function crearGraficaRadiacion(labels, data) {

    if (graficaRadiacion) {
        graficaRadiacion.destroy();
    }

    const ctx = document.getElementById("graficaRadiacion");

    graficaRadiacion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Radiación W/m²',
                data: data,
                borderWidth: 2
            }]
        }
    });
}


async function controlBomba(estado) {

    try {

        const response = await fetch(API_BOMBA, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                estado: estado
            })
        });

        const resultado = await response.json();

        console.log(resultado);

        alert("Bomba: " + estado);

    } catch (error) {

        console.error(error);

    }
}


obtenerDatos();

setInterval(obtenerDatos, 60000);
