<script>
  import NavBar from "./components/NavBar/navBar.svelte";
  import SlideCart from "./components/slideCart/slideCart.svelte";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.as = "style";
  //   link.fetchpriority = "high";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
  document.head.appendChild(link);

  let products = [
    { id: 1, name: "Luxury Unisex", price: 525, originalPrice: 899 },
    { id: 2, name: "WHITE Oud", price: 499, originalPrice: 899 },
    { id: 3, name: "Luxury Women", price: 525, originalPrice: 899 },
    { id: 4, name: "Water Based", price: 199, originalPrice: 549 },
    { id: 5, name: "DARK OUD", price: 799, originalPrice: 1099 },
    { id: 6, name: "Kiss Proof", price: 499, originalPrice: 699 },
  ];

  let cart = [
    {
      id: 1,
      name: "Luxury Men Perfume Diwali Gift Set - 4 x 20ml",
      price: 446.25,
      quantity: 1,
    },
    {
      id: 2,
      name: "CEO Man Luxury Perfume - 100ml",
      price: 381.65,
      quantity: 1,
    },
    { id: 3, name: "Date Night Gift Set", price: 549.0, quantity: 3 },
  ];

  let cartOpen = false; // State to control SlideCart visibility

  const toggleCart = () => {
    cartOpen = !cartOpen; // Toggle cart visibility
  };
  window.CrossSell = {
    ToggleCart: () => {
      toggleCart();
    },
  };

  const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
  };

  const increaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) item.quantity += 1;
  };

  const decreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) item.quantity -= 1;
  };

  const total = () => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };
</script>

<!-- Navbar with icon and title -->
<NavBar {toggleCart} />

<!-- SlideCart component -->
<SlideCart
  {cart}
  {removeFromCart}
  {increaseQuantity}
  {decreaseQuantity}
  {total}
  isOpen={cartOpen}
  {toggleCart}
/>

<style>
  /* Add padding to avoid content being hidden behind the fixed navbar */
  .container {
    padding-top: 80px;
  }
</style>
