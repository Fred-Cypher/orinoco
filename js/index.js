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

/* ----- Récupération des données des produits ----- */

fetch('https://cypher-orinoco.herokuapp.com/api/teddies')
    .then(response => response.json())
    .then(data => {
        const articlesContainer = document.getElementById('articles');

        // Récupération des produits 
        
        for (let article of data) {

            // Code à envoyer sur la page d'index pour que les produits s'affichent sous forme de carte 

            articlesContainer.innerHTML += `<div class="col-12 col-lg-4">
                                                <a href="./view/product.html?id=${article._id}">
                                                    <div class="card cardIndex mt-4 mb-5">
                                                        <img class="card-img-top cardImage" src="${article.imageUrl}" alt="Nounours ${article.name}" />
                                                        <div class="card-body text-center">
                                                            <div class="card-title h5">
                                                                ${article.name}
                                                            </div>
                                                            <span class="price">Prix : <strong>${article.price / 100} €</strong></span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>`
        }
    })

    // Retour lors d'une erreur de connexion

    .catch(function(error) {
        const err = document.getElementById('articles');

        err.innerHTML = `<div class="col-12 construction message">
                            Une erreur est survenue lors de la connexion avec le serveur. <br>
                            Vérifier que le serveur est correctement lancé.
                        </div>`
    });