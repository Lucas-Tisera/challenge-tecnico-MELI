const { Router } = require('express');

const itemsRouter = require('./items');
const proxyMiddleware = require('../middleware/routerMiddleware');

const router = Router();



// Configuro los routers que se utilizarán para la aplicación
router.use('/items', proxyMiddleware, itemsRouter);


module.exports = router;
