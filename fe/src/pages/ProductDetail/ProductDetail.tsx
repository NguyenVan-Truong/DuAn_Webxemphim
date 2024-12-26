import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CommentProductDetail from "./Component/Comment/Comment";
import DescriptionProduct from "./Component/Description/Description";
import ListSimilarProducts from "./Component/ListSimilarProducts/ListSimilarProducts";
import ProductImageSlider from "./Component/ProductImageSlider/ProductImageSlider";
import RightProduct from "./Component/RightProduct/RightProduct";
import "./ProductDetail.scss";
import { Flex, LoadingOverlay } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

const ProductDetail = () => {
    const location = useLocation();
    // console.log("location", location.state);
    const [data, setData] = useState<TypeProductDetail>();
    const [dataComment, setDataComment] = useState<{}>();
    const [valueRating, setValueRating] = useState(0);
    const [dataCategory, setDataCategory] = useState();
    const [isLoading, setisLoading] = useState(false);
    //attribute
    // const [dataAttribute, setDataAttribute] = useState([]);
    //loading comment
    const [loadingComment, setLoadingComment] = useState(false);

    const fetchData = async () => {
        setisLoading(true);
        try {
            const response = await instance.get(
                `/products/chi-tiet-san-pham/${location.state.id}`,
            );
            if (response.status === 200) {
                setData(response.data);
                setDataCategory(response.data.catalogue_id.join(","));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setisLoading(false);
        }
    };
    const fetchDataComment = async () => {
        setLoadingComment(true);
        let url = "";
        if (valueRating) {
            url += `?rating=${valueRating}`;
        }
        try {
            const response = await instance.get(
                `/products/${location.state.id}/reviews${url}`,
            );
            if (response && response.status === 200) {
                setDataComment(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingComment(false);
        }
    };
    // const fetchAttribute = async () => {
    //     try {
    //         const response = await instance.get(`/attribute`);
    //         if (response.status === 200) {
    //             // setDataAttribute(response.data.data);
    //             const attributeNames = response.data.data.map(
    //                 (item: any) => item.name,
    //             );
    //             setDataAttribute(attributeNames);
    //         }
    //     } catch (error) {
    //         NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
    //     }
    // };

    useEffect(() => {
        Promise.all([fetchData(), fetchDataComment()]);
        window.scrollTo(0, 0);
    }, [location.state.id]);
    useEffect(() => {
        fetchDataComment();
    }, [valueRating]);
    return (
        <>
            <div
                className="product-detail-main"
                style={{
                    position: "relative",
                    minHeight: "900px",
                }}
            >
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    style={{
                        height: "100%",
                        width: "100%",
                        margin: "0 auto",
                    }}
                />
                <div className="Breadcrumbs">
                    <div className="container padding">
                        <Flex
                            direction={"row"}
                            align={"center"}
                            gap={"sm"}
                            className="menu"
                        >
                            <Link to="/">
                                <IconHome
                                    stroke={1}
                                    style={{
                                        marginTop: "-2px",
                                    }}
                                />
                            </Link>{" "}
                            <p
                                style={{
                                    color: "#666",
                                }}
                            >
                                /
                            </p>
                            <Link to="/san-pham">sản phẩm</Link>
                            <p
                                style={{
                                    color: "#666",
                                }}
                            >
                                /
                            </p>
                            <p
                                style={{
                                    color: "#000",
                                }}
                            >
                                {data?.name}
                            </p>
                        </Flex>
                    </div>
                </div>

                <div
                    className="container"
                    style={{
                        position: "relative",
                    }}
                >
                    <div className="product-content padding">
                        <div className="imageMain">
                            <ProductImageSlider data={data} />
                            <div className="rightProductTop">
                                <RightProduct
                                    data={data}
                                    dataComment={dataComment}
                                    id={location.state.id}
                                    // dataAttribute={dataAttribute}
                                />
                            </div>
                            <div className="mt-[30px]">
                                <DescriptionProduct data={data} />
                            </div>

                            <div>
                                <CommentProductDetail
                                    data={dataComment}
                                    setValueRating={setValueRating}
                                    loadingComment={loadingComment}
                                />
                            </div>
                        </div>
                        {/* Phần bên phải: Chi tiết sản phẩm */}
                        <div className="rightProductBottom">
                            <RightProduct
                                data={data}
                                dataComment={dataComment}
                                id={location.state.id}
                                // dataAttribute={dataAttribute}
                            />
                        </div>
                    </div>

                    <div className="padding">
                        <div className="product-title-1">
                            <p>Có Thể Bạn Cũng Thích</p>
                        </div>
                        <ListSimilarProducts
                            dataCategory={dataCategory}
                            productId={location.state.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
