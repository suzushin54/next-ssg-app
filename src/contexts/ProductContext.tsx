import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types';

interface ProductContextType {
    products: Product[];
}

// 新規Context作成. これによりContextを利用するコンポーネントはProviderで囲むことでContextを利用できるようになる
// default valueをProduct[]ではなくundefinedとすることで、Providerを利用せずにContextを利用するとエラーを出すことができる
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
    products: Product[]; // default value
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children, products }) => {
    return (
        //  ProductContext.Providerで囲むことで、子コンポーネントはProductContextを利用できるようになる
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
}

// このContextを利用するコンポーネントから呼び出せるカスタムフック
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        // Providerで囲まれていないコンポーネントから呼び出した場合はエラーを出す
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
}