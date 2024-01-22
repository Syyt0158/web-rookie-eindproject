document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");
    const orderConfirmation = document.getElementById("order-confirmation");
    const checkoutButtonContainer = document.getElementById("checkout-button-container");

    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Je winkelmandje is leeg.</p>";
            checkoutButton.style.display = "none";
        } else {
            cartItemsContainer.innerHTML = '';
            const table = document.createElement("table");
            table.classList.add("table");
            const thead = document.createElement("thead");
            const tr = document.createElement("tr");
            const thProduct = document.createElement("th");
            thProduct.textContent = "Product";
            const thPrice = document.createElement("th");
            thPrice.textContent = "Prijs";
            const thQuantity = document.createElement("th");
            thQuantity.textContent = "Aantal";
            const thRemove = document.createElement("th");
            thRemove.textContent = "Verwijder";
            tr.appendChild(thProduct);
            tr.appendChild(thPrice);
            tr.appendChild(thQuantity);
            tr.appendChild(thRemove);
            thead.appendChild(tr);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            const cartItems = getCartItems(cart);

            cartItems.forEach((item) => {
                const trItem = document.createElement("tr");
                const tdProduct = document.createElement("td");
                tdProduct.textContent = item.product;
                const tdPrice = document.createElement("td");
                tdPrice.textContent = item.price.toFixed(2) + " Euro";
                const tdQuantity = document.createElement("td");
                tdQuantity.textContent = item.count;
                const tdRemove = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.textContent = "Verwijder";
                removeButton.classList.add("btn", "btn-danger");
                removeButton.addEventListener("click", () => removeItemFromCart(item.product));
                tdRemove.appendChild(removeButton);
                trItem.appendChild(tdProduct);
                trItem.appendChild(tdPrice);
                trItem.appendChild(tdQuantity);
                trItem.appendChild(tdRemove);
                tbody.appendChild(trItem);
            });

            const totalRow = document.createElement("tr");
            const tdTotalLabel = document.createElement("td");
            tdTotalLabel.textContent = "Totaal: €";
            tdTotalLabel.setAttribute("colspan", "3");
            const tdTotalPrice = document.createElement("td");
            tdTotalPrice.textContent = calculateTotalPrice(cartItems) + " Euro";
            totalRow.appendChild(tdTotalLabel);
            totalRow.appendChild(tdTotalPrice);
            tbody.appendChild(totalRow);

            table.appendChild(tbody);
            cartItemsContainer.appendChild(table);
        }
    }

    function removeItemFromCart(productName) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemIndex = cart.indexOf(productName);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
        }
    }

    function getCartItems(cart) {
        const cartItems = [];
        const uniqueItems = [...new Set(cart)];

        uniqueItems.forEach((item) => {
            const count = countOccurrences(cart, item);
            const price = getProductPrice(item);
            cartItems.push({
                product: item,
                price: price,
                count: count,
            });
        });

        return cartItems;
    }

    function getProductPrice(productName) {
        const productPrices = {
            "Set armbandjes": 3.99,
            "Gouden set armbandjes": 4.99,
            "Vierwindstreken armband": 2.99,
            "Veer armband": 2.99,
        };

        return productPrices[productName] || 0;
    }

    function countOccurrences(arr, item) {
        return arr.reduce((acc, curr) => (curr === item ? acc + 1 : acc), 0);
    }

    function calculateTotalPrice(cartItems) {
        let totalPrice = 0;

        cartItems.forEach((item) => {
            const price = getProductPrice(item.product);
            totalPrice += price * item.count;
        });

        return totalPrice.toFixed(2);
    }

    checkoutButton.addEventListener("click", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Je winkelmandje is leeg. Voeg items toe voordat je afrekent.");
        } else {
            placeOrder();
        }
    });

    function placeOrder() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const orderText = cart.join(", ");
        orders.push(orderText);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart");

        cartItemsContainer.style.display = "none";
        orderConfirmation.style.display = "block";
        checkoutButtonContainer.style.display = "none";
    }

    displayCartItems();
});
