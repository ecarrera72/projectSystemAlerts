const { remote } = require('electron');
const main = remote.require('./main');

const productForm =  document.getElementById('productForm');

const productName =  document.getElementById('name');
const productPrice =  document.getElementById('price');
const productDescription =  document.getElementById('description');

let products = [];
let editingStatus = false;
let productId = '';

const productsList = document.getElementById('products');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }
    if (!editingStatus) {
        const result = await main.createProduct(newProduct);
        console.log(result);
    } else {
        const result = await main.updateProduct(productId, newProduct);
        console.log(result);
    }
    productForm.reset();
    productName.focus();
    await getProducts();
})

async function deleteProduct(id) {
    if (confirm("Estas seguro de eliminarlo?")) {
        await main.deleteProduct(id);
        await getProducts();
    }

    return;
}

async function editProduct(id) {
    const product = await main.getProductsById(id);
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;

    editingStatus = true;
    productId = product.id;


}

function renderProducts(products) {
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__fadeInRight">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                        DELETE
                    </button>
                    <button class="btn btn-secondary" onclick="editProduct(${product.id})">
                        EDIT
                    </button>
                </p>
            </div>
        `;
    });
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

async function init() {
    await getProducts();
}

init();