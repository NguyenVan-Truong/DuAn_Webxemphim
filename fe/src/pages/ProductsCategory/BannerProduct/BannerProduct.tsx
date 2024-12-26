import { bannerTrangSanPham } from "@/assets/img";
import { Flex } from "@mantine/core";
import React from "react";
import "./BannerProduct.scss";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { BannerHome } from "@/model/Banner";

const BannerProduct = () => {
    const fetchData = async () => {
        const response = await instance.get("/banners-product");
        return response.data.data;
    };
    const { data, error, isLoading, isError } = useQuery<BannerHome>({
        queryKey: ["Banner"],
        queryFn: fetchData,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>Không có thông tin để hiển thị.</div>;
    }
    return (
        <>
            <div className="relative text-white ">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-[486px] object-cover"
                />{" "}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div
                    className="container product-banner__container absolute  h-auto w-[230px] lg:bottom-[50px] lg:left-[95px] "
                    style={{ marginBottom: "30px" }}
                >
                    <h1 className=" title text-[1.5rem] font-semibold leading-[1.3rem] mb-[13px] ">
                        Sản Phẩm
                    </h1>
                    <Flex
                        direction="row"
                        className="product-banner__breadcrumb gap-[10px] "
                    >
                        <p className="inline-block">Trang chủ</p>
                        <span className="text-white">/</span>
                        <p className="font-bold">Sản phẩm</p>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default BannerProduct;
