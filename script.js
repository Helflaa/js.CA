const apiArray = []
const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes"
const container = document.querySelector(".container")

fetch(squareEyesAPI)
    .then(function (HTTPResponse) {
        return HTTPResponse.json()
    })
    .then(function (apiResult) {
        const apiArray = apiResult;
        console.log(apiArray);
        apiArray.forEach(item => {
            const card = document.createElement("a");
            card.classList.add("card");
            card.href = `product-page.html?id=${item.id}`
            card.innerHTML = `
                <figure class="movie-container">
                    <img src="${item.image}" class="card-image">
                </figure>
            `;
            container.appendChild(card);
        })
    })



