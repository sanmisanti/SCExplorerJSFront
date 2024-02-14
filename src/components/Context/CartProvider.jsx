import { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [lastPage, setLastPage] = useState('genericos');

	const addToCart = ({ item }) => {
		let newCart = [...cart, item];
		setCart(newCart);
	};
	const setNewCantidad = ({ item, cantidadTotal }) => {
		console.log('setNewCantidad', item, cantidadTotal);
		let newCart = cart.filter(i => i.id != item.id);
		newCart = [...newCart, ...Array(parseInt(cantidadTotal) || 0).fill(item)];
		setCart(newCart);
	};
	const removeFromCart = ({ item, i }) => {
		const newCart = [...cart];
		if (i != undefined) {
			newCart.splice(i, 1);
		} else {
			const productInCartIndex = cart.findIndex(prod => prod.id === item.id);
			newCart.splice(productInCartIndex, 1);
		}
		// delete array element by index
		setCart(newCart);
	};

	const clearCart = () => {
		setCart([]);
	};

	const handleSetCarrito = cart => {
		setCart(cart);
	};

	const handlePageChange = page => {
		setLastPage(page);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				clearCart,
				handlePageChange,
				lastPage,
				removeFromCart,
				setNewCantidad,
				handleSetCarrito,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
