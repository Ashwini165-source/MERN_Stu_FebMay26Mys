function fetchUserLocation() {
    var elements = window.portfolioElements;
    if (!elements.heroLocation) return;

    elements.heroLocation.textContent = "Locating you...";

    if (!("geolocation" in navigator)) {
        elements.heroLocation.textContent = "Thanks for visiting! 🌟";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon + "&zoom=10";

            fetch(url)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    if (data && data.address) {
                        var city = data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.county ||
                            data.address.state ||
                            "your region";
                        elements.heroLocation.textContent = "Visiting from " + city + " 🌍";
                    } else {
                        elements.heroLocation.textContent = "Thanks for visiting! 🌍";
                    }
                })
                .catch(function (err) {
                    console.error("Geocoding failed", err);
                    elements.heroLocation.textContent = "Thanks for visiting! 🌍";
                });
        },
        function (error) {
            console.warn("Geolocation permission denied or failed.", error);
            elements.heroLocation.textContent = "Thanks for visiting! 🌟";
        },
        { timeout: 10000 }
    );
}