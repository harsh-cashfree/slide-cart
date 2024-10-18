<script>
  // @ts-nocheck

  import ProductItem from "./ProductItem.svelte";
  import ProductCard from "./ProductCard.svelte";
  import { onMount } from "svelte";
  import { occUpsellCart } from "../../constants";

  export let isOpen;
  export let toggleCart;

  // Initial product data
  let productsLeft = [
    {
      id: 1,
      variant_id: 43081139650605,
      store_url: "gxwptz-pp.myshopify.com",
      image:
        "https://cdn.shopify.com/s/files/1/0651/6283/8061/files/YSL_Libre_Intense_90-ovlu41s04goc73h34rb2foe8ek9ncfrndpwrfo1d9s.jpg?v=1729156069",
      name: "Female perfume",
      quantity: 1,
      amount: 1000,
      isUpsell: true,
    },
    {
      id: 2,
      variant_id: 43081121726509,
      store_url: "gxwptz-pp.myshopify.com",
      image:
        "https://cdn.shopify.com/s/files/1/0651/6283/8061/files/MDeo.jpg?v=1729153607",
      name: "Men Deo",
      quantity: 1,
      amount: 2000,
      isUpsell: true,
    },
    // Add more products as needed
  ];

  let productsRight = []; // Existing products from session storage
  let addedProducts = []; // New products added through "Add to Cart"

  let totalPrice = 0; // Reactive variable for total price

  const storeImage =
    "https://bellavitaluxury.co.in/cdn/shop/files/Bella_Vita_Logo_360_E_2x_9339a3ea-4875-4f59-a01f-8cff9bff9f9c.png?height=30&v=1713531581";

  // Retrieve or initialize Occ Upsell-Cart from sessionStorage
  let occUpsellCartObj = { items: [], total_price: 0 };

  let apiResponse = null;
  let apiData = null;

  const handleCheckoutInit = () => {
    // * Picking up cart from session storage
    const cart = JSON.parse(sessionStorage.getItem("Occ Upsell-Cart"));
    localStorage.setItem("occ-cart", JSON.stringify(cart));
    window.Occ.RunScript();
  };

  async function fetchCartData() {
    try {
      const apiResponse = await fetch(`${window.location.origin}/cart.js`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }

      apiData = await apiResponse.json();
      console.log("CART DATA", apiData); // Handle your JSON response here
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  onMount(async () => {
    await fetchCartData();
    occUpsellCartObj = apiData;
    console.log("APi data", apiData);
    sessionStorage.setItem("Occ Upsell-Cart", JSON.stringify(occUpsellCartObj));

    // Initialize right cart from sessionStorage data
    productsRight = occUpsellCartObj.items.map((item) => ({
      id: item.variant_id,
      image: item.image,
      name: item.title,
      quantity: item.quantity,
      amount: item.line_price,
    }));

    // Set initial total price
    totalPrice = occUpsellCartObj.total_price;
  });

  // Function to handle adding product to cart from left cart
  function addToCart(productId) {
    const productIndex = productsLeft.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const product = productsLeft[productIndex];
      productsLeft = productsLeft.filter((_, index) => index !== productIndex);

      // Add to addedProducts
      addedProducts = [
        ...addedProducts,
        { companyName: "Aesthetic Nation", ...product }, // Include company name
      ];

      // Update sessionStorage Occ Upsell-Cart
      updateSessionCart(product);
    }
  }

  // Function to update the Occ Upsell-Cart in sessionStorage
  function updateSessionCart(product) {
    // Add the product to items array
    occUpsellCartObj.items.push({
      variant_id: product.variant_id,
      image: product.image,
      title: product.name,
      quantity: product.quantity,
      line_price: product.amount,
      storeUrl: product.store_url,
      price: product.amount,
      isUpsell: true,
      id: product.variant_id,
    });

    // Update the total_price
    occUpsellCartObj.total_price += product.amount;
    occUpsellCartObj.isUpsellCart = true;
    totalPrice = occUpsellCartObj.total_price; // Update reactive variable
    occUpsellCartObj.items_subtotal_price = occUpsellCartObj.total_price;
    occUpsellCartObj.original_total_price = occUpsellCartObj.total_price;

    // Save the updated cart in sessionStorage
    sessionStorage.setItem("Occ Upsell-Cart", JSON.stringify(occUpsellCartObj));

    console.log("Updated Occ Upsell-Cart:", occUpsellCartObj);
  }

  // Function to handle removing product from cart to left cart
  function removeFromCart(productId) {
    const productIndex = addedProducts.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const product = addedProducts[productIndex];
      addedProducts = addedProducts.filter(
        (_, index) => index !== productIndex
      );

      // Add the product back to productsLeft
      productsLeft = [...productsLeft, { ...product }];

      // Also remove from sessionStorage cart
      removeFromSessionCart(product.variant_id, product.amount); // Pass the variant_id and amount to deduct
    }
  }

  // Function to remove product from Occ Upsell-Cart in sessionStorage
  function removeFromSessionCart(productId, amount) {
    // Find the product in the session cart
    const productIndex = occUpsellCartObj.items.findIndex(
      (item) => item.variant_id === productId
    );

    if (productIndex !== -1) {
      // Remove the item from the cart
      occUpsellCartObj.items.splice(productIndex, 1);

      // Update the total_price by deducting the amount
      occUpsellCartObj.total_price -= amount; // Deduct the amount passed from the function

      // Update the reactive variable
      totalPrice = occUpsellCartObj.total_price;
      occUpsellCartObj.items_subtotal_price = occUpsellCartObj.total_price;
      occUpsellCartObj.original_total_price = occUpsellCartObj.total_price;

      // Save the updated cart back to sessionStorage
      sessionStorage.setItem(
        "Occ Upsell-Cart",
        JSON.stringify(occUpsellCartObj)
      );

      console.log("Product removed from Occ Upsell-Cart:", occUpsellCartObj);
    }
  }

  // Functions to handle quantity increase and decrease
  function increaseQuantity(products, id) {
    const product = products.find((item) => item.id === id);
    if (product) {
      product.quantity++;
      product.amount =
        (product.quantity * product.amount) / (product.quantity - 1); // Update amount for display if necessary
    }
  }

  function decreaseQuantity(products, id) {
    const product = products.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      product.quantity--;
      product.amount =
        (product.quantity * product.amount) / (product.quantity + 1); // Update amount for display if necessary
    }
  }
