import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ showCart, setShowCart }) {
    const dispatch = useDispatch();

    const CartItems = useSelector(state => state.cart.items);

    const calculateTotalQuantity = () => {
        return CartItems
            ? CartItems.reduce((total, item) => total + item.quantity, 0)
            : 0;
    };

    const products = [
        {
            name: 'Aloe',
            price: 110,
            image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09',
            description: 'Aloe Vera Plant'
        },
        {
            name: 'Snake Plant',
            price: 150,
            image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee',
            description: 'Snake Plant'
        },
        {
            name: 'Peace Lily',
            price: 200,
            image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee',
            description: 'Peace Lily Plant'
        },
        {
            name: 'Money Plant',
            price: 120,
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b',
            description: 'Money Plant'
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    return (
        <div className="product-list">
            <div className="cart-header">
                <h2>Plants</h2>

                <button onClick={() => setShowCart(true)}>
                    Cart ({calculateTotalQuantity()})
                </button>
            </div>

            <div className="product-grid">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img
                            src={product.image}
                            alt={product.name}
                            width="200"
                        />

                        <h3>{product.name}</h3>

                        <p>{product.description}</p>

                        <p>Price: ₹{product.price}</p>

                        <button onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;