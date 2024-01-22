document.addEventListener("DOMContentLoaded", function () {
    const cartLink = document.getElementById("cart-link");
    const addToCartButtons = document.querySelectorAll(".btn.btn-warning");
    const loginForm = document.getElementById("login-form");

    function addToCart(productName) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(productName);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartIcon();
    }

    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartLink.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-cart2" viewBox="0 0 16 16">
                <path
                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 
                    13 
                    11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 
                    1 0 1 0 0 2 1
                    1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 
                    0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            <span class="badge bg-primary">${cart.length}</span>
        `;
    }

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = this.closest(".card").querySelector(".card-title").textContent;
            addToCart(productName);
        });
    });

    cartLink.addEventListener("click", function () {
        window.location.href = "cart.html";
    });

    function login(username, password) {
        if (username === "Syyt0158" && password === "Gwnwat") {
            window.location.href = "bestellingen.html";
        } else {
            alert("Ongeldige inloggegevens. Probeer opnieuw.");
        }
    }

    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});

document.addEventListener('productUpdated', function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    products.forEach(function (product) {
        const card = document.createElement('div');
        card.className = 'col-md-5';
        card.innerHTML = `
            <div class="card mb-4">
                <img src="${product.image}" class="card-img-top" alt="foto">
                <div class="card-body">
                    <h5 class="card-title text-center">${product.name}</h5>
                    <p class="text-center">${product.price} Euro</p>
                    <button href="#" class="btn btn-warning w-100 p-3">Voeg toe aan winkelwagen</button>
                </div>
            </div>
        `;

        productList.appendChild(card);
    });
});
document.dispatchEvent(new Event('productUpdated'));
