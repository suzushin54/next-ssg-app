// pages/cart.tsx
import React, { useState, useEffect } from 'react';
import styles from './TableStyles.module.css';
import Layout from '../components/Layout';

interface CartItem {
    id: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
