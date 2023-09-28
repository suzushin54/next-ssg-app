import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <h2>サイドバー</h2>
        </aside>
    );
};

export default Sidebar;