// SOVEYRA WATCH STORE

const whatsappNumber = "94740148998";

let cart = [];
let selectedProduct = null;
let selectedImageIndex = 0;


// PRODUCT DETAILS
const products = [

    {
        id: 1,
        name: "Citizen Quartz Gents - Classic Silver",
        price: 4600,
        images: [
            "images/watches/watch1/watch1-main.jpg",
            "images/watches/watch1/watch1-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Gents Watch",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 2,
        name: "Citizen Quartz Gents - Brown Leather",
        price: 4500,
        images: [
            "images/watches/watch2/watch2-main.jpg",
            "images/watches/watch2/watch2-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Gents Watch",
            "Brown Leather Design",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 3,
        name: "Citizen Quartz Gents - Black Leather",
        price: 4500,
        images: [
            "images/watches/watch3/watch3-main.jpg",
            "images/watches/watch3/watch3-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Gents Watch",
            "Black Leather Design",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 4,
        name: "Citizen Quartz Ladies - Two Tone White Dial",
        price: 4600,
        images: [
            "images/watches/watch4/watch4-main.jpg",
            "images/watches/watch4/watch4-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Ladies Watch",
            "Two Tone Design",
            "White Dial",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 5,
        name: "Citizen Quartz Ladies - White Dial",
        price: 5300,
        images: [
            "images/watches/watch5/watch5-main.jpg",
            "images/watches/watch5/watch5-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Ladies Watch",
            "White Dial",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 6,
        name: "Citizen Quartz Ladies - Two Tone Classic",
        price: 5400,
        images: [
            "images/watches/watch6/watch6-main.jpg",
            "images/watches/watch6/watch6-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Ladies Watch",
            "Two Tone Classic Design",
            "1 Year Warranty Included"
        ]
    },

    {
        id: 7,
        name: "Citizen Quartz Ladies - Silver Stone Bezel",
        price: 4500,
        images: [
            "images/watches/watch7/watch7-main.jpg",
            "images/watches/watch7/watch7-detail.jpg"
        ],
        specifications: [
            "Citizen Quartz Ladies Watch",
            "Silver Stone Bezel",
            "1 Year Warranty Included"
        ]
    }

];


// LOAD PRODUCTS WHEN PAGE OPENS
document.addEventListener("DOMContentLoaded", displayProducts);


// DISPLAY ALL PRODUCTS

function displayProducts(filter = "all") {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        console.error("Product grid element was not found.");
        return;
    }

    productGrid.innerHTML = "";

    // FILTER PRODUCTS
    const filteredProducts = products.filter(product => {

        if (filter === "all") {
            return true;
        }

        if (filter === "ladies") {
            return product.name.toLowerCase().includes("ladies");
        }

        if (filter === "gents") {
            return product.name.toLowerCase().includes("gents");
        }

        return true;
    });

    // DISPLAY FILTERED PRODUCTS
    filteredProducts.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");

        const image = document.createElement("img");
        image.src = product.images[0];
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.alt = "Product image could not be loaded";
            this.classList.add("image-error");
            console.error("Image not found:", product.images[0]);
        };

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = formatPrice(product.price);

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.className = "view-product-btn";
        viewButton.textContent = "VIEW DETAILS";

        viewButton.addEventListener("click", function (event) {
            event.stopPropagation();
            openProductDetails(product.id);
        });

        const whatsappButton = document.createElement("button");
        whatsappButton.type = "button";
        whatsappButton.className = "whatsapp-btn";
        whatsappButton.textContent = "ASK ON WHATSAPP";

        whatsappButton.addEventListener("click", function (event) {
            event.stopPropagation();
            askOnWhatsApp(product.name);
        });

        card.addEventListener("click", function () {
            openProductDetails(product.id);
        });

        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProductDetails(product.id);
            }
        });

        card.append(image, name, price, viewButton, whatsappButton);

        productGrid.appendChild(card);

    });

}


// WATCH FILTER BUTTON EVENTS
document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", function () {

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        displayProducts(this.dataset.filter);

    });

});



// FORMAT PRICE
function formatPrice(price) {

    return `LKR ${Number(price).toLocaleString("en-US")}`;

}


