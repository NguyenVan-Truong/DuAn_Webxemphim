import instance from "@/configs/axios";
import { formatCurrencyVN } from "@/model/_base/Number";
import { toTitleCase } from "@/model/_base/Text";
import { Badge, Button, Flex, Input, Loader, Rating } from "@mantine/core";
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../ProductDetail.scss";
import WanrrantyTab from "../WarrantyTab/WanrrantyTab";

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

type Props = {
    data: TypeProductDetail | undefined;
    id: number;
    dataComment: any;
    // dataAttribute: any;
};

type AttributeValues = {
    [key: string]: string[] | any;
};

type Attribute = {
    id: number;
    attribute: string;
    value: string;
};

type TypeFilteredVariant = {
    id: number;
    price: string;
    discount_price: string;
    stock: number;
    weight: string;
    sku: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    attributes: Attribute[];
};

const RightProduct = ({ data, id, dataComment }: Props) => {
    if (!data) return null;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const queryClient = useQueryClient();
    const [isLoadingPaymentButton, setIsLoadingPaymentButton] = useState(false);
    const [inforUser, setInforfUser] = useState<UserInfo>();
    const [selectedPrice, setSelectedPrice] = useState(data.discount_price);
    const [filteredVariant, setFilteredVariant] = useState<any>({});
    const increaseQuantity = () => {
        if (
            // quantity < (filteredVariant ? filteredVariant?.stock : data.stock)
            Object.keys(filteredVariant).length !== 0
        ) {
            if (quantity < filteredVariant.stock) {
                setQuantity(quantity + 1);
            } else message.error("Số lượng sản phẩm không đủ");
        } else {
            if (quantity < data.stock) {
                setQuantity(quantity + 1);
            } else message.error("Số lượng sản phẩm không đủ");
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    //#region handleAttribute
    const dataAttribute2 = data?.variants.flatMap((variant: any) =>
        variant.attributes.map((attr: any) => attr.attribute),
    );

    // Loại bỏ các giá trị trùng lặp
    const uniqueAttributes2 = [...new Set(dataAttribute2)];

    const [selectedAttributes, setSelectedAttributes] = useState<any>({});
    const uniqueAttributes: AttributeValues = uniqueAttributes2.reduce(
        (acc: any, attr: any) => {
            const values = Array.from(
                new Set(
                    data.variants.flatMap((variant: any) =>
                        variant.attributes
                            .filter(
                                (attribute: any) =>
                                    attribute.attribute === attr,
                            )
                            .map((attribute: any) => attribute.value),
                    ),
                ),
            );
            acc[attr] = values;
            return acc;
        },
        {} as AttributeValues,
    );

    // xử lý khi chọn thuộc tính
    const handleAttributeSelect = (attribute: string, value: string) => {
        setSelectedAttributes((prev: any) => {
            if (prev[attribute] === value) {
                const updatedAttributes = { ...prev };
                delete updatedAttributes[attribute];
                return updatedAttributes;
            }
            return {
                ...prev,
                [attribute]: value,
            };
        });

        const variant = data.variants.find((variant: any) => {
            return Object.entries(selectedAttributes).every(
                ([attribute, value]) => {
                    return variant.attributes.some(
                        (attr: any) =>
                            attr.attribute === attribute &&
                            attr.value === value,
                    );
                },
            );
        }) as TypeFilteredVariant | undefined; // Explicitly type the variant

        if (variant) {
            setSelectedPrice(
                variant.discount_price !== "0.00"
                    ? variant.discount_price
                    : variant.price,
            );
        } else {
            setSelectedPrice(data.price);
        }
    };

    useEffect(() => {
        if (Object.keys(selectedAttributes).length !== 0) {
            const filteredVariant = data.variants.find((variant: any) => {
                return Object.entries(selectedAttributes).every(
                    ([attribute, value]) => {
                        return variant.attributes.some(
                            (attr: any) =>
                                attr.attribute === attribute &&
                                attr.value === value,
                        );
                    },
                );
            }) as TypeFilteredVariant | undefined;
            setFilteredVariant(filteredVariant);
        } else {
            setFilteredVariant({});
        }
    }, [selectedAttributes]);
    // console.log("data", data);
    // console.log("filteredVariant", filteredVariant);
    // console.log("selectedAttributes", selectedAttributes);

    //add Cart
    const onhandleAddToCart = async (type: string) => {
        if (
            Object.keys(selectedAttributes).length === 0 &&
            uniqueAttributes2.length > 0
        ) {
            message.error("Vui lòng chọn biến thể sản phẩm");
            return;
        }

        // Kiểm tra nếu selectedAttributes không đủ các thuộc tính cần thiết từ dataAttribute
        const missingAttributes = uniqueAttributes2.filter(
            (attribute: string) => !(attribute in selectedAttributes),
        );
        const token = localStorage.getItem("token");
        const UserProfile = localStorage.getItem("userProFile");
        if (!token || !UserProfile) {
            message.error("Vui lòng đăng nhập thêm sản phẩm vào giỏ hàng");
            setTimeout(() => {
                navigate("/xac-thuc/dang-nhap");
            }, 2000);
            return; // Dừng lại không thực hiện hành động yêu thích
        }
        // Nếu thiếu thuộc tính nào, hiển thị thông báo lỗi và dừng lại
        if (missingAttributes.length > 0) {
            message.error(
                `Vui lòng chọn đầy đủ các thuộc tính: ${missingAttributes.join(", ")}`,
            );
            return; // Dừng lại nếu thiếu thuộc tính
        }
        const dataAddToCart = {
            product_id: id,
            product_variant_id: filteredVariant?.id ?? null,
            quantity: quantity,
        };

        try {
            if (type === "cart") {
                setisLoading(true);
                const response = await instance.post("/cart", dataAddToCart);
                console.log("response", response.data);
                if (response.status === 201 || response.status === 200) {
                    message.success("Thêm vào giỏ hàng thành công");
                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                    setSelectedAttributes({});
                    setFilteredVariant({});
                }
            }
            if (type === "buy") {
                setIsLoadingPaymentButton(true);
                const response = await instance.post("/cart", dataAddToCart);
                if (response.status === 201 || response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                    // Lấy lại giỏ hàng để tìm sản phẩm vừa thêm
                    const cartResponse = await instance.get("/cart");
                    const cartItems = cartResponse.data.data || [];
                    // Tìm sản phẩm vừa thêm trong giỏ hàng
                    const addedProduct = cartItems.find((item: any) => {
                        return (
                            Number(item.product_id) ==
                                Number(dataAddToCart.product_id) &&
                            Number(item.product_variants_id) ==
                                Number(dataAddToCart.product_variant_id)
                        );
                    });
                    let TotalPrice = 0;
                    if (addedProduct.product_variant == null) {
                        TotalPrice =
                            Number(addedProduct.price) *
                            Number(addedProduct.quantity);
                    } else {
                        if (
                            addedProduct?.product_variant.discount_price !==
                            "0.00"
                        ) {
                            TotalPrice =
                                Number(
                                    addedProduct.product_variant.discount_price,
                                ) * Number(addedProduct.quantity);
                        } else {
                            TotalPrice =
                                Number(addedProduct.product_variant.price) *
                                Number(addedProduct.quantity);
                        }
                    }
                    if (addedProduct && TotalPrice) {
                        navigate("/thanh-toan", {
                            state: {
                                listchecked: [addedProduct],
                                totalPrice: TotalPrice,
                            },
                        });
                    }
                } else {
                    message.error("Đã xảy ra lỗi khi mua hàng");
                }
            }
        } catch (error: any) {
            message.error(error.response.data.error);
        } finally {
            setisLoading(false);
            setIsLoadingPaymentButton(false);
        }
    };

    // Tính phần trăm giảm giá
    const calculateDiscountPercentage = (
        originalPrice: number,
        discountPrice: number,
    ) => {
        if (
            !originalPrice ||
            !discountPrice ||
            originalPrice <= discountPrice
        ) {
            return null; // Không giảm giá hoặc giá gốc không hợp lệ
        }
        return Math.round(
            ((originalPrice - discountPrice) / originalPrice) * 100,
        );
    };
    const discountPercentage = useMemo(() => {
        if (data) {
            const originalPrice =
                Object.keys(filteredVariant).length !== 0
                    ? Number(filteredVariant?.price)
                    : Number(data?.price);

            const discountPrice =
                Object.keys(filteredVariant).length !== 0
                    ? Number(filteredVariant?.discount_price)
                    : Number(data?.discount_price);

            return calculateDiscountPercentage(originalPrice, discountPrice);
        }
    }, [filteredVariant, data]);
    return (
        <div className="product-details">
            <div className="product-header">
                <h2 className="product-title text-[20px] font-medium">
                    {toTitleCase(data?.name)}
                </h2>
            </div>
            <Flex direction="row" className="product-interactions">
                <Flex className="product-rating" direction="row">
                    <Rating
                        value={dataComment?.average_rating || 0}
                        fractions={10}
                        size="xs"
                        readOnly
                    />
                    <span className="rating-count">
                        ({dataComment?.average_rating.toFixed(1)})
                    </span>
                </Flex>
                <div className="product-sales">
                    {/* <span>Đã bán 965</span> */}
                </div>
            </Flex>
            <div className="product-pricing my-[5px] py-[5px] ">
                <Flex direction="row" align="center" gap="lg">
                    {/* NẾU CÓ DISCOUNT_PRICE */}
                    {filteredVariant?.discount_price !== "0.00" ? (
                        <>
                            {/* phần trăm được giảm */}
                            {discountPercentage !== null ? (
                                <Badge
                                    size="lg"
                                    radius="sm"
                                    style={{ backgroundColor: "red" }}
                                >
                                    {discountPercentage}%
                                </Badge>
                            ) : (
                                ""
                            )}

                            {Object.keys(selectedAttributes).length === 0 ? (
                                <>
                                    <span className="current-price text-[#ef683a] text-[17px] font-bold">
                                        {formatCurrencyVN(data.discount_price)}
                                    </span>
                                    <span className="original-price text-[#777a7b] text-[14px] ">
                                        <del>
                                            {/* giá gốc */}
                                            {formatCurrencyVN(data.price)}
                                        </del>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="current-price text-[#ef683a] text-[17px] font-bold">
                                        {formatCurrencyVN(selectedPrice)}
                                    </span>
                                    <span className="original-price text-[#777a7b] text-[14px] ">
                                        <del>
                                            {/* giá gốc */}
                                            {formatCurrencyVN(
                                                filteredVariant
                                                    ? filteredVariant?.price
                                                    : data?.price,
                                            )}
                                        </del>
                                    </span>
                                </>
                            )}
                        </>
                    ) : (
                        // NẾU KHÔNG CÓ DISCOUNT_PRICE
                        <>
                            {/* phần trăm được giảm */}
                            {discountPercentage !== null ? (
                                <Badge
                                    size="lg"
                                    radius="sm"
                                    style={{ backgroundColor: "red" }}
                                >
                                    {discountPercentage}%
                                </Badge>
                            ) : (
                                ""
                            )}
                            <span className="current-price text-[#ef683a] text-[17px] font-bold">
                                {formatCurrencyVN(selectedPrice)}
                            </span>
                        </>
                    )}
                </Flex>
            </div>
            <Flex direction="column" gap="sm" className="product-attributes">
                {uniqueAttributes2.map((attribute: any) => (
                    <div key={attribute}>
                        <h4 style={{ fontWeight: "600" }}>{attribute}</h4>
                        <Flex direction="row" gap="lg">
                            {uniqueAttributes[attribute]?.map(
                                (item: string) => (
                                    <div
                                        key={item}
                                        style={{
                                            position: "relative",
                                            cursor: "pointer",
                                            fontWeight: "500",
                                            minWidth: "80px",
                                            textAlign: "center",
                                            border:
                                                selectedAttributes[
                                                    attribute
                                                ] === item
                                                    ? "1px solid #ef683a"
                                                    : "1px solid #ccc",
                                            padding: "8px 10px",
                                            color:
                                                selectedAttributes[
                                                    attribute
                                                ] === item
                                                    ? "#ef683a"
                                                    : "",
                                        }}
                                        onClick={() =>
                                            handleAttributeSelect(
                                                attribute,
                                                item,
                                            )
                                        }
                                    >
                                        {item}
                                        {selectedAttributes[attribute] ===
                                            item && (
                                            <div className="dotCheck">
                                                <IconCheck
                                                    stroke={2}
                                                    style={{
                                                        width: "14px",
                                                        height: "auto",
                                                        color: "#fff",
                                                        paddingLeft: "2px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ),
                            )}
                        </Flex>
                    </div>
                ))}
            </Flex>
            <div className="mt-[20px]">
                <Flex direction="row" gap="lg" align="center">
                    <div>
                        <Button.Group>
                            <Button
                                variant="default"
                                onClick={decreaseQuantity}
                                disabled={
                                    filteredVariant !== null
                                        ? filteredVariant.stock < 1
                                        : data.stock < 1
                                }
                            >
                                <IconMinus size={14} />
                            </Button>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    if (Number(e.target.value) == 0) {
                                        setQuantity(1);
                                        return;
                                    }
                                    if (
                                        // quantity < (filteredVariant ? filteredVariant?.stock : data.stock)
                                        Object.keys(filteredVariant).length !==
                                        0
                                    ) {
                                        if (
                                            Number(e.target.value) <=
                                            Number(filteredVariant.stock)
                                        ) {
                                            setQuantity(Number(e.target.value));
                                        } else
                                            message.error(
                                                "Số lượng sản phẩm không đủ",
                                            );
                                    } else {
                                        if (
                                            Number(e.target.value) <=
                                            Number(data.stock)
                                        ) {
                                            setQuantity(Number(e.target.value));
                                        } else
                                            message.error(
                                                "Số lượng sản phẩm không đủ",
                                            );
                                    }
                                }}
                                className="!w-[60px] text-center  input-quantity"
                                style={{
                                    color: "red",
                                    border: "none",
                                    textAlign: "center",
                                }}
                                min={1}
                            />
                            <Button
                                variant="default"
                                onClick={increaseQuantity}
                                disabled={
                                    filteredVariant !== null
                                        ? filteredVariant.stock < 1
                                        : data.stock < 1
                                }
                            >
                                <IconPlus size={14} />
                            </Button>
                        </Button.Group>
                    </div>
                    <div>
                        <span style={{ color: "rgb(1 1 1)", fontSize: "13px" }}>
                            {/* {Object.keys(filteredVariant).length !== 0
                                ? filteredVariant?.stock
                                : data.stock}{" "} */}
                            {data.variants !== null &&
                            data.variants.length > 0 ? (
                                <>
                                    {Object.keys(filteredVariant).length !==
                                    0 ? (
                                        <>
                                            {filteredVariant?.stock} sản phẩm có
                                            sẵn
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <>{data.stock} sản phẩm có sẵn</>
                            )}
                        </span>
                    </div>
                </Flex>
                <Flex
                    direction="row"
                    w="100%"
                    style={{ marginTop: "10px" }}
                    gap="xl"
                >
                    {/* {filteredVariant?.stock == 0 || data.stock == 0 ? (
                        <div style={{ width: "100%" }}>
                            <Badge
                                w="100%"
                                size="lg"
                                variant="filled"
                                color="#ccc"
                                style={{
                                    padding: "20px ",
                                }}
                                radius="xs"
                            >
                                Hết hàng
                            </Badge>
                        </div>
                    ) : (
                        <>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(5, 3, 2, 1)",
                                        to: "rgba(61, 61, 61, 1)",
                                        deg: 35,
                                    }}
                                    style={{
                                        padding: "20px",
                                        cursor: isLoading
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: isLoading ? 0.7 : 1,
                                    }}
                                    radius="xs"
                                    onClick={() => onhandleAddToCart("cart")}
                                >
                                    {isLoading ? (
                                        <Loader color="blue" size="xs" />
                                    ) : (
                                        "Thêm vào giỏ hàng"
                                    )}
                                </Badge>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(3, 0, 207, 1)",
                                        to: "cyan",
                                        deg: 35,
                                    }}
                                    radius="xs"
                                    style={{
                                        padding: "20px",
                                        cursor: isLoadingPaymentButton
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: isLoadingPaymentButton
                                            ? 0.7
                                            : 1,
                                    }}
                                    onClick={() => onhandleAddToCart("buy")}
                                >
                                    {isLoadingPaymentButton ? (
                                        <Loader color="#fff" size="xs" />
                                    ) : (
                                        "Mua ngay"
                                    )}{" "}
                                </Badge>
                            </div>
                        </>
                    )} */}
                    {filteredVariant?.stock == 0 || data.stock == 0 ? (
                        <>
                            <div style={{ width: "100%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="filled"
                                    color="#ccc"
                                    style={{
                                        padding: "20px ",
                                    }}
                                    radius="xs"
                                >
                                    Hết hàng
                                </Badge>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(5, 3, 2, 1)",
                                        to: "rgba(61, 61, 61, 1)",
                                        deg: 35,
                                    }}
                                    style={{
                                        padding: "20px",
                                        cursor: isLoading
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: isLoading ? 0.7 : 1,
                                    }}
                                    radius="xs"
                                    onClick={() => onhandleAddToCart("cart")}
                                >
                                    {isLoading ? (
                                        <Loader color="blue" size="xs" />
                                    ) : (
                                        "Thêm vào giỏ hàng"
                                    )}
                                </Badge>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(3, 0, 207, 1)",
                                        to: "cyan",
                                        deg: 35,
                                    }}
                                    radius="xs"
                                    style={{
                                        padding: "20px",
                                        cursor: isLoadingPaymentButton
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: isLoadingPaymentButton
                                            ? 0.7
                                            : 1,
                                    }}
                                    onClick={() => onhandleAddToCart("buy")}
                                >
                                    {isLoadingPaymentButton ? (
                                        <Loader color="#fff" size="xs" />
                                    ) : (
                                        "Mua ngay"
                                    )}{" "}
                                </Badge>
                            </div>
                        </>
                    )}
                </Flex>
            </div>
            <div className="my-[10px]">
                <WanrrantyTab />
            </div>
        </div>
    );
};

export default RightProduct;
