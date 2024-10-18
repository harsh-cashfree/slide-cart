<!-- ProductCard.svelte -->
<script>
  export let image;
  export let name;
  export let addToCart; // Function to handle adding to cart
  export let amount;
</script>

<div class="product-card">
  <img src={image} alt={name} class="product-image" />
  <div class="product-details">
    <h4 class="product-name">{name}</h4>
    <h5 class="product-amount">Rs. {amount / 100}</h5>
    <button class="add-to-cart" on:click={addToCart}>Add to Cart</button>
  </div>
</div>

<style>
  .product-amount {
    color: gray;
    margin: 0;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .product-card {
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    display: flex;
  }

  .product-image {
    width: 65px;
    height: 65px;
    object-fit: cover;
    margin-right: 15px;
  }

  .product-name {
    font-size: 1em;
    margin: 0 0;
    color: black;
  }

  .add-to-cart {
    border: 1px solid transparent; /* Initial transparent border */
    cursor: pointer;
    border-radius: 4px;
    background-color: white;
    padding: inherit;
    transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .add-to-cart:hover {
    color: blue; /* Change text color to blue on hover */
    border-color: black; /* Add a blue border on hover */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  }
</style>

