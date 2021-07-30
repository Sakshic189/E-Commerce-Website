let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Pink Lehenga',
        tag: 'w1',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Blue Lehenga',
        tag: 'w2',
        price: 900,
        inCart: 0
    },
    {
        name: 'Red Saree',
        tag: 'w3',
        price: 800,
        inCart: 0
    },
    {
        name: 'Mustard Saree',
        tag: 'w4',
        price: 700,
        inCart: 0
    },
    {
        name: 'Denim Jacket',
        tag: 'w5',
        price: 300,
        inCart: 0
    },
    {
        name: 'Floral Top',
        tag: 'w6',
        price: 400,
        inCart: 0
    },
    {
        name: 'Palazzo Tee',
        tag: 'w7',
        price: 500,
        inCart: 0
    },
    {
        name: 'Jumpsuit',
        tag: 'w8',
        price: 600,
        inCart: 0
    },
    {
        name: 'Red Shirt',
        tag: 'm1',
        price: 500,
        inCart: 0
    },
    {
        name: 'Black Shirt',
        tag: 'm2',
        price: 300,
        inCart: 0
    },
    {
        name: 'Navy Blue Shirt',
        tag: 'm3',
        price: 400,
        inCart: 0
    },
    {
        name: 'Pink Shirt',
        tag: 'm4',
        price: 600,
        inCart: 0
    },
    {
        name: 'Brown T-Shirt',
        tag: 'm5',
        price: 200,
        inCart: 0
    },
    {
        name: 'Blue T-Shirt',
        tag: 'm6',
        price: 300,
        inCart: 0
    },
    {
        name: 'Black Jeans',
        tag: 'm7',
        price: 600,
        inCart: 0
    },
    {
        name: 'Grey Trousers',
        tag: 'm8',
        price: 800,
        inCart: 0
    },
    {
        name: 'Pink Suit',
        tag: 'k1',
        price: 400,
        inCart: 0
    },
    {
        name: 'Blue Suit',
        tag: 'k2',
        price: 600,
        inCart: 0
    },
    {
        name: 'Yellow Suit',
        tag: 'k3',
        price: 300,
        inCart: 0
    },
    {
        name: 'Orange Suit',
        tag: 'k4',
        price: 500,
        inCart: 0
    },
    {
        name: 'Orange T-Shirt',
        tag: 'k5',
        price: 300,
        inCart: 0
    },
    {
        name: 'Yellow T-Shirt',
        tag: 'k6',
        price: 500,
        inCart: 0
    },
    {
        name: 'Pink T-Shirt',
        tag: 'k7',
        price: 400,
        inCart: 0
    },
    {
        name: 'Blue T-Shirt',
        tag: 'k8',
        price: 200,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })

}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);

    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
        <div class="product"> 
        <ion-icon name="trash-outline"></ion-icon> 
        <img src="./images/${item.tag}.jpg "> 
        <span>${item.name}</span>
        </div>
        <div class="price">Rs${item.price}</div>
        <div class="quantity">
        <ion-icon name="caret-back-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="caret-forward-circle-outline"></ion-icon>
        </div>
        <div class="total">
        Rs${item.inCart * item.price}
        </div>
        `;
        });


        productContainer.innerHTML += `
    <div class="basketTotalContainer">
       <h4 class="basketTotalTitle">
             Basket Total
             </h4>
             <h4 class="basketTotal">
                Rs ${cartCost}
                 </h4>
                 </div>
                 
    `;
    }
}
onLoadCartNumbers();
displayCart();
