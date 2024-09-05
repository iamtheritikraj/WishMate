// Sample wishlists stored in local storage
let wishlists = JSON.parse(localStorage.getItem('wishlists')) || {};

document.addEventListener('DOMContentLoaded', function () {
  // Populate dropdown with existing wishlists
  const wishlistDropdown = document.getElementById('wishlistDropdown');
  for (let key in wishlists) {
    let option = document.createElement('option');
    option.value = key;
    option.text = key;
    wishlistDropdown.add(option);
  }

  // Create new wishlist
  document.getElementById('createWishlistBtn').addEventListener('click', () => {
    let wishlistName = prompt('Enter wishlist name:');
    if (wishlistName) {
      wishlists[wishlistName] = [];
      localStorage.setItem('wishlists', JSON.stringify(wishlists));
      location.reload();
    }
  });

  // Add item to wishlist
  document.getElementById('addToWishlistBtn').addEventListener('click', () => {
    let selectedWishlist = wishlistDropdown.value;
    
    if (selectedWishlist) {
      // Use the Chrome API to get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let currentTabUrl = tabs[0].url;  // Get the URL of the current tab
        
        if (currentTabUrl) {
          wishlists[selectedWishlist].push(currentTabUrl);
          localStorage.setItem('wishlists', JSON.stringify(wishlists));
          alert('URL added to wishlist successfully!');
        } else {
          alert('Could not get the URL of the current tab.');
        }
      });
    } else {
      alert('Please select a wishlist first.');
    }
  });
  

  // Check wishlist
  document.getElementById('checkWishlistBtn').addEventListener('click', () => {
    let selectedWishlist = wishlistDropdown.value;
    if (selectedWishlist) {
      window.location.href = 'wishlist.html';
    } else {
      alert('Please select a wishlist first.');
    }
  });

  // Share wishlist
  document.getElementById('shareBtn').addEventListener('click', () => {
    let selectedWishlist = wishlistDropdown.value;
    if (selectedWishlist) {
      let wishlistItems = wishlists[selectedWishlist].join('\n');
      let message = `Check out my wishlist: \n${wishlistItems}`;
      let shareUrl = encodeURI(`https://wa.me/?text=${message}`); // WhatsApp share link
      window.open(shareUrl);
    } else {
      alert('Please select a wishlist first.');
    }
  });

  
});
