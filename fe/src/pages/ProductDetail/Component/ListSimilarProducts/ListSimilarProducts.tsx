import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import instance from "@/configs/axios";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./ListSimilarProducts.module.scss";
type Props = {
    dataCategory: any;
    productId: number;
};
const ListSimilarProducts = ({ dataCategory, productId }: Props) => {
    const settings = {
        className: "center",
        // centerMode: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        // rows: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const sliderRef = React.createRef<Slider>();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await instance.get("/products/splq", {
                params: {
                    catelogues: dataCategory,
                    product_id: productId,
                },
            });
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [dataCategory]);
    return (
        <>
            <div
                className={`container ${style.sliderProductSimilar}`}
                style={{ position: "relative", zIndex: 3 }}
            >
                <Slider ref={sliderRef} {...settings}>
                    {data?.map((product, index) => (
                        <div key={index}>
                            <ItemProduct product={product} />
                        </div>
                    ))}
                </Slider>
                <div
                    className={style.NextPrev}
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <IconChevronRight
                        stroke={3}
                        color="#4A4947"
                        style={{
                            position: "absolute",
                            backgroundColor: "#F4F6FF",
                            width: "29px",
                            height: "60px",
                            right: "-10px",
                            top: "-38px",
                            borderRadius: " 12px 0 0 12px ",
                            zIndex: 9999,
                        }}
                    />
                </div>
                <div
                    className={style.BackPrev}
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <IconChevronLeft
                        stroke={3}
                        color="#4A4947"
                        style={{
                            position: "absolute",
                            backgroundColor: "#F4F6FF",
                            width: "29px",
                            height: "60px",
                            top: "-38px",
                            left: "-10px",
                            borderRadius: "0 12px 12px 0",
                            zIndex: 9999,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ListSimilarProducts;
