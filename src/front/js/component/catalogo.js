import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import { Navbar } from "../component/navbar.js"




export const Catalogo = () => {
  const { actions, store } = useContext(Context);
  const categorias = [
     {
      nombreCategoria: "Hamburguesas",
      URL: "https://www.pequerecetas.com/wp-content/uploads/2013/07/hamburguesas-caseras-receta.jpg",
    },
    {
      nombreCategoria: "Milanesas",
      URL: "https://cdn0.recetasgratis.net/es/posts/4/9/8/milanesa_de_carne_11894_orig.jpg",
    },
    {
      nombreCategoria: "Bebidas",
      URL: "https://www.revistaneo.com/sites/default/files/2023-01/bebidasNAok.png",
    },
    {
      nombreCategoria: "Postres",
      URL: "https://www.clara.es/medio/2021/11/28/postres-navidenos_3f462fd7_1280x1115.jpg",
    },
    
  ];

  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(Object.keys(categorias)[0]);
  const [categoriasConImagen, setCategoriasConImagen] = useState({});
  
  console.log(store.productos)
  useEffect(() => {
    actions.obtenerAllProducts();
    handleCategoriaSeleccionada(categoriaSeleccionada);
    
    
  }, []);
  console.log(Object.keys(categorias))
  console.log(categoriaSeleccionada)
  const handleCategoriaSeleccionada = (categoria) => {
    
    //const siglaCategoria = categorias[categoria];
    setCategoriaSeleccionada(categoria);
    const productosFiltrados = store.productos.filter((producto) => producto.category === categoria);
    const primeraImagenURL = productosFiltrados.length > 0 ? productosFiltrados[0].img_url : '';
    setCategoriasConImagen({ ...categoriasConImagen, [categoria]: primeraImagenURL });
  };

  return (
    <div className="container-fluid mt-5">
    	<Navbar />
      <div className="row bg-light">
        <div className="col-md-12">
          <div className="menu-categorias text-black">
            <h2>Categorías</h2>
            <div className="categorias-galeria row">
              {categorias.map((categoria, index) => (
                <div className="col-md-3" key={index} 
                onClick={() => handleCategoriaSeleccionada(categoria.nombreCategoria)}
                >
                  <div className="card">
                    <img src={categoria.URL} width={300} height={215} className="card-img-top" alt={`${categoria} image`}  style={{ opacity: 0.8 }}  />
                    <div className="card-text bg-dark">{categoria.nombreCategoria}</div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-5">
        {categoriaSeleccionada && (
          <div className="productos-por-categoria">
            
            <div className="row">
              {store.productos
                .filter((producto) => producto.category === categoriaSeleccionada)
                .map((producto, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                      <img src={producto.img_url} width={300} height={215} className="card-img" alt={producto.name} />
                      <div className="card-body">
                        <h2 className="card-title">{producto.name}</h2>
                        <h6 className="card-desciption">{producto.description}</h6>
                        <strong className="text-muted">${producto.cost}</strong>
                      </div>
                      <div className="card-footer bg-light">
                        <Link to="/detalle" className="detalle">
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};
