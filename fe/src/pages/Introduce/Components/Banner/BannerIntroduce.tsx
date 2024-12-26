import { gioi_thieu } from "@/assets/img";
import styles from "./BannerIntroduce.module.scss";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { BannerHome } from "@/model/Banner";
import Loading from "@/extension/Loading";
import { Link } from "react-router-dom";

const BannerIntroduce = () => {
    const fetchData = async () => {
        const response = await instance.get("/banners-introduce");
        return response.data.data;
    };
    const { data, error, isLoading, isError } = useQuery<BannerHome>({
        queryKey: ["banners-introduce"],
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
        <div className={styles.container}>
            <div className={styles.banner}>
                <img
                    src={data.image}
                    alt="Nhà Xinh"
                    className={styles.bannerImage}
                />
                <div className={styles.overlay}>
                    <p className={styles.leftText}> {data.title}</p>
                    <div className={styles.rightButtons}>
                        <Link to={"/"}>
                            <button className={styles.button}>Trang chủ</button>
                        </Link>
                        <button className={styles.button}>Giới thiệu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerIntroduce;
