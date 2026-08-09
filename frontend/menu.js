// ===============================
// IMAGE PATH
// ===============================

function getImagePath(image) {

    // Existing images stored in frontend/images
    const frontendImages = {
        "1785454433535-grilled-chicken.jpg": "grilled-chicken.jpg",
        "1785441358333-Creamy Mushroom Pasta.jpg": "Creamy Mushroom Pasta.jpg",
        "1785441180989-butter-chicken.jpg": "butter-chicken.jpg"
    };

    // If image belongs to frontend/images
    if (frontendImages[image]) {
        return `images/${frontendImages[image]}`;
    }

    // Otherwise it is an image uploaded through Admin
    return `${API_BASE_URL}/uploads/${image}`;
}


// ===============================
// LOAD MENU FROM DATABASE
// ===============================

async function loadMenu() {

    try {

        const response = await fetch(`${API_BASE_URL}/api/menu`);

        const data = await response.json();

        // ===============================
        // HOME PAGE - LATEST 3 ITEMS
        // ===============================

        const homeMenu = document.getElementById("homeMenu");

        if (homeMenu) {

            homeMenu.innerHTML = "";

            data.menuItems.slice(0, 3).forEach(item => {

                homeMenu.innerHTML += `

                    <div class="dish-card">

                        <img
                            src="${getImagePath(item.image)}"
                            alt="${item.name}"
                        >

                        <div class="dish-content">

                            <h3>${item.name}</h3>

                            <p>${item.description}</p>

                            <span class="price">₹${item.price}</span>

                        </div>

                    </div>

                `;

            });

        }


        // ===============================
        // FULL MENU PAGE
        // ===============================

        const menuContainer =
            document.getElementById("menuContainer");

        if (menuContainer) {

            menuContainer.innerHTML = "";

            data.menuItems.forEach(item => {

                const category =
                    item.category
                        .toLowerCase()
                        .replace(/\s+/g, "");

                menuContainer.innerHTML += `

                    <div
                        class="menu-card"
                        data-category="${category}"
                    >

                        <img
                            src="${getImagePath(item.image)}"
                            alt="${item.name}"
                        >

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

        console.log("Error Loading Menu:", error);

    }

}


// ===============================
// MENU FILTER
// ===============================

function initializeFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-buttons button");

    const menuCards =
        document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            menuCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category === filter
                ) {

                    card.style.display = "";

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    });

}


// ===============================
// START
// ===============================

loadMenu();