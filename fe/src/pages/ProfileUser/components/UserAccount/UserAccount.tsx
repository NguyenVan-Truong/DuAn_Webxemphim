import { AvatarDefault } from "@/assets/img";
import {
    Avatar,
    Button,
    Group,
    Image,
    Menu,
    Radio,
    Text,
    TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
    IconCards,
    IconDoorExit,
    IconHeart,
    IconMapPin,
    IconMenuDeep,
    IconShoppingCart,
    IconUser,
} from "@tabler/icons-react";
import FormUpdate from "./FormUpdate";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/model/User";
import { formatDateNotTimeZone } from "@/model/_base/Date";
import Loading from "@/extension/Loading";

// Khai báo fetchData trước khi sử dụng trong useQuery
const fetchData = async () => {
    const response = await instance.get("/auth/profile");
    return response.data;
};

const UserAccount = () => {
    const { data, error, isLoading, isError, refetch } = useQuery<UserProfile>({
        queryKey: ["profile"],
        queryFn: fetchData,
    });

    const handleAdd = () => {
        // Mở modal mà không cần lưu id
        modals.openConfirmModal({
            title: "Cập nhật thông tin",
            size: "525px",
            children: (
                <FormUpdate
                    onSuccess={() => {
                        refetch();
                    }}
                    modals={modals}
                />
            ),
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Không có thông tin hồ sơ để hiển thị.</div>;
    }

    return (
        <div className="bg-white !pb-6 h-[610px]">
            <div className="px-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="mt-4">
                        <Text size="xl">Hồ sơ của tôi</Text>
                        <Text size="md" className="!mb-2 !text-[#9B9B9B]">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản{" "}
                        </Text>
                    </div>
                    <div className="block lg:hidden">
                        <Menu position="bottom-end" shadow="md" width={230}>
                            <Menu.Target>
                                <IconMenuDeep />
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconUser size="1rem" />}
                                >
                                    Thông tin cá nhân
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconShoppingCart size="1rem" />
                                    }
                                >
                                    Danh sách đơn hàng
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconMapPin size="1rem" />}
                                >
                                    Quản lý địa chỉ
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconHeart size="1rem" />}
                                >
                                    Sản phẩm yêu thích
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconCards size="1rem" />}
                                >
                                    Thẻ ưu đãi
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconDoorExit size="1rem" />}
                                >
                                    Đăng xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>
                <form
                    action=""
                    className="mt-5 grid grid-cols-1 md:grid-cols-[65%_35%] gap-6 bg-gradient-to-r from-beige-100 to-green-100 rounded-xl shadow-lg"
                >
                    <div className="space-y-6 p-6 bg-gradient-to-r from-beige-100 to-green-100 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Email:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.email || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Tên người dùng:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.full_name || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Số điện thoại:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.phone || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Địa chỉ:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.address || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Tỉnh/Thành phố:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.province || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Quận/Huyện:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.district || "Không có dữ liệu"}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Text className="w-1/3 text-lg font-bold text-brown-700">
                                Phường/Xã:
                            </Text>
                            <div className="flex-grow text-brown-600 cursor-not-allowed">
                                {data.ward || "Không có dữ liệu"}
                            </div>
                        </div>
                    </div>
                    <div className=" border-neutral-200 items-center my-auto">
                        <div className="flex justify-center ">
                            <img
                                src={data.avatar}
                                alt="avatar"
                                className="rounded-full h-48 w-48 border-4 border-neutral-400 shadow-md"
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button
                                className="bg-brown-600 hover:bg-brown-700 text-white py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
                                onClick={() => handleAdd()}
                            >
                                Sửa thông tin
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserAccount;
