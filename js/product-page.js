const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
const container = document.getElementById("movie-container");
const urlParameter = new URLSearchParams(window.location.search);
const movieID = urlParameter.get("id");
const cart = JSON.parse(localStorage.getItem("data")) || [];

function fetchData() {
    fetch(squareEyesAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(apiResult => {
            const selectedItem = apiResult.find(item => item.id === movieID);
            if (selectedItem) {
                renderMovieDetails(selectedItem);
            } else {
                console.log("Movie not found");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function renderMovieDetails(selectedItem) {
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie');
    movieDetails.innerHTML = `
        <h1>${selectedItem.title} (${selectedItem.released})</h1>
        <div class="movie-container">
            <div class="poster-image" id=${selectedItem.id}>
                <img src="${selectedItem.image}" width="200px" height="300px">
            </div>
            <div class="desc">
                <p>Genre: ${selectedItem.genre}</p>
                <p>Release year: ${selectedItem.released}</p>
                <p>Description: ${selectedItem.description}</p>
                <h2>NOK ${selectedItem.price}</h2>
                <div class="button-container">
                    <button onclick="addToCart('${selectedItem.id}')" id="add-or-remove" class="btn">
                    Add to cart
                    </button>
                    <button onclick="backToBrowse()" class="btn">
                    Back to Browse
                    </button>
                    <button onclick="goToCart()" class="btn">
                    Go to cart
                    </button>
                </div>
            </div>
        </div>
    `;
    container.appendChild(movieDetails);
}

function backToBrowse() {
    window.location.href = "index.html";
}
function goToCart() {
    window.location.href = "cart.html";
}

function addToCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index === -1) {
        cart.push({
            id: id,
            item: 1
        });
        document.getElementById("add-or-remove").innerHTML = "Remove";
        alert("Added to cart");
    } else {
        cart.splice(index, 1);
        document.getElementById("add-or-remove").innerHTML = "Add to cart";
        alert("Removed from cart");
    }

    localStorage.setItem("data", JSON.stringify(cart));
}

fetchData();