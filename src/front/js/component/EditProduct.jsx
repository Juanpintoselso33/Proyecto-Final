import React, { useState, useEffect } from 'react';

export const EditProduct = ({ productId, onClose }) => {
    const [productData, setProductData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [itsPromo, setItsPromo] = useState(false);

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
        padding: '20px',
        borderRadius: '8px',
        width: '50%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productData) {
            // Aquí podrías llamar a una función para editar el producto en la base de datos
            // Por ejemplo: actions.editProduct(productData);
            setSuccessMessage('Producto editado exitosamente.');
        }
    };

    if (!productData) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={modalBackdropStyle}>
            <div style={modalContentStyle}>
                <button onClick={onClose} style={{ float: 'right' }}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del producto</label>
                        <input type="text" name="name" value={productData.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Costo</label>
                        <input type="number" name="cost" value={productData.cost} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" name="description" value={productData.description} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Categoría</label>
                        <select name="category" value={productData.category} onChange={handleChange} className="form-control">
                            <option value="Hamburguesas">Hamburguesas</option>
                            <option value="Milanesas">Milanesas</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>URL de la imagen</label>
                        <input type="text" name="img_url" value={productData.img_url} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Es Promo</label>
                        <input type="radio" name="promo" checked={itsPromo} onChange={() => setItsPromo(true)} /> Sí
                        <input type="radio" name="promo" checked={!itsPromo} onChange={() => setItsPromo(false)} /> No
                    </div>
                    <button type="submit" className="btn btn-dark">Guardar cambios</button>
                </form>
                {successMessage && <p className="text-success">{successMessage}</p>}
            </div>
        </div>
    );
};
