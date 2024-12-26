import { banner, banner_footer, banner_footer1, banner_footer4, BannerBottom2, footer, phong_cach_3 } from '@/assets/img';
import styles from './GCH_2.module.scss';

import { Box, Image, Text } from "@mantine/core";
import ListProducts from '@/Components/ListProduct/Listproduct';

const InspirationCorner_2 = () => {
    return (
        <div>
            {/* Ảnh đầu trang */}
            <div className={styles.headerImage}>
                <img src={banner} alt="Mô tả ảnh" />
            </div>

            {/* Nội dung chính */}
            <div className={styles.content}>
                <p>
                    Khi mùa thu về, Không gian sống của bạn cần một làn gió mới để hòa mình vào vẻ đẹp nhẹ nhàng của thời tiết. Nhà Xinh xin giới thiệu những gợi ý không gian thư giãn tinh tế, giúp bạn tận hưởng những khoảnh khắc êm đềm trong ngày thu se lạnh.
                </p>
            </div>

            {/* Phần flex */}
            <div className={styles.flexContainer}>
                <div className={styles.flexItemContent}>
                    <h2>Góc thư giãn bên cửa sổ lớn với sofa Ogami</h2>
                    <p>
                        Sofa Ogami thời thượng, đặt cạnh cửa sổ lớn, là nơi lý tưởng để thư giãn và ngắm nhìn khung cảnh thu nhẹ nhàng. 
                        Thiết kế độc đáo cùng lớp vải mềm mại mang lại sự thoải mái tối đa. 
                        Thêm bàn nước và tivi Ogami, góc thư giãn của bạn sẽ trở nên hài hòa, trọn vẹn với sự yên bình và lãng mạn của mùa thu.
                    </p>
                </div>
                <div className={styles.flexItemImage}>
                    <img src={footer} alt="Sofa Ogami" />
                </div>
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.flexItemContent}>
                    <h2>Phòng khách ấm cúng với sofa Sài Gòn</h2>
                    <p>
                        Với chất liệu vải cao cấp và thiết kế tối giản, sofa Sài Gòn không chỉ mang đến sự thoải mái mà còn tạo cảm giác gần gũi. Kết hợp với bàn nước gỗ 2 tầng linh hoạt và những chiếc gối tựa màu xinh xắn, không gian sẽ trở nên ấm cúng, lý tưởng cho những buổi quây quần bên gia đình trong những ngày thu.
                    </p>
                </div>
                <div className={styles.flexItemImage}>
                    <img src={footer} alt="Sofa Ogami" />
                </div>
            </div>
            <div className={styles.flexContainer1}>
                <div className={styles.flexItemImage1}>
                    <img src={phong_cach_3} alt="Sofa Ogami" />
                </div>
                <div className={styles.flexItemContent1}>
                    <h2>Góc thiền tĩnh lặng với ghế armchair Mây</h2>
                    <p>
                        Một góc thiền với ghế armchai thư giãn Mây là nơi lý tưởng để bạn tìm lại sự tĩnh lặng giữa nhịp sống hối hả. Thiết kế mộc mạc với khung gỗ và phần đệm bọc vải mềm mại giúp bạn kết nối gần hơn với thiên nhiên. Thêm vài chậu cây xanh và ánh sáng nhẹ nhàng từ cửa sổ, không gian sẽ trở nên thư thái, phù hợp cho việc thiền định hoặc chỉ đơn giản là thư giãn.
                    </p>
                </div>                
            </div>
            <div className={styles.flexContainer}>
                <div className={styles.flexItemContent}>
                    <h2>Không gian đọc sách với bàn nước Hùng King</h2>
                    <p>
                        Thu sang, là lúc lý tưởng để bạn đắm chìm trong những cuốn sách hay. Bàn nước Hùng King với thiết kế tinh tế, sẽ trở thành điểm nhấn cho góc đọc yêu thích của bạn. Kết hợp cùng ghế armchair êm ái và ánh sáng dịu nhẹ, không gian như bừng lên nét ấm áp, mời gọi bạn tận hưởng những khoảnh khắc thư giãn tuyệt vời bên trang sách.
                    </p>
                </div>
                <div className={styles.flexItemImage}>
                    <img src={footer} alt="Sofa Ogami" />
                </div>
            </div>
            <div className={styles.flexContainer2}>
                <div className={styles.flexItemContent2}>
                    <h2>Phòng khách mở với bàn nước Valente</h2>
                    <p>
                    Một phòng khách mở sẽ tạo cảm giác thông thoáng và dễ chịu. Bàn nước Valente với thiết kế tối giản, chân kim loại kết hợp mặt đá tự nhiên, tạo nên sự hài hòa giữa tính thẩm mỹ và công năng. Đặt bàn ở giữa phòng khách, kết hợp với ghế sofa và thảm trải sàn ấm áp, bạn sẽ có ngay một không gian lý tưởng để quây quần cùng bạn bè và gia đình.
                    </p>
                </div>
                <div className={styles.flexItemImage2}>
                    <img src={BannerBottom2} alt="Sofa Ogami" />
                </div>
            </div>
            <div className={styles.content}>
                <p>
                    Với những gợi ý từ Nhà Xinh, bạn có thể dễ dàng tạo ra những không gian thư giãn tuyệt vời và nhẹ nhàng của mùa thu. Hãy để ngôi nhà của bạn trở thành chốn dừng chân lý tưởng trong những ngày se lạnh này!
                </p><br />
                <p>
                    Tham khảo Phòng khách tối giản, hiện đại cho người trẻ
                </p><br />
                <p>
                    Xem các mẫu armchair trẻ trung
                </p><br />
                <p>
                    Xem thêm các mẫu bàn nước thanh lịch, hiện đại
                </p>
            </div>
            <div>
                <div className={styles.producttitle}>
                    <p>Sản Phẩm Nội Thất Trong Phòng</p>
                </div>
                <ListProducts />
            </div>
            <div>
                <div className={styles.producttitle}>
                    <p>Thêm lựa chọn</p>
                </div>
                <div className="flex flex-col xl:flex-row space-y-5 md:space-y-0 md:space-x-2">
                        <div className="flex-1 flex flex-col items-center mb-4">
                            <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer}
                                    alt="Banner Footer"
                                />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào
                                không gian hiện đại
                            </h1>
                            <div className="w-[40px] h-[2px] bg-slate-300 mb-1"></div>
                            <Box maw={500} w="100%">
                                <Text size="sm" truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một
                                    khoảng không gian yên bình để thư giãn và
                                    cân bằng tâm hồn là điều quý giá. Nội thất
                                    mây không chỉ làm dịu mát không gian sống mà
                                    còn gợi lên cảm giác thanh bình, an yên, kết
                                    nối con người với thiên nhiên. BST Mây mới
                                    của Nhà Xinh là minh chứng hoàn hảo cho sự
                                    hài hòa này, đem đến một luồng gió mới cho
                                    không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="h-[300px] md:h-[400px] w-full">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer1}
                                    alt="Banner Footer"
                                />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào
                                không gian hiện đại
                            </h1>
                            <div className="w-[40px] h-[2px] bg-slate-300 mb-1"></div>
                            <Box maw={500} w="100%">
                                <Text size="sm" truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một
                                    khoảng không gian yên bình để thư giãn và
                                    cân bằng tâm hồn là điều quý giá. Nội thất
                                    mây không chỉ làm dịu mát không gian sống mà
                                    còn gợi lên cảm giác thanh bình, an yên, kết
                                    nối con người với thiên nhiên. BST Mây mới
                                    của Nhà Xinh là minh chứng hoàn hảo cho sự
                                    hài hòa này, đem đến một luồng gió mới cho
                                    không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                    </div>
                    <br /><br /><br />
            </div>
            <div className={styles.headerImage}>
                <img src={banner_footer4} alt="Mô tả ảnh" />
            </div>
        </div>
    );
}

export default InspirationCorner_2;
