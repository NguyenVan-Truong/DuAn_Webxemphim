import instance from "@/configs/axios"; // Cấu hình axios
import Loading from "@/extension/Loading";
import { Posts } from "@/model/Posts";
import styles from "@/pages/News/News.module.scss";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Component PostCard (hiển thị chi tiết một bài viết tóm tắt)
const PostCard: React.FC<{ post: Posts }> = ({ post }) => {
    const navigate = useNavigate();
    const handlePostClick = () => {
        navigate(`/tin-tuc/chi-tiet-bai-viet/${post.slug}`, {
            state: {
                postId: post.id, // Truyền postId qua state
            },
        });
    };

    return (
        <div className={styles.postCard} onClick={handlePostClick}>
            <img
                src={post.image}
                alt={post.title}
                className={styles.postImage}
            />
            <div className={styles.postContent}>
                <Text lineClamp={1}>
                    <h4 className={styles.postTitle}>{post.title}</h4>
                </Text>
                <Text lineClamp={3}>
                    <p className={styles.postDescription}>
                        {post.meta_description}
                    </p>
                </Text>
            </div>
        </div>
    );
};

const PostList = () => {
    const location = useLocation();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    useEffect(() => {
        const categoryId = location.state?.id;
        if (categoryId) {
            setSelectedCategoryId(categoryId);
        }
    }, [location.state]);
    // console.log("Category ID từ location.state:", location.state.id);

    const fetchPostsByCategory = async (
        categoryId: number | null,
    ): Promise<Posts[]> => {
        if (categoryId) {
            const response = await instance.get(
                `/get-post-by-catelogue/${categoryId}`,
            );
            return response.data;
        } else {
            // Fetch tất cả bài viết nếu không có danh mục
            const response = await instance.get("/get-post-by-catelogue/25");
            return response.data;
        }
    };

    const {
        data: posts,
        isLoading: postsLoading,
        isError: postsError,
    } = useQuery<Posts[]>({
        queryKey: ["posts", selectedCategoryId],
        queryFn: () => fetchPostsByCategory(selectedCategoryId),
    });
    if (postsLoading) {
        return (
            <p>
                <Loading />
            </p>
        );
    }

    if (postsError || !posts) {
        return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;
    }

    return (
        <>
            {/* Khu vực chính hiển thị các bài viết tóm tắt */}

            {posts?.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <p>Không có bài viết nào trong danh mục này.</p>
            )}
        </>
    );
};

export default PostList;
