import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, getProducts } from '../api';
import type { Product } from '../types';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(err => setError(err instanceof Error ? err.message : 'Failed to load products'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container page">
            <section className="hero">
                <h1>Eat fresh, eat better.</h1>
                <p>Hand-picked healthy meals made from fresh ingredients. Order online in seconds.</p>
            </section>

            {loading && <div className="status">Loading products…</div>}
            {error && <div className="alert alert-error">Failed to load products: {error}</div>}

            {!loading && !error && (
                <div className="product-grid">
                    {products.map(product => (
                        <article key={product.id} className="product-card">
                            {product.pictures && (
                                <img src={product.pictures.url} alt={product.name} loading="lazy" />
                            )}
                            <div className="product-card-body">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="price">{formatPrice(product.salePrice)}</p>
                                <Link to={`/${product.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
