import instance from "@/configs/axios";
import { CartItem } from "@/model/Cart";
import { formatCurrencyVN } from "@/model/_base/Number";
import {
    Badge,
    Button,
    Checkbox,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Select,
    SelectProps,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildingBank, IconCashBanknote } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import DescriptionShipping from "./DescriptionShipping";
import styles from "./checkoutPage.module.scss"; // Import CSS module
import { formatDateNotTimeZone } from "@/model/_base/Date";

type UserInfo = {
    id: number;
    username: string;
    full_name: string;
    email: string;
    phone: string;
    province_id: string;
    district_id: string;
    ward_id: string;
    address: string;
    birthday: string;
    avatar: string;
    description: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
    rule_id: number;
    google_id: string | null;
    last_login: string | null;
    deleted_at: string | null;
    status: number;
    avatar_url: string;
};
export interface Promotion {
    id: number;
    code: string;
    discount_value: string; // Giá trị giảm giá (sử dụng string vì dữ liệu đầu vào là string)
    discount_type: "fixed" | "percentage"; // Loại giảm giá: cố định hoặc theo phần trăm
    status: "active" | "inactive"; // Trạng thái mã giảm giá
    start_date: string; // Ngày bắt đầu (ISO format)
    end_date: string; // Ngày kết thúc (ISO format)
    max_uses: number; // Số lần sử dụng tối đa
    used_count: number; // Số lần đã sử dụng
    created_at: string; // Thời gian tạo (ISO format)
    updated_at: string; // Thời gian cập nhật (ISO format)
    deleted_at: string | null; // Thời gian xóa, có thể null
    gia_tri_giam_toi_da?: string; // Giá trị giảm tối đa
    gt_don_hang_toi_thieu?: string; // Giá trị đơn hàng tối thiểu
}
export interface SelectOption {
    value: string | number; // Hoặc có thể là number nếu cần
    label: string;
}

