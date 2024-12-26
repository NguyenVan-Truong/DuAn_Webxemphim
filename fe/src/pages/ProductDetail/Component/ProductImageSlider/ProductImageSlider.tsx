import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "../../ProductDetail.scss";

type Props = {
    data: TypeProductDetail | undefined;
};

const ProductImageSlider = ({ data }: Props) => {
    const images = data?.galleries || [];
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    useEffect(() => {
        if (sliderRef1.current && sliderRef2.current) {
            setNav1(sliderRef1.current);
            setNav2(sliderRef2.current);
        }
    }, []);

    const handleImageClick = (index: number) => {
        setCurrentSlide(index);
        nav1?.slickGoTo(index);
    };

    return (
        <div className="slider-container">
            <Image.PreviewGroup>
                <Slider
                    asNavFor={nav2!}
                    ref={sliderRef1}
                    autoplay={true}
                    autoplaySpeed={6000}
                    arrows={false}
                    beforeChange={(oldIndex, newIndex) =>
                        setCurrentSlide(newIndex)
                    }
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            style={{
                                borderRadius: "20px",
                            }}
                        >
                            <Image
                                src={image.image_url}
                                alt={`Product image ${index + 1}`}
                                width="100%"
                                height="100%"
                                style={{
                                    maxWidth: "699px",
                                    minWidth: "699px",
                                    maxHeight: "365px",
                                    minHeight: "365px",
                                    objectFit: "cover",
                                }}
                                className="featured-photo"
                                preview={{
                                    src: image.image_url,
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </Image.PreviewGroup>

            {/* Secondary slider */}
            <Slider
                asNavFor={nav1!}
                ref={sliderRef2}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                autoplay={true}
                autoplaySpeed={6000}
                className="secondary-slider"
            >
                {images.map((image, index) => (
                    <div key={index} onClick={() => handleImageClick(index)}>
                        <img
                            src={image.image_url}
                            alt={`Thumbnail ${index + 1}`}
                            className="secondary-photo"
                            style={{
                                border:
                                    currentSlide === index
                                        ? "1px solid #4F6F52"
                                        : "none",
                                borderRadius: "5px",
                                height: "90px",
                                cursor: "pointer", // Thêm con trỏ để dễ nhận biết khi hover
                                padding: "5px ",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductImageSlider;
