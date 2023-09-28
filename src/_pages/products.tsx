import type {GetStaticProps, NextPage} from 'next';
import Layout from '../components/Layout';
import styles from './TableStyles.module.css';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface CartItem {
    id: number;
    quantity: number;
}

interface ProductsProps {
    products: Product[];
}

const Products: NextPage<ProductsProps> = ({products}) => {
    const { addToCart } = useCart();

    const handleAddToCart = (productId: number) => {
        addToCart(productId);
    };

    return (
        <Layout>
            <div className={styles.pageContainer}>
                <h1>Products</h1>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.size}</td>
                            <td>{product.description}</td>
                            <td>
                                <button onClick={() => handleAddToCart(product.id)}>Add</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
    const res = await fetch('http://json-server:4000/products');
    const products: Product[] = await res.json();

    return {
        props: {
            products,
        },
        revalidate: 10,
    };
};

export default Products;
