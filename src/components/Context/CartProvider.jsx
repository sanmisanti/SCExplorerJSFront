import { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = product => {
		const productInCart = cart.findIndex(item => item.id === product.id);
		if (productInCart >= 0) {
			alert('ya esta!');
			return;
		}
		const newCart = [...cart, product];
		console.log(newCart);
		setCart(newCart);
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}
