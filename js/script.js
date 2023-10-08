/*
    Assignment #4
    {Pawandeep Kaur}
*/

$(function () {
    // your code here

    $(function (){
        function getCurrentLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const accuracy = position.coords.accuracy; // Accuracy in meters
                    const currentLocation = { latitude, longitude, accuracy };
    
                    // Display current location and accuracy
                    $("#locationhere").text(`Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                    $("#locationhere").append(`<br>Accuracy: ${accuracy} meters`);


                    // Check if there is a previous location in local storage
                    const previousLocation = localStorage.getItem("previousLocation");
                    if (previousLocation) {
                        const parsedPreviousLocation = JSON.parse(previousLocation);
                        $("#previousLocation").text(`Previous Location: ${parsedPreviousLocation.latitude.toFixed(6)}, ${parsedPreviousLocation.longitude.toFixed(6)}`);

    
                        // Welcome back message
                        $("#welcomeMessage").text("Welcome back to the page!");
    
                        // Calculate and display distance traveled in kilometers
                        const distance = calcDistanceBetweenPoints(
                            parsedPreviousLocation.latitude,
                            parsedPreviousLocation.longitude,
                            currentLocation.latitude,
                            currentLocation.longitude
                        ) / 1000;
                         // Convert meters to kilometers
                         $("#distanceTraveled").text(`You traveled ${distance.toFixed(2)} km since your last visit.`);
                    } else {
                        // First-time visitor message
                        $("#welcomeMessage").text("Welcome to the page for the first time!");
                    }
    
                    // Store current location in local storage
                    localStorage.setItem("previousLocation", JSON.stringify(currentLocation));
                });
            } else {
                $("#locationhere").text("Geolocation is not supported in your browser.");
            }
        }
    
    
        // Call the function to get the current location
        getCurrentLocation();
    });











    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


