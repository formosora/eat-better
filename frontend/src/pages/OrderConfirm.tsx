import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderItems } from '../api';
import type { OrderItem } from '../types';

const productLabel = (item: OrderItem): string => {
    if (item.name && typeof item.name === 'object') {
        return item.name.name ?? `#${item.name.id ?? '?'}`;
    }
    if (typeof item.name === 'string') return item.name;
    return 'N/A';
};

const OrderConfirm = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [items, setItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) return;
        getOrderItems(orderId)
            .then(setItems)
            .catch(err => setError(err instanceof Error ? err.message : 'Failed to load order'))
            .finally(() => setLoading(false));
    }, [orderId]);

    return (
        <div className="container page">
            <div className="confirm-card">
                <div className="confirm-icon">✓</div>
                <h1>Order Confirmed!</h1>
                <p className="confirm-sub">
                    Thanks for your order{orderId && <> — Order ID <strong>#{orderId}</strong></>}.
                    We will contact you shortly.
                </p>

                {loading && <div className="status">Loading order details…</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {!loading && !error && items.length > 0 && (
                    <table className="cart-table confirm-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Product</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td>{productLabel(item)}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Link to="/" className="btn btn-primary btn-lg confirm-cta">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirm;
