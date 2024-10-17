<script>
	import cartIcon from '../../assets/cartIcon.svg';
    export let toggleCart;
</script>

<div class="icon-container">
  <button on:click={toggleCart}>
        <img src={cartIcon} alt="Cart Icon" class="icon"/>
    </button>
</div>

<style>
  .icon-container {
    position: fixed; /* Fix the position of the container */
    top: 0;         /* Align it to the top */
    right: 0;       /* Align it to the right */
    padding: 10px;  /* Optional: Add some padding for aesthetics */
  }

  .icon {
    width: 30px;
    height: 30px;
  }
</style>
