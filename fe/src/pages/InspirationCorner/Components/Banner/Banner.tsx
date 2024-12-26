import style from './Banner.module.scss'
import { BannerBottom2, footer } from '@/assets/img'

const Banner = () => {
  return (
    <>
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
          <div className={style.overlay}>
            <p className={style.smallText}>Góc cảm hứng</p>
            <h1>Ý TƯỞNG KHÔNG GIAN SỐNG</h1>
            <button className={style.overlayButton}>XEM THÊM</button>
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
    </>
  )
}

export default Banner;
