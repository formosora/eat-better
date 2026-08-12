import type { OrderItem, Product } from './types';

/** Thin fetch wrapper: relative URLs only — Vite proxies /api and /files in dev,
 *  and the backend serves everything same-origin in production. */
async function request<T>(input: string, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

export const getProducts = () => request<Product[]>('/api/queries/products');

/** The CMS exposes products as a list query; pick the one we need client-side. */
export const getProductById = async (id: number): Promise<Product | null> =>
    (await getProducts()).find(p => p.id === id) ?? null;

export function loginAsGuest() {
    return request<unknown>('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ usernameOrEmail: '__guest_', password: 'guest1!' }),
    });
}

export interface NewOrderItem {
    product: { id: number };
    count: number;
}

export function createOrder(name: string, phone: string, items: NewOrderItem[]) {
    return request<{ id: number }>('/api/entities/order/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, phone, items }),
    });
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
    const data = await request<{ items: OrderItem[] }>(
        `/api/entities/collection/order/${orderId}/items?offset=0&limit=100&sort[id]=-1`
    );
    return data.items;
}

/** "180" / "360.00" -> "NT$ 180" / "NT$ 360"; keeps decimals only when real. */
export const formatPrice = (price: string | number): string => {
    const n = typeof price === 'number' ? price : Number(price);
    return Number.isFinite(n) && Number.isInteger(n) ? `NT$ ${n}` : `NT$ ${price}`;
};
