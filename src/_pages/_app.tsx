import '@/app/globals.css'
import type {AppProps} from 'next/app'
import {CartProvider} from '@/contexts/CartContext';
import {ProductProvider} from '@/contexts/ProductContext';

export default function App({Component, pageProps}: AppProps) {
    return (
        <CartProvider>
            <ProductProvider products={pageProps.products}>
                <Component {...pageProps} />
            </ProductProvider>
        </CartProvider>
    );
}
