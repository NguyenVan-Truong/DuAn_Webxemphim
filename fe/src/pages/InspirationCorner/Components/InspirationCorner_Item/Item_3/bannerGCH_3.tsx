import { banner, banner_footer, banner_footer1, banner_footer4, BannerBottom2, footer, phong_cach_3 } from '@/assets/img';
import styles from '../Item_2/GCH_2.module.scss';
import localstyle from './GCH_3.module.scss';

import { Box, Image, Text } from "@mantine/core";
import InspirationCorner_1 from '../Item_1/InspirationCorner_1';
import ListProducts from '@/Components/ListProduct/Listproduct';


const InspirationCorner_3 = () => {
    return (
        <div>
            {/* Ảnh đầu trang */}

            <div className={localstyle.mainImageContainers1}>
                <div className={localstyle.headerImage1}>
                    <img src={banner} alt="Mô tả ảnh" />
                </div>
                <div className={localstyle.overlay}>
                    <p className={localstyle.smallText}>Góc cảm hứng</p>
                    <h1>PHÒNG KHÁCH TỐI GIẢN, HIỆN ĐẠI CHO NGƯỜI TRẺ</h1>
                    <button className={localstyle.overlayButton}>KHÁM PHÁ NGAY</button>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className={localstyle.content}>
                <h2>Phòng khách tối giản, đa năng</h2>
                <p>
                    Phòng khách tối giản mang đến một không gian thanh lịch và gọn gàng. Nội thất đa năng, với thiết kế tinh tế, không chỉ tiết kiệm diện tích mà còn tạo cảm giác thoải mái và thư giãn. Những món nội thất được lựa chọn kỹ lưỡng, từ bàn nước đến ghế sofa, hòa quyện với màu sắc nhẹ nhàng, tạo nên bầu không khí yên bình. Không gian này thật lý tưởng để thư giãn, bạn có thể thả mình vào nhịp sống hiện đại một cách trọn vẹn.
                </p>
            </div>

            <div className={localstyle.headerImage}>
                <img src={banner} alt="Mô tả ảnh" />
            </div>
            <div>
                <InspirationCorner_1 />
            </div>

            {/* Phần flex */}
            <div className={styles.flexContainer}>
                <div className={styles.flexItemContent}>
                    <h2>Chọn sofa cho phòng khách thanh lịch, cá tính</h2>
                    <p>
                        Phòng khách thanh lịch, cá tính thể hiện phong cách tối giản kết hợp với sự độc đáo riêng biệt của thế hệ trẻ. Ghế sofa Hà Nội mềm mại đến bàn nước nhỏ gọn, mang đến vẻ đẹp thanh lịch cho không gian. Màu sắc trung tính và các đường nét tối giản tạo cảm giác hài hòa, trong khi các chi tiết thiết kế đặc biệt nhấn mạnh cá tính riêng, khẳng định gu thẩm mỹ hiện đại của người trẻ.
                    </p>
                </div>
                <div className={styles.flexItemImage}>
                    <img src={footer} alt="Sofa Ogami" />
                </div>
            </div>

            <div className={localstyle.content}>
                <h2>Phòng khách từ mây – vật liệu thân thiện</h2>
                <p>
                Phòng khách với nội thất từ mây mang lại cảm giác nhẹ nhàng và thanh thoát. Vật liệu tự nhiên này dễ dàng hòa quyện vào không gian, tạo nên vẻ đẹp mộc mạc nhưng vẫn hiện đại, phù hợp với nhịp sống của người trẻ. Một chiếc ghế mây bên cửa sổ đón ánh nắng sớm mai, hay chiếc bàn bên mây nhỏ gọn cho góc thư giãn, tất cả đều toát lên sự tinh tế và linh hoạt. Mỗi món đồ đều tạo dựng nên một không gian sống trẻ trung, gần gũi với thiên nhiên, nhưng vẫn tiện nghi và đầy sáng tạo.
                </p>
            </div>
            <div className={localstyle.headerImage}>
                <img src={banner_footer1} alt="Mô tả ảnh" />
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

export default InspirationCorner_3;
