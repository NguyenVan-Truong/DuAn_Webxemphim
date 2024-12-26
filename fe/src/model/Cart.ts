export interface Product {
    id: number;
    user_id: number | null;
    brand_id: number;
    name: string;
    slug: string;
    sku: string;
    detailed_description: string;
    image_url: string;
    price: string;
    discount_price: string;
    discount_percentage: string;
    stock: number;
    weight: number;
    ratings_avg: number;
    ratings_count: number;
    is_featured: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    meta_description: string | null;
    meta_keywords: string | null;
    status: number;
}

export interface ProductVariant {
    id: number;
    product_id: number;
    price: string;
    weight: string;
    dimension: string | null;
    stock: number;
    sku: string;
    image_url: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    discount_price: string;
    attribute_values: [];
}

export interface CartItem {
    id: number;
    user_id: number;
    product_variants_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    product_id: number;
    price: string;
    product: Product;
    product_variant: ProductVariant;
    image_url: string;
}
