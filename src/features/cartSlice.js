import { createSlice } from "@reduxjs/toolkit"
import { initProducts, offers } from "../data/init"

const initialState = {
    items: [], // { id, quantity, discount }
    quantity: 0,
    subtotal: 0,
    discount: 0,
    total: 0
}

const catalogItems = initProducts;
const offerItems = offers;

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            let itemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (itemIndex > -1) {
                state.items[itemIndex].quantity += 1;
            }
            else {
                state.items.push({ id: action.payload, quantity: 1, discount: 0 });
            }
        },
        removeFromCart(state, action) {
            let itemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (itemIndex > -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                }
                else {
                    state.items = state.items.filter((item) => item.id !== action.payload)
                }
            }
        },
        getTotal(state, action) {
            let cartTotal = { subtotal: 0, quantity: 0, discount: 0 };

            state.items.forEach((currentItem) => {
                cartTotal.subtotal += catalogItems[currentItem.id].price * currentItem.quantity
                cartTotal.quantity += currentItem.quantity

                if (catalogItems[currentItem.id].offerId > -1) {
                    let offerItem = offerItems.find((oItem) => oItem.id === catalogItems[currentItem.id].offerId);
                    let discountedItem = state.items.find((item) => item.id === offerItem.discountedItemId);

                    if (discountedItem) {
                        discountedItem.price = catalogItems[discountedItem.id].price;
                        discountedItem.discount = offerItem.discount(discountedItem, currentItem.quantity);
                    }
                }
                cartTotal.discount += currentItem.discount
            })

            state.subtotal = cartTotal.subtotal;
            state.quantity = cartTotal.quantity;
            state.discount = cartTotal.discount;
            state.total = cartTotal.subtotal - cartTotal.discount;
        },
    }
})

export const { addToCart, removeFromCart, getTotal } = cartSlice.actions;

export const addToCartWithUpdate = (itemId) => (dispatch) => {
    dispatch(addToCart(itemId));
    dispatch(getTotal());
}

export const removeFromCartWithUpdate = (itemId) => (dispatch) => {
    dispatch(removeFromCart(itemId));
    dispatch(getTotal());
}

export default cartSlice.reducer;
