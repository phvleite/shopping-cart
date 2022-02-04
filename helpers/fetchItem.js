const fetchItem = async (sku) => {
  // seu código aqui
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const dataItem = await response.json();
  return dataItem;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
