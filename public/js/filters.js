let taxSwitch = document.getElementById("switchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
        if (info.style.display != "inline") {
            info.style.display = "inline";
        } else {
            info.style.display = "none";
        }

    }
});


const filters = document.getElementById("filters");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

const scrollAmount = 200; // pixels per click

function updateArrows() {
    if (filters.scrollLeft <= 0) {
        arrowLeft.classList.add("disabled");
    } else {
        arrowLeft.classList.remove("disabled");
    }

    if (filters.scrollLeft + filters.clientWidth >= filters.scrollWidth - 1) {
        arrowRight.classList.add("disabled");
    } else {
        arrowRight.classList.remove("disabled");
    }
}

// Initial check
updateArrows();

// On scroll
filters.addEventListener("scroll", updateArrows);

// Arrow click actions
arrowLeft.addEventListener("click", () => {
    filters.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

arrowRight.addEventListener("click", () => {
    filters.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// On window resize
window.addEventListener("resize", updateArrows);