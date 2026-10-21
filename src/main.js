const productGrid = document.getElementById("product-grid");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageIndicator = document.getElementById("page-indicator");

let products = [];
let currentPage = 1;
const productsPerPage = 5;

async function loadProducts() {
    try {
        const response = await fetch("./src/data/products.json");
        products = await response.json();

        displayProducts();
    } catch (error) {
        productGrid.textContent = "Could not load products. Please check your JSON file.";
        console.error(error);
    }
}

function displayProducts() {
    productGrid.innerHTML = "";

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const currentProducts = products.slice(start, end);

    currentProducts.forEach(function(product) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price">$${Number(product.price).toFixed(2)}</p>
            <p class="category-badge">${product.category}</p>
            <p>${product.description}</p>
        `;

        productGrid.appendChild(card);
    });

    const totalPages = Math.ceil(products.length / productsPerPage);

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

prevButton.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

nextButton.addEventListener("click", function() {
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
});

loadProducts();
