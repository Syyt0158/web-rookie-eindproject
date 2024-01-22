document.addEventListener("DOMContentLoaded", function () {
    const orderList = document.getElementById("order-list");

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        orderList.innerHTML = '';

        orders.forEach((order, index) => {
            const orderData = order.split(', ');
            const tr = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = index + 1;
            const tdCount = document.createElement("td");
            tdCount.textContent = orderData.length;
            const tdDate = document.createElement("td");
            tdDate.textContent = new Date().toLocaleString();
            const tdTotal = document.createElement("td");
            tdTotal.textContent = calculateOrderTotal(orderData) + " Euro";

            tr.appendChild(tdId);
            tr.appendChild(tdCount);
            tr.appendChild(tdDate);
            tr.appendChild(tdTotal);

            orderList.appendChild(tr);
        });
    }

    function calculateOrderTotal(orderData) {
        let total = 0;

        orderData.forEach((item) => {
            const price = getProductPrice(item);
            total += price;
        });

        return total.toFixed(2);
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

    const resetButton = document.getElementById("reset-orders");
    resetButton.addEventListener("click", function () {
        localStorage.setItem("orders", JSON.stringify([]));

        orderList.innerHTML = '';

        alert("Bestellingen zijn gereset!");

        displayOrders();
    });

    displayOrders();
});
