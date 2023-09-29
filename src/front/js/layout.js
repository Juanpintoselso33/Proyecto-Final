import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import injectContext from "./store/appContext";
// import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddProduct } from "./pages/addProduct"
import { AddUsuario } from "./pages/addUsuario"
import { ConfirmationPage } from "./pages/confirmationPage"
import { CartView } from "./pages/cart"
import { UsuarioAdmin } from './component/usuarioAdmin';
import { UsuarioEstandar } from './component/usuarioEstandar';
import App from './component/App.jsx'
import "../styles/footer.css"







//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <div className="body_prueba">

                        <div className="div_prueba_1">
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Demo />} path="/demo" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<h1>Not found!</h1>} />
                                <Route element={<AddProduct />} path="/addProduct" />
                                <Route element={<AddUsuario />} path="/addUsuario" />
                                <Route element={<CartView />} path="/cart" />
                                <Route element={<UsuarioAdmin />} path="/usuarioAdmin" />
                                <Route element={<UsuarioEstandar />} path="/usuarioEstandar" />
                                <Route element={<App />} path="/prueba1122" />
                                <Route element={<ConfirmationPage />} path="/confirmation" />
                            </Routes>
                        </div>
                        <div className="div_prueba_f">

                            <Footer />
                        </div>


                    </div>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
