window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    let appDate = document.querySelector(".date");



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `http://cors-anywhere.herokuapp.com/`;

            const api = `${proxy}https://api.darksky.net/forecast/13583c80cae755652b257860358b8530/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon, time} = data.currently;
                    //Set DOM Elements fron the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Get date from JavaScript
                    appDate.textContent = new Date();

                    

                    //formular for C/F
                    let celsius = (temperature - 32) * (5 / 9);
                   

                    //Change temperature to C/F
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent == 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    
});
