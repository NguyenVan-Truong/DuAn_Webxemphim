interface TypeProductDetail {
    id: number;
    catalogue_id: number | null;
    brand_id: number;
    name: string;
    slug: string;
    sku: string;
    price: string;
    stock: number;
    discount_price: string;
    detailed_description: string;
    image_url: string;
    variants: [];
    galleries: { image_url: string }[];
}
// tạm thời như thế , cần phải sửa lại
