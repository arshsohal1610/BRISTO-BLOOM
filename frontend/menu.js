// ===============================
// LOAD MENU FROM DATABASE
// ===============================

async function loadMenu() {

    try {

        const response = await fetch("http://localhost:5000/api/menu");

        const data = await response.json();

        // HOME PAGE
        const homeMenu = document.getElementById("homeMenu");

        if (homeMenu) {

            homeMenu.innerHTML = "";

            data.menuItems.slice(0, 3).forEach(item => {

                homeMenu.innerHTML += `

                <div class="dish-card">

                    <img src="http://localhost:5000/uploads/${item.image}" alt="${item.name}">

                    <div class="dish-content">

                        <h3>${item.name}</h3>

                        <p>${item.description}</p>

                        <span class="price">₹${item.price}</span>

                    </div>

                </div>

                `;

            });

        }


        // FULL MENU PAGE
        const menuContainer = document.getElementById("menuContainer");

        if (menuContainer) {

            menuContainer.innerHTML = "";

            data.menuItems.forEach(item => {

                const category = item.category.toLowerCase().replace(/\s+/g, "");

                menuContainer.innerHTML += `

                <div class="menu-card" data-category="${category}">

                    <img src="http://localhost:5000/uploads/${item.image}" alt="${item.name}">

                    <div class="menu-info">

                        <div class="menu-title">

                            <h3>${item.name}</h3>

                            <span>₹${item.price}</span>

                        </div>

                        <p>${item.description}</p>

                        <small>${item.category}</small>

                    </div>

                </div>

                `;

            });

            initializeFilters();

        }

    }

    catch (error) {

        console.log(error);

    }

}



// ===============================
// MENU FILTER
// ===============================

function initializeFilters() {

    const filterButtons = document.querySelectorAll(".filter-buttons button");

    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filter = button.dataset.filter;

            menuCards.forEach(card => {

                if (filter === "all" || card.dataset.category === filter) {

                    card.style.display = "";

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    });

}

loadMenu();