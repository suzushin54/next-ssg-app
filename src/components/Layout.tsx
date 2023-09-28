import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

const Layouts: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <div className={styles.mainContainer}>
                <main className={styles.mainContent}>
                    {children}
                </main>
                <Sidebar />
            </div>
        </div>
    );
};

export default Layouts;