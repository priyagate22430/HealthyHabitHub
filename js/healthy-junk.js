

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".food-card");

    cards.forEach(function (card) {

        const foodName = card.getAttribute("data-name");

        if (foodName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// Filter Food

function filterFood(type) {

    const cards = document.querySelectorAll(".food-card");

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    if (type === "all") {

        cards.forEach(function (card) {
            card.style.display = "block";
        });

        buttons[0].classList.add("active");

    }

    else {

        cards.forEach(function (card) {

            if (card.classList.contains(type)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

        if (type === "healthy") {
            buttons[1].classList.add("active");
        }

        if (type === "junk") {
            buttons[2].classList.add("active");
        }

    }

}


// Show Information

function showInfo(title, text) {

    document.getElementById("modalTitle").innerText = title;

    document.getElementById("modalText").innerText = text;

    document.getElementById("infoModal").style.display = "block";

}


// Close Modal

function closeModal() {

    document.getElementById("infoModal").style.display = "none";

}


// Close modal when clicking outside

window.onclick = function(event) {

    const modal = document.getElementById("infoModal");

    if (event.target === modal) {
        modal.style.display = "none";
    }

};

