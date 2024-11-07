const horasContenedor = document.getElementById('hoursTime');
const principalInfo = document.getElementById('principalInfo');

let nombreCiudad = '';
let nombreProvincia = '';
let nombrePais = '';
let fecha = '';

let tempActual = 0;
let tempMin = 0;
let tempMax = 0;
let sensTermica = 0;
let humedad = 0;
let lastUpdated = 0;
let presion = 0;
let vientoKMH = 0;
let rafagasViento = 0;
let indiceUV = 0;
let probLluvia = 0;
let condition = '';

let nubesPorcen = 0;

let arrayDay = [];

let image = '';

// TOMA DE TEXTOS
let gradosActualesTEXT = document.getElementById('gradosActuales');
let probLluviaTEXT = document.getElementById('probLluviaTEXT');
let humedadTEXT = document.getElementById('humedadTEXT');
let vientoTEXT = document.getElementById('vientoTEXT');
let rafagasTEXT = document.getElementById('rafagasTEXT');
let indiceTEXT = document.getElementById('indiceTEXT');
let presionTEXT = document.getElementById('presionTEXT');
let indiceUVText = document.getElementById('indiceUVText');

let cityNombre = document.getElementById('cityName');
let countryNombre = document.getElementById('countryName');
let dateDate = document.getElementById('dateDate');

//DATOS USUARIO

localStorage.setItem('userCity', 'San Luis Argentina');
let hora = 0;
let horaUser = 0;

let imageFirst = '';
//DATOS USUARIO

function mostrarDatos() { // FUNCION PARA CONSOLE LOG DE DATOS
    console.log(nombreCiudad);
    console.log(nombreProvincia);
    console.log(nombrePais);
    console.log(fecha);
    console.log(tempActual);
    console.log(tempMin);
    console.log(tempMax);
    console.log(sensTermica);
    console.log(humedad);
    console.log(lastUpdated);
    console.log(presion);
    console.log(vientoKMH);
    console.log(rafagasViento);
    console.log(indiceUV);
    console.log(probLluvia);
    console.log(condition);

    console.log(arrayDay);
}
function busquedaDeDatos(cityName) { // FUNCION PARA BUSCAR CIUDADES
fetch(`https://api.weatherapi.com/v1/forecast.json?key=44feefcbd3164598878172453240511&q=${cityName}&aqi=no`)
    .then(response => response.json())
    .then((datos) => {
        console.log(datos);
        nombreCiudad = datos.location.name;
        nombreProvincia = datos.location.region;
        nombrePais = datos.location.country;
        fecha = datos.location.localtime;

        tempActual = Math.ceil(datos.current.temp_c);
        tempMin = Math.ceil(datos.forecast.forecastday[0].day.mintemp_c);
        tempMax = Math.ceil(datos.forecast.forecastday[0].day.maxtemp_c);
        sensTermica = Math.ceil(datos.current.feelslike_c);
        humedad = Math.ceil(datos.current.humidity);
        lastUpdated = datos.current.last_updated;
        presion = Math.ceil(datos.current.pressure_mb);
        vientoKMH = Math.ceil(datos.current.wind_kph);
        rafagasViento = Math.ceil(datos.current.gust_kph);
        indiceUV = Math.ceil(datos.current.uv);
        probLluvia = datos.forecast.forecastday[0].day.daily_chance_of_rain;
        condition = datos.current.condition.text;

        arrayDay = datos.forecast.forecastday[0].hour;

        horaUser = fecha.substring(11, 13);

        if (horaUser <= 6 || horaUser >= 21) { // NOCHE
            imageFirst = 'moon2';
            if(datos.current.cloud > 50) imageFirst = 'nubladonight';
            if(datos.current.cloud > 75) imageFirst = 'muynubladoMOON';
        }
        if (horaUser >= 7 && horaUser <= 20) { // DIA
            imageFirst = 'sun';
            if(datos.current.cloud > 50) imageFirst = 'algonublado';
            if(datos.current.cloud > 75) imageFirst = 'muynublado';
        }
        imprimirDatos();
        mostrarDatos();
    });
}


function imprimirDatos() {
    gradosActualesTEXT.innerText = tempActual;
    probLluviaTEXT.innerText = probLluvia;
    humedadTEXT.innerText = humedad;
    vientoTEXT.innerText = vientoKMH;
    rafagasTEXT.innerText = rafagasViento;
    indiceTEXT.innerText = indiceUV;
    presionTEXT.innerText = presion;

    cityNombre.innerText = `${nombreCiudad}, ${nombreProvincia}`;
    countryNombre.innerText = `${nombrePais}`;
    dateDate.innerText = `${fecha}`;

    //INDICES UV
        if (Number(indiceUV) >= 0 &&  Number(indiceUV) <= 2) indiceUVText.innerText = "Bajo";
        if (Number(indiceUV) >= 3 &&  Number(indiceUV) <= 5) indiceUVText.innerText = "Moderado";
        if (Number(indiceUV) >= 6 &&  Number(indiceUV) <= 7) indiceUVText.innerText = "Alto";
        if (Number(indiceUV) >= 8 &&  Number(indiceUV) <= 10) indiceUVText.innerText = "Muy Alto";
        if (Number(indiceUV) >= 11 &&  Number(indiceUV) <= 15) indiceUVText.innerText = "Extremo";

    //TEMP POR HORAS
    for (let i = 0; i < 24; i++) {
        let hora2;
        if (i < 10) {
            hora2 = hora;
            hora = "0" + hora;
        }

        //LOGICA ICONOS
        if (i <= 6 || i >= 21) { // NOCHE
            image = 'moon2';
            if(arrayDay[i].cloud > 50) image = 'nubladonight';
            if(arrayDay[i].cloud > 75) image = 'muynubladoMOON';
        }
        if (i >= 7 && i <= 20) { // DIA
            image = 'sun';
            if(arrayDay[i].cloud > 50) image = 'algonublado';
            if(arrayDay[i].cloud > 75) image = 'muynublado';
        }

        principalInfo.innerHTML = `
                <h1><span id="gradosActuales">${tempActual}</span>°C</h1>
                <img src="./icons/${imageFirst}.png" alt="">`

        //IMPRESION DE CARD

        horasContenedor.innerHTML += `
                <article class="hour">
                    <h3>${hora}:00</h3>
                    <img src="./icons/${image}.png" alt="">
                    <h4>${Math.ceil(arrayDay[i].temp_c)}<span>°C</span></h4>
                </article>`;
        if (i < 10) {
            hora = hora2;
        }
        hora ++;
    }
}

// BUSQUEDA DE CIUDADES 
const buttonSearch = document.getElementById('buttonSearch');
let userInput = document.getElementById('search');

buttonSearch.onclick = () => {
    localStorage.setItem('userCity', userInput.value);
    horasContenedor.innerHTML = ``;
    hora = 0;
    busquedaDeDatos(localStorage.getItem('userCity'));
}


let latitud = '';
let longitud = '';

busquedaDeDatos(localStorage.getItem('userCity')); // INICIAR EN SAN LUIS ARGENTINA
