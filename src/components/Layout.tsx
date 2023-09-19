import React, { ReactNode } from 'react';
import Header from '../components/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layouts: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default Layouts;