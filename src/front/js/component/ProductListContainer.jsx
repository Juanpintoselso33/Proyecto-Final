import React, { useEffect, useState } from 'react';
import ProductList from './ProductList.jsx';

export const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener productos de localStorage (o de donde quieras)
    const storedProducts = JSON.parse(localStorage.getItem('productos')) || [];

    // Actualizar el estado de los productos
    setProducts(storedProducts);

    // Obtener todas las categorías únicas
    const uniqueCategories = [
      ...new Set(storedProducts.map(product => product.category))
    ];

    // Agregar "Promociones" a la lista de categorías si hay productos en promoción
    // y si "Promociones" aún no está en la lista
    if (storedProducts.some(product => product.its_promo) && !uniqueCategories.includes("Promociones")) {
      uniqueCategories.push("Promociones");
    }

    // Actualizar el estado de las categorías
    setCategories(uniqueCategories);

  }, []);

  return (
    <div className="rounded bg-light py-4 px-3" style={{ margin: '0 auto', width: '90%' }}>
      {categories.map((category, index) => (
        <ProductList key={index} products={products} category={category} />
      ))}
    </div>
  );
};

export default ProductListContainer;
