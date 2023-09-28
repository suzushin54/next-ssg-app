import React from 'react';
import { useProducts } from '@/contexts/ProductContext';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    // useProductsカスタムフックを用いて、確実にproductsを取得する
    const { products } = useProducts();

    const [quantity, setQuantity] = React.useState<number>(1)

    const selectOptions = [1, 2, 3, 5, 8, 13];

    // const calcSubtotal = () => {
    //     if (!products) return 0;
    //     const productPrice = products[0].price;
    //     return productPrice * quantity;
    // }

    return (
        <div className={styles.sidebar}>
            <h2>Sidebar</h2>
            {products.map((product, index) => (
                <div key={index} className={styles.item}>
                    <p>Price: {product.price}</p>
                    <label>
                        Quantity:
                        <select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                            {selectOptions.map((qty) => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>
                    </label>
                    <p>Subtotal: {quantity * product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;