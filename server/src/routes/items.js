require('dotenv').config();
const { Router } = require('express');
const { NAME, LASTNAME } = process.env;

const {
	getItemsList, getItemsDetail, getItemCategory
} = require('../controllers/items'); 

const router = Router();

//Configuro la informacion del autor
const author = {
    name: NAME,
    lastname: LASTNAME,
};

router.get('/', async (req, res, next) => {
	try {
        //Guardo en el parametro "query" aquellos valores que se encuentren en la url
        const query = req.query.q;

        //Almaceno la respuesta de la API en una constante
        const response = await getItemsList(query);
        
        //FORMATO DE RESPUESTA:
        //Filtro por categorias y las almaceno en un array
        const categories = response.data.filters.length > 0 ? response.data.filters.find(filter => filter.id === 'category').values[0].path_from_root.map(category => category.name) : [];
        
        //Formateo la respuesta de la API para que se ajuste a lo que pide el challenge
        const items = response.data.results.map(result => ({
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: result.price,
            decimals: 2,
          },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping,
          //Decidí mostrar la direccion para poder moldear el FrontEnd a los requerimientos del challenge
          address: result.seller_address.state.name,
        }));
        
        //Formato final de la respuesta
        const resultFormat = {
          author,
          categories,
          items,
        };
    
        res.json(resultFormat);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

router.get('/:id', async (req, res) => {
    try {
        //Guardo en el parametro "itemId" aquellos valores que se encuentren en la url
        const itemId = req.params.id;

        //Desestructuro la respuesta de la API en dos constantes para poder trabajarlas por separado
        const {itemResponse, descriptionResponse} = await getItemsDetail(itemId);

        //Decidí implementar el servicio para obtener la categoria del item
        const categoryResponse = await getItemCategory(itemResponse.data.category_id);

        //FORMATO DE RESPUESTA:
        //Formateo la respuesta de la API para que se ajuste a lo que pide el challenge
        const item = {
            id: itemResponse.data.id,
            title: itemResponse.data.title,
            price: {
            currency: itemResponse.data.currency_id,
            amount: itemResponse.data.price,
            decimals: 2
            },
            picture: itemResponse.data.pictures.length > 0 ? itemResponse.data.pictures[0].url : '',
            condition: itemResponse.data.condition,
            free_shipping: itemResponse.data.shipping.free_shipping,
            sold_quantity: itemResponse.data.initial_quantity,
            description: descriptionResponse.data.plain_text,
            category: categoryResponse.data.path_from_root.map(category => category.name),
          };

        //Formato final de la respuesta
        const resultFormat = {
        author,
        item,
        };
        res.json(resultFormat);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
  
module.exports = router;