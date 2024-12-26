import instance from "@/configs/axios";
import { Box, Button, Rating, Textarea } from "@mantine/core";
import { message } from "antd";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";

const ProductReviews = ({ data, onSuccess }: any) => {
    const form = useForm({
        initialValues: {
            rating: 0,
            review: "",
        },
        validate: {
            rating: (value) => {
                if (value === 0) return "Vui lòng đánh giá sản phẩm.";
                return null;
            },
            review: (value) => {
                if (!value.trim()) return "Phản hồi không được để trống.";
                return null;
            },
        },
    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            await instance.post(`/reviews/store/${data?.id}`, {
                rating: values.rating,
                review: values.review,
            });
            modals.closeAll();
            message.success("Đánh giá thành công!");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Sản phẩm: {data?.product_name}
            </h2>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                {/* Rating component */}
                <div className="mb-4 flex items-center space-x-2">
                    <label className="text-gray-700">Đánh giá sản phẩm</label>
                    <Rating
                        value={form.values.rating}
                        onChange={(value) =>
                            form.setFieldValue("rating", value)
                        }
                        size="lg"
                    />
                    {form.errors.rating && (
                        <div className="text-red-500 text-sm mt-1">
                            {form.errors.rating}
                        </div>
                    )}
                </div>

                {/* Textarea for review */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                        Phản hồi của bạn
                    </label>
                    <Textarea
                        value={form.values.review}
                        onChange={(e) =>
                            form.setFieldValue("review", e.target.value)
                        }
                        placeholder="Nhập phản hồi của bạn"
                        minRows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.errors.review && (
                        <div className="text-red-500 text-sm mt-1">
                            {form.errors.review}
                        </div>
                    )}
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    loading={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Gửi đánh giá
                </Button>
            </form>
        </Box>
    );
};

export default ProductReviews;
