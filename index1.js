// initialization of product img variable
let productImg=document.getElementById("productImage");
let smallImg=document.getElementsByClassName("smallImage");

// -----------------product details ------------------------//
for (let iterator of smallImg) {
    iterator.addEventListener("click",()=>{
        productImg.src=iterator.src;
    })
    
}