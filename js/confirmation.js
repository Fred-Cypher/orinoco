/* ----- Récupération des données ----- */

let command = JSON.parse(localStorage.getItem('confirmation'));
let total = JSON.parse(localStorage.getItem('total'));
let orderId = localStorage.getItem('orderId');

/* ----- Texte à afficher, contenant l'Id de la commande et le prix total ----- */

let confirmationOrder = document.createElement('div');
confirmationOrder.innerHTML = `<div class="d-flex align-items-stretch row">
                                    <div class="col-md-10 mt-3 mb-3 text-center mx-auto endText rounded-3">
                                        <div class="col-md-9 mx-auto mt-3 mb-3">
                                            <span>${command.contact.firstName}</span>, l'équipe d'Orinoco vous remercie pour votre commande.
                                        </div>
                                        <div class="col-md-9 mx-auto mt-3 mb-3">
                                            Nous espérons vous revoir très bientôt sur notre site, de nouveaux nounours viendrons prochainement nous rejoindre 
                                            et seront contents de faire votre connaissance.
                                        </div>
                                        <div class="col-md-9 mx-auto mt-3 mb-4">
                                            <div>
                                                Votre commande n° : <span>${orderId}</span>, d'un montant de <span>${total}</span> €, 
                                                arrivera le plus rapidement possible à cette adresse :
                                            </div>
                                            <div class="mt-3 mb-4">
                                                ${command.contact.firstName} ${command.contact.lastName}<br/>
                                                ${command.contact.address}<br/>
                                                ${command.contact.city}
                                            </div>
                                        </div>
                                        <a href="../index.html">
                                            <button class="col-md-5 col-sm-10 validationButton rounded-pill mt-3 mb-2 pt-2 pb-2">Retour à l'accueil</button>
                                        </a>
                                    </div>
                                </div>`;

document.getElementById('confirmOrder').appendChild(confirmationOrder);

localStorage.clear();