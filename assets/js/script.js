const weatherCodes = {
    200: "Tormenta con lluvia ligera",
    201: "Tormenta con lluvia",
    202: "Tormenta con lluvia fuerte",
    230: "Tormenta con llovizna ligera",
    231: "Tormenta con llovizna",
    232: "Tormenta con llovizna fuerte",
    233: "Tormenta con granizo",
    300: "Llovizna ligera",
    301: "Llovizna",
    302: "Llovizna fuerte",
    500: "Lluvia ligera",
    501: "Lluvia moderada",
    502: "Lluvia fuerte",
    511: "Lluvia helada",
    520: "Chubasco ligero",
    521: "Chubasco",
    522: "Chubasco fuerte",
    600: "Nieve ligera",
    601: "Nieve",
    602: "Nieve fuerte",
    610: "Mezcla de nieve y lluvia",
    611: "Aguanieve",
    612: "Aguanieve fuerte",
    621: "Chubasco de nieve",
    622: "Chubasco de nieve fuerte",
    623: "Ráfagas de nieve",
    700: "Neblina",
    711: "Humo",
    721: "Calina",
    731: "Arena/polvo",
    741: "Niebla",
    751: "Niebla helada",
    800: "Cielo despejado",
    801: "Pocas nubes",
    802: "Nubes dispersas",
    803: "Nubes rotas",
    804: "Nubes cubiertas",
    900: "Precipitación desconocida"
};


const cardCity = document.querySelector("#card-city");
const cardTemp = document.querySelector("#card-temp");
const cardDesc = document.querySelector("#card-desc");
const cardIcon = document.querySelector("#card-icon");
const API_KEY = "cffcff2eaa4b49a694a7c42b57d1324b";
const API_URL = " https://api.weatherbit.io/v2.0/current?";
const API_CITY = "Novelda"
const API_LANGUAGE = "es"
const API_ACTUAL_WEATHER = `${API_URL}city=${API_CITY}&key=${API_KEY}&lang=${API_LANGUAGE}`;
let actualWeather = undefined;

const getActualWeather = async () => {
    try {

        const response = await fetch(API_ACTUAL_WEATHER);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        actualWeather = await response.json();

    } catch (error) {

        console.error('There has been a problem with your fetch operation:', error);
    }
}


const init = async () => {
    await getActualWeather();
    if (actualWeather) {
        console.log(actualWeather);
        console.log(`Temperature in ${API_CITY}: ${actualWeather.data[0].temp}°C`);
        cardCity.innerHTML = actualWeather.data[0].city_name;
        cardTemp.innerHTML = `${actualWeather.data[0].temp}°C`;
        cardDesc.innerHTML = actualWeather.data[0].weather.description;

        const weatherCode = actualWeather.data[0].weather.code;

        if (weatherCode == 800) {
            cardIcon.src = "./assets/img/weather/Sunny.png"
        } else if (weatherCode >= 300 && weatherCode <= 522) {
            cardIcon.src = "./assets/img/weather/Rainy.png"
        } else if (weatherCode >= 200 && weatherCode <= 233) {
            cardIcon.src = "./assets/img/weather/RainThunder.png"
        } else if (weatherCode >= 600 && weatherCode <= 623) {
            cardIcon.src = "./assets/img/weather/Snowy.png"
        } else if (weatherCode >= 801 && weatherCode <= 804) {
            cardIcon.src = "./assets/img/weather/PartyCloudly.png"
        } else {
            cardIcon.src = "./assets/img/weather/PartyCloudly.png"
        }
    }

}

init();