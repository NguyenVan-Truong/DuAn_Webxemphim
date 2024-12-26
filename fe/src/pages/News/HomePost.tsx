import { Posts } from "@/model/Posts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./News.module.scss";
import instance from "@/configs/axios";
import { useNavigate, Outlet } from "react-router-dom";
import Loading from "@/extension/Loading";
import { Text } from "@mantine/core";
const HomePost = () => {
    const navigate = useNavigate();
    const fetchPosts = async (): Promise<Posts[]> => {
        const response = await instance.get("/posts");
        return response.data;
    };
    const {
        data: postsNew,
        isLoading,
        isError,
    } = useQuery<Posts[]>({
        queryKey: ["postsnew"],
        queryFn: fetchPosts,
    });
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <p>lỗi</p>;
    }
    const handlePostClick = (slug: string, postId: number) => {
        // Truyền thêm `postId` vào state
        navigate(`/tin-tuc/chi-tiet-bai-viet/${slug}`, {
            state: {
                postId: postId, // Dữ liệu cần truyền
            },
        });
    };
    return (
        <div className={styles.postContainer}>
            {/* Sidebar hiển thị danh sách tiêu đề */}
            <div className={styles.postSidebar}>
                <h3 className={styles.sidebarTitle}>BÀI VIẾT MỚI NHẤT</h3>
                <ul className={styles.sidebarList}>
                    {postsNew?.map((post) => (
                        <li
                            key={post.id}
                            className={styles.sidebarItem}
                            onClick={() => handlePostClick(post.slug, post.id)}
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className={styles.sidebarImage}
                            />
                            <Text lineClamp={3}>{post.title}</Text>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Khu vực chính hiển thị các bài viết tóm tắt */}
            <div className={styles.postMain}>
                <Outlet />
            </div>
        </div>
    );
};

export default HomePost;
