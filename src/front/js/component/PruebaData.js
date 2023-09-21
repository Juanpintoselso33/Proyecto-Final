import { Context } from "../store/appContext";
import React, { useState, useEffect, useContext } from "react";

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const productDataSalsas = [
    {
        id: 1,
        //   imageurl:
        //     "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Kepchup",
        price: "$19.99",
        //   description: "Some text about the product..",
    },
    {
        id: 2,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Mayonesa",
        price: "$21.99",
        // description: "Some text about the product..",
    },
    {
        id: 3,
        // imageurl:
        // "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Moztasa",
        price: "$99.99",
        // description: "Some text about the product..",
    },
    {
        id: 4,
        // imageurl:
        // "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Especialidad",
        price: "$14.99",
        // description: "Some text about the product..",
    },
    {
        id: 5,
        // imageurl:
        // "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Picantina",
        price: "$38.99",
        // description: "Some text about the product..",
    },
    {
        id: 6,
        // imageurl:
        // "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Picantina",
        price: "$38.99",
        // description: "Some text about the product..",
    },

];


export const Tamaño_bebida = [
    {
        id: 1,
        //   imageurl:
        //     "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Grande",
        price: "$100",
        //   description: "Some text about the product..",
    },
    {
        id: 2,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Mediana",
        price: "$50",
        // description: "Some text about the product..",
    },
    {
        id: 3,
        // imageurl:
        // "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Chica",
        price: "$25",
        // description: "Some text about the product..",
    },


];


export const Guarniciones = [
    {
        id: 1,
        //   imageurl:
        //     "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Papas fritas grandes",
        price: "$100",
        //   description: "Some text about the product..",
    },
    {
        id: 2,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Papas fritas chicas",
        price: "$50",
        // description: "Some text about the product..",
    },

    {
        id: 3,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Aros de cebolla grandes ",
        price: "$150",
        // description: "Some text about the product..",
    },
    {
        id: 4,
        // imageurl:
        // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        name: "Aros de cebolla chicos",
        price: "$100",
        // description: "Some text about the product..",
    },
    {
        id: 5,
        // imageurl:
        // "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        name: "Pure de papas",
        price: "$25",
        // description: "Some text about the product..",
    },


];




export const Menu_dia = {

    id: 1,
    imageurl:
        "https://th.bing.com/th/id/R.200c1ae163cedfa1abf87745c7f241fc?rik=82iHsUKvmHVa%2fQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-7SVOR467tNE%2fTbNmK114ufI%2fAAAAAAAAABQ%2fCKytVzQAoo0%2fs1600%2fDSC_0004.JPG&ehk=CguASGmuQc6Nnb0sVs%2fF1x3hElJ68a1y8FXRZOmM3XE%3d&risl=&pid=ImgRaw&r=0",
    // name: "Grande",
    price: "$100",
    name: "Milanesa de pezcado al plato con ensalada rusa",
    //   description: "Some text about the product..",
}




