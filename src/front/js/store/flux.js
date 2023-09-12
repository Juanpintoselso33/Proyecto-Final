const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			productos: [],
			message: null,

			planetas: [],
			
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			/* Productos */
			obtenerAllProducts: async function () {
				try {
					let response = await fetch("https://cautious-space-waffle-v6vw5vw54j73w7q6-3001.app.github.dev/api/products");
					let data = await response.json();  
					setStore({ productos: data.results }); 


				} catch (error) {
					console.log(error);

				}
			},



		}
	};
};

export default getState;
