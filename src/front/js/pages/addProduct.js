import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';

export const AddProduct = () => {
  const { actions } = useContext(Context);

  const [productData, setProductData] = useState({
    cost: '',
    name: '',
    description: '',
    stars: '',
    img_url: '',
    category: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [its_promo, setItsPromo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Si el campo es 'category', formateamos la cadena para que la primera letra sea mayúscula y el resto minúsculas
    if (name === 'category') {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setProductData({
      ...productData,
      [name]: formattedValue
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
      promo: its_promo
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
                  <h2 className="text-uppercase text-center mb-5">Agregar Producto</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <Link to="/usuarioAdmin" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                        <button className="btn btn-secondary">
                          <i className="fas fa-arrow-left"></i>
                        </button>
                      </Link>
                      <input type="number" name="cost" placeholder="Costo" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Costo</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Nombre</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="description" placeholder="Descripción" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Descripción</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="number" name="stars" placeholder="Estrellas" onChange={handleChange} className="form-control form-control-lg" />
                      <label className="form-label">Estrellas</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="img_url" placeholder="O URL de la imagen" onChange={handleChange} className="form-control form-control-lg" />
                      <label className="form-label">O URL de la imagen</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="category" placeholder="Categoría" onChange={handleChange} required className="form-control form-control-lg" />
                      <label className="form-label">Categoría</label>
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
                      <button type="submit" className="btn btn-secondary btn-block btn-lg">Agregar Producto</button>
                    </div>
                    {successMessage && <p className="text-success text-center">{successMessage}</p>}
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
