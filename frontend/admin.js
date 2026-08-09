// Check Login
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const tableBody = document.getElementById("reservationData");
const contactTableBody = document.getElementById("contactData");
const menuTableBody = document.getElementById("menuData");
const menuForm = document.getElementById("menuForm");
let editingMenuId = null;

let allReservations = [];
let allMenuItems = [];

// ======================
// Load Reservations
// ======================

async function loadReservations() {

    try {

        const response = await fetch(`${API_BASE_URL}/api/reservations`);
        const data = await response.json();

        allReservations = data.reservations;

        displayReservations(allReservations);

    } catch (error) {

        console.log("Error Loading Reservations:", error);

    }

}

async function loadContacts(){

    try{

        const response = await fetch(`${API_BASE_URL}/api/contacts`);


        const data = await response.json();


        contactTableBody.innerHTML = "";
        document.getElementById("totalContacts").textContent = data.contacts.length;


        data.contacts.forEach((contact)=>{


            contactTableBody.innerHTML += `

                <tr>

                    <td>${contact.name}</td>

                    <td>${contact.email}</td>

                    <td>${contact.subject}</td>

                    <td>${contact.message}</td>


                    <td>

                        <button onclick="deleteContact('${contact._id}')">
                            Delete
                        </button>

                    </td>

                </tr>

            `;


        });


    }
    catch(error){

        console.log(error);

    }

}

/*menu from admin*/

if(menuForm){

    menuForm.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const formData = new FormData();

        formData.append("name",
            document.getElementById("menuName").value);

        formData.append("category",
            document.getElementById("menuCategory").value);

        formData.append("price",
            document.getElementById("menuPrice").value);

        formData.append("description",
            document.getElementById("menuDescription").value);

        const imageFile = document.getElementById("menuImage").files[0];

                if (imageFile) {
                formData.append("image", imageFile);
        }
        try{

           const url = editingMenuId

            ? `${API_BASE_URL}/api/menu/${editingMenuId}`

            : `${API_BASE_URL}/api/menu`;

           const method = editingMenuId ? "PUT" : "POST";

        await fetch(url,{

            method,

            body:formData

        });

            menuForm.reset();
            editingMenuId = null;

            menuForm.querySelector("button").textContent = "Add Menu Item";

            loadMenu();

        }
        catch(error){

            console.log(error);

        }

    });

}

