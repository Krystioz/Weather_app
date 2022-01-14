const input = document.querySelector(".search-bar");
const btn = document.querySelector(".btn");
let imageElement = document.querySelector("body");
const clientID = key;

btn.addEventListener("click", function (event) {
    if (input.value.length > 1) {
        searchImputVal();
        weatherApi.fetchWeather(input.value);
    }
});
input.addEventListener("keyup", function (event) {
    if (input.value.length > 1 && event.key == "Enter") {
        searchImputVal();
        weatherApi.fetchWeather(input.value);
    }
});

imageElement.style.backgroundSize = "cover";

function searchImputVal() {
    let endpoint =
        `https://api.unsplash.com/photos/random?query=` +
        input.value +
        `&landscape&orientation=landscape&client_id=${clientID}`;
    fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            imageElement.style.backgroundImage = `url(${jsonData.urls.regular})`;
        });
}

function randomNature() {
    let endpoint = `https://api.unsplash.com/photos/random?query=nature
    &orientation=landscape&client_id=${clientID}`;
    fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            imageElement.style.backgroundImage = `url(${jsonData.urls.regular})`;
        });
}

randomNature();

//weather

let weatherApi = {
    appKey: "30cab2ad072dba5a15ab9523cd42e1f0",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.appKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = Math.floor(temp) + " °C";
        document.querySelector(".humidity").innerHTML =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML =
            "Wind speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading")
            document.querySelector('.hd').classList.add("hide");
    },
};