const API_URL = https://zxov7zriwi.execute-api.us-east-2.amazonaws.com/GetIrrigationData";

let chart;

async function obtenerDatos() {

  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    console.log(data);

    if(data.length === 0) return;

    const ultimo = data[0];

    document.getElementById("temperatura").innerText =
      ultimo.temperatura + " °C";

    document.getElementById("humedadAire").innerText =
      ultimo.humedad_aire + " %";

    document.getElementById("humedadSuelo").innerText =
      ultimo.humedad_suelo + " %";

    document.getElementById("radiacion").innerText =
      ultimo.radiacion + " W/m²";

    document.getElementById("bomba").innerText =
      ultimo.bomba;

    llenarTabla(data);

    crearGrafica(data);

  } catch(error) {

    console.error(error);
  }
}

function llenarTabla(data) {

  const tabla = document.getElementById("tablaDatos");

  tabla.innerHTML = "";

  data.slice(0, 20).forEach(item => {

    tabla.innerHTML += `
      <tr>
        <td>${item.fecha_hora}</td>
        <td>${item.temperatura}</td>
        <td>${item.humedad_aire}</td>
        <td>${item.humedad_suelo}</td>
        <td>${item.radiacion}</td>
        <td>${item.bomba}</td>
      </tr>
    `;
  });
}

function crearGrafica(data) {

  const labels = data.slice(0,20).map(item => item.fecha_hora);

  const temperaturas = data.slice(0,20)
                           .map(item => item.temperatura);

  const ctx = document.getElementById('tempChart');

  if(chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: 'line',

    data: {

      labels: labels.reverse(),

      datasets: [{

        label: 'Temperatura',

        data: temperaturas.reverse(),

        borderWidth: 2
      }]
    }
  });
}

obtenerDatos();

setInterval(obtenerDatos, 60000);
