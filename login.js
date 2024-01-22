document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "Syyt0158" && password === "Gwnwat") {
            window.location.href = "bestellingen.html";
        } else {
            alert("Ongeldige inloggegevens. Probeer opnieuw.");
        }
    });
});


