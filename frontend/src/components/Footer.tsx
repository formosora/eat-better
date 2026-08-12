const Footer = () => (
    <footer className="site-footer">
        <div className="container site-footer-inner">
            <p className="footer-brand">🥗 Eat Better</p>
            <p className="footer-tagline">
                Fresh, healthy meals — built with React, ASP.NET Core &amp; FormCMS.
            </p>
            <p className="footer-copy">© {new Date().getFullYear()} Eat Better. Demo project.</p>
        </div>
    </footer>
);

export default Footer;
