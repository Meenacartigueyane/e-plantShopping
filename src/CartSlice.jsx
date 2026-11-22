
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount of all items
    const calculateTotalAmount = () => {
        let total = 0;

        cart.forEach(item => {
            total += parseFloat(item.cost.substring(1)) * item.quantity;
        });

        return total;
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // Checkout
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // Increment quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            amount: item.quantity + 1
        }));
    };

    // Decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                amount: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item from cart
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate subtotal for each plant
    const calculateTotalCost = (item) => {
        return parseFloat(item.cost.substring(1)) * item.quantity;
    };

    return (
        <div className="cart-container">

            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <h3>Your cart is empty</h3>
                    <button onClick={handleContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            ) : (

                <div className="cart-items">

                    {cart.map((item, index) => (

                        <div className="cart-item" key={index}>

                            <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image"
                            />

                            <div className="cart-item-details">

                                <h3>{item.name}</h3>

                                <p>{item.description}</p>

                                <p>Price: {item.cost}</p>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() => handleDecrement(item)}
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() => handleIncrement(item)}
                                    >
                                        +
                                    </button>

                                </div>

                                <p>
                                    Subtotal: $
                                    {calculateTotalCost(item).toFixed(2)}
                                </p>

                                <button
                                    className="remove-button"
                                    onClick={() => handleRemove(item)}
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                    <div className="cart-total">

                        <h2>
                            Total Amount: $
                            {calculateTotalAmount().toFixed(2)}
                        </h2>

                    </div>

                    <div className="cart-buttons">

                        <button onClick={handleContinueShopping}>
                            Continue Shopping
                        </button>

                        <button onClick={handleCheckoutShopping}>
                            Checkout
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default CartItem;
