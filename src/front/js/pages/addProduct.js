import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';  // Asegúrate de importar tu Contexto correctamente

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

    // Verificar que todos los campos requeridos estén llenos
    if (!productData.cost || !productData.name || !productData.description || !productData.category) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Verificar que al menos una de las dos opciones de imagen esté llena
    if (!productData.img_url && !productData.img_file) {
      alert("Por favor, sube una imagen o proporciona una URL de imagen.");
      return;
    }

    // Si ambas opciones de imagen están llenas, dar prioridad a la imagen subida localmente
    if (productData.img_file) {
      productData.img_url = productData.img_file;
    }

    actions.addProduct(productData);
  };

  return (
    <section className="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-9 col-xl-6">
              <div style={{ borderRadius: '15px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="p-5">
                  <h2 className="text-uppercase text-center mb-5">Add a Product</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
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
                    {/* <div className="form-outline mb-4">
                          <input type="file" name="img_file" onChange={handleFileChange} className="form-control form-control-lg" />
                          <label className="form-label">Upload Image</label>
                        </div> */}
                    <div className="form-outline mb-4">
                      <input type="text" name="img_url" placeholder="Or Image URL" onChange={handleChange} className="form-control form-control-lg" />
                      <label className="form-label">Or Image URL</label>
                    </div>
                    <div className="form-outline mb-4">
                      <select name="category" onChange={handleChange} required className="form-control form-control-lg">
                        <option value="">Select Category</option>
                        <option value="H">Hamburguesas</option>
                        <option value="M">Milanesas</option>
                      </select>
                      <label className="form-label">Category</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Add Product</button>
                    </div>
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
