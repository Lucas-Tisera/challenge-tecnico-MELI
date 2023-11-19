const express = require('express');
const routes = require('./routes/index.js');
const { json } = require('express');

// configuro el cors para que acepte peticiones de localhost:3001
const cors = {
	origin: [ 'http://localhost:3000'],
	default: 'http://localhost:3000',
};

const server = express();

//CONFIGURACIONES DEL SERVIDOR:

server.name = 'API';

//MIDDLEWARES:
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(json({ limit: '50mb' }));

//CORS:
server.use((req, res, next) => {
	const origin = cors.origin.includes(req.header('origin')) ? req.headers.origin : cors.default;
	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//RUTAS:
server.use('/api', routes); 


server.get('/', async (req, res) => {
	res.send('Servidor corriendo!');
});


//MANEJO DE ERRORES FINALES:
server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send({ message });
});

module.exports = server;
