
export const preloadProducts = (actions) => {
    const preloadProducts = [
        {
            cost: 100,
            name: 'Hamburguesa Clásica',
            description: 'Carne, lechuga, y tomate',
            stars: 4,
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
            category: 'Hamburguesas'
        },
        {
            cost: 120,
            name: 'Hamburguesa Deluxe',
            description: 'Carne, bacon, queso y cebolla caramelizada',
            stars: 5,
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
            category: 'Hamburguesas'
        },
        {
            cost: 130,
            name: 'Hamburguesa Vegana',
            description: 'Hamburguesa a base de plantas',
            stars: 4,
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
            category: 'Hamburguesas'
        },
        {
            cost: 150,
            name: 'Hamburguesa Triple',
            description: 'Tres capas de carne',
            stars: 5,
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/410px-NCI_Visuals_Food_Hamburger.jpg',
            category: 'Hamburguesas'
        },
        {
            cost: 80,
            name: 'Milanesa Simple',
            description: 'Milanesa de carne',
            stars: 4,
            img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
            category: 'Milanesas'
        },
        {
            cost: 90,
            name: 'Milanesa Napolitana',
            description: 'Milanesa con jamón y queso',
            stars: 5,
            img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
            category: 'Milanesas'
        },
        {
            cost: 95,
            name: 'Milanesa de Pollo',
            description: 'Milanesa hecha de pollo',
            stars: 4,
            img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
            category: 'Milanesas'
        },
        {
            cost: 100,
            name: 'Milanesa a la Suiza',
            description: 'Milanesa con champiñones y queso suizo',
            stars: 5,
            img_url: 'https://2trendies.com/hero/2023/02/milanesas-de-pollo-al-horno.jpg?width=1200&aspect_ratio=16:9',
            category: 'Milanesas'
        },
        
    ];

    for (const product of preloadProducts) {
        actions.addProduct(product);
    }
};

export const preloadExtras = (actions) => {
    const preloadExtras = [
        { id: 1, name: 'Ketchup', price: 20, type: 'Salsa', categories: ['Hamburguesas', 'Milanesas'] },
        { id: 2, name: 'Mayonesa', price: 20, type: 'Salsa', categories: ['Hamburguesas', 'Milanesas'] },
        { id: 3, name: 'Mostaza', price: 20, type: 'Salsa', categories: ['Hamburguesas', 'Milanesas'] },
        { id: 4, name: 'Queso extra', price: 45, type: 'Ingredientes', categories: ['Hamburguesas', 'Milanesas'] },
        { id: 5, name: 'Panceta', price: 30, type: 'Ingredientes', categories: ['Hamburguesas', 'Milanesas'] },
        { id: 6, name: 'Pepinos', price: 35, type: 'Ingredientes', categories: ['Hamburguesas'] },
        { id: 7, name: 'Jamón', price: 35, type: 'Ingredientes', categories: ['Milanesas'] },
        {
            id: 1,
            name: 'Coca-Cola',
            price: 55,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 2,
            name: 'Sprite',
            price: 55,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 3,
            name: 'Fanta Naranja',
            price: 55,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 4,
            name: 'Agua Mineral',
            price: 35,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 5,
            name: 'Agua con Gas',
            price: 37,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 6,
            name: 'Jugo de Naranja',
            price: 40,
            type: 'Bebidas',
            categories: ['Bebidas']
        },
        {
            id: 8,
            name: 'Papas Fritas',
            price: 30,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        },
        {
            id: 9,
            name: 'Ensalada Mixta',
            price: 35,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        },
        {
            id: 10,
            name: 'Arroz Blanco',
            price: 25,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        },
        {
            id: 11,
            name: 'Puré de Papas',
            price: 40,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        },
        {
            id: 12,
            name: 'Vegetales Salteados',
            price: 40,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        },
        {
            id: 13,
            name: 'Ensalada de Repollo',
            price: 30,
            type: 'Guarniciones',
            categories: ['Hamburguesas', 'Milanesas']
        }
    ];
    for (const extra of preloadExtras) {
        actions.addExtra(extra);
    }
};

