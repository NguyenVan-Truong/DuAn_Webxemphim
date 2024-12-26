

import { ghe_ngoi_lam_viec_phu_hop_4 } from '@/assets/img';
import styles from './Content.module.scss';

interface ValuesProps {
    data: {
        image: string | null;
        title: string;
        content: string;
    } | null;
  }

const Values: React.FC<ValuesProps> = ({ data }) => {
    if (!data) return null;
    return (
        <div className={styles.valuesContainer}>            
            <div className={styles.textSection}>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
                {/* <p>
                    Với mong muốn phát triển thương hiệu Việt bằng nội lực, Nhà Xinh đã chú trọng vào thiết kế và sản xuất nội thất trong nước.
                    Danh mục sản phẩm của Nhà Xinh thường xuyên được đổi mới và cập nhật, liên tục cung cấp cho khách hàng các dòng sản phẩm theo xu hướng mới nhất.
                </p>
                <p>
                    Hơn 70% sản phẩm của Nhà Xinh được thiết kế, sản xuất bởi đội ngũ nhân viên cùng công nhân ưu tú với nhà máy có cơ sở vật chất hiện đại bậc nhất tại Việt Nam.
                </p>
                <p>
                    Sự khác biệt của Nhà Xinh chính là sáng tạo nội thất thành phong cách riêng, phù hợp với nhu cầu khách hàng.
                    Không chỉ là sản phẩm nội thất đơn thuần, mà còn là không gian sống theo phong cách riêng với cách bày trí hài hòa từ đồ nội thất kết hợp với đồ trang trí.
                    Giúp khách hàng cảm nhận được một không gian sống thực sự, cảm thấy thoải mái để tận hưởng cuộc sống.
                </p> */}
            </div>
            <div className={styles.imageSection}>
                <img src={ghe_ngoi_lam_viec_phu_hop_4} alt="Giá trị của Nhà Xinh" className={styles.image} />
            </div>
        </div>
    );
};

export default Values;
