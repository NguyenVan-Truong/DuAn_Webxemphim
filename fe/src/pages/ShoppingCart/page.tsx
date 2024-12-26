import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    LoadingOverlay,
    Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
    IconAB2,
    IconAlertOctagon,
    IconPhoneCall,
    IconShoppingCart,
    IconX,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "./ShoppingCart.module.scss";
const ShoppingCart = () => {
    const navigate = useNavigate();
    const [debouncedQuantity, setDebouncedQuantity] = useDebouncedState<
        number | null
    >(null, 200); // Sử dụng hook debounced state để giảm số lần gọi API
    const [debouncedId, setDebouncedId] = useState<number | null>();
    const [debouncedName, setDebouncedName] = useState<string | null>();
    const [dataCartRequest, setDataCartRequest] = useState<CartItem[]>([]);
    //   tỔNG TIỀN
    const [totalPrice, setTotalPrice] = useState<number>(0);
    // click select checkbox
    const [listchecked, setListChecked] = useState<any[]>([]);
    //chuyển trang Thanh toán
    console.log("listchecked", listchecked);

    const handlePayment = () => {
        if (listchecked.length === 0) {
            message.error("Vui lòng chọn sản phẩm để thanh toán");
            return;
        }
        for (let item of listchecked) {
            if (item.product_variant !== null) {
                // Kiểm tra nếu số lượng lớn hơn stock
                if (item.quantity > item.product_variant.stock) {
                    message.error(
                        `Sản phẩm ${item.product.name} vượt quá số lượng tồn kho > ${item.product_variant.stock}`,
                    );
                    return;
                }
            } else {
                // Nếu sản phẩm không có variant, kiểm tra stock trực tiếp từ item
                if (item.quantity > item.stock) {
                    message.error(
                        `Sản phẩm ${item.name} vượt quá số lượng tồn kho`,
                    );
                    return;
                }
            }
        }

        navigate("/thanh-toan", {
            state: { listchecked: listchecked, totalPrice: totalPrice },
        });
    };
    // #region Lấy dl giỏ hàng
    const fetchDataCart = async () => {
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                setDataCartRequest(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setisLoading(false);
        }
    };

    const {
        data: dataCart,
        isLoading: isLoadingCart,
        refetch,
    } = useQuery<CartItem[]>({
        queryKey: ["cart"],
        queryFn: fetchDataCart,
    });
    // useEffect(() => {
    //     setDataCartRequest(dataCart);
    // }, [dataCart]);
    // #endregion
    // click checkbox
    const onhandleChecked = (item: CartItem) => {
        setListChecked((prevList: any) => {
            // Kiểm tra nếu item.id đã tồn tại trong listchecked
            if (prevList.some((prev: CartItem) => prev.id === item.id)) {
                // Loại bỏ item khỏi danh sách
                return prevList.filter((prev: CartItem) => prev.id !== item.id);
            } else {
                // Thêm item vào danh sách
                return [...prevList, item];
            }
        });
    };
    // Xóa sản phẩm
    const handleDeleteProduct = async (ids: number) => {
        try {
            const response = await instance.delete(`/delete-cart?ids=${ids}`);
            if (response && response.status === 200) {
                refetch();
                message.success("Xóa sản phẩm thành công");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa sản phẩm");
        }
    };
    const handleQuantityChange = (
        id: number,
        type: "increase" | "decrease",
    ) => {
        setDataCartRequest((prevData: any) =>
            prevData.map((item: CartItem) => {
                if (item.id === id) {
                    const newQuantity =
                        type === "increase"
                            ? item.quantity + 1
                            : item.quantity - 1;
                    if (newQuantity < 1) {
                        return item;
                    }
                    setDebouncedQuantity(newQuantity);
                    setDebouncedId(id);
                    setDebouncedName(item.product.name);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }),
        );
    };

    useEffect(() => {
        if (debouncedQuantity !== null && debouncedQuantity >= 1) {
            const updateQuantity = async () => {
                try {
                    await instance.put(`/cart/${debouncedId}`, {
                        quantity: debouncedQuantity,
                    });
                } catch (error) {
                    message.error("Đã xảy ra lỗi khi cập nhật số lượng");
                } finally {
                    refetch();
                }
            };
            updateQuantity();
        }
    }, [debouncedQuantity]);
    useEffect(() => {
        if (!dataCart) return;

        if (dataCart?.length > 0 && listchecked.length > 0) {
            const total = dataCart.reduce(
                (
                    acc: { totalQuantity: number; totalPrice: number },
                    item: CartItem,
                ) => {
                    if (
                        listchecked.some(
                            (checkedItem: CartItem) =>
                                checkedItem.id === item.id,
                        )
                    ) {
                        acc.totalQuantity += item.quantity;

                        const itemPrice =
                            item.product_variant &&
                            item.product_variant.discount_price !== "0.00"
                                ? Number(item.product_variant.discount_price)
                                : item.product_variant
                                  ? Number(item.product_variant.price)
                                  : Number(item.price);

                        acc.totalPrice += itemPrice * item.quantity;
                    }
                    return acc;
                },
                { totalQuantity: 0, totalPrice: 0 },
            );

            setTotalPrice(total.totalPrice);
        } else {
            setTotalPrice(0);
        }
    }, [dataCart, listchecked]);

    return (
        <div
            className="container mx-auto padding"
            style={{
                marginTop: "10px",
                marginBottom: "30px",
            }}
        >
            <div className={Style.Main}>
                <LoadingOverlay
                    visible={isLoadingCart}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />

                <div className={Style.Left}>
                    <Flex direction="row" justify={"space-between"}>
                        <h1 className={Style.Title}>
                            Giỏ Hàng
                            <span className={Style.Total_count}>
                                {dataCart?.length}
                            </span>
                        </h1>
                        {/* <Button variant="filled" color="red" disabled>
                            Xóa{" "}
                        </Button> */}
                    </Flex>
                    {dataCart &&
                        dataCart.map((item: CartItem) => {
                            return (
                                <Flex
                                    direction={"row"}
                                    justify={"space-between"}
                                    className="border-b-2 border-b-gray-200"
                                    key={item.id}
                                >
                                    <div
                                        className="flex "
                                        style={{
                                            alignItems: "start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginTop: "35px",
                                            }}
                                        >
                                            <Checkbox
                                                style={{
                                                    marginTop: "10px",
                                                }}
                                                onClick={() =>
                                                    onhandleChecked(item)
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <img
                                                src={item.product.image_url}
                                                alt=""
                                                style={{
                                                    padding: "10px",
                                                    maxHeight: "110px",
                                                    minHeight: "110px",
                                                    minWidth: "130px",
                                                    maxWidth: "130px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div className={Style.Content}>
                                            <div
                                                className={Style.Content_Title}
                                            >
                                                <h4
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        marginTop: "5px",
                                                    }}
                                                >
                                                    {item.product.name}
                                                </h4>
                                            </div>

                                            <Flex
                                                direction="column"
                                                style={{
                                                    margin: "5px 0",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        color: "#333",
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        marginTop: "-5px",
                                                    }}
                                                >
                                                    {item.product_variant !==
                                                    null ? (
                                                        <>
                                                            {item.product_variant.attribute_values
                                                                .map(
                                                                    (
                                                                        item: any,
                                                                    ) =>
                                                                        item.name,
                                                                )
                                                                .join(", ")}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </p>
                                                <span
                                                    className={
                                                        Style.Content_Price
                                                    }
                                                    style={{
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    {item.product_variant !==
                                                        null &&
                                                    item.product_variant
                                                        .discount_price !==
                                                        "0.00" ? (
                                                        <>
                                                            {/* Giá giảm giá */}
                                                            {formatCurrencyVN(
                                                                item
                                                                    .product_variant
                                                                    .discount_price,
                                                            )}

                                                            {/* Giá gốc */}
                                                            <del
                                                                style={{
                                                                    margin: "0 7px",
                                                                    color: "#999",
                                                                    fontSize:
                                                                        "14px",
                                                                    fontWeight:
                                                                        "400",
                                                                }}
                                                            >
                                                                {formatCurrencyVN(
                                                                    item
                                                                        .product_variant
                                                                        .price,
                                                                )}
                                                            </del>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Nếu không có giá giảm giá hoặc discount_price = 0 thì lấy giá gốc */}
                                                            {formatCurrencyVN(
                                                                item.product_variant
                                                                    ? item
                                                                          .product_variant
                                                                          .price
                                                                    : item.price,
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                            </Flex>

                                            <div
                                                className={Style.Content_Button}
                                            >
                                                <div
                                                    className={
                                                        Style.Content_Button_Quantity
                                                    }
                                                >
                                                    <button
                                                        className={Style.Button}
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                "decrease",
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity == 1
                                                        }
                                                        style={{
                                                            cursor:
                                                                item.quantity ==
                                                                1
                                                                    ? "not-allowed"
                                                                    : "pointer",
                                                            opacity:
                                                                item.quantity ==
                                                                1
                                                                    ? 0.5
                                                                    : 1,
                                                        }}
                                                    >
                                                        -
                                                    </button>

                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className={
                                                            Style.quantity
                                                        }
                                                        disabled
                                                    />

                                                    <button
                                                        className={Style.Button}
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                "increase",
                                                            )
                                                        }
                                                        disabled={
                                                            item.product_variant !==
                                                            null
                                                                ? item.quantity >=
                                                                  item
                                                                      .product_variant
                                                                      .stock
                                                                : item.quantity >=
                                                                  item.product
                                                                      .stock
                                                        }
                                                        style={{
                                                            cursor:
                                                                item.product_variant !==
                                                                null
                                                                    ? item.quantity >=
                                                                      item
                                                                          .product_variant
                                                                          .stock
                                                                        ? "not-allowed"
                                                                        : "pointer"
                                                                    : item.quantity >=
                                                                        item
                                                                            .product
                                                                            .stock
                                                                      ? "not-allowed"
                                                                      : "pointer",
                                                            opacity:
                                                                item.product_variant !==
                                                                null
                                                                    ? item.quantity >=
                                                                      item
                                                                          .product_variant
                                                                          .stock
                                                                        ? 0.5
                                                                        : 1
                                                                    : item.quantity >=
                                                                        item
                                                                            .product
                                                                            .stock
                                                                      ? 0.5
                                                                      : 1,
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Flex
                                        direction={"column"}
                                        justify={"space-between"}
                                        align={"end"}
                                        style={{
                                            padding: "6px 0",
                                        }}
                                    >
                                        {/* Xóa sp */}
                                        <div
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <IconX
                                                stroke={2}
                                                onClick={() => {
                                                    handleDeleteProduct(
                                                        item.id,
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Tổng tiền của 1 sản phẩm */}
                                        <p
                                            style={{
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {item.product_variant !== null &&
                                            item.product_variant
                                                .discount_price !== "0.00" ? (
                                                <>
                                                    {formatCurrencyVN(
                                                        String(
                                                            Number(
                                                                item
                                                                    .product_variant
                                                                    .discount_price,
                                                            ) *
                                                                Number(
                                                                    item.quantity,
                                                                ),
                                                        ),
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {formatCurrencyVN(
                                                        String(
                                                            Number(
                                                                item.product_variant
                                                                    ? item
                                                                          .product_variant
                                                                          .price
                                                                    : item.price,
                                                            ) *
                                                                Number(
                                                                    item.quantity,
                                                                ),
                                                        ),
                                                    )}
                                                </>
                                            )}
                                        </p>
                                    </Flex>
                                </Flex>
                            );
                        })}
                </div>
                <div className={Style.Right}>
                    <div className={Style.Right_Container}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: "5px",
                                }}
                            >
                                <span className={Style.Right_Title}>
                                    Thông tin đơn hàng
                                </span>
                            </div>
                            <Flex
                                direction="row"
                                style={{
                                    color: "#333",
                                }}
                                justify={"space-between"}
                                align={"center"}
                            >
                                <p
                                    style={{
                                        fontSize: "16px",
                                    }}
                                >
                                    Tổng tiền
                                </p>
                                <p>{formatCurrencyVN(String(totalPrice))}</p>
                            </Flex>
                            <div
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                <Button
                                    variant="filled"
                                    color="red"
                                    style={{
                                        width: "100%",
                                        fontSize: "16px",
                                    }}
                                    onClick={() => handlePayment()}
                                >
                                    THANH TOÁN
                                </Button>
                                <Link to={"/san-pham"}>
                                    <Button
                                        variant="outline"
                                        color="gray"
                                        style={{
                                            width: "100%",
                                            fontSize: "16px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Tiếp tục mua hàng
                                    </Button>
                                </Link>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                    marginTop: "100px",
                }}
            >
                <Grid>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <Flex
                                direction="column"
                                justify={"center"}
                                align={"center"}
                                style={{
                                    color: "rgb(85 85 85)",
                                }}
                                gap={4}
                            >
                                <div>
                                    <IconShoppingCart
                                        stroke={2}
                                        style={{
                                            height: "48px",
                                            width: "48px",
                                            color: "rgb(85 85 85)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        Giao hàng và lắp đặt
                                    </p>
                                </div>
                                <div>
                                    <p>Miễn phí</p>
                                </div>
                            </Flex>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <Flex
                                direction="column"
                                justify={"center"}
                                align={"center"}
                                style={{
                                    color: "rgb(85 85 85)",
                                }}
                                gap={4}
                            >
                                <div>
                                    <IconAB2
                                        stroke={2}
                                        style={{
                                            height: "48px",
                                            width: "48px",
                                            color: "rgb(85 85 85)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        Đổi trả 1-1
                                    </p>
                                </div>
                                <div>
                                    <p>Miễn phí</p>
                                </div>
                            </Flex>
                        </Box>
                    </Grid.Col>{" "}
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <Flex
                                direction="column"
                                justify={"center"}
                                align={"center"}
                                style={{
                                    color: "rgb(85 85 85)",
                                }}
                                gap={4}
                            >
                                <div>
                                    <IconAlertOctagon
                                        stroke={2}
                                        style={{
                                            height: "48px",
                                            width: "48px",
                                            color: "rgb(85 85 85)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        Bảo hành 2 năm
                                    </p>
                                </div>
                                <div>
                                    <p>Miễn phí</p>
                                </div>
                            </Flex>
                        </Box>
                    </Grid.Col>{" "}
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <Flex
                                direction="column"
                                justify={"center"}
                                align={"center"}
                                style={{
                                    color: "rgb(85 85 85)",
                                }}
                                gap={4}
                            >
                                <div>
                                    <IconPhoneCall
                                        stroke={2}
                                        style={{
                                            height: "48px",
                                            width: "48px",
                                            color: "rgb(85 85 85)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        Tư vấn miễn phí
                                    </p>
                                </div>
                                <div>
                                    <p>Miễn phí</p>
                                </div>
                            </Flex>
                        </Box>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
};

export default ShoppingCart;
