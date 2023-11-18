const { default: axios } = require("axios");

//Funcion para obtener la lista de items
const getItemsList = async (query = "") => {
	return await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
};

//Funcion para obtener el detalle de un item
const getItemsDetail = async (itemId) => {
    //Utilizo Promise.all para hacer las dos llamadas a la API en paralelo
    const [itemResponse, descriptionResponse] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${itemId}`),
        axios.get(`https://api.mercadolibre.com/items/${itemId}/description`),
    ]);

    //Retorno un objeto con las dos respuestas
    return { itemResponse, descriptionResponse };
}

module.exports = {
    getItemsList,
    getItemsDetail
};