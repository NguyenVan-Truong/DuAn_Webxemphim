import instance from "@/configs/axios";
import { useState } from "react";

const PaymentPage = () => {
    const [orderId, setOrderId] = useState("123456");
    const [orderDesc, setOrderDesc] = useState("Thanh toán đơn hàng 123456");
    const [totalPrice, setTotalPrice] = useState(100000); // Số tiền thanh toán

    const handlePayment = async () => {
        try {
            const response = await instance.post("/vnpay/payment", {
                total_price: 10000,
                bank_code: "NCB",
            });
            // console.log("response", response);
            if (response && response.status === 200) {
                window.location.href = response.data.payment_url;
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi thanh toán!");
        }
    };

    return (
        <div>
            <h1>Thanh toán đơn hàng</h1>
            <p>Đơn hàng ID: {orderId}</p>
            <p>Miêu tả: {orderDesc}</p>
            <p>Số tiền: {totalPrice} VND</p>
            <button onClick={handlePayment}>Thanh toán</button>
        </div>
    );
};

export default PaymentPage;
