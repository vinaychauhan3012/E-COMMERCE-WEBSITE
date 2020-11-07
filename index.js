// let registerButton = document.querySelector(".registerButton");
// let loginButton = document.querySelector(".loginButton");
// let submitButton = document.querySelector(".submitButton");
// registerButton.addEventListener("click",()=> {
//     submitButton.innerHTML = "Register";
// });
// loginButton.addEventListener("click",()=> {
//     submitButton.innerHTML = "Login";
// });
let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Red T-SHIRT',
        tag:'product-1',
        price: 30,
        inCart: 0
    },
    {
        name: 'BLACK HRX SPORT-SHOES',
        tag:'product-2',
        price: 70,
        inCart: 0
    },
    {
        name: 'ETHER BLACK TROUSER',
        tag:'product-3',
        price: 50,
        inCart: 0
    },
    {
        name: 'POLO NAVY BLUE T-SHIRT',
        tag:'product-4',
        price: 40,
        inCart: 0
    },
    {
        name: 'Grey SPORT-SHOES',
        tag:'product-5',
        price: 60,
        inCart: 0
    },
    {
        name: 'POLO BLACJ T-SHIRT',
        tag:'product-6',
        price: 55,
        inCart: 0
    },
    {
        name: 'HRX SOCKS',
        tag:'product-7',
        price: 5,
        inCart: 0
    },
    {
        name: 'TITANS WATCH',
        tag:'product-8',
        price: 150,
        inCart: 0
    },
    {
        name: 'CASUAL CASIO WATCH',
        tag:'product-9',
        price: 200,
        inCart: 0
    },
    {
        name: 'CAMPUS BLACK SPORT-SHOES',
        tag:'product-10',
        price: 90,
        inCart: 0
    },
    {
        name: 'LOAFER GREY SHOES',
        tag:'product-11',
        price: 65,
        inCart: 0
    },
    {
        name: 'SKINNY FIT TROUSER',
        tag:'product-12',
        price: 90,
        inCart: 0
    }
];
for (let i=0;i<carts.length;i++) {
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCArtNumbers(){
    let productNumber = localStorage.getItem('cartNumbers');
    if(productNumber){
        document.querySelector('.itemInCart').innerHTML=productNumber;
    }
}

function cartNumbers(product) {
    let productNumber = localStorage.getItem('cartNumbers');
    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1)
        document.querySelector('.itemInCart').textContent=` ${productNumber + 1} `;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.itemInCart').textContent=1;
    }

    setItems(product);

}

function setItems(product){
    let cartItems=localStorage.getItem('productInCart');
    cartItems=JSON.parse(cartItems);
    if (cartItems != null) {
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    } else {
        product.inCart=1;
        cartItems={
            [product.tag]:product
        }
    }
    
    localStorage.setItem('productInCart',JSON.stringify(cartItems))
}

function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost+product.price);
    } else {
        localStorage.setItem('totalCost',product.price)
    }
    
}

function displayCart(){
    let cartItems=localStorage.getItem('productInCart');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector('.product-container');
    let product=document.querySelector('.product'); 
    let cartCost=localStorage.getItem('totalCost');    
    if(cartItems && productContainer){
        product.innerHTML='';
        Object.values(cartItems).map(item =>{
            product.innerHTML+=`
            <div class="row product">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <img src="images/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="col col-lg-2 col-md-2  col-sm-2 price">
                    $${item.price}.00
                </div>
                <div class="col col-lg-2 col-md-2 col-sm-2 quantity">
                    ${item.inCart}
                </div>
                <div class="col col-lg-2 col-md-2 col-sm-2 total">
                    $${item.inCart * item.price}.00
                </div>
                
            </div>
            `;
        });
        product.innerHTML+=`
        <div class="row">
            <div class="col offset-lg-8 offset-md-8 offset-sm-8 product-headers">
                <h5>Amount</h5>
            </div>
            <div class="col product-headers ">
                <h5>$${cartCost}.00</h5>
            </div>
        </div>
        `
    }

}

onLoadCArtNumbers();
displayCart();