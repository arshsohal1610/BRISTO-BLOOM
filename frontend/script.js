const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// ===============================
// Reservation Form
// ===============================

const reservationForm = document.getElementById("reservationForm");

reservationForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const reservation = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        guests: Number(document.getElementById("guests").value),
        message: document.getElementById("message").value

    };

    try {

        const response = await fetch(`${API_BASE_URL}/api/reservations`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(reservation)

        });

        const data = await response.json();

        if (data.success) {

            alert("🎉 Reservation Booked Successfully!");

            reservationForm.reset();

        } else {

            alert("Something went wrong.");

        }

    } catch (error) {

        console.log(error);

        alert("Unable to connect to server.");

    }

});