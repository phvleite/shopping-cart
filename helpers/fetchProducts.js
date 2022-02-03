const fetchProducts = async (request) => {
  // seu código aqui
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${request}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
