/* ----- Récupération des produits contenus dans le panier ----- */

let productInBasket = JSON.parse(localStorage.getItem('checkedProduct'));

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

/* ----- Affichage différent suivant que le panier est plein ou vide ----- */

if (productInBasket === null || productInBasket == 0){

    // À afficher si le panier est vide 

    const basketContents = document.getElementById('cart');
    basketContents.innerHTML = `<div class="row">
                                    <div class="col-12 mt-5 mb-5 pt-3 pb-3 text-center emptyBasket">
                                        <div>
                                            Votre panier est vide.
                                        </div>
                                        <div class="mt-5">
                                            Retournez sur la page d'accueil pour <br />
                                            choisir des nounours pour le remplir.
                                        </div>
                                    </div>
                                </div> `
} else {

    // Première ligne du tableau à afficher si le panier comporte des produits 

    const basketContents = document.getElementById('cart');
    basketContents.innerHTML = `<p class="mt-4 mb-4">
                                    <strong>Votre panier contient les produits suivants : </strong>
                                </p>
                                <div class="row p-2 border firstLine">
                                    <div class="col-3">
                                        Nom du produit
                                    </div>
                                    <div class="col-3">
                                        Option du produit
                                    </div>
                                    <div class="col-3">
                                        Prix
                                    </div>
                                    <div class="col-3">
                                        Supprimer
                                    </div>
                                </div> `

    // Affichage des produits contenus dans le panier                       

    for (let basketProducts of productInBasket){
        basketContents.innerHTML += `<div class="row fullBasket p-2 border">
                                        <div class="col-3">
                                            ${basketProducts.name}
                                        </div>
                                        <div class="col-3">
                                            ${basketProducts.options}
                                        </div>
                                        <div class="col-3">
                                            ${basketProducts.price} €
                                        </div>
                                        <div class="col-3">
                                            <button type="button" class="btn suppProduct">
                                                <img class ="trash" src="https://img.icons8.com/plasticine/50/000000/trash--v1.png"/>
                                            </button>
                                        </div>
                                    </div>`
    };

    // Suppression d'un produit du panier 

    const buttonSupp = document.querySelectorAll('.suppProduct'); 

    buttonSupp.forEach((trash, key) => {
        trash.addEventListener('click', (event) =>{
            event.preventDefault();
            let productSupp = productInBasket.splice(key, 1); //élèment correspondant à key (indice dans le tableau) supprimé
            localStorage.setItem('checkedProduct', JSON.stringify(productInBasket));
            let numberProduct = productInBasket.length;
            localStorage.setItem('quantityProducts', JSON.stringify(numberProduct)); 
            document.location.reload()
        })
    });

    // Calcul et affichage du prix total de la commande 

    var total = 0;
    for(i = 0; i < productInBasket.length; i++ ){
        total += productInBasket[i].price;
    }

    const totalPrice = document.createElement('div');
    totalPrice.innerHTML = `<div class="total mt-2 p-2">
                                Prix total : <strong>${total}</strong> €
                            </div>`

    document.getElementById('cart').appendChild(totalPrice);

    // Bouton pour vider complètement le panier 

    const clearBasket = document.createElement('div');
    clearBasket.innerHTML = `<div class="clearBasket">
                                <button type="button" class="btn clear pe-3 ps-3 m-3 rounded-pill">Vider le panier</button>
                            </div>`

    document.getElementById('cart').appendChild(clearBasket);

    const clean = document.querySelector('.clear');

    clean.addEventListener('click', (event) =>{
        event.preventDefault();
        localStorage.clear('checkedProduct');
        document.location.reload();
    });


    // Formulaire de contact 

    const contactDetails = document.getElementById('contactDetail')
    contactDetails.innerHTML = `<div class="row contact m-md-5 m-sm-1 pt-3 rounded-3 coord">
                                    <div class="col-7 mb-3">
                                        <strong>Coordonnées</strong>
                                    </div>
                                    <form action="" method="POST" class="form col-md-8" id="contactForm">
                                        <div class="text-start">
                                            <label for="lastName" class="form-label">Nom :</label>
                                            <input type="text" name="lastName" id="lastName" class="form-control" placeholder="Dupont" required />
                                            <small class="smallLast"></small>
                                        </div>
                                        <div class="text-start mt-1">
                                            <label for="firstName" class="form-label">Prénom :</label>
                                            <input type="text" name="firstName" id="firstName" class="form-control" placeholder="Camille" required />
                                            <small class="smallFirst"></small>
                                        </div>
                                        <div class="text-start mt-1">
                                            <label for="address" class="form-label">Adresse :</label>
                                            <input type="text" name="address" id="address" class="form-control" placeholder="2, rue de la Paix" required />
                                            <small class="smallAddress"></small>
                                        </div>
                                        <div class="text-start mt-1">
                                            <label for="city" class="form-label">Ville :</label>
                                            <input type="text" name="city" id="city" class="form-control" placeholder="Peacecity" required />
                                            <small class="smallCity"></small>
                                        </div>
                                        <div class=" text-start mt-1">
                                            <label for="email" class="form-label">Adresse e-mail :</label>
                                            <input type="email" name="email" id="email" class="form-control" placeholder="camille.dupont@peace.com" required />
                                            <small class="smallEmail"></small>
                                        </div>
                                        <div class=" text-center">
                                            <button type="submit" class="btn mt-3 mb-4 p-2 pe-3 ps-3 rounded-pill sendCommand" id="sendCommand">Envoyer la commande</button>
                                        </div>
                                    </form>
                                </div>`
}