async function loadMenu(){

    try{

        const response = await fetch(
            `${API_BASE_URL}/api/menu`
        );

        const data = await response.json();
        allMenuItems = data.menuItems;

        menuTableBody.innerHTML = "";

        data.menuItems.forEach((item)=>{

            menuTableBody.innerHTML += `

            <tr>

                <td>

                    <img
                        src="${API_BASE_URL}/uploads/${item.image}"
                        width="70"
                        height="70"
                        style="border-radius:8px; object-fit:cover;"
                    >

                </td>

                <td>${item.name}</td>

                <td>${item.category}</td>

                <td>₹${item.price}</td>

                <td>${item.description}</td>

                <td>

                    <button onclick="editMenu('${item._id}')">

                        Edit

                    </button>

                    <button onclick="deleteMenu('${item._id}')">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
    catch(error){

        console.log(error);

    }

}

/* ====== DELETE FUNCTION =========*/

async function deleteMenu(id){

    const confirmDelete = confirm(
        "Delete this menu item?"
    );

    if(!confirmDelete) return;

    try{

        await fetch(
            `${API_BASE_URL}/api/menu/${id}`,
            {
                method:"DELETE"
            }
        );

        loadMenu();

    }
    catch(error){

        console.log(error);

    }

}

async function editMenu(id) {

    try {

        // Fetch all menu items
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        const data = await response.json();

        // Find selected item
        const item = data.menuItems.find(menu => menu._id === id);

        if (!item) {
            alert("Menu item not found!");
            return;
        }

        // Fill the form
        document.getElementById("menuName").value = item.name;
        document.getElementById("menuCategory").value = item.category;
        document.getElementById("menuPrice").value = item.price;
        document.getElementById("menuDescription").value = item.description;

        // Save editing ID
        editingMenuId = item._id;

        // Change button text
        const submitBtn = menuForm.querySelector("button");

        if (submitBtn) {
            submitBtn.innerText = "Update Menu Item";
        }

        // Scroll to form
        menuForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.log("Edit Error:", error);

    }

}

// ======================
// Display Reservations
// ======================

function displayReservations(reservations) {

    tableBody.innerHTML = "";

    let totalGuests = 0;
    let todayReservations = 0;
    let upcomingReservations = 0;
    let pendingReservations = 0;

    const today = new Date().toISOString().split("T")[0];

    reservations.forEach((reservation) => {

        tableBody.innerHTML += `
            <tr>

                <td>${reservation.name}</td>

                <td>${reservation.email}</td>

                <td>${reservation.phone}</td>

                <td>${reservation.date}</td>

                <td>${reservation.time}</td>

                <td>${reservation.guests}</td>

                <td>
                    <button onclick='viewReservation(${JSON.stringify(reservation)})'>
                       View
                    </button>
                </td>

                <td>${reservation.status || "Pending"}</td>

                <td>
                    ${
                        (reservation.status || "Pending") === "Pending"
                        ?
                        `<button onclick="confirmReservation('${reservation._id}')">
                            Confirm
                        </button>`
                        :
                        "Confirmed"
                    }
                </td>

                <td>
                    <button onclick="deleteReservation('${reservation._id}')">
                        Delete
                    </button>
                </td>

            </tr>
        `;

        totalGuests += reservation.guests;

        if (reservation.date === today) {
            todayReservations++;
        }

        if (reservation.date > today) {
            upcomingReservations++;
        }

        if((reservation.status || "Pending") === "Pending"){
            pendingReservations++;
        }

    });

    document.getElementById("totalReservations").textContent = reservations.length;

    document.getElementById("todayReservations").textContent = todayReservations;

    document.getElementById("upcomingReservations").textContent = upcomingReservations;

    document.getElementById("totalGuests").textContent = totalGuests;

    document.getElementById("pendingReservations").textContent = pendingReservations;

}

// ======================
// Delete Reservation
// ======================

async function deleteReservation(id) {

    const confirmDelete = confirm("Are you sure you want to delete this reservation?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_BASE_URL}/api/reservations/${id}`, {

            method: "DELETE"

        });

        loadReservations();

    } catch (error) {

        console.log("Delete Error:", error);

    }

}

async function deleteContact(id){

    const confirmDelete = confirm(
        "Delete this message?"
    );


    if(!confirmDelete) return;


    try{

        await fetch(
            `${API_BASE_URL}/api/contacts/${id}`,
            {
                method:"DELETE"
            }
        );


        loadContacts();


    }
    catch(error){

        console.log(error);

    }

}

// ======================
// Confirm Reservation
// ======================

async function confirmReservation(id) {

    try {

        const response = await fetch(

            `${API_BASE_URL}/api/reservations/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                }

            }

        );

        const data = await response.json();

        console.log(data);

        loadReservations();

    } catch (error) {

        console.log("Confirm Error:", error);

    }

}

function viewReservation(reservation){

    document.getElementById("reservationDetails").innerHTML = `

        <h2>Reservation Details</h2>

        <p><strong>Name:</strong> ${reservation.name}</p>

        <p><strong>Email:</strong> ${reservation.email}</p>

        <p><strong>Phone:</strong> ${reservation.phone}</p>

        <p><strong>Date:</strong> ${reservation.date}</p>

        <p><strong>Time:</strong> ${reservation.time}</p>

        <p><strong>Guests:</strong> ${reservation.guests}</p>

        <p><strong>Status:</strong> ${reservation.status || "Pending"}</p>

        <p><strong>Message:</strong><br>${reservation.message || "-"}</p>

    `;

    document.getElementById("reservationModal").style.display = "block";

}

function closeModal(){

    document.getElementById("reservationModal").style.display = "none";

}

// ======================
// Search Reservation
// ======================

function searchReservations() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredReservations = allReservations.filter((reservation) => {

        return (

            reservation.name.toLowerCase().includes(search) ||

            reservation.email.toLowerCase().includes(search) ||

            reservation.phone.includes(search)

        );

    });

    displayReservations(filteredReservations);

}
function filterReservations(status){

    if(status === "All"){

        displayReservations(allReservations);

        return;

    }

    const filtered = allReservations.filter((reservation)=>{

        return (reservation.status || "Pending") === status;

    });

    displayReservations(filtered);

}

// ======================
// Initial Load
// ======================

loadReservations();
loadContacts();
loadMenu();
