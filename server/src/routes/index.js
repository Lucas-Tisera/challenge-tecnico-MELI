const { Router } = require('express');

const itemsRouter = require('./items');

const router = Router();



// Configuro los routers que se utilizarán para la aplicación
router.use('/items', itemsRouter);


module.exports = router;
