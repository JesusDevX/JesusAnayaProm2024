const apiKey = 'e88e04d1cf002f8fcb74e28969079e9b';
const units = 'metric';

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}&lang=es`;

    $.get(url, function(data) {
        const location = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        
        $('#location').text(`Ubicación: ${location}`);
        $('#temperature').text(`Temperatura: ${temperature}°C`);
        $('#weather-description').text(`Descripción: ${weatherDescription}`);
    }).fail(function() {
        $('#weather-info').html('<p>Hubo un error al obtener los datos del clima.</p>');
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        }, function() {
            $('#weather-info').html('<p>No se pudo obtener la ubicación del usuario.</p>');
        });
    } else {
        $('#weather-info').html('<p>La geolocalización no está disponible en tu navegador.</p>');
    }
}

getLocation();

setInterval(function() {
    getLocation();
}, 420000);