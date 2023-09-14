export const CartStore = {
  _cart: JSON.parse(localStorage.getItem("cart")) || [], // Inicializar el estado interno del carrito desde localStorage

  getCart() {
    return this._cart;
  },

  setCart(newCart) {
    this._cart = newCart;
    localStorage.setItem("cart", JSON.stringify(this._cart)); // Guardar el estado en localStorage
  },

  addToCart(id, quantity, price, name) {
    const product = {
      product_id: id,
      quantity,
      cost: quantity * price,
      name
    };
    console.log("Añadiendo al carrito:", product);
    this._cart.push(product);
    localStorage.setItem("cart", JSON.stringify(this._cart)); // Guardar el estado en localStorage
  },

  removeFromCart(productId) {
    this._cart = this._cart.filter(item => item.product_id !== productId);
    localStorage.setItem("cart", JSON.stringify(this._cart)); // Guardar el estado en localStorage
  },

  // Puedes agregar más métodos aquí si necesitas
};
