import BannerIntroduce from "./Components/Banner/BannerIntroduce";
import Values from "./Components/Content/Values";
import Quality from "./Components/Content/Quality";
import StoryNew from "./Components/StoryNews/StoryNew";
import ViewAll from "./Components/ViewAll/ViewAll";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { AboutPages } from "@/model/AboutPages";
import instance from "@/configs/axios";
import Content from "./Components/Content/Content";
import ContentPost from "./Components/Content/ContentPost";
import Loading from "@/extension/Loading";

// Hàm gọi API
const fetchAboutData = async () => {
    const response = await instance.get("/about");
    return response.data;
};

const Introduce = () => {
    // Sử dụng useQuery để gọi API
    const { data, isLoading, error } = useQuery<AboutPages[]>({
        queryKey: ["aboutData"],
        queryFn: fetchAboutData,
    });

    if (isLoading) {
        return <Loading />;
    } // Hiển thị loading spinner khi đang tải
    if (error) return <div>Lỗi khi tải dữ liệu bài viết</div>; // Hiển thị thông báo lỗi nếu có lỗi

    return (
        <>
            {/*Banner*/}
            <BannerIntroduce />
            {/* Content */}
            <Content />
            {/*ContentPost*/}
            <ContentPost />

            {data?.map((item, index) =>
                item.id % 2 === 0 ? (
                    <Values key={index} data={item} />
                ) : (
                    <Quality key={index} data={item} />
                ),
            )}

            {/* Các thành phần khác */}
            {/* <StoryNew />
            <ViewAll /> */}
        </>
    );
};

export default Introduce;
