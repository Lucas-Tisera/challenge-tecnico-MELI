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

//Funcion para obtener la categoria de un item
//En este caso decidí implementarlo ya que la API proporcionada en el challenge unicamente me devuelve el id de la categoria
const getItemCategory = async (categoryId) => {
    return await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
}

module.exports = {
    getItemsList,
    getItemsDetail,
    getItemCategory
};