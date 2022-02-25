export const initProducts = [
  {
    id: 0,
    name: "Bread",
    price: 1.1,
    offerId: -1,
  },
  {
    id: 1,
    name: "Milk",
    price: 0.5,
    offerId: -1,
  },
  {
    id: 2,
    name: "Cheese",
    price: 0.9,
    offerId: 0,
  },
  {
    id: 3,
    name: "Soup",
    price: 0.6,
    offerId: 1,
  },
  {
    id: 4,
    name: "Butter",
    price: 1.2,
    offerId: 2,
  },
];

export const offers = [
  {
    id: 0,
    discountedItemId: 2,
    description: "When you buy a Cheese, you get a second Cheese free!",
    discount: ({ price }, cartQuantity) => ((cartQuantity - (cartQuantity % 2)) / 2) * price,
  },
  {
    id: 1,
    discountedItemId: 0,
    description: "When you buy a Soup, you get a half price Bread!",
    discount: ({ price, quantity }, cartQuantity) => (price * Math.min(quantity, cartQuantity)) / 2,
  },
  {
    id: 2,
    discountedItemId: 4,
    description: "Get a third off Butter!",
    discount: ({ price }, cartQuantity) => (price * cartQuantity) / 3,
  },
];
