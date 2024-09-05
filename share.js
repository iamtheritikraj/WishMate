document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('shareWishlistViaWhatsApp').addEventListener('click', () => {
        let wishlistDropdownContent = document.getElementById('wishlistDropdownContent');
        let wishlistDropdown = document.getElementById('wishlistDropdown');
        
        // Ensure both elements exist
        if (!(wishlistDropdown || wishlistDropdownContent)) {
            alert('Dropdown not found!');
            return;
        }
        
        // Try to get value from either dropdown
        let selectedWishlist = wishlistDropdown?.value || wishlistDropdownContent?.value;
    
        if (selectedWishlist) {
            let wishlistItems = wishlists[selectedWishlist]
                .map(item => decodeURIComponent(item))  // Decode URL encoding if any
                .join('\n');  // Join items with new lines
            
            let message = `Check out my wishlist:\n\n${wishlistItems}`;  // Wishlist message
            
            // Construct the WhatsApp share URL without shortening it
            let shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`; 
            
            window.open(shareUrl);  // Open WhatsApp share URL in a new tab
        } else {
            alert('Please select a valid wishlist first.');
        }
    });
    
});