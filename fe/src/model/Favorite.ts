export interface Favorites {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string | null;
    updated_at: string | null;
    product: {
        id: number;
        name: string;
        price: string;
        quantity: number;
        image_url: string;
    };
}

