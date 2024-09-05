// Display items in wishlist.html
document.addEventListener('DOMContentLoaded', function () {
  const wishlistDropdownContent = document.getElementById('wishlistDropdownContent');
    const wishListItems = document.getElementById('wishListItems');
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

  async function updateWishlistContent() {
    let selectedWishlist = wishlistDropdownContent.value;
    wishListItems.innerHTML = '';  // Clear previous content
  
    if (selectedWishlist && wishlists[selectedWishlist] && wishlists[selectedWishlist].length > 0) {
      // Display a preview for each URL in the wishlist
      for (let url of wishlists[selectedWishlist]) {
        try {
          // Create a preview element for the URL
          let previewDiv = document.createElement('div');
          previewDiv.className = 'url-preview';
  
          // Create an anchor element for the URL
          let link = document.createElement('a');
          link.href = url;
          link.textContent = url;
          link.target = '_blank';  // Open in a new tab
          previewDiv.appendChild(link);
  
          // Add a static description or message
          let description = document.createElement('p');
          description.textContent = 'Click the link to view the page.';
          previewDiv.appendChild(description);
  
          // Add the preview element to the content section
          wishListItems.appendChild(previewDiv);
  
        } catch (error) {
          console.error('Error creating URL preview:', error);
          let errorMessage = document.createElement('p');
          errorMessage.textContent = 'Error creating URL preview.';
          wishListItems.appendChild(errorMessage);
        }
      }
    } else {
      wishListItems.innerHTML = '<p>No items found in this wishlist.</p>';
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
  