const CheckoutPage = () => {
    const userInforSubmit = JSON.parse(
        localStorage.getItem("userInforSubmit") || "{}",
    );
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userProFile = JSON.parse(localStorage.getItem("userProFile") || "{}");
    if (!location.state) {
        return <Navigate to="/san-pham" replace />;
    }
    //Sản phẩm order
    const [orderItems, setOrderItems] = useState<[]>([]);
    // thông tin tỉnh thành phố
    const [valueCity, setValueCity] = useState([]);
    const [checkedValueCity, setCheckedValueCity] = useState(
        Object.keys(userInforSubmit).length !== 0
            ? userInforSubmit.city
            : userProFile.province_id,
    );
    // thông tin quận huyện
    const [valueDistrict, setValueDistrict] = useState([]);
    const [checkedValueDistrict, setCheckedValueDistrict] = useState(
        Object.keys(userInforSubmit).length !== 0
            ? userInforSubmit.district
            : userProFile.district_id,
    );
    // thông tin phường xã
    const [valueWard, setValueWard] = useState([]);
    const [checkedValueWard, setCheckedValueWard] = useState(
        Object.keys(userInforSubmit).length !== 0
            ? userInforSubmit.ward
            : userProFile.ward_id,
    );
    // Phương thức thanh toán
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<Number>(3);
    // Thông tin người dùng
    const [inforUser, setInforfUser] = useState<UserInfo>();
    // Phí ship
    const [shippingFee, setShippingFee] = useState<number>(0);
    // Mã giảm giá
    const [dataPromotions, setDataPromotions] = useState([]);
    const [valuePromotions, setValuePromotions] = useState<string>();
    const [dataAllPromotions, setDataAllPromotions] = useState([]);
    const [checkedPromotions, setCheckedPromotions] = useState<Promotion>();
    // Tiền cuối cùng
    const [finalAmount, setFinalAmount] = useState<number>(0);
    // LAODING KHI SUBMIT
    const [loading, setLoading] = useState(false);
    // checkked
    const [checked, setChecked] = useState(false);
    // ID cart
    const [idCart, setIdCart] = useState<string>("");
    //disible order khi mà địa chỉ ship city không có trong list vận chuyển
    const [disableOrder, setDisableOrder] = useState(false);
    const enty = {
        email: "",
        name: "",
        sđt: "",
        city: null,
        district: null,
        ward: null,
        address: "",
        description: "",
    };
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            ...enty,
        },

        validate: {
            email: (value) =>
                !value
                    ? "Email là bắt buộc"
                    : /^\S+@\S+$/.test(value)
                      ? null
                      : "Email phải đúng định dạng",
            name: (value) => (!value ? "Tên là bắt buộc" : null),
            sđt: (value) => {
                if (!value) {
                    return "Số điện thoại là bắt buộc";
                } else if (!/^\d{10}$/.test(value)) {
                    return "Số điện thoại phải có đúng 10 chữ số";
                }
                return null;
            },
            city: (value) => (!value ? "Thành phố là bắt buộc" : null),
            district: (value) => (!value ? "Quận/Huyện là bắt buộc" : null),
            ward: (value) => (!value ? "Phường/Xã là bắt buộc" : null),
            address: (value) => (!value ? "Địa chỉ là bắt buộc" : null),
        },
    });
    // CHọn thành phố
    const onhandleSelectCity = async () => {
        try {
            const response = await instance.get("/getAllProvinces");
            if (response && response.status === 200) {
                // setValueCity(response.data.content);
                const transformedData = response.data.content.map(
                    (item: any) => ({
                        value: item.code,
                        label: item.name,
                    }),
                );
                setValueCity(transformedData);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };
    // Chọn quận huyện
    const onhandleSelectDistrict = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=district&data[province_id]=${checkedValueCity === null ? form.getValues().city : checkedValueCity}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );

                // Lấy tất cả các phần tử <option>
                const options = Array.from(doc.querySelectorAll("option"));
                // Chuyển đổi thành mảng các đối tượng với code và name
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueDistrict(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Chọn phường xã
    const onhandleSelectWart = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=ward&data[district_id]=${checkedValueDistrict === null ? form.getValues().district : checkedValueDistrict}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );

                // Lấy tất cả các phần tử <option>
                const options = Array.from(doc.querySelectorAll("option"));
                // Chuyển đổi thành mảng các đối tượng với code và name
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueWard(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    //#region callorder
    // Xử lý submit form
    const onhandleSubmit = async (values: any) => {
        localStorage.setItem("userInforSubmit", JSON.stringify(values));
        const nameCity = (valueCity.find(
            (item: any) => item.value === checkedValueCity,
        ) || { value: "", label: "" }) as SelectOption;
        const nameDistrict =
            valueDistrict.find(
                (item: any) => item.value === checkedValueDistrict,
            ) || ({ value: "", label: "" } as SelectOption);
        const nameWard =
            valueWard.find((item: any) => item.value === checkedValueWard) ||
            ({ value: "", label: "" } as SelectOption);

        const fullAddress = `${values.address}, ${nameWard.label}, ${nameDistrict.label}, ${nameCity.label}`;
        const PRICEDISCOUNT =
            checkedPromotions?.discount_type == "fixed"
                ? Number(checkedPromotions?.discount_value)
                : (Number(checkedPromotions?.discount_value) *
                        Number(location?.state.totalPrice)) /
                        100 >
                    Number(checkedPromotions?.gia_tri_giam_toi_da)
                  ? Number(checkedPromotions?.gia_tri_giam_toi_da)
                  : (Number(checkedPromotions?.discount_value) *
                        Number(location?.state.totalPrice)) /
                    100;
        const dataSubmit = {
            customer_id: userProFile?.id,
            customer_name: values?.name,
            promotion_id: checkedPromotions?.id, //hỏi hoàn
            total_amount: location?.state.totalPrice,
            // discount_amount: Number(checkedPromotions?.discount_value), //chưa ai làm
            discount_amount: Number(PRICEDISCOUNT), //chưa ai làm
            shipping_fee: shippingFee || 0,
            final_amount: finalAmount,
            status: 1,
            payment_method_id: selectedPaymentMethod, //phương thức thanh toán
            payment_status: 1, //thanh toán off trạng thái là 1
            shipping_address: fullAddress,
            discount_code: checkedPromotions?.code, //chưa ai làm
            email: values.email,
            phone_number: values.sđt,
            note: values.description,
            order_items: orderItems,
            cart_id: idCart, //Thêm trường này
        };
        if (dataSubmit) {
            if (!checked) {
                return message.error(
                    "Vui lòng đọc và đồng ý điều khoản của chúng tôi",
                );
            }
            if (selectedPaymentMethod === 3) {
                setLoading(true);
                try {
                    const response = await instance.post("/orders", dataSubmit);
                    // console.log("response", response);
                    if (response && response.status === 201) {
                        // await handleShippingFee();
                        navigate("/order-success", {
                            state: { status: "thanhcong" },
                        });
                        queryClient.invalidateQueries({ queryKey: ["cart"] });
                        localStorage.removeItem("dataCart");
                        localStorage.removeItem("userInforSubmit");
                    }
                } catch (error: any) {
                    // message.error("Lỗi không thể đặt hàng");
                    // console.log("error", error.response.data.error);
                    message.error(error.response.data.error);
                } finally {
                    setLoading(false);
                    localStorage.removeItem("dataCart");
                    localStorage.removeItem("userInforSubmit");
                }
            } else {
                const dataResponse = {
                    ...dataSubmit,
                    payment_status: 2,
                };
                // console.log("dataResponse", dataResponse);
                localStorage.setItem("dataCart", JSON.stringify(dataResponse));
                await handlePayment();
            }
        }
    };

    // Hàm lấy phí vận chuyển
    const getShippingFee = async () => {
        try {
            const response = await instance.get("/shipping-fees");
            if (response.status === 200) {
                return response.data;
            }
            // console.warn("Unexpected response:", response);
            return [];
        } catch (error) {
            console.error("Error fetching shipping fee", error);
            return [];
        }
    };
    //lấy mã giảm giá
    const onhandlePromotions = async () => {
        if (dataPromotions.length !== 0) return;
        try {
            const PriceTotal = location?.state.totalPrice;
            const response = await instance.get("/promotions");

            const now = new Date();
            if (response && response.status === 200) {
                setDataAllPromotions(response.data);

                //lấy những mã đã hết hạn hoặc đã sử dụng hết
                const expiredPr = response.data.filter((promo: any) => {
                    return (
                        promo.quantity >= promo.max_uses ||
                        new Date(promo.end_date) < now
                    );
                });

                // format dữ liệu theo select option
                const transformedData = response.data.map((item: any) => ({
                    value: String(item.id),
                    label: item.code,
                    disabled:
                        expiredPr.some((exp: any) => exp.id === item.id) ||
                        (item.gt_don_hang_toi_thieu &&
                            Number(PriceTotal) <
                                Number(item.gt_don_hang_toi_thieu)),
                    ...item,
                }));
                setDataPromotions(transformedData);
            }
        } catch (error) {
            console.log("error", error);
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };
    // Thanh toán online
    const handlePayment = async () => {
        try {
            const response = await instance.post("/vnpay/payment", {
                total_price: finalAmount,
                bank_code: "NCB",
                orderItems: orderItems,
            });
            if (response && response.status === 200) {
                window.location.href = response.data.payment_url;
            } else {
                localStorage.removeItem("dataCart");
            }
        } catch (error: any) {
            message.error(error.response.data.error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (checkedValueCity !== undefined && checkedValueCity !== null) {
                const data = await getShippingFee(); // Đợi dữ liệu từ API

                // Xử lý logic tìm kiếm phí vận chuyển
                const shippingFee = data.find((item: any) => {
                    return item.province_code === String(checkedValueCity);
                });

                if (shippingFee) {
                    setShippingFee(shippingFee.fee);
                    setDisableOrder(false);
                } else {
                    setShippingFee(0);
                    setDisableOrder(true);
                    message.warning(
                        "Rất tiếc,hiện tại chúng tôi chưa hỗ trợ giao hàng đến khu vực của bạn",
                    );
                }
            } else {
                setShippingFee(0);
                setDisableOrder(true);
            }
        };

        fetchData(); // Gọi hàm bất đồng bộ
    }, [checkedValueCity, checkedValueCity]);
    useEffect(() => {
        const orderItems = location?.state.listchecked.map((item: any) => {
            let price = 0;
            if (item.product_variant == null) {
                price = parseFloat(item.price);
                return {
                    product_variants_id: null,
                    product_id: item.product_id,
                    product_name: item.product.name,
                    quantity: item.quantity,
                    price: price,
                    total: item.quantity * price,
                    variant: null,
                };
            } else {
                if (item.product_variant.discount_price == "0.00") {
                    price = parseFloat(item.product_variant.price);
                } else {
                    price = parseFloat(item.product_variant.discount_price);
                }
                return {
                    product_variants_id: item.product_variant.id,
                    product_id: item.product_id,
                    product_name: item.product.name,
                    quantity: item.quantity,
                    price: price,
                    total: item.quantity * price,
                    variant: JSON.stringify(
                        item.product_variant
                            ? item.product_variant.attribute_values.reduce(
                                  (acc: any, attr: any) => {
                                      acc[attr.attributes.name] = attr.name;
                                      return acc;
                                  },
                                  {},
                              )
                            : {},
                    ),
                };
            }
        });
        setOrderItems(orderItems);
        // lấy id cart sản phẩm
        const IdCart = location?.state.listchecked
            .map((item: any) => item.id)
            .join(",");
        setIdCart(IdCart);

        Promise.all([onhandleSelectCity()]);
    }, []);
    useEffect(() => {
        try {
            if (userInforSubmit && Object.keys(userInforSubmit).length > 0) {
                form.setValues({
                    email: userInforSubmit.email || "",
                    name: userInforSubmit.name || "",
                    sđt: userInforSubmit.sđt || "",
                    city: userInforSubmit.city || "",
                    district: userInforSubmit.district || "",
                    ward: userInforSubmit.ward || "",
                    address: userInforSubmit.address || "",
                    description: userInforSubmit.description || "",
                });
                return;
                // Dừng useEffect nếu đã set xong giá trị
            }
            if (userProFile) {
                form.setValues({
                    email: userProFile.email || "",
                    name: userProFile.full_name || "",
                    sđt: userProFile.phone || "",
                    city: userProFile.province_id,
                    district: userProFile.district_id,
                    ward: userProFile.ward_id,
                    address: userProFile.address || "",
                    description: "",
                });
                return;
            }
        } catch (error) {
            console.error("Error parsing userInforSubmit:", error);
        }
    }, []);

    useEffect(() => {
        // form.setFieldValue("district", null);
        // form.setFieldValue("ward", null);
        // onhandleSelectWart();
        onhandleSelectDistrict();
    }, [checkedValueCity]);
    useEffect(() => {
        onhandleSelectWart();
    }, [checkedValueDistrict]);
    // MÃ GIẢM GIÁ
    useEffect(() => {
        if (valuePromotions !== undefined) {
            const data = dataAllPromotions.find((item: any) => {
                return item.id === Number(valuePromotions);
            });
            setCheckedPromotions(data);
        } else {
            setCheckedPromotions(undefined);
        }
    }, [valuePromotions]);
    // SÔs tiền cuối cùng
    useEffect(() => {
        // const discountValue = (checkedPromotions as any)?.discount_value || 0;
        const discountValue =
            checkedPromotions?.discount_type === "fixed"
                ? Number(checkedPromotions?.discount_value)
                : (Number(checkedPromotions?.discount_value) *
                        Number(location?.state.totalPrice)) /
                        100 >
                    Number(checkedPromotions?.gia_tri_giam_toi_da)
                  ? Number(checkedPromotions?.gia_tri_giam_toi_da)
                  : (Number(checkedPromotions?.discount_value) *
                        Number(location?.state.totalPrice)) /
                    100;
        console.log("discountValue", discountValue);
        const calculatedFinalAmount =
            Number(location?.state.totalPrice) +
            Number(shippingFee) -
            (isNaN(discountValue) ? 0 : discountValue);
        console.log("calculatedFinalAmount", calculatedFinalAmount);
        if (calculatedFinalAmount < 0) {
            setFinalAmount(0);
        } else {
            setFinalAmount(calculatedFinalAmount);
        }
    }, [location?.state.totalPrice, shippingFee, checkedPromotions]);
    // console.log("form", form.getValues());
    const renderSelectOption = ({ option }: { option: any }) => {
        const formattedStartDate = formatDateNotTimeZone(option.start_date);
        const formattedEndDate = formatDateNotTimeZone(option.end_date);
        // console.log("option", option);
        return (
            <Badge
                style={{
                    height: "100px",
                    width: "100% !important",
                }}
                variant="default"
                color="blue"
                radius="sm"
            >
                <div
                    style={{
                        width: "100% !important",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "40px",
                    }}
                >
                    <div style={{ marginBottom: "5px", width: "30%" }}>
                        <Badge
                            color="green"
                            radius="sm"
                            style={{ width: "100px", height: "70px" }}
                        >
                            {option.label}
                        </Badge>
                    </div>
                    <div style={{ width: "70%" }}>
                        {option.discount_type === "fixed" ? (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "flex-start",
                                        width: "100%",
                                    }}
                                >
                                    <Text>
                                        {formatCurrencyVN(
                                            String(option.discount_value),
                                        )}{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        Đơn tối thiểu{" "}
                                        {formatCurrencyVN(
                                            String(
                                                option.gt_don_hang_toi_thieu ??
                                                    0,
                                            ),
                                        )}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        HSD: {formattedEndDate}
                                    </Text>
                                </div>{" "}
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "flex-start",
                                        width: "100%",
                                    }}
                                >
                                    <Text>
                                        {Math.floor(option.discount_value)}%
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        {" "}
                                        giảm tối đa:{" "}
                                        {formatCurrencyVN(
                                            String(
                                                option.gia_tri_giam_toi_da ?? 0,
                                            ),
                                        )}{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        Đơn tối thiểu{" "}
                                        {formatCurrencyVN(
                                            String(
                                                option.gt_don_hang_toi_thieu ??
                                                    0,
                                            ),
                                        )}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        HSD: {formattedEndDate}
                                    </Text>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Badge>
        );
    };
    console.log("finalAmount", finalAmount);
    return (
        <div className="padding my-[40px]">
            <div className="container">
                <div className={styles.checkoutForm}>
                    <div className={styles.container}>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                onhandleSubmit(values),
                            )}
                        >
                            <Flex
                                direction="row"
                                className={styles.checkoutMain}
                            >
                                <div className={styles.leftCheckout}>
                                    <div>
                                        <h2
                                            className={`${styles.sectionTitle} font-medium pt-[10px] text-[20px] mb-[10px]`}
                                        >
                                            ĐỊA CHỈ GIAO HÀNG
                                        </h2>
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <TextInput
                                            withAsterisk
                                            label="Họ và tên"
                                            placeholder="Nhập họ và tên"
                                            {...form.getInputProps("name")}
                                            className="w-[50%]"
                                        />
                                        <TextInput
                                            withAsterisk
                                            label="Email"
                                            placeholder="Nhập email"
                                            {...form.getInputProps("email")}
                                            className="w-[50%]"
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <TextInput
                                            withAsterisk
                                            label="Số điện thoại"
                                            placeholder="Nhập họ và tên"
                                            {...form.getInputProps("sđt")}
                                            className="w-[50%]"
                                            type="number"
                                        />
                                        <Select
                                            withAsterisk
                                            label="Tỉnh/Thành phố"
                                            data={valueCity}
                                            placeholder="Nhập tỉnh/thành phố"
                                            className="w-[50%]"
                                            searchable
                                            value={
                                                form.getValues().city ?? null
                                            }
                                            {...form.getInputProps("city")}
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "city",
                                                    value,
                                                );
                                                setCheckedValueCity(value);
                                                form.setFieldValue(
                                                    "district",
                                                    null,
                                                );
                                                form.setFieldValue(
                                                    "ward",
                                                    null,
                                                );
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <Select
                                            withAsterisk
                                            label="Quận / Huyện"
                                            placeholder="Nhập quận/huyện"
                                            data={valueDistrict}
                                            className="w-[50%]"
                                            searchable
                                            value={
                                                form.getValues().district ??
                                                null
                                            }
                                            {...form.getInputProps("district")}
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "district",
                                                    value,
                                                );
                                                setCheckedValueDistrict(value);
                                            }}
                                        />
                                        <Select
                                            withAsterisk
                                            label="Phường/Xã"
                                            placeholder="Nhập phường/xã"
                                            data={valueWard}
                                            searchable
                                            value={
                                                form.getValues().ward ?? null
                                            }
                                            {...form.getInputProps("ward")}
                                            className="w-[50%]"
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "ward",
                                                    value,
                                                );
                                                setCheckedValueWard(value);
                                            }}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <TextInput
                                            withAsterisk
                                            label="Địa chỉ cụ thể"
                                            placeholder="Nhập địa chỉ"
                                            {...form.getInputProps("address")}
                                        />
                                    </div>
                                    <div>
                                        <h2
                                            className={`${styles.sectionTitle} font-medium pt-[10px] text-[20px] mb-[10px]`}
                                        >
                                            THÔNG TIN THÊM
                                        </h2>

                                        <div
                                            className={`mt-[10px] ${styles.textDescription}`}
                                        >
                                            <Textarea
                                                label="Lưu ý cho đơn hàng (Tùy chọn)"
                                                placeholder="Viết lưu ý cho đơn hàng của bạn"
                                                {...form.getInputProps(
                                                    "description",
                                                )}
                                                styles={{
                                                    input: {
                                                        height: "100px", // Custom height for the textarea
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className={styles.sectionTitle}>
                                            PHƯƠNG THỨC THANH TOÁN
                                        </h2>
                                        <Flex
                                            className={styles.paymentMethod}
                                            gap={"md"}
                                        >
                                            <div
                                                className="px-[20px] py-[20px] flex flex-col border border-spacing-1 w-[200px]"
                                                style={{
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    border:
                                                        selectedPaymentMethod ===
                                                        3
                                                            ? "1px solid #000"
                                                            : "1px solid #e5e5e5",
                                                }}
                                                onClick={() =>
                                                    setSelectedPaymentMethod(3)
                                                }
                                            >
                                                <IconCashBanknote
                                                    stroke={1.25}
                                                    size={50}
                                                />
                                                <span className="text-[12px] text-[#656565]">
                                                    Thanh toán khi nhận hàng
                                                </span>
                                            </div>
                                            <div
                                                className="px-[20px] py-[20px] flex flex-col border border-spacing-1 mr-[10px] w-[200px] "
                                                style={{
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    border:
                                                        selectedPaymentMethod ===
                                                        2
                                                            ? "1px solid #000"
                                                            : "1px solid #e5e5e5",
                                                }}
                                                onClick={() =>
                                                    setSelectedPaymentMethod(2)
                                                }
                                            >
                                                <IconBuildingBank
                                                    stroke={1.25}
                                                    size={50}
                                                />

                                                <span className="text-[12px] text-[#656565]">
                                                    Thanh toán online
                                                </span>
                                            </div>
                                        </Flex>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.rightCheckout} px-[30px] py-[30px] text-[14px] border-[1px] `}
                                >
                                    <div className=" border-b-[1px] pb-[5px]">
                                        <div>
                                            <h2
                                                className={`${styles.sectionTitle} text-[24px] text-[#000] font-medium `}
                                            >
                                                Tóm tắt đơn hàng
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mt-[5px]">
                                        <div>
                                            <h2 className="text-[16px] text-[#000] font-medium">
                                                Sản phẩm
                                            </h2>
                                        </div>
                                        <div>
                                            {location?.state.listchecked.map(
                                                (item: CartItem) => {
                                                    return (
                                                        <div
                                                            className={`${styles.productDetails} flex flex-row justify-between gap-3 items-center my-[9px]`}
                                                            key={item.id}
                                                        >
                                                            <div
                                                                className={`${styles.imgwp} `}
                                                            >
                                                                <img
                                                                    src={
                                                                        item
                                                                            .product
                                                                            .image_url
                                                                    }
                                                                    alt="Product"
                                                                    className="max-w-[70px] max-h-[70px]"
                                                                />
                                                            </div>
                                                            <Flex
                                                                direction={
                                                                    "column"
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        color: "#333",
                                                                        fontSize:
                                                                            "14px",
                                                                        fontWeight:
                                                                            "400",

                                                                        marginTop:
                                                                            "-5px",
                                                                    }}
                                                                >
                                                                    {/* {item?.product_variant?.attribute_values
                                                                        .map(
                                                                            (
                                                                                item: any,
                                                                            ) =>
                                                                                item.name,
                                                                        )
                                                                        .join(
                                                                            ", ",
                                                                        )} */}
                                                                </p>
                                                            </Flex>
                                                            <strong>
                                                                {item.quantity}x
                                                            </strong>

                                                            <p
                                                                className={
                                                                    styles.productPrice
                                                                }
                                                            >
                                                                {item.product_variant !==
                                                                null ? (
                                                                    <>
                                                                        {item
                                                                            .product_variant
                                                                            .discount_price !==
                                                                        "0.00"
                                                                            ? formatCurrencyVN(
                                                                                  item
                                                                                      .product_variant
                                                                                      .discount_price,
                                                                              )
                                                                            : formatCurrencyVN(
                                                                                  item
                                                                                      .product_variant
                                                                                      .price,
                                                                              )}
                                                                    </>
                                                                ) : (
                                                                    formatCurrencyVN(
                                                                        item.price,
                                                                    )
                                                                )}
                                                            </p>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <p>Tạm tính</p>
                                        <p>
                                            {formatCurrencyVN(
                                                location?.state.totalPrice,
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <p>Vận chuyển</p>
                                        <p>
                                            {formatCurrencyVN(
                                                String(shippingFee),
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className="flex flex-row justify-between  mt-[5px]"
                                        style={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <p>Chọn Voucher</p>
                                        <Select
                                            w={330}
                                            height={700}
                                            style={{
                                                zIndex: 9999,
                                            }}
                                            placeholder="Chọn mã giảm giá"
                                            data={dataPromotions}
                                            // data={dataAllPromotions?.map(
                                            //     (item: any) => ({
                                            //         value: String(item.id),
                                            //         label: item.code,
                                            //         ...item,
                                            //     }),
                                            // )}
                                            onClick={() => {
                                                onhandlePromotions();
                                            }}
                                            onChange={(value, option) => {
                                                console.log("value", value);
                                                console.log("option", option);
                                                if (value) {
                                                    setValuePromotions(value);
                                                } else {
                                                    setValuePromotions(
                                                        undefined,
                                                    );
                                                }
                                            }}
                                            renderOption={renderSelectOption}
                                        />
                                    </div>
                                    <div
                                        className="flex flex-row justify-between  mt-[5px]"
                                        style={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <p>Tiết kiệm</p>

                                        <div
                                            style={{
                                                width: "100px",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <p>
                                                {checkedPromotions !==
                                                undefined ? (
                                                    <>
                                                        {/* {formatCurrencyVN(
                                                            String(
                                                                (
                                                                    checkedPromotions as any
                                                                )
                                                                    .discount_value,
                                                            ),
                                                        )} */}
                                                        {checkedPromotions?.discount_type ==
                                                        "fixed"
                                                            ? formatCurrencyVN(
                                                                  String(
                                                                      checkedPromotions?.discount_value,
                                                                  ),
                                                              )
                                                            : (Number(
                                                                    checkedPromotions?.discount_value,
                                                                ) *
                                                                    Number(
                                                                        location
                                                                            ?.state
                                                                            .totalPrice,
                                                                    )) /
                                                                    100 >
                                                                Number(
                                                                    checkedPromotions?.gia_tri_giam_toi_da,
                                                                )
                                                              ? formatCurrencyVN(
                                                                    String(
                                                                        checkedPromotions?.gia_tri_giam_toi_da,
                                                                    ),
                                                                )
                                                              : formatCurrencyVN(
                                                                    String(
                                                                        (Number(
                                                                            checkedPromotions?.discount_value,
                                                                        ) *
                                                                            Number(
                                                                                location
                                                                                    ?.state
                                                                                    .totalPrice,
                                                                            )) /
                                                                            100,
                                                                    ),
                                                                )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {formatCurrencyVN(
                                                            String(0),
                                                        )}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <h2
                                            className={`${styles.sectionTitle} text-[#000000] font-semibold`}
                                        >
                                            TỔNG CỘNG
                                        </h2>
                                        <p
                                            style={{
                                                color: "red",
                                            }}
                                        >
                                            {/* {formatCurrencyVN(
                                                isNaN(finalAmount)
                                                    ? "0"
                                                    : String(finalAmount),
                                            )} */}
                                            {formatCurrencyVN(
                                                String(finalAmount),
                                            )}
                                        </p>
                                    </div>

                                    <div className="my-[7px] py-3">
                                        <ScrollArea h={200} type="always">
                                            <DescriptionShipping />
                                        </ScrollArea>
                                    </div>
                                    <div className="mt-[20px]">
                                        <Checkbox
                                            label="Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật, điều khoản dịch vụ mua hàng online **"
                                            color="rgba(71, 71, 71, 1)"
                                            className={styles.terms}
                                            checked={checked}
                                            onChange={(event) =>
                                                setChecked(
                                                    event.currentTarget.checked,
                                                )
                                            }
                                        />
                                        <div
                                            className={`${styles.submitButton} w-[100%] mt-2`}
                                        >
                                            {selectedPaymentMethod == 3 ? (
                                                <>
                                                    <Button
                                                        variant="filled"
                                                        color="blue"
                                                        type="submit"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        disabled={
                                                            loading ||
                                                            disableOrder
                                                        }
                                                    >
                                                        {loading ? (
                                                            <Loader
                                                                color="cyan"
                                                                size="sm"
                                                            />
                                                        ) : (
                                                            "HOÀN TẤT ĐẶT HÀNG"
                                                        )}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="filled"
                                                        color="blue"
                                                        type="submit"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        disabled={
                                                            loading ||
                                                            disableOrder
                                                        }
                                                    >
                                                        {loading ? (
                                                            <Loader
                                                                color="cyan"
                                                                size="sm"
                                                            />
                                                        ) : (
                                                            "TIẾN HÀNH THANH TOÁN ONLINE"
                                                        )}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Flex>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
