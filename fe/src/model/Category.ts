export interface Category {
    id: number;
    name: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    description: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
    parent_id: number;
    level: number;
}
