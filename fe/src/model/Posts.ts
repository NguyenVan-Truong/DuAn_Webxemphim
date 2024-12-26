export interface Posts {
    id: number;
    title: string;
    content: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    folow: number;
    image: string;
    status: number;
    avatar: string | null;
    catelogues: PostCatelogues[];
}
export interface PostCatelogues {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    avatar: string | null;
    "meta-title": string | null;
    "meta-description": string | null;
    meta_keywords: string | null;
    user_id: number;
    _lft: number;
    _rgt: number;
    parent_id: number | null;
    level: number;
    status: number;
    created_at: string;
    updated_at: string;
    pivot: {
        post_id: number;
        post_catelogue_id: number;
    };
}
