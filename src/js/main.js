'use strict';

//CONSTANTES Y VARIABLES
const centerProducts = document.querySelector(".js_products-center");
const basketProducts = document.querySelector(".js_products-basket");

const searchButton = document.querySelector(".js_button-search");
const inputSearch = document.querySelector(".js_input-search");
const buttonMostrar = document.querySelector(".js_button-mostrar");



let products = [];
let listBasket = [];

//FUNCIONES 
function paintAProductBasket(OneProductToPAint) { //Pinta un solo producto en la cesta
  basketProducts.innerHTML += `
  <li id="${OneProductToPAint.id}">
        <div class="product">
        <p id="${OneProductToPAint.id}" class="delete-from-basket">X</p>
          <img class="image" src="${OneProductToPAint.image}" alt="">
          <p class="name-product">${OneProductToPAint.title}</p>
          <p class="price-product">${OneProductToPAint.price} €</p>
        </div>
  </li>`
  
};

function paintAProductCenter(OneProductToPAint) { //Pinta un solo producto en la parte central
  centerProducts.innerHTML += `
  <li id="${OneProductToPAint.id}">
        <div class="product">
          <img class="image" src="${OneProductToPAint.image}" alt="">
          <p class="name-product">${OneProductToPAint.title}</p>
          <p class="price-product">${OneProductToPAint.category}</p>
          <p class="price-product">${OneProductToPAint.price} €</p>
          <button class="buy js_buy" id="${OneProductToPAint.id}">Comprar</button>
        </div>
  </li>`
};

function renderProductsCenter(productsToPaint) { //Renderiza todos los productos del centro
centerProducts.innerHTML = '';
for (let product of productsToPaint) {
  paintAProductCenter(product); //Se pinta un solo producto. El parámetro tiene que ser un solo item del array. 
}};

function renderProductsBasket(productsToPaint) { //Renderiza todos los productos de la cesta
basketProducts.innerHTML = '';
for (let product of productsToPaint) {
  paintAProductBasket(product); //Se pinta un solo producto. El parámetro tiene que ser un solo item del array. 
}};

//FUNCIONES MANEJADORAS
function handleClickSearch(event){
  event.preventDefault();
  const valueSearch = inputSearch.value;
  const searchResults = products.filter(product => product.title.toLowerCase().includes(valueSearch.toLowerCase())); //Resultado de la búsqueda 
  
  console.log(`el número de elementos en la búsqueda es de ${searchResults.length}`);
  renderProductsCenter(searchResults);
};

function handleClickBuy(event){  
  event.preventDefault();

  if (event.target.tagName === "BUTTON" ) {
      event.target.innerText = "Eliminar";
      event.target.classList.toggle('inBasket');
        
    if (event.target.classList.contains('inBasket')) {
      event.target.innerText = "Eliminar";
    } else {
      event.target.innerText = "Comprar";
    }

      const clickedId = event.target.id;     
      const clickedproductobjt = products.find((product) => product.id === Number(clickedId));  //Buscamos con el id el producto en al array productoos
      
      const basketIndex = listBasket.findIndex((product) => product.id === Number(clickedId)); //Miramos si este productoo está en la cesta

      if (basketIndex === -1) {
        listBasket.push(clickedproductobjt);
        localStorage.setItem("listBasket", JSON.stringify(listBasket));
      renderProductsBasket(listBasket);
      } else { 
        listBasket.splice(basketIndex, 1);
        localStorage.setItem("listBasket", JSON.stringify(listBasket));
      renderProductsBasket(listBasket);

      }
           
};
};

function handleClickX(event) {
event.preventDefault();

if (event.target.classList.contains('delete-from-basket')) {

      const clickedId = event.target.id;     
      const basketIndex = listBasket.findIndex((product) => product.id === Number(clickedId));
      listBasket.splice(basketIndex,1);
      renderProductsBasket(listBasket);

      const productsIndex = products.findIndex((product) => product.id === Number(clickedId));
      console.log(productsIndex);

      const centerButton = document.querySelector(`.js_buy[id="${clickedId}"]`);
      if (centerButton) {
        centerButton.classList.remove('inBasket');
        centerButton.innerText = 'Comprar';
      }
}};

function handleClickMostrar(event) {
  event.preventDefault();
  for (let product of listBasket) {
    console.log(product.title);
  }
}
//EVENTOS


searchButton.addEventListener("click", handleClickSearch);
centerProducts.addEventListener("click", handleClickBuy);
basketProducts.addEventListener("click", handleClickX);
buttonMostrar.addEventListener("click", handleClickMostrar);

//FETCH




if (localStorage.getItem("products") != null){
  products = JSON.parse(localStorage.getItem("products"));
  renderProductsCenter(products);
};

if (localStorage.getItem("listBasket") != null){
  listBasket = JSON.parse(localStorage.getItem("listBasket"));
  renderProductsBasket(listBasket);
};


    
    if (localStorage.getItem("products") === null ) {
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    products = data;
  
  renderProductsCenter(products);
  renderProductsBasket(listBasket);

  //Almacenar en el local Storage
  localStorage.setItem("products", JSON.stringify(products));
/*   localStorage.setItem("listBasket", JSON.stringify(listBasket)); */
});
} 