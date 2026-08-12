import type { CartItem, Product } from './types';

const CART_KEY = 'shopping_cart';

export function loadCart(): CartItem[] {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
}

export function saveCart(items: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function clearCart(): void {
    localStorage.removeItem(CART_KEY);
}

export const lineTotal = (price: string, quantity: number): string =>
    (parseFloat(price) * quantity).toFixed(2);

export const cartTotal = (items: CartItem[]): string =>
    items.reduce((sum, i) => sum + parseFloat(i.totalPrice), 0).toFixed(2);

/** Adds `quantity` of `product`, merging with an existing line for the same product. */
export function addToCart(product: Product, quantity: number): CartItem[] {
    const cart = loadCart();
    const existing = cart.find(i => i.productId === product.id);
    if (existing) {
        existing.quantity += quantity;
        existing.totalPrice = lineTotal(existing.price, existing.quantity);
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.salePrice,
            quantity,
            totalPrice: lineTotal(product.salePrice, quantity),
        });
    }
    saveCart(cart);
    return cart;
}
