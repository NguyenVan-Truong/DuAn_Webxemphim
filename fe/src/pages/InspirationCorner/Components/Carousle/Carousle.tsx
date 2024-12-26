import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { banner_footer, banner_footer1 } from "@/assets/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousle.module.scss";


// Custom next arrow using FiChevronRight
const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FiChevronRight className="arrow-icon" />
        </div>
    );
};

// Custom prev arrow using FiChevronLeft
const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FiChevronLeft className="arrow-icon" />
        </div>
    );
};

const Carousle = () => {
    const content = [
        {
            img: banner_footer,
            title: "Nội thất Mây – Mang hơi thở thiên nhiên vào không gian hiện đại",
            description: "Trong cuộc sống đầy bận rộn, tìm kiếm một khoảng không gian yên bình..."
        },
        {
            img: banner_footer1,
            title: "Nội thất Mây – Mang hơi thở thiên nhiên vào không gian hiện đại",
            description: "Trong cuộc sống đầy bận rộn, tìm kiếm một khoảng không gian yên bình..."
        },
        // Có thể thêm nhiều đối tượng nội dung khác
    ];

    // Cấu hình cho slider
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Hiển thị 2 slides
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <Slider {...settings} className="list-products-slider">
                {/* Lặp qua nội dung để tạo div cho mỗi slide */}
                {content.map((item, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <img src={item.img} alt={`Phòng ${index + 1}`} />
                        <div className={styles.textContainer}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousle;

