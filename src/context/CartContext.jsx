import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'kicks_cart';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    /* Persist to localStorage on every change */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.id === product.id && item.size === product.size
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item.id === id && item.size === size))
        );
    };

    const updateQuantity = (id, size, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
