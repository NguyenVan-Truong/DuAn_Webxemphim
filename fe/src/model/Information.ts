export interface Information {
    id: number;
    name: string;
    phone: string;
    address: string;
    map: string;
    image: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}
export interface InformationResponse {
    data: Information[]; // Mảng chứa thông tin liên hệ
    message: string; // Thông điệp trả về
    status: string; // Trạng thái của phản hồi
}
