export const CartStore = {
  _cart: { items: [], totalCost: 0 }, // Inicializa con valores por defecto

  init() {
    // Inicializar el estado interno del carrito desde localStorage
    this._cart = JSON.parse(localStorage.getItem("cart")) || { items: [], totalCost: 0 };
  },

  syncWithLocalStorage() {
    // Actualiza el estado interno del carrito para que coincida con localStorage
    this._cart = JSON.parse(localStorage.getItem("cart")) || { items: [], totalCost: 0 };
  },

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
    this.syncWithLocalStorage(); // Asegúrate de que _cart esté sincronizado con localStorage

    const orderId = new Date().getTime(); // Crear un ID único para la orden basado en la marca de tiempo actual

    let extrasCost = 0;
    if (extras && extras.length > 0) {
      extrasCost = extras.reduce((total, extra) => total + extra.price, 0);
    }

    const product = {
      order_id: orderId,
      product_id: id,
      quantity,
      cost: parseFloat(((quantity * price) + (quantity * extrasCost)).toFixed(2)),
      name,
      extras
    };

    this._cart.items.push(product);
    this._recalculateTotalCost();
    this._updateLocalStorage();
  },

  removeFromCart(orderId) {
    this.syncWithLocalStorage(); // Asegúrate de que _cart esté sincronizado con localStorage

    const removedItem = this._cart.items.find(item => item.order_id === orderId);
    if (removedItem) {
      this._cart.items = this._cart.items.filter(item => item.order_id !== orderId);
      this._recalculateTotalCost();
      this._updateLocalStorage();
    } else {
      console.log("No se encontró el elemento con order_id:", orderId);
    }
  },

  clearCart() {
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
    try {
      localStorage.setItem("cart", JSON.stringify(this._cart));
    } catch (e) {
      console.error("No se pudo actualizar localStorage:", e);
    }
  }
};