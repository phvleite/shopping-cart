require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it ('verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it ('verifica se ao executar a função fetchItem com o arguemento do item "MLB1615760527", se fução fetch é chamada', async () => {
    expect.assertions(1);
    const dataResult = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it ('verifica se a função fetch utiliza o endpoint correto: https://api.mercadolibre.com/items/MLB1615760527', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const dataResult = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });

  it ('verifica se o retorno da função fetchItem com o argumento do item MLB1615760527 é uma estutura de dados igual do objeto item', async () => {
    expect.assertions(1);
    dataResult = await fetchItem('MLB1615760527');
    expect(dataResult).toEqual(item);
  });

  it ('verifica se a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
