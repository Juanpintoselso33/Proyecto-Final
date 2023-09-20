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
import {CardMultiple} from "./component/CardMultipleSLider.jsx"
import {CardHamburguesas} from "./component/SecHamburguesa.jsx"
import {CardMilanesas} from "./component/SecMilanesa.jsx"
import {CardPromos} from "./component/SecPromos.jsx"
import { AddProduct } from "./pages/addProduct"
import { CartView } from "./pages/cart"
import {PreloadComponent} from './component/preloadProducts';







//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <PreloadComponent />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                       
                        <Route element={<Single />} path="/single/:theid" />
            
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<CardMultiple />} path="/prueba1"/>
                        <Route element={<CardHamburguesas />} path="/prueba2"/>
                        <Route element={<CardMilanesas />} path="/prueba3"/>
                        <Route element={<CardPromos />} path="/prueba4"/>
                        <Route element={<AddProduct />} path="/add_product"/>
                        <Route element={<CartView />} path="/cart"/>
                        
                    </Routes>
                   
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
