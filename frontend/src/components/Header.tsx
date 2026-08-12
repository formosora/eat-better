import { Link } from 'react-router-dom';

const Header = () => (
    <header className="site-header">
        <div className="container">
            <Link to="/" className="brand">
                🥗 Fresh<span>Bite</span>
            </Link>
            <nav className="site-nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/cart" className="nav-link">🛒 Cart</Link>
            </nav>
        </div>
    </header>
);

export default Header;
