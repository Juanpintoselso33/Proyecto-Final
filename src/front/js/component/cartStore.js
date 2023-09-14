export const CartStore = {
    _cart: [], // Estado interno del carrito
  
    getCart() {
      return this._cart;
    },
  
    setCart(newCart) {
      this._cart = newCart;
    },
  
    addToCart(id, quantity, price, name) {
      const product = {
        product_id: id,
        quantity,
        cost: quantity * price,
        name
      };
      console.log("Añadiendo al carrito:", product);  // Añadir console.log aquí
      this._cart.push(product);
    },
  
    removeFromCart(productId) {
      this._cart = this._cart.filter(item => item.product_id !== productId);
    },
  
    // Puedes agregar más métodos aquí si necesitas
  };
  