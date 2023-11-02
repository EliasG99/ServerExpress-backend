const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        const products = this.getProductsFromJSON();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, ...product };
        products.push(newProduct);
        this.saveProductsToJSON(products);
        return newProduct;
    }

    getProducts() {
        return this.getProductsFromJSON();
    }

    getProductById(id) {
        const products = this.getProductsFromJSON();
        const product = products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            return null;
        }
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProductsFromJSON();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { id, ...updatedProduct };
            this.saveProductsToJSON(products);
            return products[index];
        } else {
            return null;
        }
    }

    deleteProduct(id) {
        const products = this.getProductsFromJSON();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            this.saveProductsToJSON(products);
            return true;
        } else {
            return false;
        }
    }

    getProductsFromJSON() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProductsToJSON(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}


module.exports = ProductManager;
