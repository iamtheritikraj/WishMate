document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("shareWishlistViaWhatsApp")
    .addEventListener("click", () => {
      let wishlistDropdownContent = document.getElementById(
        "wishlistDropdownContent"
      );
      let wishlistDropdown = document.getElementById("wishlistDropdown");

      // Ensure both elements exist
      if (!(wishlistDropdown || wishlistDropdownContent)) {
        alert("Dropdown not found!");
        return;
      }

      // Try to get value from either dropdown
      let selectedWishlist =
        wishlistDropdown?.value || wishlistDropdownContent?.value;

      if (selectedWishlist) {
        let wishlistItems = wishlists[selectedWishlist]
          .map((item) => decodeURIComponent(item)) // Decode URL encoding if any
          .join("\n Check this out: \t"); // Join items with new lines

        let message = `Check out my wishlist:\n\n\n\n${wishlistItems}`; // Wishlist message

        // Construct the WhatsApp share URL without shortening it
        let shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(shareUrl); // Open WhatsApp share URL in a new tab
      } else {
        alert("Please select a valid wishlist first.");
      }
    });
});
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("shareWishlistViaEmail")
    .addEventListener("click", () => {
      let wishlistDropdownContent = document.getElementById(
        "wishlistDropdownContent"
      );
      let wishlistDropdown = document.getElementById("wishlistDropdown");

      // Ensure both elements exist
      if (!(wishlistDropdown || wishlistDropdownContent)) {
        alert("Dropdown not found!");
        return;
      }

      // Try to get value from either dropdown
      let selectedWishlist =
        wishlistDropdown?.value || wishlistDropdownContent?.value;

      if (selectedWishlist) {
        let wishlistItems = wishlists[selectedWishlist]
          .map((item) => decodeURIComponent(item)) // Decode URL encoding if any
          .join("\n Check this out: \t"); // Join items with new lines
        let subject = "Check out this wishlist!";
        let body = encodeURIComponent(wishlistItems);
        let mailtoUrl = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${body}`;

        window.open(mailtoUrl); // Open email client with pre-filled subject and body
      } else {
        alert("Please select a valid wishlist first.");
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("shareWishlistViaTelegram")
    .addEventListener("click", () => {
      let wishlistDropdownContent = document.getElementById(
        "wishlistDropdownContent"
      );
      let wishlistDropdown = document.getElementById("wishlistDropdown");

      // Ensure both elements exist
      if (!(wishlistDropdown || wishlistDropdownContent)) {
        alert("Dropdown not found!");
        return;
      }

      // Try to get value from either dropdown
      let selectedWishlist =
        wishlistDropdown?.value || wishlistDropdownContent?.value;

      if (selectedWishlist) {
        let wishlistItems = wishlists[selectedWishlist]
          .map((item) => decodeURIComponent(item)) // Decode URL encoding if any
          .join("\n Check this out: \t"); // Join items with new lines
        let message = encodeURIComponent(
          `Check out this wishlist! \n\n${wishlistItems}`
        );

        // Construct Telegram URL
        let telegramUrl = `https://t.me/share/url?url=&text=${message}`;

        window.open(telegramUrl); // Open Telegram share window
      } else {
        alert("Please select a valid wishlist first.");
      }
    });
});
