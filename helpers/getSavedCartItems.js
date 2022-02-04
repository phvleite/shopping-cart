const getSavedCartItems = () => {
  // seu código aqui
  const recoverCart = window.localStorage.getItem('cartItems');
  return recoverCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
