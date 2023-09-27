import React, { useState, useContext } from 'react';
import { Link,  Navigate  } from "react-router-dom";
import { Context } from '../store/appContext';

export const AddProduct = () => {

  const { actions, store } = useContext(Context);
  const isAdminUser = store.isAdmin;

  if (!isAdminUser) {
    return <Navigate to="/" />;
  }

  // Estado para los datos del producto
  const [productData, setProductData] = useState({
    cost: '',
    name: '',
    description: '',
    stars: '',
    img_url: '',
    category: ''
  });

  // Estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState('');

  // Estado para its_promo 
  const [its_promo, setItsPromo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData({
        ...productData,
        img_url: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productData.cost || !productData.name || !productData.description || !productData.category) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (!productData.img_url) {
      alert("Por favor, sube una imagen o proporciona una URL de imagen.");
      return;
    }

    const finalProductData = {
      ...productData,
      promo: its_promo  // Ahora es un booleano
    };

    actions.addProduct(finalProductData);

    setSuccessMessage('Producto agregado exitosamente.');
  };
  

  return (
    <section className="vh-100 bg-image bg-light">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-9 col-xl-6">
              <div style={{ borderRadius: '15px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="p-5">
                  <h2 className="text-uppercase text-center mb-5">Add a Product</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <Link to="/usuarioAdmin" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                        <button>Cerrar</button>
                      </Link>
                      <input type="number" name="cost" placeholder="Cost" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Cost</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Name</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Description</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="number" name="stars" placeholder="Stars" onChange={handleChange} className="form-control form-control-lg" />
                      <label className="form-label">Stars</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="img_url" placeholder="Or Image URL" onChange={handleChange} className="form-control form-control-lg" />
                      <label className="form-label">Or Image URL</label>
                    </div>
                    <div className="form-outline mb-4">
                      <select name="category" onChange={handleChange} required className="form-control form-control-lg">
                        <option value="">Select Category</option>
                        <option value="Hamburguesas">Hamburguesas</option>
                        <option value="Milanesas">Milanesas</option>
                      </select>
                      <label className="form-label">Category</label>
                    </div>
                    <div className="form-outline mb-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="promoOptions" id="promoTrue" value="S" onChange={() => setItsPromo(true)} />
                        <label className="form-check-label" htmlFor="promoTrue">Es Promo</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="promoOptions" id="promoFalse" value="N" onChange={() => setItsPromo(false)} />
                        <label className="form-check-label" htmlFor="promoFalse">No es Promo</label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Add Product</button>
                    </div>
                    {successMessage && <p className="text-success text-center">{successMessage}</p>} {/* Muestra el mensaje de éxito si existe */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default AddProduct;