</script>

{#if isOpen}
  <!-- Overlay to detect clicks outside -->
  <div class="overlay" on:click={toggleCart}></div>
{/if}

<!-- Slide Cart Container -->
<div class="slidecart-container {isOpen ? 'open' : ''}">
  <!-- Left Cart -->
  <div class="slidecart">
    <h4 style="color: black; margin-top: 16px; margin-left: 10px">
      Products you might also like
    </h4>

    <!-- Store image and text in a flexbox container -->
    <div class="store-info">
      <img src={storeImage} alt="store" class="store-image" />
      <!-- <p class="store-text">Embark Perfumes</p> -->
    </div>

    <div class="upsell-cart-content">
      {#each productsLeft as product (product.id)}
        <ProductCard
          image={product.image}
          name={product.name}
          addToCart={() => addToCart(product.id)}
          amount={product.amount}
        />
      {/each}
    </div>
  </div>

  <!-- Divider Line -->
  <div class="divider"></div>

  <!-- Right Cart -->
  <div class="slidecart">
    <div class="cart-content">
      <h4 style="color: black; margin: 0px">YOUR CART</h4>
      {#each productsRight as product (product.id)}
        <ProductItem
          image={product.image}
          name={product.name}
          amount={product.amount}
          quantity={product.quantity}
          increaseQuantity={() => increaseQuantity(productsRight, product.id)}
          decreaseQuantity={() => decreaseQuantity(productsRight, product.id)}
          removeProduct={() => removeFromCart(product.id)}
        />
      {/each}
      {#if addedProducts.length > 0}
        <h5
          style="color: black; margin: 0px; padding: 10px 0; display: flex; justify-content: center"
        >
          Products added from
          <span><img src={storeImage} alt="store" class="store-image" /></span>
        </h5>
        {#each addedProducts as product (product.id)}
          <ProductItem
            image={product.image}
            name={product.name}
            amount={product.amount}
            quantity={product.quantity}
            increaseQuantity={() => increaseQuantity(addedProducts, product.id)}
            decreaseQuantity={() => decreaseQuantity(addedProducts, product.id)}
            removeProduct={() => removeFromCart(product.id)}
          />
        {/each}
      {/if}
    </div>

    <!-- Total Price Display -->
    <div class="total-price">
      <p style="color: black;">TOTAL: ₹{totalPrice / 100}</p>
    </div>

    <div class="cart-footer">
      <button class="checkout-button" on:click={handleCheckoutInit}
        >Checkout</button
      >
    </div>
  </div>
</div>

<style>
  /* Store image and text container */
  .store-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;
  }

  /* Resize the store image without cropping */
  .store-image {
    /* Set a maximum height */
    width: 104px; /* Maintain aspect ratio */
    object-fit: contain; /* Ensure the image fits within bounds */
    margin-right: 10px;
    margin-left: 10px;
  }

  /* Store text style */
  .store-text {
    font-size: 1.2em;
    font-weight: bold;
    color: black;
  }

  /* Overlay Style */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }

  /* Slide Cart Container to hold both carts */
  .slidecart-container {
    display: flex;
    position: fixed;
    top: 0;
    right: -200%;
    width: 600px; /* Adjust according to both cart widths */
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease-in-out;
    z-index: 100;
  }

  .slidecart-container.open {
    right: 0;
  }

  .total-price {
    display: flex;
    justify-content: center;
  }

  /* Individual Slide Cart Style */
  .slidecart {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .cart-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
  }

  .upsell-cart-content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .cart-footer {
    padding: 20px;
    padding-top: 0px;
    background-color: transparent;
    /* border-top: 1px solid #ccc; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkout-button {
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    text-align: center;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .checkout-button:hover {
    background-color: gray;
  }

  /* Divider Line Between Carts */
  .divider {
    width: 1px;
    background-color: #ccc;
    height: 100%;
  }
</style>
