import cartReducer, {
  addToCart,
  removeFromCart,
  getTotal,
} from './cartSlice'

describe('cart reducer', () => {
  const initialState = {
    items: [],
    quantity: 0,
    subtotal: 0,
    discount: 0,
    total: 0
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle a product being added to an empty cart', () => {
    expect(cartReducer(initialState, addToCart(4)).items).toEqual([{
      id: 4,
      quantity: 1,
      discount: 0
    }]);
  })

  const prevState = {
    items: [{
      id: 0,
      quantity: 2,
      discount: 0
    }],
    quantity: 0,
    subtotal: 0,
    discount: 0,
    total: 0
  }
  it('should handle a product being removed from a list', () => {
    expect(cartReducer(prevState, removeFromCart(0)).items).toEqual([{
      id: 0,
      quantity: 1,
      discount: 0
    }])
  })
  it('should handle the total calulation of a list', () => {
    expect(cartReducer(prevState, getTotal()).total).toEqual(1.1 * 2)
  })

  // Buy a soup and two breads - only one bread should be reduced
  it('should handle soup discount', () => {
    let actual = cartReducer(initialState, addToCart(0)) // add bread
    actual = cartReducer(actual, addToCart(0)) // add bread
    actual = cartReducer(actual, addToCart(3)) // add soup
    expect(cartReducer(actual, getTotal()).discount).toEqual(0.55)
  })

  it('should handle cheese discount', () => {
    // Buy three cheeses - only one should be free
    let actual = cartReducer(initialState, addToCart(2)) // add cheese
    actual = cartReducer(actual, addToCart(2)) // add cheese
    actual = cartReducer(actual, addToCart(2)) // add cheese
    expect(cartReducer(actual, getTotal()).discount).toEqual(0.9)

    // Buy four cheeses - two now should be free
    actual = cartReducer(actual, addToCart(2)) // add cheese
    expect(cartReducer(actual, getTotal()).discount).toEqual(0.9 * 2)
  })

  // Butter alone
  it('should handle butter discount', () => {
    let actual = cartReducer(initialState, addToCart(4)) // add butter
    expect(cartReducer(actual, getTotal()).discount).toEqual(1.2 / 3)

    // Butter with other things
    actual = cartReducer(actual, addToCart(1)) // add milk
    expect(cartReducer(actual, getTotal()).discount).toEqual(1.2 / 3)

    // A mixture of the above scenarios
    actual = cartReducer(actual, addToCart(2)) // add cheese
    actual = cartReducer(actual, addToCart(0)) // add bread
    actual = cartReducer(actual, addToCart(0)) // add bread

    actual = cartReducer(actual, addToCart(3)) // add soup
    actual = cartReducer(actual, removeFromCart(3)) // remove soup

    expect(cartReducer(actual, getTotal()).discount).toEqual(1.2 / 3)
  })
});
