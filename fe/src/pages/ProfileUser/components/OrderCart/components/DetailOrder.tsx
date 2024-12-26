import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ActionIcon, Box, Button, Text, Tooltip } from "@mantine/core";
import { IconMessageCircleStar } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import ProductReviews from "./ProductReviews";
import { Image, message } from "antd";
import { useNavigate } from "react-router-dom";
import PrintDetail from "./PrintDetail";

type OrderDetailProps = {
    data: any;
};

const OrderDetail = ({ data }: OrderDetailProps) => {
    const navigate = useNavigate();
    const Reviews = async (item: number) => {
        modals.openConfirmModal({
            title: "Dánh giá đơn hàng",
            size: "500px",
            children: <ProductReviews data={item} />,
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };
    const componentPDF = useRef<HTMLDivElement>(null);
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
        modals.closeAll();
    };
    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: `Hóa Đơn`,
        // onAfterPrint: () => {
        //     message.success("In hóa đơn thành công!");
        // },
    });
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
    return (
        <>
            <div style={{ display: "none" }}>
                <div ref={componentPDF}>
                    <PrintDetail data={data} />
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="max-w-4xl border border-gray-300 rounded-lg shadow-md p-4">
                    <div>
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-2">
                                Thông tin người mua
                            </h2>
                            <p className="mr-2">
                                Mã đơn hàng : {data.order_code}
                            </p>
                        </div>

                        <table className="w-full table-fixed border-collapse">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tên người nhận
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.customer_name}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tên người mua
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.customer.customer_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Số điện thoại
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.phone_number}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Email
                                    </td>
                                    <td
                                        className="border border-gray-300 p-2"
                                        style={{ wordWrap: "break-word" }}
                                    >
                                        {data.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Địa chỉ giao hàng
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.shipping_address}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Phương thức thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2">
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
                                    <td className="border border-gray-300 p-2">
                                        {Number(
                                            data.shipping_fee,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Trạng thái đơn hàng
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <span
                                            style={{
                                                color: getColorStatus(
                                                    data.status,
                                                ),
                                            }}
                                        >
                                            {data.status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Giảm giá
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {Number(
                                            data.discount_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Trạng thái thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2">
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
                                        Ngày đặt
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.created_at}
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
                        <h2 className="text-lg font-bold mt-2 mb-2">
                            Thông tin sản phẩm
                        </h2>

                        <table className="w-full table-fixed border-collapse border border-gray-300">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="border border-gray-300  w-[140px] font-semibold">
                                        Tên sản phẩm
                                    </th>
                                    <th className="border border-gray-300  w-[100px] font-semibold">
                                        Hình ảnh
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
                                    <th className="border border-gray-300 w-[50px] font-semibold">
                                        Thao tác
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
                                                <div
                                                    onClick={() => {
                                                        if (
                                                            !item?.product_id ||
                                                            !item?.slug
                                                        ) {
                                                            message.error(
                                                                "Sản phẩm đã ngừng bán",
                                                            );
                                                        } else {
                                                            onhandleTurnPage(
                                                                item.product_id,
                                                                item.slug,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item.product_name}
                                                </div>
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.product_name}
                                                    className="inline-block max-w-full h-auto rounded"
                                                    style={{ maxWidth: "80px" }}
                                                />
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
                                            <td className="px-4 py-2 text-left">
                                                <Tooltip label="Đánh giá">
                                                    <ActionIcon
                                                        variant="light"
                                                        aria-label="Settings"
                                                        color="green"
                                                        disabled={
                                                            item.is_reviewed ===
                                                                "Đã có đánh giá" ||
                                                            data.status !==
                                                                "Hoàn thành"
                                                        }
                                                        onClick={() =>
                                                            Reviews(item)
                                                        }
                                                    >
                                                        <IconMessageCircleStar
                                                            size={20}
                                                        />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-right mt-2">
                        <Button
                            onClick={() => generatePDF()}
                            className="px-5 py-2  text-white rounde transition"
                        >
                            In hóa đơn
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;
