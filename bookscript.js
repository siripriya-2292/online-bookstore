// 🌙 Dark Mode
function darkMode() {
    document.body.classList.toggle("dark");
}


// 📦 Display Books
const container = document.getElementById("bookContainer");

function displayBooks(bookList) {
    if (!container) return;

    container.innerHTML = "";

    bookList.forEach((book) => {
        container.innerHTML += `
            <div class="book-card">
                <img src="${book.img}">
                <div class="book-title">${book.title}</div>
                <div class="price">₹ ${book.price}</div>
                <button onclick="addToCart('${book.title}', ${book.price})">
                    Add to Cart 🛒
                </button>
            </div>
        `;
    });
}

// Call this only if books exist
if (typeof books !== "undefined") {
    displayBooks(books);
}


// 🔍 Search
function searchBooks() {
    let input = document.getElementById("search").value.toLowerCase();
    let books = document.querySelectorAll(".book-card");

    books.forEach(book => {
        let title = book.querySelector(".book-title").innerText.toLowerCase();

        book.style.display = title.includes(input) ? "block" : "none";
    });
}


// 🛒 Add to Cart (LOCAL STORAGE VERSION)
function addToCart(name, price) {
    alert(name + " added to cart ✅");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = {
        name: name,
        price: price
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    console.log("Updated cart:", cart);

}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.textContent = cart.length;

        // trigger animation
        countElement.classList.remove("pop");
        void countElement.offsetWidth; // restart animation
        countElement.classList.add("pop");
    }
}
// 🔗 Go to Cart Page
function goToCart() {
    window.location.href = "cart.html";
}


// 🧾 Display Cart Page
function displayCartPage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cartContainer");
    let total = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        let div = document.createElement("div");

        div.innerHTML = `
            ${item.name} - ₹ ${item.price}
            <button onclick="removeItem(${index})">❌</button>
        `;

        container.appendChild(div);

        sum += item.price;
    });

    total.textContent = "Total: ₹ " + sum;
}

// Run automatically
displayCartPage();
updateCartCount();


window.onload = function () {
    updateCartCount();
};

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1); // remove item

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartPage();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");

    displayCartPage();
    updateCartCount();
}

function goToProfile() {
    window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "week2.html";
}

function buyNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    window.location.href = "checkout.html";
}

function placeOrder() {
    let method = document.querySelector('input[name="pay"]:checked').value;
    let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    let total = 0;
    cart.forEach(item => total += item.price);

    // save order details
    let order = {
        items: cart,
        total: total,
        payment: method
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));


    if (method === "cod") {
        alert("Order placed (Cash on Delivery)");
        window.location.href = "success.html";
    }

    else if (method === "upi") {
        window.location.href = "upi-payment.html";
    }

    else if (method === "card") {
        window.location.href = "card-payment.html";
    }

    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");
}

function login() {
    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "homepage.html";
}

function addToWishlist(book) {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!list.includes(book)) {
        list.push(book);
        localStorage.setItem("wishlist", JSON.stringify(list));
        alert(book + " added to wishlist ❤️");
    } else {
        alert("Already in wishlist!");
    }
}


async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(
        "http://localhost:8080/OnlineBookStore/login",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if(data.success){

        alert("Login Successful");

        window.location.href = "homepage.html";

    } else {

        alert("Invalid Credentials");
    }
}