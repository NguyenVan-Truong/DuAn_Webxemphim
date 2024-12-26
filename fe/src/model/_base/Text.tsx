export const toTitleCase = (str: string): string => {
    // Kiểm tra chuỗi đầu vào
    if (!str) return ""; // Trả về chuỗi rỗng nếu không có đầu vào

    return str
        .toLowerCase() // Chuyển toàn bộ thành chữ thường
        .split(" ") // Tách chuỗi thành mảng từ
        .map((word) => {
            // Chuyển chữ cái đầu thành chữ hoa, nếu từ không rỗng
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word; // Giữ nguyên từ nếu rỗng
        })
        .join(" "); // Ghép lại thành chuỗi
};
