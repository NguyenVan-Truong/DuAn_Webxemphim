import { bg_bage } from "@/assets/img";
import { Product } from "@/model/Products";
import { Box, Button, Flex, Rating, Text, Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import style from "../ListProduct.module.scss";
import { useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

type props = {
    product: Product;
};

type FavoritesData = number[];

const ItemProduct = ({ product }: props) => {
    const navigate = useNavigate();
    const [tym, setTym] = useState(false);
    const queryClient = useQueryClient();

    const onhandleTymItem = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            message.error("Vui lòng đăng nhập thêm sản phẩm yêu thích");
            navigate("/xac-thuc/dang-nhap");
            return; // Dừng lại không thực hiện hành động yêu thích
        }

        setTym(!tym);
        try {
            const response = await instance.post("/favorites/toggle", {
                product_id: product.id,
            });
            queryClient.invalidateQueries({
                queryKey: ["favoritesData"],
            });
            if (response.status === 200) {
                // Cập nhật dữ liệu trong cache của react-query
                queryClient.setQueryData<FavoritesData>(
                    ["favoritesData"],
                    (oldData) => {
                        const currentData = oldData ?? [];
                        const updatedData = tym
                            ? currentData.filter((id) => id !== product.id)
                            : [...currentData, product.id];

                        return updatedData;
                    },
                );
            } else {
                console.error("Error toggling favorite status:", response.data);
            }
        } catch (error) {
            console.error("Có lỗi xảy ra", error);
        }
        setTym(!tym);
    };

    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
    };

    return (
        <div className={style.listProductsItemMain}>
            <div className={style.listProductsItem}>
                <div className={style.listProductsImageContainer}>
                    <img
                        src={product?.image_url}
                        alt={product?.name}
                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                    />
                </div>
                <Flex
                    direction="row"
                    className={`${style.listProductsInfo} items-center justify-between`}
                >
                    <Tooltip
                        label={product?.name}
                        color="rgba(166, 166, 166, 1)"
                    >
                        <h2
                            className={`${style.listProductsTitle} font-medium`}
                        >
                            <Box w={300}>
                                <Text truncate="end">{product?.name}</Text>
                            </Box>
                        </h2>
                    </Tooltip>
                </Flex>
                <Flex
                    direction="row"
                    justify="start"
                    align="center"
                    className={style.listProductsPricing}
                >
                    <p className={`${style.listProductsPriceCurrent} `}>
                        {Math.round(product?.discount_price).toLocaleString(
                            "vi-VN",
                            {
                                style: "currency",
                                currency: "VND",
                            },
                        )}
                    </p>
                    <p
                        className={`${style.listProductsPriceOriginal} line-through`}
                    >
                        {Math.round(product?.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                </Flex>
                <Flex direction="row" justify="space-between">
                    <Flex direction="row">
                        <Rating
                            value={product?.ratings_avg || 0}
                            fractions={10}
                            readOnly
                        />
                        <span className="text-[12px] text-yellow-700">
                            ({product?.ratings_avg.toFixed(1)})
                        </span>
                    </Flex>
                    <div>
                        <p className="text-[14px] text-slate-600">
                            {/* Kho : {product?.stock} */}
                        </p>
                    </div>
                </Flex>
                <Flex
                    direction="row"
                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                    gap="xs"
                >
                    {tym ? (
                        <IconHeartFilled
                            color="red"
                            onClick={onhandleTymItem}
                        />
                    ) : (
                        <CiHeart
                            className={`${style.listProductsFavoriteIcon} text-[24px]`}
                            onClick={onhandleTymItem}
                            style={{ cursor: "pointer" }}
                        />
                    )}
                    <div className={`${style.LinkButtonWrapper}`}>
                        <Button
                            variant="light"
                            className={`${style.listProductsButton}`}
                            onClick={() =>
                                onhandleTurnPage(product?.id, product?.slug)
                            }
                        >
                            XEM THÊM
                        </Button>
                    </div>
                </Flex>
            </div>
            <div className={style.promotionTags}>
                <Flex direction="column" justify="space-between">
                    <div
                        className={style.discountTag}
                        style={{
                            backgroundImage: `url(${bg_bage})`,
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className={style.discountText}>
                            <span>
                                {Math.round(product?.discount_percentage)}%
                            </span>
                        </div>
                    </div>
                    <div
                        className={style.newTag}
                        style={{
                            backgroundImage: `url(${bg_bage})`,
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className={style.newText}>
                            <span className="font-bold">New</span>
                        </div>
                    </div>
                </Flex>
            </div>
        </div>
    );
};

export default ItemProduct;
