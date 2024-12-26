import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios"; // Cấu hình axios
import styles from "../News.module.scss";
import { PostCatelogues, Posts } from "@/model/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "@/extension/Loading";

// Component PostDetail (hiển thị chi tiết bài viết)
const PostDetail: React.FC<{ post: Posts | null }> = ({ post }) => {
    if (!post) {
        return <p>Chọn một bài viết để xem chi tiết.</p>;
    }
    return (
        <div className={styles.postDetail}>
            <img
                src={post.image}
                alt={post.title}
                className={styles.detailImage}
            />
            <h2 className={styles.detailTitle}>{post.title}</h2>
            <p className={styles.detailMetaDescription}>
                {post.meta_description}
            </p>
            <div
                className={styles.detailContent}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <p className={styles.detailUpdatedAt}>
                Cập nhật: {new Date(post.updated_at).toLocaleString()}
            </p>
        </div>
    );
};

const PostDetails = () => {
    const location = useLocation(); // Lấy state từ location
    const { postId } = location.state || {}; // Lấy postId từ location.state

    // Hàm fetch chi tiết bài viết từ API
    const fetchPostDetail = async (postId: number): Promise<Posts> => {
        const response = await instance.get(`/posts/${postId}`);
        return response.data;
    };

    // Query để fetch chi tiết bài viết (dựa vào postId)
    const {
        data: post,
        isLoading: postLoading,
        isError: postError,
    } = useQuery<Posts>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostDetail(postId!), // Gọi API với postId
        enabled: !!postId, // Chỉ gọi API khi postId có giá trị
    });

    // Kiểm tra trạng thái loading và error
    if (postLoading) {
        return <Loading />;
    }

    if (postError || !post) {
        return <p>Đã xảy ra lỗi khi tải bài viết.</p>;
    }
    return (
        <>
            <PostDetail post={post} /> {/* Hiển thị chi tiết bài viết */}
        </>
    );
};

export default PostDetails;
