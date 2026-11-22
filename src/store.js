import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './components/CartSlice';

export default configureStore({
    reducer: {
        cart: CartReducer
    }
});