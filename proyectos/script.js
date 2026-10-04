/*const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll(".course-card");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
*/
/* FILTRO */
/*function filterCourses() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    cards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = title.includes(searchText);
        const matchesCategory = category === "all" || category === cardCategory;

        card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
}

searchInput.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses);
*/

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll(".course-card");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

/* FILTRO */
function filterCourses() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    cards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();

        // Convertimos data-category en array
        const cardCategories = card.dataset.category.toLowerCase().split(" ");

        const matchesSearch = title.includes(searchText);

        // Si category = all → mostrar todo
        const matchesCategory = category === "all" || cardCategories.includes(category);

        card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
}

searchInput.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses);

/* MODO CLARO/OSCURO */
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.remove("dark");
        body.classList.add("light");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
    }
});
