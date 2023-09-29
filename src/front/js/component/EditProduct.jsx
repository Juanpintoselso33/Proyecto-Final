import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

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
      setItsPromo(productToEdit.promo || false);
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
      const updatedProductData = {
        ...productData,
        promo: itsPromo
      };

      await actions.updateProduct(productId, updatedProductData);
      setSuccessMessage('Producto editado exitosamente.');
    }
  };

  if (!productData) {
    return <div>Cargando...</div>;
  }

  return (
  <div className="modal-backdrop show" style={{ backgroundColor: 'grey', opacity: '0.9' }}>
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content p-4" style={{ backgroundColor: 'white' }}>
          <button onClick={onClose} className="position-absolute bg-secondary top-0 end-0 m-2" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', border: 'none', opacity: '0.9' }}>X</button>
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
                  <input type="radio" name="promo" className="form-check-input" checked={itsPromo === true} onChange={() => setItsPromo(true)} />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" name="promo" className="form-check-input" checked={itsPromo === false} onChange={() => setItsPromo(false)} />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <button type="submit" className="btn btn-secondary">Guardar cambios</button>
            </form>
            {successMessage && <p className="text-success mt-4">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}