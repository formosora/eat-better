import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPrice, getProductById } from '../api';
import { addToCart } from '../cart';
import type { Product } from '../types';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!id) return;
        getProductById(Number(id))
            .then(found => (found ? setProduct(found) : setError('Product not found')))
            .catch(err => setError(err instanceof Error ? err.message : 'Failed to load product'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAdd = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => navigate('/cart'), 600);
    };

    if (loading) return <div className="status">Loading product…</div>;

    if (error || !product) {
        return (
            <div className="container page">
                <div className="alert alert-error">{error ?? 'Product not found'}</div>
                <Link to="/" className="back-link">← Back to products</Link>
            </div>
        );
    }

    return (
        <div className="container page">
            <p>
                <Link to="/" className="back-link">← Back to products</Link>
            </p>
            <div className="detail-card">
                {product.pictures && <img src={product.pictures.url} alt={product.name} />}
                <h1>{product.name}</h1>
                <p className="price detail-price">{formatPrice(product.salePrice)}</p>
                <div className="detail-actions">
                    <label className="qty">
                        Quantity
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                    </label>
                    <button className="btn btn-primary btn-lg" onClick={handleAdd} disabled={added}>
                        {added ? '✓ Added to cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
