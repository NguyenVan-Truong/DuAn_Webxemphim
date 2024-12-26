import styles from "./StoryNew.module.scss";
import { Posts } from "@/model/Posts";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import instance from "@/configs/axios";

// Hàm gọi API
const fetchPostsData = async () => {
    const response = await instance.get("/posts");
    return response.data.data;
};

const StoryNew = () => {
    // Sử dụng useQuery để lấy dữ liệu từ API
    const {
        data: newsData,
        isLoading,
        error,
    } = useQuery<Posts[]>({
        queryKey: ["postsData"],
        queryFn: fetchPostsData,
    });

    // Kiểm tra trạng thái tải dữ liệu
    if (isLoading) return <Loader />; // Hiển thị loading spinner khi đang tải
    if (error) return <div>Lỗi khi tải dữ liệu bài viết</div>; // Hiển thị thông báo lỗi nếu có lỗi
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Câu Chuyện</h1>
            <div className={styles.newsContainer}>
                {newsData?.map((newsItem) => (
                    <div key={newsItem.id} className={styles.newsItem}>
                        <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className={styles.newsImage}
                        />
                        <div className={styles.newsDetails}>
                            <div className={styles.newsDate}>
                                {new Date(
                                    newsItem.created_at,
                                ).toLocaleDateString()}
                            </div>
                            <h2 className={styles.newsTitle}>
                                {newsItem.title}
                            </h2>
                            <p className={styles.newsDescription}>
                                {newsItem.meta_description}
                            </p>
                        </div>
                    </div>
                ))}
                {/* <div className={styles.newsItem}>
                    <img src={duong_dai_6} alt="Tập đoàn AA Corporation" className={styles.newsImage} />
                    <div className={styles.newsDetails}>
                        <div className={styles.newsDate}>11 Jun</div>
                        <h2 className={styles.newsTitle}>Tập đoàn AA Corporation Gây Ấn Tượng Tại INDEX Dubai 2024</h2>
                        <p className={styles.newsDescription}>
                            Gian hàng của AA Corporation tại INDEX 2024 nổi bật với thiết kế độc đáo, thu hút sự chú ý từ khách tham quan.
                        </p>
                    </div>
                </div>
                <div className={styles.newsItem}>
                    <img src={duong_dai_5_new} alt="Bàn làm việc Wing" className={styles.newsImage} />
                    <div className={styles.newsDetails}>
                        <div className={styles.newsDate}>16 Apr</div>
                        <h2 className={styles.newsTitle}>Bàn làm việc Wing tại Milan Design Week 2024</h2>
                        <p className={styles.newsDescription}>
                            Là thiết kế Việt đầu tiên đạt giải thưởng danh giá iF Design Award 2024, Bàn làm việc Wing nhận được nhiều sự chú ý từ cộng đồng thiết kế quốc tế.
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default StoryNew;
