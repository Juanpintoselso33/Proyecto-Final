import React, { useState, useEffect, useContext } from 'react';

export const EditProduct = ({ productId, onClose }) => {
  const [productData, setProductData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [itsPromo, setItsPromo] = useState(false);
  const { actions } = useContext(Context);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('productos'));
    const productToEdit = storedProducts.find(product => product.id === productId);
    if (productToEdit) {
      setProductData(productToEdit);
      setItsPromo(productToEdit.promo);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productData) {
      await actions.updateProduct(productId, productData); // Llama a la función updateProduct
      setSuccessMessage('Producto editado exitosamente.');
    }
  };

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    width: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  if (!productData) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} className="btn-close btn-close-white position-absolute top-0 end-0 m-2"></button>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="form-group mb-4">
            <label>Nombre del producto</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>Costo</label>
            <input type="number" name="cost" value={productData.cost} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>Descripción</label>
            <input type="text" name="description" value={productData.description} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>Categoría</label>
            <input type="text" name="category" value={productData.category} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>URL de la imagen</label>
            <input type="text" name="img_url" value={productData.img_url} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label>Es Promo</label>
            <div className="form-check form-check-inline">
              <input type="radio" name="promo" className="form-check-input" checked={itsPromo} onChange={() => setItsPromo(true)} />
              <label className="form-check-label">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="promo" className="form-check-input" checked={!itsPromo} onChange={() => setItsPromo(false)} />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <button type="submit" className="btn btn-dark">Guardar cambios</button>
        </form>
        {successMessage && <p className="text-success mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};
