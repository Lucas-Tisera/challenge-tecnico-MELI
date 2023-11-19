const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const rewritePath = {
    '^/api': ''
};

const proxyMiddleware = createProxyMiddleware({
    target: 'https://challenge-meli-client.onrender.com/items',
    changeOrigin: true,
    pathRewrite: rewritePath,
    secure: false,
});

//export default proxyMiddleware;

module.exports = proxyMiddleware;