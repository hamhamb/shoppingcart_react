import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartWithUpdate, removeFromCartWithUpdate } from '../features/cartSlice';
import { Link } from 'react-router-dom'
import { initProducts } from "../data/init"

const Cart = () => {
    const stockItems = initProducts;

    const cartItems = useSelector(state => state.cart.items);
    const subtotal = useSelector(state => state.cart.subtotal);
    const discount = useSelector(state => state.cart.discount);
    const total = useSelector(state => state.cart.total);

    const dispatch = useDispatch();
    
    const handleAddItem = (itemId) => {
        dispatch(addToCartWithUpdate(itemId))
    }

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCartWithUpdate(itemId))
    }

    return (
        <div>
            <div className='cart'>
                <div className="table">
                    <div className="table-header">
                        <div className="name">Product</div>
                        <div className="price">Price</div>
                        <div className='quantity'>Quantity</div>
                        <div className="price">Saving</div>
                        <div className='price'>Total</div>
                    </div>
                    <div className="table-body">
                        {cartItems?.map((item) => (
                            <div key={item.id} className='table-row'>
                                <div className="name">{stockItems[item.id].name}</div>
                                <div className="price">{stockItems[item.id].price}</div>
                                <div className='quantity'>
                                    <button onClick={() => handleRemoveItem(item.id)}> &lt; </button>
                                    {cartItems.find((cartItem) => cartItem.id === item.id).quantity}
                                    <button onClick={() => handleAddItem(item.id)}> &gt; </button>
                                </div>
                                <div className="price saving">{Number(cartItems.find((cartItem) => cartItem.id === item.id).discount).toFixed(2)}</div>
                                <div className="price">{Number(stockItems[item.id].price * cartItems.find((cartItem) => cartItem.id === item.id).quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="table-footer">
                        <div className="table-row">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="footer-desc">Subtotal</div>
                            <div className="price">{Number(subtotal).toFixed(2)}</div>
                        </div>
                        <div className="table-row">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="footer-desc saving">Discount</div>
                            <div className="price saving">{Number(discount).toFixed(2)}</div>
                        </div>
                        <div className="table-row">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="footer-desc">Total</div>
                            <div className="price">{Number(total).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className="back">
                    <Link to="/">&lt; Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;
