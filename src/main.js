const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database.js')

async function createProduct(product) {
    try {
        const conn = await getConnection();
        product.price =  parseFloat(product.price);
        const result = await conn.query('INSERT INTO product SET ?', product);
        new Notification({
            title: 'Elentron Mysql',
            body: 'New Product Saved Succedfully'
        }).show();

        product.id = result.insertId;
        return product;

    } catch (error) {
        console.log(error);
    }
    
}

async function deleteProduct(id) {
    const conn = await getConnection();
    const results = await conn.query('DELETE FROM product WHERE id = ?', id);
    return results;
}

async function getProductsById(id) {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product WHERE id = ?', id);
    return results[0];
}

async function getProducts() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product ORDER BY id DESC');
    return results;
}

async function updateProduct(id, product) {
    const conn = await getConnection();
    const results = await conn.query('UPDATE product SET ? WHERE id = ?', [product, id]);
    console.log(results);
    return results;
}

let window;

function createWindow() { 
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    window.loadFile('ui/index.html');
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProductsById,
    updateProduct
}