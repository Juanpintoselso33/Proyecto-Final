import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import axios from 'axios';
export const PreloadComponent = () => {
    const { actions } = useContext(Context);
    const preloadAllProducts = async () => {
        try {
            const response = await axios.get(process.env.BACKEND_URL + 'api/products');

            if (response.data.length === 0) {
                const preloadProducts = [
                    {
                        cost: 100,
                        name: 'Hamburguesa Clásica',
                        description: 'Carne, lechuga, y tomate',
                        stars: 4,
                        img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
                        category: 'H'
                    },
                    {
                        cost: 120,
                        name: 'Hamburguesa Deluxe',
                        description: 'Carne, bacon, queso y cebolla caramelizada',
                        stars: 5,
                        img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
                        category: 'H'
                    },
                    {
                        cost: 130,
                        name: 'Hamburguesa Vegana',
                        description: 'Hamburguesa a base de plantas',
                        stars: 4,
                        img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
                        category: 'H'
                    },
                    {
                        cost: 150,
                        name: 'Hamburguesa Triple',
                        description: 'Tres capas de carne',
                        stars: 5,
                        img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
                        category: 'H'
                    },
                    {
                        cost: 80,
                        name: 'Milanesa Simple',
                        description: 'Milanesa de carne',
                        stars: 4,
                        img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
                        category: 'M'
                    },
                    {
                        cost: 90,
                        name: 'Milanesa Napolitana',
                        description: 'Milanesa con jamón y queso',
                        stars: 5,
                        img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
                        category: 'M'
                    },
                    {
                        cost: 95,
                        name: 'Milanesa de Pollo',
                        description: 'Milanesa hecha de pollo',
                        stars: 4,
                        img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
                        category: 'M'
                    },
                    {
                        cost: 100,
                        name: 'Milanesa a la Suiza',
                        description: 'Milanesa con champiñones y queso suizo',
                        stars: 5,
                        img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
                        category: 'M'
                    }
                ];

                for (const product of preloadProducts) {
                    actions.addProduct(product);
                }
            }
        } catch (error) {
            console.error('Hubo un problema al verificar los productos:', error);
        }
    };
    useEffect(() => {
        preloadAllProducts();
    }, []);

    return (
        <div>
            {/* Puedes poner cualquier JSX aquí, como un spinner de carga o un mensaje */}
        </div>
    );
};

export default PreloadComponent;
