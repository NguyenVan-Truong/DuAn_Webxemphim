import moment from "moment";
import dayjs from "dayjs";
export const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Chuyển đổi chuỗi thời gian thành đối tượng Date

    // Lấy các thành phần của ngày và giờ
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Trả về định dạng mong muốn
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export function formatDateNotTimeZone(
    date: Date | string | null | undefined,
): string {
    if (date === null || date === undefined) {
        return "";
    }
    return moment(date).format("DD-MM-YYYY");
}
