
import { duong_dai_5_new } from '@/assets/img';
import styles from './Content.module.scss';

interface QualityProps {
    data: {
        image: string | null;
        title: string;
        content: string;
    } | null;
  }

const Quality: React.FC<QualityProps> = ({ data }) => {
    if (!data) return null;
    return (
        <div className={styles.valuesContainer}>

            <div className={styles.imageSection}>
                <img src={duong_dai_5_new} alt="Giá trị của Nhà Xinh" className={styles.image} />
            </div>
            <div className={styles.textSection}>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
                {/* <p>
                Chất lượng của nguyên vật liệu, phụ kiện và quy trình sản xuất đều được kiểm định và giám sát chặt chẽ bởi hệ thống quản lý chất lượng ISO 9001. Sản phẩm của Nhà Xinh được thiết kế theo định hướng công năng sử dụng, thẩm mỹ và chất lượng. Trong những năm gần đây, thương hiệu luôn hướng đến xu hướng thiết kế xanh nhằm đóng góp không chỉ một không gian sống tiện nghi mà còn là một môi trường sống trong lành cho người sử dụng và cộng đồng.
                </p>
                <p>
                Bên cạnh đó, Nhà Xinh tự hào sở hữu đội ngũ tư vấn thiết kế và kỹ sư chuyên nghiệp, có kiến thức sâu rộng trong lĩnh vực đồ gỗ nội thất. Tập thể nhân viên tại Nhà Xinh cam kết nỗ lực tư vấn và trợ giúp khách hàng lựa chọn sản phẩm ưng ý nhất.
                </p> */}
            </div>
        </div>
    );
};

export default Quality;
