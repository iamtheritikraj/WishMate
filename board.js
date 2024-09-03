// board.js
chrome.storage.sync.get({ wishlists: {} }, (data) => {
    let wishlists = data.wishlists;
    let board = document.querySelector(".board");
    for (let category in wishlists) {
      wishlists[category].forEach(product => {
        let productElement = document.createElement("div");
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>${product.price}</p>
        `;
        board.appendChild(productElement);
      });
    }
  });
  