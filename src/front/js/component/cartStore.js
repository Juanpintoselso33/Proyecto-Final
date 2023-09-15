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
    const orderId = new Date().getTime(); // Crear un ID único para la orden basado en la marca de tiempo actual
    const product = {
      order_id: orderId,
      product_id: id,
      quantity,
      cost: quantity * price,
      name
    };
    console.log("Añadiendo al carrito:", product);
    this._cart.push(product);
    localStorage.setItem("cart", JSON.stringify(this._cart)); // Guardar el estado en localStorage
  },

  removeFromCart(orderId) {
    this._cart = this._cart.filter(item => item.order_id !== orderId);
    localStorage.setItem("cart", JSON.stringify(this._cart)); // Guardar el estado en localStorage
  },

  clearCart() {
    console.log("Borrando todos los elementos del carrito");
    this._cart = [];
    localStorage.removeItem("cart");
  }

  // Puedes agregar más métodos aquí si necesitas
};
