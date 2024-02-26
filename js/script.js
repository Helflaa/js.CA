const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
let moviesArray = [];
const comedyBtn = document.getElementById("comedy");
const actionBtn = document.getElementById("action");
const horrorBtn = document.getElementById("horror");
const allBtn = document.getElementById("all");
const container = document.getElementById("container");
const loadingDiv = document.getElementById("loader");

function fetchData() {
    fetch(squareEyesAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            moviesArray = data;
            displayMovies(moviesArray);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMovies(movies) {
    container.innerHTML = "";

    movies.forEach(item => {
        const card = createMovieCard(item);
        container.appendChild(card);
    });
}

function createMovieCard(item) {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = `product.html?id=${item.id}`;
    card.innerHTML = `
        <div class="movie-container">
            <img src="${item.image}" class="image">
        </div>
    `;
    loadingDiv.style.display = "none";
    return card;

}

function setActiveButton(button) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
}

comedyBtn.addEventListener("click", function() {
    const comedyMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("comedy"));
    displayMovies(comedyMovies);
    setActiveButton(comedyBtn);
    loadingDiv.style.display = "none";
});

actionBtn.addEventListener("click", function() {
    const actionMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("action"));
    displayMovies(actionMovies);
    setActiveButton(actionBtn);
    loadingDiv.style.display = "none";
});

horrorBtn.addEventListener("click", function() {
    const horrorMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("horror"));
    displayMovies(horrorMovies);
    setActiveButton(horrorBtn);
    loadingDiv.style.display = "none";
});

allBtn.addEventListener("click", function() {
    displayMovies(moviesArray);
    setActiveButton(allBtn);
    loadingDiv.style.display = "none";
});

fetchData();
