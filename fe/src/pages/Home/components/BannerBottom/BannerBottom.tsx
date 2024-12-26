import { BannerBottom3 } from "@/assets/img";
import { Button } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import styles from "./BannerBottom.module.scss";
type Props = {};

const BannerBottom = (props: Props) => {
    return (
        <div className={styles.bannerBottom}>
            <img
                src={BannerBottom3}
                alt="Decorative banner"
                className={styles.bannerBottomImage}
            />
            <div className={styles.bannerBottomContent}>
                <h2 className={styles.bannerBottomTitle}>MORDEN HOME</h2>
                <p>LÀM CHO NGÔI NHÀ BẠN THÊM TRANG TRỌNG</p>
                <div className="flex justify-start">
                    <Button
                        className={styles.bannerBottomButton}
                        variant="outline"
                        color="rgba(0, 0, 0, 1)"
                        size="md"
                        radius="xs"
                        rightSection={<IconArrowNarrowRight size={20} />}
                    >
                        Tìm cửa hàng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BannerBottom;
