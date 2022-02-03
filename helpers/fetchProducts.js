const fetchProducts = async () => {
  // seu código aqui
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
