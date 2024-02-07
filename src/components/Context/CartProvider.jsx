import { useState, createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	/* const [cart, setCart] = useState([
		{
			id: 22392,
			codClase: 763,
			descripcion: 'ARCILLAS EXPANDIDAS; PRESENTACION: ENVASE X 500 g',
			observacion: null,
			esActivo: 1,
			itemCod: 6,
			lastModified: '28-abr-2017 14:04:13',
			Clases: {
				id: 484,
				categoriaCod: 16,
				descripcion: 'ARCILLAS EXPANDIDAS',
				esActivo: 1,
				observacion: null,
				claseCod: 763,
				idOG: 33,
				umeCod: 151,
			},
		},
		{
			id: 23353,
			codClase: 785,
			descripcion:
				'LANA DE VIDRIO; ANCHO: 1200 mm - ESPESOR: 25 mm - LARGO: 30000 mm - PRESENTACION: FIELTRO EN ROLLO - USO: FONO ABSORBENTE Y TERMICO - REVESTIMIENTO: VELO DE VIDRIO NEGRO',
			observacion: null,
			esActivo: 1,
			itemCod: 1,
			lastModified: '11-dic-1996',
			Clases: {
				id: 502,
				categoriaCod: 6,
				descripcion: 'LANA DE VIDRIO',
				esActivo: 1,
				observacion: null,
				claseCod: 785,
				idOG: 38,
				umeCod: 151,
			},
		},
		{
			id: 22387,
			codClase: 763,
			descripcion: 'ARCILLAS EXPANDIDAS; PRESENTACION: BOLSA X 20 kg',
			observacion: null,
			esActivo: 1,
			itemCod: 1,
			lastModified: '11-dic-1996',
			Clases: {
				id: 484,
				categoriaCod: 16,
				descripcion: 'ARCILLAS EXPANDIDAS',
				esActivo: 1,
				observacion: null,
				claseCod: 763,
				idOG: 33,
				umeCod: 151,
			},
		},
		{
			id: 22388,
			codClase: 763,
			descripcion: 'ARCILLAS EXPANDIDAS; PRESENTACION: GRANEL',
			observacion: null,
			esActivo: 1,
			itemCod: 2,
			lastModified: '13-sep-1999 11:58:42',
			Clases: {
				id: 484,
				categoriaCod: 16,
				descripcion: 'ARCILLAS EXPANDIDAS',
				esActivo: 1,
				observacion: null,
				claseCod: 763,
				idOG: 33,
				umeCod: 151,
			},
		},
		{
			id: 22389,
			codClase: 763,
			descripcion: 'ARCILLAS EXPANDIDAS; PRESENTACION: PAN X 300 g',
			observacion: null,
			esActivo: 1,
			itemCod: 3,
			lastModified: '28-ene-2004 11:38:53',
			Clases: {
				id: 484,
				categoriaCod: 16,
				descripcion: 'ARCILLAS EXPANDIDAS',
				esActivo: 1,
				observacion: null,
				claseCod: 763,
				idOG: 33,
				umeCod: 151,
			},
		},
		{
			id: 22390,
			codClase: 763,
			descripcion: 'ARCILLAS EXPANDIDAS; PRESENTACION: BOLSA X 40 kg',
			observacion: null,
			esActivo: 1,
			itemCod: 4,
			lastModified: '24-jun-2009 10:35:20',
			Clases: {
				id: 484,
				categoriaCod: 16,
				descripcion: 'ARCILLAS EXPANDIDAS',
				esActivo: 1,
				observacion: null,
				claseCod: 763,
				idOG: 33,
				umeCod: 151,
			},
		},
	]); */
	const [lastPage, setLastPage] = useState('genericos');

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

	const handlePageChange = page => {
		setLastPage(page);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, clearCart, handlePageChange, lastPage }}
		>
			{children}
		</CartContext.Provider>
	);
}
