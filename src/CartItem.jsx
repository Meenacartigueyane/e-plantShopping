
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ setShowCart }) {
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);

    // Calculate subtotal for each item
    const calculateSubtotal = (item) => {
        return item.price * item.quantity;
    };

    // Calculate total amount
    const calculateTotalAmount = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    // Increase quantity
    const handleIncrease = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // Decrease quantity
    const handleDecrease = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity - 1
        }));
    };

    // Remove item
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Continue shopping
    const handleContinueShopping = () => {
        if (setShowCart) {
            setShowCart(false);
        }
    };

    // Checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for shopping at Paradise Nursery!');
        }
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div>
                    <h2>Your cart is empty!</h2>
                    <button onClick={handleContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item.name}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width="120"
                                />

                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <p>
                                        Subtotal: ₹
                                        {calculateSubtotal(item)}
                                    </p>

                                    <button
                                        onClick={() => handleDecrease(item)}
                                    >
                                        -
                                    </button>

                                    <span> {item.quantity} </span>

                                    <button
                                        onClick={() => handleIncrease(item)}
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => handleRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2>
                        Total Amount: ₹{calculateTotalAmount()}
                    </h2>

                    <button onClick={handleContinueShopping}>
                        Continue Shopping
                    </button>

                    <button onClick={handleCheckout}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default CartItem;
