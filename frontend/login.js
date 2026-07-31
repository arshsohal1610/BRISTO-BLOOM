const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "Bristo123") {

        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "admin.html";

    } else {

        document.getElementById("message").textContent =
            "Invalid Username or Password";

    }

});