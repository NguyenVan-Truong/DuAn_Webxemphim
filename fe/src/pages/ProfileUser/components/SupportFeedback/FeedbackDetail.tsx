import instance from "@/configs/axios";
import { Feedback } from "@/model/Supports";
import React, { useEffect, useState } from "react";
import { Badge, Image } from "@mantine/core";

type FeedbackDetailProps = {
    id: number;
};
const FeedbackDetail = ({ id }: FeedbackDetailProps) => {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    useEffect(() => {
        (async () => {
            const reponse = await instance.get(`/contacts/${id}`);
            setFeedback(reponse.data.data.contacts);
        })();
    }, []);
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4 w-[500px] mx-auto">
            {feedback.map((item) => (
                <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4 items-start hover:shadow-lg transition-shadow duration-300"
                >
                    {/* Hình ảnh đính kèm */}
                    <div className="flex-shrink-0">
                        {item.image && (
                            <Image
                                src={item.image}
                                alt="Hình ảnh đính kèm"
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        )}
                    </div>

                    {/* Nội dung chi tiết */}
                    <div className="flex-grow space-y-3 w-full">
                        {/* Nội dung phản hồi */}
                        <div className="text-lg font-bold text-gray-800">
                            {item.content}
                        </div>

                        {/* Phản hồi */}
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Phản hồi: </span>
                            {item.response ? (
                                <span className="text-gray-700">
                                    {item.response}
                                </span>
                            ) : (
                                <span className="text-red-500">
                                    Chưa phản hồi
                                </span>
                            )}
                        </div>

                        {/* Thời gian tạo */}
                        <div className="text-sm text-gray-500">
                            <span className="font-medium">Ngày gửi: </span>
                            {new Date(item.created_at).toLocaleDateString(
                                "vi-VN",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                },
                            )}
                        </div>

                        {/* Trạng thái */}
                        <div>
                            <Badge
                                color={
                                    item.status === "đã phản hồi"
                                        ? "green"
                                        : "red"
                                }
                            >
                                {item.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedbackDetail;
