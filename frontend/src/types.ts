export interface ProductPicture {
    url: string;
}

export interface Product {
    id: number;
    name: string;
    salePrice: string;
    pictures: ProductPicture | null;
    __record_id?: number;
}

export interface CartItem {
    productId: number;
    name: string;
    /** unit price as decimal string */
    price: string;
    quantity: number;
    /** price * quantity as decimal string */
    totalPrice: string;
}

export interface OrderItem {
    id: number;
    count: number;
    /** FormCMS relation field: may arrive expanded ({name}) or as raw id */
    name?: { name?: string; id?: number } | string | null;
}
