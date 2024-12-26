import { useState } from "react";
import { Box, Image, Text, Title } from "@mantine/core";
import {
    banner_footer,
    banner_footer1,
    banner_footer2,
    banner_footer3,
    banner_footer4,
} from "@/assets/img";
import { Button } from "antd";
import Style from "./BannerFooter.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Posts } from "@/model/Posts";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
const BannerFooter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const handlePostClick = (post: Posts) => {
        navigate(`/tin-tuc/chi-tiet-bai-viet/${post.slug}`, {
            state: {
                postId: post.id, // Truyền postId qua state
            },
        });
    };

    const fetchPosts = async (): Promise<Posts[]> => {
        const response = await instance.get("/posts");
        return response.data;
    };

    const { data } = useQuery<Posts[]>({
        queryKey: ["data"],
        queryFn: fetchPosts,
    });

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    // Hiển thị 4 bài viết tương ứng với activeIndex
    const getPostsForActiveIndex = (index: number) => {
        const start = index * 2; // Mỗi phần sẽ chứa 2 bài viết
        const end = start + 2;
        return data?.slice(start, end) || []; // Lấy các bài viết từ API, nếu có
    };

    return (
        <>
            <div className="container-fluid mx-auto space-y-5 mb-5 px-4">
                {/* Hiển thị các bài viết theo activeIndex */}
                <div className="flex flex-col xl:flex-row space-y-5 md:space-y-0 md:space-x-2">
                    {getPostsForActiveIndex(activeIndex).map((post, index) => (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-center mb-4"
                            onClick={() => handlePostClick(post)}
                        >
                            <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={post.image || "/default-image.jpg"} // Thay đổi ảnh theo dữ liệu
                                    alt={post.title}
                                />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                {post.title}
                            </h1>
                            <div className="w-[40px] h-[2px] bg-slate-300 mb-1"></div>
                            <Box maw={500} w="100%">
                                <Text size="sm" truncate="end">
                                    {post.meta_description}
                                </Text>
                            </Box>
                        </div>
                    ))}
                </div>

                {/* Nút điều khiển */}
                <div className="flex space-x-2 justify-center mt-5">
                    <div
                        className={`w-[40px] h-[4px] ${activeIndex === 0 ? "bg-red-500" : "bg-slate-300 hover:bg-black cursor-pointer"}`}
                        onClick={() => handleClick(0)}
                    />
                    <div
                        className={`w-[40px] h-[4px] ${activeIndex === 1 ? "bg-red-500" : "bg-slate-300 hover:bg-black cursor-pointer"}`}
                        onClick={() => handleClick(1)}
                    />
                </div>
            </div>
            <div className={Style.banner_container}>
                <div className={Style.banner_left}>
                    <Title lineClamp={1}>Tổ ấm của người tinh tế</Title>
                    <Text lineClamp={4}>
                        Trong suốt hơn 24 năm qua, cảm hứng từ gu thẩm mỹ tinh
                        tế và tinh thần “Việt” đã giúp Nhà Xinh tạo ra những
                        thiết kế độc đáo, hợp thời và chất lượng. Nhà Xinh hiện
                        đã mở 10 cửa hàng tại Việt Nam.
                    </Text>
                    <Link to={"/gioi-thieu"}>
                        <Button>Về Mordem Home</Button>
                    </Link>
                </div>
                <div className={Style.banner_right}>
                    <Image src={banner_footer2} />
                </div>
            </div>
        </>
    );
};

export default BannerFooter;
