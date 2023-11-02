const express = require('express');
const ProductManager = require('./ProductManager'); // Importa la clase ProductManager
const app = express();
const port = 8080; // Puerto en el que se ejecutará el servidor

// Crea una instancia de ProductManager con la ruta del archivo JSON
const productManager = new ProductManager('productos.json');

// Ruta '/products'
app.get('/products', (req, res) => {
    const limit = req.query.limit; 
    const products = productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

// Ruta '/products/:pid'
app.get('/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid); // Lee el parámetro de ruta 'pid'
    const product = productManager.getProductById(pid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
