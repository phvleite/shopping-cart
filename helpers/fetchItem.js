const fetchItem = async (sku) => {
  // seu código aqui
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const dataItem = await response.json();
  return dataItem;
  // const { id, title, price } = dataItem;
  // return { sku: id, name: title, salePrice: price };
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
