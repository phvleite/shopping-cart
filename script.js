let cart = [];
let totalPrice = 0;

const classCartItems = '.cart__items';

const buttonEmptyCart = document.getElementById('empty-cart');
buttonEmptyCart.disable = true;
buttonEmptyCart.className = 'disable';

const showTotalPrice = document.querySelector('.total-price');
showTotalPrice.innerText = `${parseFloat(totalPrice.toFixed(2))}`;

function showLoadingAlert() {
  const frameLoading = document.getElementById('loading');
  const loadingAlert = document.createElement('span');
  loadingAlert.className = 'loading';
  loadingAlert.innerText = 'carregando...';
  frameLoading.appendChild(loadingAlert);
}

function notShowLoadingAlert() {
  const frameLoading = document.getElementById('loading');
  const loadingAlert = document.querySelector('.loading');
  frameLoading.removeChild(loadingAlert);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function activateButtonEmptyCart() {
  if (buttonEmptyCart.disable === true && cart.length > 0) {
    buttonEmptyCart.disable = false;
    buttonEmptyCart.className = 'empty-cart';
  }
  if (buttonEmptyCart.disable === false && cart.length === 0) {
    buttonEmptyCart.disable = true;
    buttonEmptyCart.className = 'disable';
  }
}

function cartItemClickListener(evento) {
  // coloque seu código aqui
  const { id } = evento.target;
  let price = 0;
  cart.forEach((item) => {
    if (item.id === id) {
      price = item.price;
    }
  });
  totalPrice -= +price;
  showTotalPrice.innerText = `${parseFloat(totalPrice.toFixed(2))}`;
  const cart2 = cart
    .map((item) => item)
    .filter((item) => item.id !== id);
  cart = cart2;
  saveCartItems(cart);
  evento.target.parentNode.removeChild(evento.target);
  activateButtonEmptyCart();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  totalPrice += salePrice;
  showTotalPrice.innerText = `${parseFloat(totalPrice.toFixed(2))}`;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  if (cart.length === 0) {
    li.id = cart.length;
  } else {
    li.id = +cart[cart.length - 1].id + 1;
  }
  li.addEventListener('click', cartItemClickListener);
  cart.push({ id: li.id, name: li.innerText, price: `${salePrice}` });
  saveCartItems(cart);
  activateButtonEmptyCart();
  return li;
}

async function itemClickListener(event) {
  // coloque seu código aqui
  showLoadingAlert();
  const parent = event.target.parentNode;
  const sku = getSkuFromProductItem(parent);
  const dbItem = await fetchItem(sku);
  const { id, title, price } = dbItem;
  const liCart = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olCart = document.querySelector(classCartItems);
  olCart.appendChild(liCart);
  notShowLoadingAlert();
}

function recoverItemsCart() {
  cart = JSON.parse(getSavedCartItems());
  if (cart === null) cart = [];
  cart.forEach((item) => {
    const liCart = document.createElement('li');
    const olCart = document.querySelector(classCartItems);
    liCart.id = item.id;
    liCart.className = 'cart__item';
    liCart.innerText = item.name;
    liCart.addEventListener('click', cartItemClickListener);
    olCart.appendChild(liCart);
    totalPrice += +item.price;
    showTotalPrice.innerText = `${parseFloat(totalPrice.toFixed(2))}`;
  });
  activateButtonEmptyCart();
}

function emptyCartItems() {
  const listItems = document.querySelector(classCartItems);
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  cart.splice(0, cart.length);
  saveCartItems(cart);
  totalPrice = 0;
  showTotalPrice.innerText = `${parseFloat(totalPrice.toFixed(2))}`;
  activateButtonEmptyCart();
}

function extractProd(data) {
  data.forEach((item) => {
    const dataItem = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const elementItem = createProductItemElement(dataItem);
    const parent = document.querySelector('.items');
    parent.appendChild(elementItem);
  });  
}

window.onload = async () => {
  showLoadingAlert();
  const dataProd = await fetchProducts('computador');
  const dataResult = dataProd.results;
  extractProd(dataResult);
  const buttonProds = document.querySelectorAll('.item__add');
  buttonProds.forEach((item) => {
    item.addEventListener('click', itemClickListener);
  });
  buttonEmptyCart.addEventListener('click', emptyCartItems);
  recoverItemsCart();
  notShowLoadingAlert();
};
