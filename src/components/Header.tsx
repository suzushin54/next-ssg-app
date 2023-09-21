import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useCart } from '@/contexts/CartContext';

interface User {
    id: number;
    name: string;
    prefecture: string;
    memberRank: 'Bronze' | 'Silver' | 'Gold';
}

const Header: React.FC = () => {
    const { getCartQuantity, isClient } = useCart();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // NOTE: ローカルストレージにユーザー情報があれば、それを取得する
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            return;
        }

        const randomId = Math.floor(Math.random() * 5) + 1;
        fetch(`http://localhost:4000/users/${randomId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);

                localStorage.setItem('user', JSON.stringify(data));
            })
            .catch(err => console.error("Failed to fetch user:", err));
    }, []);

    return (
        <header className={styles.headerContainer}>
            <h1>Next.js SSG Example</h1>
            <div>
                {user ? <span>こんにちは、{user.name} さん</span> : <span>Loading...</span>}
                <a href="/cart" style={{ marginLeft: '1rem' }}>Cart {isClient && `(${getCartQuantity()})`}</a>
            </div>
        </header>
    );
};

export default Header;
