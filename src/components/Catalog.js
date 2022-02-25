import { useDispatch } from 'react-redux';
import { addToCartWithUpdate } from '../features/cartSlice';
import { initProducts, offers } from "../data/init"
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
    const stockItems = initProducts;
    const offerItems = offers;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (itemId) => {
        dispatch(addToCartWithUpdate(itemId));
        navigate('/cart')
    }

    return (
        <div className="catalog">
            <div className="table">
                <div className="table-header">
                    <div className="name">Name</div>
                    <div className="price">Price</div>
                    <div className="addButton"></div>
                </div>
                <div className="table-body">
                    {stockItems.map((item) => (
                        <div className="table-row" key={item.id}>
                            <div className="name">
                                {item.name}
                                <span className="offer">{offerItems.find((offerItem) => (offerItem.id === item.offerId))?.description}</span>
                            </div>
                            <div className="price">{item.price}</div>
                            <div className="addButton">
                                <button onClick={() => handleAddToCart(item.id)}>Add To Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Catalog;