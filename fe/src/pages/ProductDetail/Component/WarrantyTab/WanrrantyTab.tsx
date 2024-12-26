import { Tabs } from "@mantine/core";
import { IconTableSpark, IconTir } from "@tabler/icons-react";

const WanrrantyTab = () => {
    return (
        <Tabs defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab value="gallery" leftSection={<IconTableSpark />}>
                    Bảo hành
                </Tabs.Tab>
                <Tabs.Tab value="messages" leftSection={<IconTir />}>
                    Vận chuyển
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
                <div className="warranty-content">
                    <ul>
                        <li>
                            Các sản phẩm nội thất tại Mordren Home đa số đều
                            được sản xuất tại nhà máy của công ty cổ phần xây
                            dựng kiến trúc AA với đội ngũ nhân viên và công nhân
                            ưu tú cùng cơ sở vật chất hiện đại
                            (http://www.aacorporation.com/). Mordren Home đã
                            kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản
                            phẩm hoàn thiện cuối cùng.
                        </li>
                        <li>
                            Mordren Home bảo hành một năm cho các trường hợp có
                            lỗi về kỹ thuật trong quá trình sản xuất hay lắp
                            đặt.
                        </li>
                        <li>
                            Quý khách không nên tự sửa chữa mà hãy báo ngay cho
                            Nhà Xinh qua hotline: 1800 7200.
                        </li>
                        <li>
                            Sau thời gian hết hạn bảo hành, nếu quý khách có bất
                            kỳ yêu cầu hay thắc mắc thì vui lòng liên hệ với Nhà
                            Xinh để được hướng dẫn và giải quyết các vấn đề gặp
                            phải.
                        </li>
                    </ul>
                    <p>
                        TUY NHIÊN Mordren Home KHÔNG BẢO HÀNH CHO CÁC TRƯỜNG HỢP
                        SAU:
                    </p>
                    <ul>
                        <li>
                            Khách hàng tự ý sửa chữa khi sản phẩm bị trục trặc
                            mà không báo cho Mordren Home.
                        </li>
                        <li>
                            Sản phẩm được sử dụng không đúng quy cách của sổ bảo
                            hành (được trao gửi khi quý khách mua sản phẩm) gây
                            nên trầy xước, móp, dơ bẩn hay mất màu.
                        </li>
                        <li>
                            Sản phẩm bị biến dạng do môi trường bên ngoài bất
                            bình thường (quá ẩm, quá khô, mối hay do tác động từ
                            các thiết bị điện nước, các hóa chất hay dung môi
                            khách hàng sử dụng không phù hợp).
                        </li>
                        <li>Sản phẩm hết hạn bảo hành.</li>
                        <li>
                            Sản phẩm không có phiếu bảo hành của Mordren Home.
                        </li>
                        <li>Xem nội dung sổ bảo hành</li>
                    </ul>
                </div>
            </Tabs.Panel>

            <Tabs.Panel value="messages">
                <div className="shipping-content">
                    <ul>
                        <li>
                            Mordren Home cung cấp dịch vụ giao hàng tận nơi, lắp
                            ráp và sắp xếp vị trí theo đúng ý muốn của quý
                            khách:
                        </li>
                        <li>
                            MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Hồ
                            Chí Minh và Hà Nội, áp dụng cho các đơn hàng trị giá
                            trên 10 triệu.
                        </li>
                        <li>
                            Đối với khu vực các tỉnh lân cận: Tính phí hợp lý
                            theo dựa trên quãng đường vận chuyển
                        </li>
                    </ul>
                </div>
            </Tabs.Panel>
        </Tabs>
    );
};

export default WanrrantyTab;
