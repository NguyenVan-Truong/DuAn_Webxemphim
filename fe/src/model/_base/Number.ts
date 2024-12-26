export function formatCurrencyVN(price: string): string {
    const numberPrice = parseFloat(price);
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "narrowSymbol", // Hiển thị ký hiệu ngắn gọn hoặc không có ký hiệu
    }).format(numberPrice);
}
