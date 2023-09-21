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

  addToCart(id, quantity, price, name, extras) {
    const orderId = new Date().getTime(); // Crear un ID único para la orden basado en la marca de tiempo actual
  
    // Calcular el costo total de los extras
    let extrasCost = 0;
    if (extras && extras.length > 0) {
      extrasCost = extras.reduce((total, extra) => total + extra.price, 0);
    }
  
    const product = {
      order_id: orderId,
      product_id: id,
      quantity,
      cost: parseFloat(((quantity * price) + extrasCost).toFixed(2)), // Redondear el costo a dos decimales
      name,
      extras
    };
    console.log("Añadiendo al carrito:", product);
    this._cart.items.push(product);
    this._recalculateTotalCost();
    this._updateLocalStorage()
  },

  removeFromCart(orderId) {
    this._cart.items = this._cart.items.filter(item => item.order_id !== orderId);
    this._recalculateTotalCost();
    this._updateLocalStorage()
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
