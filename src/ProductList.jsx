
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ showCart, setShowCart }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [addedItems, setAddedItems] = useState([]);

    const products = [
        // Air Purifying Plants
        { id: 1, name: 'Aloe Vera', category: 'Air Purifying', price: 110, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09' },
        { id: 2, name: 'Snake Plant', category: 'Air Purifying', price: 150, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee' },
        { id: 3, name: 'Peace Lily', category: 'Air Purifying', price: 200, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee' },
        { id: 4, name: 'Spider Plant', category: 'Air Purifying', price: 130, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333' },
        { id: 5, name: 'Areca Palm', category: 'Air Purifying', price: 250, image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78' },
        { id: 6, name: 'Rubber Plant', category: 'Air Purifying', price: 180, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6' },

        // Aromatic Plants
        { id: 7, name: 'Lavender', category: 'Aromatic', price: 140, image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec' },
        { id: 8, name: 'Jasmine', category: 'Aromatic', price: 160, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946' },
        { id: 9, name: 'Rosemary', category: 'Aromatic', price: 120, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662' },
        { id: 10, name: 'Mint', category: 'Aromatic', price: 90, image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1' },
        { id: 11, name: 'Basil', category: 'Aromatic', price: 100, image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c' },
        { id: 12, name: 'Gardenia', category: 'Aromatic', price: 190, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e' },

        // Medicinal Plants
        { id: 13, name: 'Tulsi', category: 'Medicinal', price: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5' },
        { id: 14, name: 'Neem', category: 'Medicinal', price: 180, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587' },
        { id: 15, name: 'Amla', category: 'Medicinal', price: 170, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6' },
        { id: 16, name: 'Ginger', category: 'Medicinal', price: 90, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5' },
        { id: 17, name: 'Turmeric', category: 'Medicinal', price: 110, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5' },
        { id: 18, name: 'Lemongrass', category: 'Medicinal', price: 130, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662' }
    ];

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const categories = [
        'All',
        'Air Purifying',
        'Aromatic',
        'Medicinal'
    ];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(
            product => product.category === selectedCategory
        );

    const handleAddToCart = (product) => {
        dispatch(addItem({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.category
        }));

        setAddedItems(previous => [...previous, product.name]);
    };

    return (
        <div className="product-list">

            <nav className="navbar">
                <h2>Paradise Nursery</h2>

                <div>
                    <button onClick={() => {
                        setShowCart(false);
                        setSelectedCategory('All');
                    }}>
                        Home
                    </button>

                    <button onClick={() => setShowCart(false)}>
                        Plants
                    </button>

                    <button onClick={() => setShowCart(true)}>
                        🛒 Cart ({totalQuantity})
                    </button>
                </div>
            </nav>

            <h1>Our Plants</h1>

            <p>
                Bring nature into your home with our beautiful plants.
            </p>

            <div className="categories">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={
                            selectedCategory === category ? 'active' : ''
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id}>

                        <img
                            src={product.image}
                            alt={product.name}
                            width="200"
                        />

                        <h3>{product.name}</h3>

                        <p>{product.category}</p>

                        <p>Price: ₹{product.price}</p>

                        <button
                            onClick={() => handleAddToCart(product)}
                            disabled={addedItems.includes(product.name)}
                        >
                            {addedItems.includes(product.name)
                                ? 'Added to Cart'
                                : 'Add to Cart'}
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