// OPEN PRODUCT DETAILS
function openProductDetails(productId) {

    selectedProduct = products.find(function (product) {
        return product.id === productId;
    });

    if (!selectedProduct) {
        return;
    }

    selectedImageIndex = 0;


    const mainImage = document.getElementById("mainProductImage");

    const thumbnail1 = document.getElementById("productThumbnail1");

    const thumbnail2 = document.getElementById("productThumbnail2");


    mainImage.src = selectedProduct.images[0];
    mainImage.alt = selectedProduct.name + " main image";

    thumbnail1.src = selectedProduct.images[0];
    thumbnail2.src = selectedProduct.images[1];


    document.getElementById("detailProductName").textContent =
        selectedProduct.name;

    document.getElementById("detailProductPrice").textContent =
        formatPrice(selectedProduct.price);


    // DISPLAY PRODUCT INFORMATION
    const specificationList =
        document.getElementById("productSpecifications");

    specificationList.innerHTML = "";

    selectedProduct.specifications.forEach(function (specification) {

        const paragraph = document.createElement("p");

        paragraph.textContent = specification;

        specificationList.appendChild(paragraph);

    });


    // ADD TO CART BUTTON
    const addButton = document.getElementById("detailAddToCart");

    addButton.disabled = false;
    addButton.textContent = "ADD TO CART";

    addButton.onclick = function () {

        addToCart(
            selectedProduct.name,
            selectedProduct.price
        );

    };


    // WHATSAPP BUTTON
    document.getElementById("detailWhatsApp").onclick = function () {

        askOnWhatsApp(selectedProduct.name);

    };


    // SHOW MODAL
    const modal = document.getElementById("productModal");

    modal.style.display = "flex";

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    loadProductReviews(selectedProduct.id);

    selectedRating = 0;
    updateStarSelection();
    document.getElementById("reviewForm").reset();

}


// CHANGE MAIN PRODUCT IMAGE
function changeProductImage(imageIndex) {

    if (!selectedProduct || !selectedProduct.images[imageIndex]) {
        return;
    }

    selectedImageIndex = imageIndex;

    const mainImage = document.getElementById("mainProductImage");

    mainImage.src = selectedProduct.images[imageIndex];

    mainImage.alt =
        selectedProduct.name + " image " + (imageIndex + 1);

}


// CLOSE PRODUCT DETAILS
function closeProductDetails() {

    const modal = document.getElementById("productModal");

    modal.style.display = "none";

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}


// CLOSE PRODUCT MODAL WHEN CLICKING OUTSIDE
document.addEventListener("click", function (event) {

    const modal = document.getElementById("productModal");

    if (event.target === modal) {
        closeProductDetails();
    }

});


// CLOSE MODALS USING ESCAPE KEY
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeProductDetails();

        closeCart();

    }

});


// ADD PRODUCT TO CART
function addToCart(name, price) {

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {

        alert("Please enter a valid product price.");

        return;

    }


    const existingProduct = cart.find(function (item) {
        return item.name === name;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });

    }


    updateCart();

    alert(name + " added to your cart!");

}


// UPDATE CART DISPLAY
function updateCart() {

    document.getElementById("cart-count").textContent =
        cart.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);


    let cartHTML = "";

    let total = 0;


    cart.forEach(function (item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;


        cartHTML += `
            <div class="cart-item">

                <div>
                    <h3>${escapeHTML(item.name)}</h3>

                    <p>LKR ${item.price.toLocaleString("en-US")}</p>
                </div>

                <div class="quantity-controls">

                    <button type="button"
                            onclick="changeQuantity(${index}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button type="button"
                            onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                    <button type="button"
                            class="remove-btn"
                            onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

                <p>
                    Subtotal: LKR ${subtotal.toLocaleString("en-US")}
                </p>

            </div>
        `;

    });


    document.getElementById("cart-items").innerHTML =
        cartHTML || "<p>Your shopping cart is empty.</p>";


    document.getElementById("cart-total").textContent =
        total.toLocaleString("en-US");

}


// ESCAPE HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (character) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];

    });

}


// CHANGE PRODUCT QUANTITY
function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


// REMOVE PRODUCT FROM CART
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// OPEN CART
function showCart() {

    document.getElementById("checkoutModal").style.display = "flex";

    updateCart();

}


// CLOSE CART
function closeCart() {

    document.getElementById("checkoutModal").style.display = "none";

}


// PLACE ORDER THROUGH WHATSAPP
function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }


    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const customerAddress =
        document.getElementById("customerAddress").value.trim();

    const paymentMethod =
        document.getElementById("paymentMethod").value;


    let total = 0;


    let message =
        `Hello SOVEYRA!\n\nI would like to place an order.\n\n` +
        `CUSTOMER DETAILS\n\n` +
        `Name: ${customerName}\n` +
        `Contact Number: ${customerPhone}\n` +
        `Delivery Address: ${customerAddress}\n\n` +
        `ORDER DETAILS\n\n`;


    cart.forEach(function (item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;


        message +=
            `${index + 1}. ${item.name}\n` +
            `Quantity: ${item.quantity}\n` +
            `Unit Price: LKR ${item.price.toLocaleString("en-US")}\n` +
            `Subtotal: LKR ${subtotal.toLocaleString("en-US")}\n\n`;

    });


    message +=
        `TOTAL: LKR ${total.toLocaleString("en-US")}\n\n` +
        `Delivery: Free Island-wide Shipping\n` +
        `Payment Method: ${paymentMethod}\n\n` +
        `Please confirm my order.\n\n` +
        `Thank you!\nSOVEYRA Customer`;


    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener"
    );

}


