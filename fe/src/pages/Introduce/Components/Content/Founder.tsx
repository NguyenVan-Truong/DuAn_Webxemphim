
import { footer } from '@/assets/img';
import styles from './Content.module.scss';

const Founder = () => {
  return (
    <div className={styles.founderContainer}>
      <div className={styles.imageSection}>
        <img src={footer} alt="Nhà sáng lập" className={styles.image} />
      </div>
      <div className={styles.textSection}>
        <h2>Nhà sáng lập</h2>
        <p>
          Ông Nguyễn Quốc Khanh là người sáng lập tập đoàn AA, thương hiệu nội thất Nhà Xinh và hiện tại Ông đang giữ vị trí 
          chủ tịch hiệp hội chế biến gỗ TP.HCM (Hawa).
        </p>
        <p>
          Ông là một kiến trúc sư, nhà thiết kế nội thất, Ông đam mê ngành gỗ cũng 
          như tham vọng mang thương hiệu Việt ra toàn thế giới.
        </p>
      </div>
    </div>
  );
};

export default Founder;
