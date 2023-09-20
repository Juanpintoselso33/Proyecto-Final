export const CartStore = {
  _cart: JSON.parse(localStorage.getItem("cart")) || { items: [], totalCost: 0 }, // Inicializar el estado interno del carrito desde localStorage

  getCart() {
    return this._cart.items;
  },

  getTotalCost() {
    return this._cart.totalCost;
  },

  setCart(newCart, newTotalCost) {
    this._cart.items = newCart;
    this._cart.totalCost = newTotalCost;
    this._updateLocalStorage();
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
    this._cart.items.push(product);
    this._recalculateTotalCost();
  },

  removeFromCart(orderId) {
    this._cart.items = this._cart.items.filter(item => item.order_id !== orderId);
    this._recalculateTotalCost();
  },

  clearCart() {
    console.log("Borrando todos los elementos del carrito");
    this._cart = { items: [], totalCost: 0 };
    localStorage.removeItem("cart");
  },

  _recalculateTotalCost() {
    let newTotalCost = 0;
    this._cart.items.forEach(item => {
      newTotalCost += item.cost;
    });
    this._cart.totalCost = newTotalCost;
    this._updateLocalStorage();
  },

  _updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this._cart));
  }
};
