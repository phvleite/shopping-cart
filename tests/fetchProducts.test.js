require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it ('verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it ('verifica se ao executar a função fetchProducts com o arguemento "computador", se fução fetch é chamada', () => {
    expect.assertions(1);
    const dataResult = fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it ('verifica se a função fetch utiliza o endpoint correto: https://api.mercadolibre.com/sites/MLB/search?q=computador', () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const dataResult = fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });

  it ('verifica se o retorno da função fetchProduct com o argumento computador é uma estutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    dataResult = await fetchProducts('computador');
    expect(dataResult).toEqual(computadorSearch);
  });

  it ('verifica se a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
