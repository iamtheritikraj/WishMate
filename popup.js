// popup.js

// Load wishlists and populate the dropdown when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
    loadWishlists();

    // Event listener for adding product to the wishlist
    document.getElementById("add-product").addEventListener("click", () => {
        addProductToWishlist();
    });

    // Event listener for creating a new wishlist
    document.getElementById("create-wishlist").addEventListener("click", () => {
        let wishlistName = prompt("Enter the name of the new wishlist:");
        if (wishlistName) {
            createNewWishlist(wishlistName);
        }
    });

    // Event listener for sharing the wishlist via WhatsApp
    document.getElementById("share-whatsapp").addEventListener("click", () => {
        shareWishlistViaWhatsApp();
    });
});

// Function to load and populate the wishlist dropdown
function loadWishlists() {
    chrome.storage.sync.get({ wishlists: {} }, (data) => {
        let wishlists = data.wishlists;
        let wishlistSelect = document.getElementById("wishlist-select");
        wishlistSelect.innerHTML = ""; // Clear existing options

        for (let wishlistName in wishlists) {
            let option = document.createElement("option");
            option.value = wishlistName;
            option.textContent = wishlistName;
            wishlistSelect.appendChild(option);
        }

        // If no wishlists, prompt to create one
        if (Object.keys(wishlists).length === 0) {
            document.getElementById("create-wishlist").disabled = false;
        }
    });
}

// Function to add the current product to the selected wishlist
function addProductToWishlist() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "captureProduct" }, (response) => {
            if (response) {
                let currentWishlist = document.getElementById("wishlist-select").value;
                chrome.storage.sync.get({ wishlists: {} }, (data) => {
                    let wishlists = data.wishlists;

                    if (!wishlists[currentWishlist]) {
                        wishlists[currentWishlist] = [];
                    }

                    wishlists[currentWishlist].push(response);
                    chrome.storage.sync.set({ wishlists: wishlists }, () => {
                        alert("Product added to wishlist!");
                    });
                });
            }
        });
    });
}

// Function to create a new wishlist
function createNewWishlist(name) {
    chrome.storage.sync.get({ wishlists: {} }, (data) => {
        let wishlists = data.wishlists;

        if (!wishlists[name]) {
            wishlists[name] = [];
            chrome.storage.sync.set({ wishlists: wishlists }, () => {
                loadWishlists();
                alert("New wishlist created!");
            });
        } else {
            alert("A wishlist with this name already exists.");
        }
    });
}

// Function to share the wishlist via WhatsApp
function shareWishlistViaWhatsApp() {
    let currentWishlist = document.getElementById("wishlist-select").value;
    chrome.storage.sync.get({ wishlists: {} }, (data) => {
        let wishlist = data.wishlists[currentWishlist];
        let message = `Check out these items from my wishlist (${currentWishlist}):\n\n`;

        wishlist.forEach(product => {
            message += `${product.name} - ${product.price}\n${product.url}\n\n`;
        });

        let encodedMessage = encodeURIComponent(message);
        let whatsappURL = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappURL, "_blank");
    });
}
