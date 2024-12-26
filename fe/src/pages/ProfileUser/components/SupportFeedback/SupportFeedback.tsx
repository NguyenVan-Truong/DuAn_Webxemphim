import React from "react";
import {
    Card,
    Grid,
    Text,
    Badge,
    Button,
    Loader,
    Image,
    Box,
    Tooltip,
} from "@mantine/core";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { message, Popconfirm } from "antd";
import { Feedback } from "@/model/Supports";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import FeedbackDetail from "./FeedbackDetail";
import Loading from "@/extension/Loading";

const SupportFeedback = () => {
    const queryClient = useQueryClient();

    // Hàm lấy dữ liệu
    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập độ trễ
        const response = await instance.get("/contacts/show");
        return response?.data?.data?.contacts.data || []; // Trả về danh sách phản hồi
    };

    // Sử dụng useQuery với kiểu dữ liệu cụ thể
    const { data, error, isLoading, isError, refetch } = useQuery<Feedback[]>({
        queryKey: ["contactShow"],
        queryFn: fetchData,
    });

    // Hàm xóa phản hồi
    const deleteFeedback = async (id: number) => {
        await instance.delete(`contacts/${id}`);
    };

    const mutation = useMutation({
        mutationFn: deleteFeedback,
        onSuccess: () => {
            refetch(); // Gọi lại hàm fetch để lấy dữ liệu mới
            message.success("Xóa thành công");
        },
        onError: (error) => {
            console.error("Error deleting feedback:", error);
            message.error("Xóa không thành công"); // Hiển thị thông báo lỗi
        },
    });

    // Hiển thị khi đang tải dữ liệu
    if (isLoading) {
        return <Loading />;
    }

    // Hiển thị thông báo lỗi nếu có
    if (isError) {
        console.error(error);
        return (
            <Text color="red">
                Có lỗi xảy ra khi tải dữ liệu: {error.message}
            </Text>
        );
    }

    const callApiGetData = async (id: number) => {
        modals.openConfirmModal({
            title: "Thư hỗ trợ",
            size: "550px",
            children: <FeedbackDetail id={id} />,
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };

    return (
        <div className="p-5 bg-white h-[612px]">
            <Text size="xl" mb="xl">
                Danh sách thư hỗ trợ đã gửi
            </Text>
            <hr />
            <Grid gutter="md" className="mt-8 ">
                {data?.map((feedback: Feedback) => (
                    <div
                        key={feedback.id}
                        className="container flex items-center shadow-md bg-slate-100 mx-auto rounded-md !mb-2 cursor-pointer"
                    >
                        <div
                            className="p-4 flex  md:space-x-5 xl:space-x-8 items-center"
                            onClick={() => callApiGetData(feedback.id)}
                        >
                            <Box w={295}>
                                <Text truncate="end">{feedback.content}</Text>
                            </Box>
                            <Box w={295}>
                                <Text truncate="end">
                                    {feedback.response
                                        ? feedback.response
                                        : "......"}
                                </Text>
                            </Box>
                            <div>
                                {dayjs(feedback.created_at).format(
                                    "DD-MM-YYYY",
                                )}
                            </div>
                            <Badge
                                color={
                                    feedback.status === "đã phản hồi"
                                        ? "green"
                                        : "red"
                                }
                            >
                                {feedback.status}
                            </Badge>
                        </div>
                        {feedback.status === "chưa phản hồi" ? (
                            <></>
                        ) : (
                            <Popconfirm
                                placement="topRight"
                                title={"Bạn có chắc muốn xóa ko ?"}
                                okText="Có"
                                cancelText="Ko"
                                className="mx-auto"
                                onConfirm={() => mutation.mutate(feedback.id)}
                            >
                                <Tooltip label="Xóa">
                                    <Button
                                        color="red"
                                        variant="transparent"
                                        size="xs"
                                    >
                                        <IconTrash />
                                    </Button>
                                </Tooltip>
                            </Popconfirm>
                        )}
                    </div>
                ))}
            </Grid>
        </div>
    );
};

export default SupportFeedback;
