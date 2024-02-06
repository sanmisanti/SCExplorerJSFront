import { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = product => {
		const productInCartIndex = cart.findIndex(item => item.id === product.id);
		if (productInCartIndex >= 0) {
			// delete array element by index
			const newCart = [...cart];
			newCart.splice(productInCartIndex, 1);
			setCart(newCart);
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
