export const CartStore = {

  handleIncrement(cart, order_id) {
    const updatedCartItems = cart.items.map(item => {
      if (item.order_id === order_id) {
        item.quantity += 1;
        const extrasCost = item.extras ? item.extras.reduce((total, extra) => total + extra.price, 0) : 0;
        item.cost = parseFloat(((item.quantity * item.price) + (item.quantity * extrasCost)).toFixed(2));
      }
      return item;
    });

    const updatedCart = { ...cart, items: updatedCartItems };
    this._recalculateTotalCost(updatedCart);
    return updatedCart;
  },

  handleDecrement(cart, order_id) {
    let updatedCartItems = cart.items.map(item => {
      if (item.order_id === order_id) {
        item.quantity -= 1;
        const extrasCost = item.extras ? item.extras.reduce((total, extra) => total + extra.price, 0) : 0;
        item.cost = parseFloat(((item.quantity * item.price) + (item.quantity * extrasCost)).toFixed(2));
      }
      return item;
    });
    updatedCartItems = updatedCartItems.filter(item => {
      if (item.quantity === 0) {
        this.removeFromCart(cart, item.order_id);  
        return false;
      }
      return true;
    });
    const updatedCart = { ...cart, items: updatedCartItems };
    this._recalculateTotalCost(updatedCart);
    return updatedCart;
  },

  addToCart(cart, id, quantity, price, name, extras) {
    console.log("Cart:", cart);
    console.log("Extras:", extras);

    const orderId = new Date().getTime();

    let extrasCost = 0;
    if (extras && Array.isArray(extras) && extras.length > 0) {
      extrasCost = extras.reduce((total, extra) => total + extra.price, 0);
    } else {
      console.log("Extras es undefined o no es un array");
    }

    const product = {
      order_id: orderId,
      product_id: id,
      price,
      quantity,
      cost: parseFloat(((quantity * price) + (quantity * extrasCost)).toFixed(2)),
      name,
      extras: extras || []  // Asegurarse de que extras sea un array vacío si es undefined
    };

    const updatedCartItems = [...cart.items, product];
    const updatedCart = { ...cart, items: updatedCartItems };
    this._recalculateTotalCost(updatedCart);
    return updatedCart;
  },

  removeFromCart(cart, orderId) {
    const removedItem = cart.items.find(item => item.order_id === orderId);
    if (removedItem) {
      const updatedCartItems = cart.items.filter(item => item.order_id !== orderId);
      const updatedCart = { ...cart, items: updatedCartItems };
      this._recalculateTotalCost(updatedCart);
      return updatedCart;
    } else {
      console.log("No se encontró el elemento con order_id:", orderId);
      return cart;
    }
  },

  _recalculateTotalCost(cart) {
    let newTotalCost = 0;
    cart.items.forEach(item => {
      newTotalCost += item.cost;
    });
    cart.totalCost = newTotalCost;
  },
};
