import { banner, banner1, bannerh1 } from "@/assets/img";
import instance from "@/configs/axios";
import { BannerHome } from "@/model/Banner";
import { Loader } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "./../../../../extension/Loading";
const Banner = () => {
    const fetchData = async () => {
        const response = await instance.get("/banners-home");
        return response.data.data;
    };
    const { data, error, isLoading, isError } = useQuery<BannerHome>({
        queryKey: ["Banner"],
        queryFn: fetchData,
    });
    if (isLoading) {
        return (
            <div className="flex items-center justify-center !h-[700px]">
                <Loading />
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>Không có thông tin để hiển thị.</div>;
    }
    return (
        <>
            <div className="relative mb-10 ">
                <img
                    src={data.image}
                    alt=""
                    className="w-full h-auto lg:h-[700px] "
                />

                <div className="absolute inset-0 flex flex-col items-start justify-center ml-10 text-left pl-4 md:pl-10">
                    <h1 className="text-white text-2xl md:text-5xl font-medium md:mb-2">
                        {data.title}
                    </h1>
                    <p className="text-white text-sm md:text-xl mb-2 md:mb-4">
                        {data.content}{" "}
                    </p>
                    <Link to={"/gioi-thieu"}>
                        <button className="bg-[#ffffff] text-black hover:bg-gray-300 font-medium text-sm py-1 md:py-2 px-3 md:px-6 rounded-md">
                            Xem Chi Tiết
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 text-center mb-5 mx-4">
                    <h1 className="text-xl md:text-2xl font-semibold not-italic mb-4">
                        NỘI THẤT TINH TẾ
                    </h1>
                    <p className="mb-4 mx-auto w-[350px] md:w-[420px] max-w-md text-sm md:text-lg">
                        Với kinh nghiệm hơn 24 năm trong hoàn thiện nội thất,
                        Nhà Xinh mang đến giải pháp toàn diện trong bao gồm
                        thiết kế, trang trí và cung cấp nội thất trọn gói. Sở
                        hữu đội ngũ chuyên nghiệp và hệ thống 10 cửa hàng, Nhà
                        Xinh là lựa chọn cho không gian tinh tế và hiện đại.
                    </p>
                    <Link to={"/gioi-thieu"}>
                        <button className="border border-[#7a9c59] text-[#7a9c59] px-2 md:px-4 py-1 md:py-2 rounded hover:bg-[#7a9c59] hover:text-white transition">
                            Xem Thêm
                        </button>
                    </Link>
                </div>
                <div className="flex-1 mb-5">
                    <img
                        src={banner1}
                        alt="Nội thất tinh tế"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default Banner;
