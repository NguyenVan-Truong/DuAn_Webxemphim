import instance from "@/configs/axios"; // Giả sử bạn có instance axios đã cấu hình sẵn
import { UploadOutlined } from "@ant-design/icons";
import { Select, TextInput, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import ImgCrop from "antd-img-crop";
import { message, Upload } from "antd";
import moment from "moment";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

type FormUpdateProps = {
    onSuccess: () => void;
    modals: any;
};

const FormUpdate = ({ onSuccess, modals }: FormUpdateProps) => {
    const userProFile = JSON.parse(localStorage.getItem("userProFile") || "{}");
    const [fileList, setFileList] = useState<any[]>([]);
    const [valueCity, setValueCity] = useState([]);
    const [checkedValueCity, setCheckedValueCity] = useState(
        userProFile.province_id,
    );
    const [loading, setLoading] = useState(false);
    // thông tin quận huyện
    const [valueDistrict, setValueDistrict] = useState([]);
    const [checkedValueDistrict, setCheckedValueDistrict] = useState(
        userProFile.district_id,
    );
    // thông tin phường xã
    const [valueWard, setValueWard] = useState([]);
    const [checkedValueWard, setCheckedValueWard] = useState(
        userProFile.ward_id,
    );
    // Form hook từ Mantine
    const form = useForm({
        initialValues: {
            full_name: "",
            phone: "",
            address: "",
            // birthday: null as any,
            city: null,
            district: null,
            ward: null,
        },
        validate: {
            full_name: (value) =>
                value ? null : "Vui lòng nhập tên người dùng",
            phone: (value) => (value ? null : "Vui lòng nhập số điện thoại"),
            address: (value) => (value ? null : "Vui lòng nhập địa chỉ"),
            // birthday: (value) => (value ? null : "Vui lòng chọn ngày sinh"),
            city: (value) => (!value ? "Thành phố là bắt buộc" : null),
            district: (value) => (!value ? "Quận/Huyện là bắt buộc" : null),
            ward: (value) => (!value ? "Phường/Xã là bắt buộc" : null),
        },
    });

    // Chọn tỉnh
    const onhandleSelectCity = async () => {
        try {
            const response = await instance.get("/getAllProvinces");
            if (response && response.status === 200) {
                const transformedData = response.data.content.map(
                    (item: any) => ({
                        value: item.code,
                        label: item.name,
                    }),
                );
                setValueCity(transformedData);
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Lỗi không thể lấy dữ liệu",
                color: "red",
            });
        }
    };

    // Chọn quận huyện
    const onhandleSelectDistrict = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=district&data[province_id]=${checkedValueCity === null ? form.getValues().city : checkedValueCity}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );
                const options = Array.from(doc.querySelectorAll("option"));
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueDistrict(transformedData as []);
            }
        } catch (error) {
            notifications.show({
                title: "Lỗi",
                message: "Lỗi không thể lấy dữ liệu",
                color: "red",
            });
        }
    };

    // Chọn phường xã
    const onhandleSelectWart = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=ward&data[district_id]=${checkedValueDistrict === null ? form.getValues().district : checkedValueDistrict}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );

                // Lấy tất cả các phần tử <option>
                const options = Array.from(doc.querySelectorAll("option"));
                // Chuyển đổi thành mảng các đối tượng với code và name
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueWard(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Hàm gọi API để lấy dữ liệu ban đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/auth/profile");
                const data = response.data;

                // Cập nhật dữ liệu lên form
                form.setValues({
                    full_name: data.full_name,
                    phone: data.phone,
                    address: data.address,
                    // birthday: data.birthday,
                    city: data.province_id,
                    district: data.district_id,
                    ward: data.ward_id,
                });

                // Cập nhật fileList cho avatar nếu có
                if (data.avatar) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "avatar",
                            status: "done",
                            url: data.avatar,
                        },
                    ]);
                } else {
                    setFileList([]);
                }

                // Cập nhật giá trị tỉnh/thành phố, quận/huyện, phường/xã
                // if (data.province) {
                //     setCheckedValueCity(data.province_id);
                //     await onhandleSelectDistrict(data.province_id); // Chuyển tỉnh để lấy quận/huyện
                // }
                // if (data.district) {
                //     setCheckedValueDistrict(data.district);
                //     await onhandleSelectWard(data.district); // Chuyển quận để lấy phường/xã
                // }
                // if (data.ward) {
                //     setCheckedValueWard(data.ward);
                // }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        Promise.all([fetchData(), onhandleSelectCity()]);
    }, []);
    useEffect(() => {
        form.setFieldValue("district", null);
        form.setFieldValue("ward", null);
        onhandleSelectDistrict();
    }, [checkedValueCity]);
    useEffect(() => {
        onhandleSelectWart();
    }, [checkedValueDistrict]);
    const onChange = (info: any) => {
        setFileList(info.fileList);
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("full_name", values.full_name);
            formData.append("phone", values.phone);
            formData.append("address", values.address);
            // formData.append(
            //     "birthday",
            //     values.birthday
            //         ? moment(values.birthday).format("YYYY-MM-DD")
            //         : "",
            // );
            formData.append("province_id", checkedValueCity || "");
            formData.append("district_id", checkedValueDistrict || "");
            formData.append("ward_id", checkedValueWard || "");

            if (fileList.length > 0) {
                formData.append("avatar", fileList[0].originFileObj);
            }

            const response = await instance.post(
                "/auth/update-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            message.success("Cập nhật thông tin thành công!");
            const {
                rule_id,
                status,
                updated_at,
                user_agent,
                last_login,
                created_at,
                deleted_at,
                birthday,
                ...userProfile
            } = response.data.user;

            localStorage.setItem("userProFile", JSON.stringify(userProfile));
            onSuccess();
            setLoading(false);
            modals.closeAll();
        } catch (error) {
            message.error("Cập nhật thông tin thất bại!");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
            <TextInput
                label="Tên người dùng"
                placeholder="Nhập tên người dùng"
                {...form.getInputProps("full_name")}
            />
            <TextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                {...form.getInputProps("phone")}
            />
            <TextInput
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                {...form.getInputProps("address")}
            />

            {/* <DateInput
                label="Ngày sinh"
                placeholder="Chọn ngày sinh"
                // valueFormat="DD-MM-YYYY"
                {...form.getInputProps("birthday")}
                style={{ width: "100%" }}
            /> */}
            <div className="grid grid-cols-[70%_30%] gap-4 items-center">
                <div className="space-y-4">
                    <Select
                        withAsterisk
                        label="Tỉnh/Thành phố"
                        data={valueCity}
                        placeholder="Nhập tỉnh/thành phố"
                        className="w-[90%]"
                        searchable
                        {...form.getInputProps("city")}
                        // onClick={() => {
                        //     if (valueCity.length === 0) {
                        //         onhandleSelectCity();
                        //     }
                        // }}
                        value={form.getValues().city ?? null}
                        onChange={(value: any) => {
                            form.setFieldValue("city", value);
                            setCheckedValueCity(value);
                        }}
                    />
                    <Select
                        withAsterisk
                        label="Quận / Huyện"
                        placeholder="Nhập quận/huyện"
                        data={valueDistrict}
                        className="w-[90%]"
                        searchable
                        {...form.getInputProps("district")}
                        // onClick={() => {
                        //     if (valueCity.length === 0 || !checkedValueCity) {
                        //         return message.error(
                        //             "Vui lòng chọn tỉnh/thành phố trước",
                        //         );
                        //     }
                        //     if (valueDistrict.length === 0) {
                        //         onhandleSelectDistrict();
                        //     }
                        // }}
                        value={form.getValues().district ?? null}
                        onChange={(value: any) => {
                            form.setFieldValue("district", value);
                            setCheckedValueDistrict(value);
                        }}
                    />
                    <Select
                        withAsterisk
                        label="Phường/Xã"
                        placeholder="Nhập phường/xã"
                        data={valueWard}
                        searchable
                        {...form.getInputProps("ward")}
                        className="w-[90%]"
                        // onClick={() => {
                        //     if (
                        //         valueDistrict.length === 0 ||
                        //         !checkedValueDistrict
                        //     ) {
                        //         return message.error(
                        //             "Vui lòng chọn quận huyện trước",
                        //         );
                        //     }
                        //     if (valueWard.length === 0) {
                        //         onhandleSelectWart();
                        //     }
                        // }}
                        value={form.getValues().ward ?? null}
                        onChange={(value: any) => {
                            form.setFieldValue("ward", value);
                            setCheckedValueWard(value);
                        }}
                    />
                </div>
                <div className="mt-5">
                    <ImgCrop rotationSlider>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            {fileList.length === 0 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </ImgCrop>
                    <Button className="mt-3" type="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormUpdate;
