import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartTotal, clearCart, loadCart } from '../cart';
import { createOrder, formatPrice, loginAsGuest } from '../api';
import type { CartItem } from '../types';

const Cart = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setItems(loadCart());
    }, []);

    const handleClear = () => {
        clearCart();
        setItems([]);
    };

    const submitOrder = async () => {
        if (!name.trim() || !phone.trim()) {
            setError('Please enter your name and phone number.');
            return;
        }
        setError(null);
        setSubmitting(true);
        try {
            await loginAsGuest();
            const order = await createOrder(
                name.trim(),
                phone.trim(),
                items.map(i => ({ product: { id: i.productId }, count: i.quantity }))
            );
            handleClear();
            navigate(`/orderConfirm/${order.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit order');
            setSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container page">
                <div className="empty-state">
                    <h1>Your cart is empty</h1>
                    <p>Browse the menu and add something delicious.</p>
                    <Link to="/" className="btn btn-primary">Back to Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container page">
            <div className="page-header">
                <h1>My Cart</h1>
                <button className="btn btn-danger" onClick={handleClear}>Clear Cart</button>
            </div>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.productId}>
                            <td>{item.name}</td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>{formatPrice(item.totalPrice)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="cart-total">Total: {formatPrice(cartTotal(items))}</p>

            <section className="checkout">
                <h2>Checkout</h2>
                {error && <div className="alert alert-error">{error}</div>}
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>
                <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="09xx-xxx-xxx"
                    />
                </div>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={submitOrder}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting…' : 'Submit Order'}
                </button>
            </section>
        </div>
    );
};

export default Cart;
