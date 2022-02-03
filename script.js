let cart = [];

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

function cartItemClickListener() {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.id = cart.length;
  li.addEventListener('click', cartItemClickListener);
  cart.push(li);
  return li;
}

async function itemClickListener(event) {
  // coloque seu código aqui
  const parent = event.target.parentNode;
  const sku = getSkuFromProductItem(parent);
  const dbItem = await fetchItem(sku);
  const { id, title, price } = dbItem;
  const liCart = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olCart = document.querySelector('.cart__items');
  olCart.appendChild(liCart);
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
  const dataProd = await fetchProducts('computador');
  const dataResult = dataProd.results;
  extractProd(dataResult);
  const buttonProds = document.querySelectorAll('.item__add');
  buttonProds.forEach((item) => {
    item.addEventListener('click', itemClickListener);
  });
};
