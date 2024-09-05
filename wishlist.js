// Display items in wishlist.html
document.addEventListener('DOMContentLoaded', function () {
  const wishlistDropdownContent = document.getElementById('wishlistDropdownContent');
    const wishlistContent = document.getElementById('wishlistContent');
    let selectedWishlist = localStorage.getItem('selectedWishlist');
    let wishlists = JSON.parse(localStorage.getItem('wishlists'));
  
    if (selectedWishlist && wishlists[selectedWishlist]) {
      wishlists[selectedWishlist].forEach(item => {
        let p = document.createElement('p');
        p.textContent = item;
        wishlistContent.appendChild(p);
      });
    }

  // Populate dropdown with existing wishlists
  for (let key in wishlists) {
    let option = document.createElement('option');
    option.value = key;
    option.text = key;
    wishlistDropdownContent.add(option);
  }
  
  // Add event listener to dropdown
  wishlistDropdownContent.addEventListener('change', updateWishlistContent);
  // Function to update the wishlist content based on selected wishlist

  function updateWishlistContent() {
    let selectedWishlist = wishlistDropdownContent.value;
    wishlistContent.innerHTML = '';  // Clear previous content

    if (selectedWishlist && wishlists[selectedWishlist]) {
      wishlists[selectedWishlist].forEach(item => {
        let p = document.createElement('p');
        p.textContent = item;
        wishlistContent.appendChild(p);
      });
    } else {
      wishlistContent.innerHTML = '<p>No items found in this wishlist.</p>';
    }
  }


  document.getElementById('clearSelectedWishlist').addEventListener('click', () => {
    let selectedWishlist = wishlistDropdownContent.value;
  
    if (selectedWishlist) {
      // Clear the wishlist content
      wishlists[selectedWishlist] = [];
      localStorage.setItem('wishlists', JSON.stringify(wishlists));
      wishlistContent.innerHTML = '<p>The wishlist has been emptied.</p>';
  
      // Prompt the user to confirm deletion
      if (confirm('Do you want to delete this wishlist entirely?')) {
        // Delete the wishlist from wishlists
        delete wishlists[selectedWishlist];
        localStorage.setItem('wishlists', JSON.stringify(wishlists));
  
        // Remove the wishlist from the dropdown
        const optionToRemove = Array.from(wishlistDropdownContent.options).find(option => option.value === selectedWishlist);
        if (optionToRemove) {
          wishlistDropdownContent.removeChild(optionToRemove);
        }
  
        // Clear the displayed content
        wishlistContent.innerHTML = '<p>The selected wishlist has been removed.</p>';
      }
    } else {
      alert('Please select a wishlist first.');
    }
  });
  
  });
  