/* ----- Vérification des différents champs du formulaire de contact  ----- */

    // Récupération du formulaire 

let form = document.querySelector('#contactForm');

    // -- Validation du nom --

form.lastName.addEventListener('change', function(){
    validLastName(this);
});

const validLastName = function(inputLastName) {
    // Expression régulière pour vérifier que le nom ne comporte que des lettres (avec tiret, apostrophe ou espace)
    let lastNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');

    // Récupération de la balise small située après l'input
    let smallLast = document.querySelector('.smallLast');

    // Affichage différent suivant la réponse du test de la RegExp
    if(lastNameRegex.test(inputLastName.value.trim())) {
        inputLastName.setAttribute('class', 'form-control border border-success');
        smallLast.innerHTML = `<i class="fas fa-check"></i> OK`;
        smallLast.classList.remove('text-danger');
        smallLast.classList.add('text-success');
        return true;
    } else {
        inputLastName.setAttribute('class', 'form-control border border-danger');
        smallLast.innerHTML = `<i class="fas fa-times"></i> Le nom ne doit comporter que des lettres`;
        smallLast.classList.remove('text-success');
        smallLast.classList.add('text-danger');
        return false;
    }
};

    // -- Validation du prénom --

form.firstName.addEventListener('change', function(){
    validFirstName(this);
});

const validFirstName = function(inputFirstName) {
    // Expression régulière pour vérifier que le prénom ne comporte que des lettres (avec tiret, apostrophe ou espace)
    let firstNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');

    // Récupération de la balise small située après l'input
    let smallFirst = document.querySelector('.smallFirst');

    // Affichage différent suivant la réponse du test de la RegExp
    if(firstNameRegex.test(inputFirstName.value.trim())) {
        inputFirstName.setAttribute('class', 'form-control border border-success');
        smallFirst.innerHTML = `<i class="fas fa-check"></i> OK`;
        smallFirst.classList.remove('text-danger');
        smallFirst.classList.add('text-success');
        return true;
    } else {
        inputFirstName.setAttribute('class', 'form-control border border-danger');
        smallFirst.innerHTML = `<i class="fas fa-times"></i> Le nom ne doit comporter que des lettres`;
        smallFirst.classList.remove('text-success');
        smallFirst.classList.add('text-danger');
        return false;
    }
};

    // -- Validation de l'adresse --

form.address.addEventListener('change', function(){
    validAddress(this);
});

