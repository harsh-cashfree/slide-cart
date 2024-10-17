<script>
  export let image;
  export let name;
  export let amount;
  export let quantity;
  export let increaseQuantity;
  export let decreaseQuantity;
  export let removeProduct; // New prop for removing the product
</script>

<div class="product-item">
  <!-- Cross icon to remove the product -->
  <button class="remove-button" on:click={removeProduct}>✖</button>
  <!-- Cross icon -->

  <img src={image} alt={name} class="product-image" />

  <div class="product-info">
    <h4 style="color: black; margin-bottom: 0px; margin-top: 0px">{name}</h4>
    <h5 class="product-amount">Rs. {amount / 100}</h5>
    <div class="quantity-controls">
      <button on:click={decreaseQuantity}>-</button>
      <span style="color: gray; font-size: 15px">{quantity}</span>
      <button on:click={increaseQuantity}>+</button>
    </div>
  </div>
</div>

<style>
  .product-item {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    position: relative; /* Required for absolute positioning of the button */
    margin-top: 15px;
  }

    .product-amount {
    color: gray;
    margin: 0;
  }

  .product-image {
    width: 65px;
    height: 65px;
    object-fit: cover;
    margin-right: 15px;
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  .quantity-controls button {
    background-color: transparent;
    /* color: white; */
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .quantity-controls span {
    margin: 0 10px;
    font-size: 1.2em;
  }

  .remove-button {
    position: absolute;
    top: -15px;
    right: -10px;
    background: none;
    border: none;
    color: black;
    font-size: 1.2em; /* Adjust the size to make it smaller */
    font-weight: 400; /* Make the cross symbol lighter */
    cursor: pointer;
  }

  .remove-button:hover {
    color: gray; /* Change color on hover for effect */
  }
</style>
