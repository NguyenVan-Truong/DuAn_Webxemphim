import style from './InspirationCorner_1.module.scss';
import { BannerBottom2, footer } from '@/assets/img';

const InspirationCorner_1 = () => {
    return (
        <div className={style.imageGallery}>
        {/* Ảnh chính */}
        <div className={style.mainImageContainers}>
          <div className={style.mainImageContainer}>
            <img
            src={BannerBottom2}
            alt="Main Banner"
            className={style.mainImage}
            />
          </div>
        </div>
        {/* Ảnh Giữa */}
        <div className={style.ImageContainers_1}>
          <div className={style.ImageContainer_1}>
            <img
            src={BannerBottom2}
            alt="Main Banner"
            className={style.mainImage}
            />
          </div>
        </div>
  
        {/* Ảnh nhỏ */}
        <div className={style.sideImages}>
          <div className={style.sideImageContainer}>
            <img src={footer} alt="Side Image 1" className={style.sideImage} />
          </div>
          <div className={style.sideImageContainer}>
            <img src={footer} alt="Side Image 2" className={style.sideImage} />
          </div>
        </div>
        </div>     
      
      );
};

export default InspirationCorner_1;