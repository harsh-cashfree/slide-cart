<script>
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
      variant_id: 44145891803326,
      store_url: "bellavita.myshopify.com",
      image:
        "https://cdn.shopify.com/s/files/1/0527/2000/9406/files/air-jordan-1-mid-se-shoes-qG5ltp.webp?v=1715864228",
      name: "Air Jordan",
      quantity: 1,
      amount: 10000,
      isUpsell: true,
    },
    {
      id: 2,
      variant_id: 44145891803326,
      store_url: "bellavita.myshopify.com",
      image:
        "https://cdn.shopify.com/s/files/1/0527/2000/9406/files/air-jordan-1-mid-se-shoes-qG5ltp.webp?v=1715864228",
      name: "Air Jordan 2",
      quantity: 1,
      amount: 10000,
      isUpsell: true,
    },
    // Add more products as needed
  ];

  let productsRight = []; // Existing products from session storage
  let addedProducts = []; // New products added through "Add to Cart"

  let totalPrice = 0; // Reactive variable for total price

  const storeImage =
    "https://aestheticnation.co.in/cdn/shop/files/Brand_Logo_-_Aesthetic_Nation.png?v=1666340011&width=200";

  // Retrieve or initialize Occ Upsell-Cart from sessionStorage
  let occUpsellCartObj = { items: [], total_price: 0 };

  let apiResponse = null;
  let apiData = null;

  async function fetchCartData() {
  try {
    const apiResponse = await fetch("https://store.codfirm.in/cart.js", {
      method: "GET",
      headers: {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
        'cookie': 'localization=IN; cart_currency=INR; _shopify_y=2d2d596a-bbd0-4334-9406-a1546b15eb4d; receive-cookie-deprecation=1; skip_shop_pay=false; storefront_digest=b224715b312a3995e02068f9ba81e41ceaf82549b3161c0a391a235b839dbb29; _adt__muid=a6e6a2ad-d73d-4954-da5c-581347479cd4; _ga_6T47D3FTJH=GS1.1.1717066839.47.1.1717068088.0.0.0; secure_customer_sig=; cart=Z2NwLXVzLWVhc3QxOjAxSjZIQzVBQlpIR1NWMThXMTYyQjlTU0Yx%3Fkey%3D67317b4044a484e91ddab6c243908a6b; _gcl_au=1.1.505596497.1721978188.1204964695.1725012463.1725013731; _shopify_ga=_ga=2.116013062.1437752826.1728114524-122490917.1713946248; _tracking_consent=%7B%22con%22%3A%7B%22CMP%22%3A%7B%22a%22%3A%22%22%2C%22m%22%3A%22%22%2C%22p%22%3A%22%22%2C%22s%22%3A%22%22%7D%7D%2C%22v%22%3A%222.1%22%2C%22region%22%3A%22INDL%22%2C%22reg%22%3A%22%22%2C%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22sale_of_data_region%22%3Afalse%7D; _ga_FE8DK1XK5G=GS1.1.1728114531.10.0.1728114531.0.0.0; _cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22sale_of_data_region%22%3Afalse%7D; _orig_referrer=; _landing_page=%2F; _gid=GA1.2.544716753.1729159173; _ga_2455566=GS1.1.1729159173.225.1.1729159387.0.0.0; preview_theme=1; _shopify_essential=:AZC1PHnSAAH_S_rpYD6gUTqx4JRZkzJgn8M662F06NEp6-2rVac1m-bj_ZSDvRSgh-FLDhw1n0Io0DpLTvm7Wqpw5rykIBiVgAX_8c4tCyUChxjD2VF078VFNSDkOURDshJcvDK_LfIP3Eji_RRoNgzps0egFRQ-DM-kB20tF5my9J8JZEhtVQFcznErvz-45mE9hGG2PdNkpwk:; cart_sig=81734b1cefb2f4f002832cb9bc3ab70f; _ga_1HN168V0FX=GS1.1.1729161831.136.0.1729161835.0.0.0; _shopify_sa_p=; _ga=GA1.2.122490917.1713946248; _gat=1; keep_alive=5a40248c-9644-4bac-973e-e41fd1dd673f; _shopify_s=4658bae5-acd7-4b8a-90dc-3a20948fcce5; _shopify_sa_t=2024-10-17T17%3A50%3A27.302Z; cart_ts=1729187427; _ga_8CYQ9WPCSK=GS1.2.1729187419.279.1.1729187428.0.0.0',
        'priority': 'u=1, i',
        'referer': 'https://store.codfirm.in/cart',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
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


  onMount(() => {
    fetchCartData();
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
      isUpsell: true,
    });

    // Update the total_price
    occUpsellCartObj.total_price += product.amount;
    totalPrice = occUpsellCartObj.total_price; // Update reactive variable

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
      <p class="store-text">Aesthetic Nation</p>
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
        <h5 style="color: black; margin: 0px; padding: 10px 0;">
          Products added from Aesthetic Nation
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
      <button class="checkout-button">Checkout</button>
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
    max-width: 60px; /* Set a maximum width */
    max-height: 50px; /* Set a maximum height */
    width: auto; /* Maintain aspect ratio */
    height: auto; /* Maintain aspect ratio */
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
