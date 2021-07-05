var day = $("#currentDayWeather");
var dayCity = $("#dailyCity");
var dayTemp = $("#dayTemp");
var dayWind = $("#dayWind");
var dayHumidity = $("#dayHumidity");
var dayIcon = $("#dayIcon");
var dayUV = $("#dayUV");
var fiveDayWeather = $("#fiveDayWeather");
var fiveDayTemp = $(".myCardTemp");
var fiveDayPhoto = $(".myCardPhoto");
var fiveDayWind = $(".myCardWind");
var fiveDayWind = $(".myCardWind");
var fiveDayHumidity = $(".myCardHumidity");
var fiveDayDate = $(".myCardDate");
// Input Button
var submitBtn = $("#submitBtn");
// normal JS variables
var userInput = "Dallas";
var saveCity = [];
submitBtn.click(function() {
    userInput = $("#userInfo").val();
});

function getAPIKey() {
    fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            userInput +
            "&appid=383d75b7c7fd0c5db161181eb58b9e37"
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            dayCity.text(data.name + " " + moment().format("MM/DD/YYYY"));
            fetch(
                    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                    data.coord.lat +
                    "&lon=" +
                    data.coord.lon +
                    "&exclude=hourly,alerts&units=imperial&appid=383d75b7c7fd0c5db161181eb58b9e37"
                )
                .then(function(response) {
                    return response.json();
                })
                .then(function(data2) {
                    console.log(data2);
                    dayUV.text("UV Index: " + data2.current.uvi);
                    dayIcon.prepend('<img src = "http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" />');
                    dayTemp.text("Temp: " + data2.current.temp + "°F");
                    dayWind.text("Wind: " + data2.current.wind_speed + "MPH");
                    dayHumidity.text("Humidity: " + data2.current.humidity + "%");

                    fiveDayTemp.each(function(i) {
                        $(this).text("Temp: " + data2.daily[i].temp.day);
                    });
                    fiveDayWind.each(function(i) {
                        $(this).text("Wind:" + data2.current.wind_speed + "MPH");
                    });
                    fiveDayHumidity.each(function(i) {
                        $(this).text("Humidity:" + data2.daily[i].humidity + "%");
                    });
                    fiveDayDate.each(function(i) {
                        $(this).text(
                            moment()
                            .add(1 + i, "days")
                            .format("MM/DD/YYYY")
                        );
                    });
                    fiveDayPhoto.each(function(i) {
                        $(this).prepend(
                            '<img src = "http://openweathermap.org/img/wn/' +
                            data2.daily[i].weather[0].icon +
                            '@2x.png" />'
                        );
                    });
                });
        });
}
getAPIKey();

function save() {

}