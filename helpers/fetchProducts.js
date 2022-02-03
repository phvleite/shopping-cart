const fetchProducts = async () => {
  // seu código aqui
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const data = await response.json();
    const listProd = data.results
      .map((item) => [item.id, item.title, item.price, item.thumbnail]);
    
    listProd.forEach((item) => {
      console.log({ id: item[0], name: item[1], price: item[2] });
      // createProductItemElement({ id: item[0], name: item[1], image: item[2] });
    });
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
