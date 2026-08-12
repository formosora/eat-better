import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => (
    <div className="layout">
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
);

export default Layout;
