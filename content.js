// content.js
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureProduct") {
      // Replace selectors with actual selectors from popular sites
      let productName = document.querySelector(".product-title").innerText;
      let productPrice = document.querySelector(".product-price").innerText;
      let productImage = document.querySelector(".product-image").src;
      let productURL = window.location.href;

      sendResponse({
        name: productName,
        price: productPrice,
        image: productImage,
        url: productURL
      });
    }
  });
});
