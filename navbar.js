// navbar.js

document.addEventListener('DOMContentLoaded', function () {
  const username = localStorage.getItem('username');

  const navBar = document.querySelector('.navbar-nav');
  const cartLink = navBar.querySelector('.nav-link[href="#cartModal"]');
  
  if (!username && cartLink) {
      cartLink.parentNode.remove(); // Remove the cart button from the navbar
  }

  if (username) {
      const loginLink = navBar.querySelector('.nav-link[href="login.html"]');
      const signUpLink = navBar.querySelector('.nav-link[href="signup.html"]');

      if (loginLink) loginLink.remove();
      if (signUpLink) signUpLink.remove();

      const userDropdown = document.createElement('div');
      userDropdown.className = 'nav-item dropdown';
      userDropdown.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa-solid fa-user"></i> ${username}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" id="logout">Logout</a>
          </div>
      `;
      navBar.appendChild(userDropdown);

      // Logout functionality
      const logoutLink = userDropdown.querySelector('#logout');
      logoutLink.addEventListener('click', function (event) {
          event.preventDefault();
          localStorage.removeItem('username');
          // Remove the cart icon button from the navbar
          if (cartLink) cartLink.parentNode.remove();
          // Clear the cart and modal
          localStorage.removeItem('cart');
          document.getElementById('cartItems').innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
          // Reload the page after logout
          window.location.reload();
      });
  }
  document.querySelector('.nav-link[data-target="#cartModal"]').addEventListener('click', displayCartItems);
});

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
      cartItems.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
  } else {
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center aa';
      listItem.innerHTML = `
          <span>${item.title} - $${item.price.toFixed(2)}</span>
          <i class="fas fa-trash-alt remove-icon"></i>
      `;
      const removeIcon = listItem.querySelector('.remove-icon');
      removeIcon.addEventListener('click', function() {
          removeCartItem(index);
      });
      cartItems.appendChild(listItem);
  });
  }
}

function removeCartItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Add event listener for checkout button
document.getElementById('checkoutBtn').addEventListener('click', clearCart);

function clearCart() {
  localStorage.removeItem('cart');
  document.getElementById('cartItems').innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
}
