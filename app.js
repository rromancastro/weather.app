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

let arrayDay = [];

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
fetch(`http://api.weatherapi.com/v1/forecast.json?key=44feefcbd3164598878172453240511&q=${cityName}&aqi=no`)
    .then(response => response.json())
    .then((datos) => {
        console.log(datos);
        nombreCiudad = datos.location.name;
        nombreProvincia = datos.location.region;
        nombrePais = datos.location.country;
        fecha = datos.location.localtime;

        tempActual = datos.current.temp_c;
        tempMin = datos.forecast.forecastday[0].day.mintemp_c;
        tempMax = datos.forecast.forecastday[0].day.maxtemp_c;
        sensTermica = datos.current.feelslike_c;
        humedad = datos.current.humidity;
        lastUpdated = datos.current.last_updated;
        presion = datos.current.pressure_mb;
        vientoKMH = datos.current.wind_kph;
        rafagasViento = datos.current.gust_kph;
        indiceUV = datos.current.uv;
        probLluvia = datos.current.precip_in;
        condition = datos.current.condition.text;

        arrayDay = datos.forecast.forecastday[0].hour;
    });

    setTimeout(mostrarDatos, 1000);
}

busquedaDeDatos('San Luis Argentina'); // INICIAR EN SAN LUIS ARGENTINA

// BUSQUEDA DE CIUDADES 
const buttonSearch = document.getElementById('buttonSearch');
let userInput = document.getElementById('search');

buttonSearch.onclick = () => {
    let userInputSearch = userInput.value;
    busquedaDeDatos(userInputSearch);
}
