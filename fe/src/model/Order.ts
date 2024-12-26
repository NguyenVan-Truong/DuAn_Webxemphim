export interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: string;
    total: string;
    variant: string;
}

export interface OrderDetailProps {
    data: {
        id: number;
        customer_name: string;
        customer: {
            id: number;
            customer_name: string;
        };
        promotion: {
            promotion_code: string | null;
            promotion_discount: string | null;
        };
        payment_method: {
            payment_method_name: string;
        };
        total_amount: string;
        discount_amount: string;
        final_amount: string;
        status: string;
        payment_status: string;
        shipping_address: string;
        shipping_fee: string;
        created_at: string;
        updated_at: string;
        order_items: OrderItem[];
    };
}

///#region Order
// Kiểu cho PaymentMethod
export interface PaymentMethod {
    payment_method_id: number;
    payment_method_name: string;
}

// Kiểu cho Promotion
export interface Promotion {
    promotion_code: string | null;
    promotion_discount: string | null;
}

// Kiểu cho Customer
export interface Customer {
    id: number;
    customer_name: string;
}

// Kiểu chính cho Order
export interface Order {
    id: number;
    order_code: string;
    customer_name: string;
    customer: Customer;
    discount_amount: string;
    final_amount: string;
    payment_method: PaymentMethod;
    payment_status: string;
    promotion: Promotion;
    shipping_address: string;
    shipping_fee: string;
    status: string;
    total_amount: string;
    created_at: string;
    updated_at: string;
}
