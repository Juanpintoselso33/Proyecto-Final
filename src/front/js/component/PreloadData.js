export const preloadHamburgers = (actions) => {
    const hamburgers = [
        {
            cost: 100,
            name: 'Hamburguesa Clásica',
            description: 'Carne, lechuga, y tomate',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB79HB1HNPSAYG0174A5YJ5H',
            category: 'Hamburguesas'
        },
        {
            cost: 120,
            name: 'Hamburguesa Deluxe',
            description: 'Carne, bacon, queso y cebolla caramelizada',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB79HSGXXQ9BT85E0T9DNM99',
            category: 'Hamburguesas'
        },
        {
            cost: 130,
            name: 'Hamburguesa Vegana',
            description: 'Hamburguesa a base de plantas',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB79J6XX6Y9KGME2NV9RGWFP',
            category: 'Hamburguesas'
        },
        {
            cost: 150,
            name: 'Hamburguesa Triple',
            description: 'Tres capas de carne',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB79JX1SSN3PJEJJ3HVHG3FT',
            category: 'Hamburguesas'
        },
    ];

    for (const product of hamburgers) {
        actions.addProduct(product);
    }
};

export const preloadPromociones = (actions) => {
    const promociones = [
        {
            cost: 180,
            name: 'Promo Hamburguesa Clásica',
            description: 'Hamburguesa Clásica + Papas Fritas',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB791CWYNKQ3PF5RV36MKRJB',
            category: 'Hamburguesas',
            promo: true
        },
        {
            cost: 190,
            name: 'Promo Milanesa Simple',
            description: 'Milanesa Simple + Bebida',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB793YZTXCAQZXCC8ATEE2SP',
            category: 'Hamburguesas',
            promo: true
        },
        {
            cost: 260,
            name: 'Promo Hamburguesa Deluxe',
            description: 'Hamburguesa Deluxe + Papas Fritas + Bebida',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB7947XKN5GZRRV65HX9SY51',
            category: 'Hamburguesas',
            promo: true
        },
        {
            cost: 310,
            name: 'Promo Milanesa Napolitana',
            description: 'Milanesa Napolitana + Papas Fritas',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB7956X8C1B8B4SEFKB14N5B',
            category: 'Milanesas',
            promo: true
        },
        {
            cost: 350,
            name: 'Promo Hamburguesa Triple',
            description: 'Hamburguesa Triple + Papas Fritas + Bebida',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB795M61JC51V3J8MSYW24H8',
            category: 'Milanesas',
            promo: true
        },
    ];

    for (const promo of promociones) {
        actions.addProduct(promo);
    }
};
export const preloadMilanesas = (actions) => {
    const milanesas = [
        {
            cost: 80,
            name: 'Milanesa Simple',
            description: 'Milanesa de carne',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB79BZ6PSC6CMZXCF5E61P4Y',
            category: 'Milanesas'
        },
        {
            cost: 90,
            name: 'Milanesa Napolitana',
            description: 'Milanesa con jamón y queso',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB79CC2RNVGXZWZWPWCSAKK5',
            category: 'Milanesas'
        },
        {
            cost: 95,
            name: 'Milanesa de Pollo',
            description: 'Milanesa hecha de pollo',
            stars: 4,
            img_url: 'https://upload.mixerbox.com/01HB79CTKYQ6DA0QN5WKV33X4F',
            category: 'Milanesas'
        },
        {
            cost: 100,
            name: 'Milanesa a la Suiza',
            description: 'Milanesa con champiñones y queso suizo',
            stars: 5,
            img_url: 'https://upload.mixerbox.com/01HB79DA6H16CBBRTNGPKBKQJY',
            category: 'Milanesas'
        },
    ];

    for (const product of milanesas) {
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

