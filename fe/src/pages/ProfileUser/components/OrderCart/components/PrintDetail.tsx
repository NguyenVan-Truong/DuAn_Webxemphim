import { conDau } from "@/assets/img";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";

type OrderDetailProps = {
    data: any;
};

const PrintDetail = ({ data }: OrderDetailProps) => {
    function getColorStatus(text: any) {
        switch (text) {
            case "Chờ xử lý":
                return "#FFC107"; // Vàng nhạt (Chờ xử lý)
            case "Đang xử lý":
                return "#FF9800"; // Cam nhạt (Đang xử lý)
            case "Đang giao hàng":
                return "#03A9F4"; // Xanh da trời (Đang giao hàng)
            case "Đã giao hàng":
                return "#4CAF50"; // Xanh lá cây đậm (Đã giao hàng)
            case "Đã xác nhận":
                return "#8BC34A"; // Xanh lá nhạt (Đã xác nhận)
            case "Hoàn thành":
                return "#00BCD4"; // Xanh ngọc (Hoàn thành)
            case "Đã hủy":
                return "#F44336"; // Đỏ (Đã hủy)
            case "Đã hoàn tiền":
                return "#FF5722"; // Cam đậm (Đã hoàn tiền)
            default:
                return "#9E9E9E"; // Xám (Mặc định)
        }
    }
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return (
            <p>
                Hà Nội,
                <span className="ml-1">
                    ngày {day} tháng {month} năm {year}
                </span>
            </p>
        );
    };
    return (
        <>
            <div className="max-w-4xl mx-auto p-5">
                <div className="grid grid-cols-3 mb-2 items-center">
                    <div>
                        <div className="text-center">
                            <p className="font-semibold">
                                Cửa Hàng Nội Thất Morden Home
                            </p>
                        </div>
                        <div className="flex items-center">
                            <IconMapPin
                                size={15}
                                stroke={1.5}
                                className="mr-2"
                            />
                            <p>Phụng Châu, Chương Mỹ, Hà Nội</p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <IconPhone
                                    size={15}
                                    stroke={1.5}
                                    className="mr-2"
                                />
                                :<p className="mr-2">0987654321</p>
                            </div>
                            <div className="flex items-center">
                                <IconMail size={15} stroke={1.5} />:
                                <span>info@mordenhome.com</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center">HÓA ĐƠN</h1>
                    <div className="mx-auto">
                        <p>Mã đơn hàng: {data.order_code}</p>
                        <p>Ngày đặt: {data.created_at}</p>
                    </div>
                </div>

                <div className="max-w-4xl border border-gray-300 rounded-lg shadow-md p-4">
                    <div>
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-4">
                                Thông tin người mua
                            </h2>
                        </div>

                        <table className="w-full table-fixed border-collapse">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tên người nhận
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.customer_name}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Số điện thoại
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.phone_number}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Địa chỉ giao hàng
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.shipping_address}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Phương thức thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {
                                            data.payment_method
                                                .payment_method_name
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Phí vận chuyển
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {Number(
                                            data.shipping_fee,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Trạng thái thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        <span
                                            className={
                                                data.payment_status ===
                                                "Đã thanh toán"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {data.payment_status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Giảm giá
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {Number(
                                            data.discount_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tổng tiền
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {Number(
                                            data.total_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="border border-gray-300 p-2 text-right"
                                    >
                                        Thanh toán:{" "}
                                        {Number(
                                            data.final_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mt-4 mb-4">
                            Thông tin sản phẩm
                        </h2>

                        <table className="w-full table-fixed border-collapse border border-gray-300">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="border border-gray-300  w-[140px] font-semibold">
                                        Tên sản phẩm
                                    </th>
                                    <th className="border border-gray-300  w-[60px] font-semibold">
                                        Số lượng
                                    </th>
                                    <th className="border border-gray-300  w-[130px] font-semibold">
                                        Giá
                                    </th>
                                    <th className="border border-gray-300  w-[130px] font-semibold">
                                        Tổng cộng
                                    </th>
                                    <th className="border border-gray-300 w-[150px] font-semibold">
                                        Mô tả sản phẩm
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.order_items.map(
                                    (item: any, index: number) => (
                                        <tr
                                            key={item.id}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} transition duration-200 hover:bg-gray-100`}
                                        >
                                            <td className="border border-gray-300 p-4">
                                                <div>{item.product_name}</div>
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {Number(
                                                    item.price,
                                                ).toLocaleString("vi-VN")}{" "}
                                                VND
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {Number(
                                                    item.total,
                                                ).toLocaleString("vi-VN")}{" "}
                                                VND
                                            </td>
                                            <td className="border border-gray-300 p-4">
                                                {item.variant
                                                    ? (() => {
                                                          try {
                                                              const parsedVariant =
                                                                  JSON.parse(
                                                                      item.variant,
                                                                  );
                                                              return Object.values(
                                                                  parsedVariant,
                                                              ).join(", ");
                                                          } catch (e) {
                                                              console.error(
                                                                  "Invalid JSON:",
                                                                  e,
                                                              );
                                                              return "";
                                                          }
                                                      })()
                                                    : ""}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 mb-2 text-right mr-4">
                        {getCurrentDate()}
                    </div>
                    <div className="grid grid-cols-2 justify-between ">
                        <div className="text-center">
                            <h2 className="font-semibold">Người mua hàng</h2>
                            <p>(Ký , đóng dấu , ghi rõ họ tên)</p>
                        </div>
                        <div className="text-center justify-center">
                            <h2 className="font-semibold">Người bán hàng</h2>
                            <p>(Ký , đóng dấu , ghi rõ họ tên)</p>
                            <img
                                className="mx-auto"
                                src={conDau}
                                alt=""
                                width={120}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintDetail;
