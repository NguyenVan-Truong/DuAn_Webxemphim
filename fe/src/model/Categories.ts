export interface Category {
    id: number;
    name: string;
    slug: string;
    meta_description: string | null; // Có thể null
    meta_keywords: string | null;    // Có thể null
    description: string | null;      // Có thể null
    _lft: number;                    // Left value
    _rgt: number;                    // Right value
    parent_id: number | null;        // Parent ID (có thể null nếu không có cha)
    deleted_at: string | null;       // Có thể null nếu không bị xóa
    created_at: string;              // Thời gian tạo
    updated_at: string;              // Thời gian cập nhật
    user_id: number;                 // ID người dùng
    level: number;                   // Cấp độ
}

export interface FormValue {
    category_id?: number; // ID danh mục
    dimension?: string;   // Kích thước (ví dụ: "200x160")
    material?: string;    // Chất liệu (ví dụ: "gỗ sồi")
    min_price?: number;   // Giá thấp nhất
    max_price?: number;   // Giá cao nhất
  }