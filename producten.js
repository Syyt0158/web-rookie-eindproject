document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.querySelector("#reset-button");

    resetButton.addEventListener("click", function () {
        localStorage.removeItem('products');
        location.reload();
    });
});

const productsData = {
    init() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
    },

    productName: '',
    productPrice: '',
    productImage: '',
    products: [],

    addProduct() {
        this.products.push({
            name: this.productName,
            price: this.productPrice,
            image: this.productImage,
        });

        this.productName = '';
        this.productPrice = '';
        this.productImage = '';

        this.persistProducts();
    },

    editProduct(product) {
        product.isEditing = true;
        product.editName = product.name;
        product.editPrice = product.price;
        product.editImage = product.image;
    },

    saveProduct(product) {
        product.name = product.editName;
        product.price = product.editPrice;
        product.image = product.editImage;
        product.isEditing = false;
        this.persistProducts();
    },

    removeProduct(product) {
        const index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
            this.persistProducts();
        }
    },

    persistProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    },
};

Alpine.data('products', () => productsData);

document.addEventListener('productUpdated', function () {
});