const validAddress = function(inputAddress) {
    // Expression régulière pour vérifier que l'adresse ne comporte que des lettres, des chiffres, tiret, espaces, apostrophe et virgule
    let addressRegex = new RegExp('^[A-Za-z0-9À-ÖØ-öø-ÿ- ,\']+$', 'g');

    // Récupération de la balise small située après l'input
    let smallAddress = document.querySelector('.smallAddress');

    // Affichage différent suivant la réponse du test de la RegExp
    if(addressRegex.test(inputAddress.value.trim())) {
        inputAddress.setAttribute('class', 'form-control border border-success');
        smallAddress.innerHTML = `<i class="fas fa-check"></i> OK`;
        smallAddress.classList.remove('text-danger');
        smallAddress.classList.add('text-success');
        return true;
    } else {
        inputAddress.setAttribute('class', 'form-control border border-danger');
        smallAddress.innerHTML = `<i class="fas fa-times"></i> L'adresse ne doit comporter que des lettres et des chiffres`;
        smallAddress.classList.remove('text-success');
        smallAddress.classList.add('text-danger');
        return false;
    }
};

    // -- Validation de la ville --

form.city.addEventListener('change', function(){
    validCity(this);
});

const validCity = function(inputCity) {
    // Expression régulière pour vérifier que la ville ne comporte que des lettres, tiret, espaces, apostrophe et virgule
    let cityRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ- \']+$', 'g');

    // Récupération de la balise small située après l'input
    let smallCity = document.querySelector('.smallCity');

    // Affichage différent suivant la réponse du test de la RegExp
    if(cityRegex.test(inputCity.value.trim())) {
        inputCity.setAttribute('class', 'form-control border border-success');
        smallCity.innerHTML = `<i class="fas fa-check"></i> OK`;
        smallCity.classList.remove('text-danger');
        smallCity.classList.add('text-success');
        return true;
    } else {
        inputCity.setAttribute('class', 'form-control border border-danger');
        smallCity.innerHTML = `<i class="fas fa-times"></i> Le nom de la ville ne doit comporter que des lettres`;
        smallCity.classList.remove('text-success');
        smallCity.classList.add('text-danger');
        return false;
    }
};

    // -- Validation de l'adresse mail --

form.email.addEventListener('change', function(){
    validEmail(this);
});

const validEmail = function(inputEmail) {
    // Expression régulière pour vérifier que l'adresse mail est bien au bon format
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');

    // Récupération de la balise small située après l'input
    let smallEmail = document.querySelector('.smallEmail');

    // Affichage différent suivant la réponse du test de la RegExp
    if(emailRegex.test(inputEmail.value.trim())) {
        inputEmail.setAttribute('class', 'form-control border border-success');
        smallEmail.innerHTML = `<i class="fas fa-check"></i> OK`;
        smallEmail.classList.remove('text-danger');
        smallEmail.classList.add('text-success');
        return true;
    } else {
        inputEmail.setAttribute('class', 'form-control border border-danger');
        smallEmail.innerHTML = `<i class="fas fa-times"></i> Veuillez entrer une adresse mail valide`;
        smallEmail.classList.remove('text-success');
        smallEmail.classList.add('text-danger');
        return false;
    }
};


/* ----- Envoi de la commande ----- */

// Récupération de l'id des produits du panier

let productInBasketId = [];
productInBasket.forEach(element =>
    productInBasketId.push(element.id));


// Envoi du formulaire

form.addEventListener('submit', function(event){
    event.preventDefault();

    if(validLastName(form.lastName) && validFirstName(form.firstName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)){
    
        // Création de l'objet command contenant les valeurs recueillies dans le formulaire et les id des produits
        let command = {
            contact : {
            firstName : form.firstName.value,
            lastName : form.lastName.value,
            address : form.address.value,
            city : form.city.value,
            email : form.email.value
            },
            products : productInBasketId,
        };

        // Envoi des données au backend
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(command),
            headers: {'Content-Type': 'application/json'}
        };
        
        fetch('https://cypher-orinoco.herokuapp.com/api/teddies/order', fetchData)
            .then(response => response.json())
            .then(dataOrder => {
                localStorage.setItem('confirmation', JSON.stringify(command));
                localStorage.setItem('total', JSON.stringify(total));
                localStorage.setItem('orderId', dataOrder.orderId);
                window.location.href = "confirmation.html"
            })
            .catch(function(error) {
                const err = document.getElementById('articles');
        
                err.innerHTML = `<div class="col-12 construction message">
                                    Une erreur est survenue lors de l'envoi des données. <br>
                                    Vérifier que le serveur est correctement lancé.
                                </div>`
            });
    };
});