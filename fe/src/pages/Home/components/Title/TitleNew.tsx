import { Text, Title } from "@mantine/core";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
const TitleNew = () => {
    return (
        <>
            <div className="container mx-auto">
                <div className=" flex items-center pl-5 md:pl-0 space-x-8 border-b border-b-gray-200">
                    <Title order={3} className="border-b-2 border-b-gray-400">
                        Sản Phẩm Nổi Bật
                    </Title>
                    <Text
                        size="md"
                        className="flex items-center space-x-5 hover:text-red-500"
                    >
                        <Link to="/san-pham"> Xem tất cả</Link>
                        <span>
                            <MdNavigateNext className="text-xl" />
                        </span>
                    </Text>
                </div>
            </div>
        </>
    );
};

export default TitleNew;