// ASK ABOUT A WATCH ON WHATSAPP
function askOnWhatsApp(watchName) {

    const product = products.find(function (item) {
        return item.name === watchName;
    });

    const listedPrice = product
        ? formatPrice(product.price)
        : "Please confirm the price";


    const message =
        `Hello SOVEYRA Team,\n\n` +
        `I'm interested in ${watchName} from your collection.\n` +
        `Listed price: ${listedPrice}\n\n` +
        `Could you please confirm its availability and product specifications?\n\n` +
        `Thank you.`;


    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener"
    );

}

// ======================================
// CUSTOMER REVIEWS AND RATINGS
// ======================================


// GET REVIEWS FOR A PRODUCT
function getProductReviews(productId) {

    const storageKey = "soveyra_reviews_" + productId;

    try {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }
    catch (error) {
        console.error("Could not load reviews:", error);
        return [];
    }

}


// DISPLAY REVIEWS FOR SELECTED PRODUCT
function loadProductReviews(productId) {

    const reviews = getProductReviews(productId);

    const reviewsList = document.getElementById("reviewsList");

    const averageRating = document.getElementById("averageRating");

    reviewsList.innerHTML = "";


    if (reviews.length === 0) {

        reviewsList.textContent = "No reviews yet. Be the first to review this watch.";

        reviewsList.className = "reviews-list no-reviews";

        averageRating.textContent = "No ratings yet";

        return;

    }


    reviewsList.className = "reviews-list";


    // CALCULATE AVERAGE RATING
    const totalRating = reviews.reduce(function (total, review) {
        return total + review.rating;
    }, 0);

    const average = totalRating / reviews.length;


    averageRating.textContent =
        "★ " + average.toFixed(1) +
        " / 5  (" + reviews.length +
        (reviews.length === 1 ? " review)" : " reviews)");


    // DISPLAY EACH REVIEW
    reviews.slice().reverse().forEach(function (review) {

        const reviewCard = document.createElement("div");

        reviewCard.className = "review-item";


        const top = document.createElement("div");

        top.className = "review-top";


        const customer = document.createElement("span");

        customer.className = "review-customer";

        customer.textContent = review.name;


        const date = document.createElement("span");

        date.className = "review-date";

        date.textContent = review.date;


        top.append(customer, date);


        const stars = document.createElement("div");

        stars.className = "review-stars";

        stars.textContent =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);


        const comment = document.createElement("p");

        comment.className = "review-comment";

        comment.textContent = review.comment;


        reviewCard.append(top, stars, comment);

        reviewsList.appendChild(reviewCard);

    });

}


// SELECT STAR RATING
document.getElementById("starRating").addEventListener("click", function (event) {

    const button = event.target.closest("button[data-rating]");

    if (!button) {
        return;
    }

    selectedRating = Number(button.dataset.rating);

    updateStarSelection();

});


// UPDATE STAR COLOURS
function updateStarSelection() {

    const starButtons = document.querySelectorAll(
        "#starRating button"
    );

    starButtons.forEach(function (button) {

        const rating = Number(button.dataset.rating);

        button.classList.toggle(
            "active",
            rating <= selectedRating
        );

    });

}


// SUBMIT CUSTOMER REVIEW
document.getElementById("reviewForm").addEventListener("submit", function (event) {

    event.preventDefault();


    if (!selectedProduct) {

        alert("Please select a watch first.");

        return;

    }


    const name = document.getElementById("reviewName").value.trim();

    const comment = document.getElementById("reviewComment").value.trim();


    if (name.length === 0 || comment.length === 0) {

        alert("Please enter your name and review.");

        return;

    }


    if (selectedRating === 0) {

        alert("Please select a star rating.");

        return;

    }


    const review = {

        name: name,

        rating: selectedRating,

        comment: comment,

        date: new Date().toLocaleDateString()

    };


    const reviews = getProductReviews(selectedProduct.id);

    reviews.push(review);


    const storageKey = "soveyra_reviews_" + selectedProduct.id;


    try {

        localStorage.setItem(
            storageKey,
            JSON.stringify(reviews)
        );

    }
    catch (error) {

        alert("Unable to save your review in this browser.");

        console.error("Could not save review:", error);

        return;

    }


    // REFRESH REVIEWS
    loadProductReviews(selectedProduct.id);


    // RESET FORM
    document.getElementById("reviewForm").reset();

    selectedRating = 0;

    updateStarSelection();


    alert("Thank you! Your review has been submitted.");

});

// ======================================
// BACK TO TOP BUTTON
// ======================================

const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}