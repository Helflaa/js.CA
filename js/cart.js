const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
let moviesArray = [];
let cart = JSON.parse(localStorage.getItem("data")) || [];
const container = document.getElementById("items-container");
const priceContainer = document.getElementById("total-price");
const emptyCartMsg = document.getElementById("empty-cart");

function fetchData() {
    return fetch(squareEyesAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);
            moviesArray = data;
            generateCartItems();
            totalAmount();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function generateCartItems() {
    if (cart.length !== 0 && moviesArray.length !== 0) {
        container.innerHTML = cart.map((x) => {
            let { id, item } = x;
            let search = moviesArray.find((y) => y.id === id) || {};
            console.log("Search object:", search);
            let imageUrl = search.image;
            let title = search.title;
            let rating = search.rating;
            let description = search.description;
            let price = search.price;
            return `
            <div class="cart-items">
                <img class="image" width="150" height="150" src="${imageUrl}" alt=""/>
                <div class="product-detail">
                    <p class="product-header">${title}</p>
                    <p class="price">${price} NOK</p>
                </div>
                <button onclick="removeItem('${id}')" class="btn" id="remove-item">Remove</button>
            </div>
            `;
        }).join("");
        totalAmount();
    } else {
        emptyCartMsg.style.display = "flex";
        priceContainer.innerHTML = "";
    }
}


function removeItem(id) {
    const index = cart.findIndex((x) => x.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(cart));
        container.innerHTML = "";
        generateCartItems();
        totalAmount();
    }
}



function totalAmount() {
    if (cart.length !== 0) {
        let amount = cart.map((x) => {
            let { item, id } = x;
            let search = moviesArray.find((y) => y.id === id) || {};
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        priceContainer.innerHTML = `
        <h2 class="total-price">Total: ${amount} NOK</h2>
        <div class="btn-container">
            <button class="btn" id="back-to-browse" onclick="backToBrowse()">
                < Back to browse
            </button>
            <button class="btn" id="go-to-checkout" onclick="goToCheckout()">
                Go to checkout >
            </button>
        </div>
        `;
    } else {
        priceContainer.innerHTML = "";
    }
}

function backToBrowse() {
    window.location.href = "index.html";
}
function goToCheckout() {
    window.location.href = "checkout.html";
}
function init() {
    fetchData();
}

init();
