"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
    id: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (id: number) => void;
    getCartQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const getInitialCartItems = (): CartItem[] => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    }

    const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCartItems);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (id: number) => {
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            setCartItems(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems(prev => [...prev, { id, quantity: 1 }]);
        }
    };

    const getCartQuantity = () => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
