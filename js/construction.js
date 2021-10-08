/* ----- Affichage du nombre de produits dans le panier ----- */

let numberProduct = JSON.parse(localStorage.getItem('quantityProducts'));

if(numberProduct){
    const numberProducts = document.getElementById('quantity');
    numberProducts.innerHTML = `<div class="leftHear"></div>
                                <div class="rightHear"></div>
                                <div class="circleNumber">
                                    ${numberProduct} 
                                </div>`
};