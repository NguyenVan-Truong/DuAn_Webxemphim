import instance from "@/configs/axios";
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Input,
    Select,
    Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
    IconCalendar,
    IconCheck,
    IconEye,
    IconSearch,
    IconSwitch,
    IconX,
} from "@tabler/icons-react";
import {
    MantineReactTable,
    MRT_PaginationState,
    MRT_Row,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";

import { Order } from "@/model/Order";
import { useQuery } from "@tanstack/react-query";
import { message, Popconfirm } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import DetailOrder from "../DetailOrder";
import { formatDateNotTimeZone } from "@/model/_base/Date";
import { DateInput } from "@mantine/dates";

const OrderAll = () => {
    const [height, setHeight] = useState(0);
    const [rowCount, setRowCount] = useState(1);
    const headerRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [search, setSearch] = useState({
        search: "",
        order_date: "",
        status: "",
    });

    const handleChangeSearchValue = (value: string | null, key: string) => {
        setSearch((prevData) => ({
            ...prevData,
            [key]: value || "",
        }));
        setPagination({
            ...pagination,
            pageIndex: 0,
        });
    };

    // Fetch dữ liệu sử dụng react-query
    const { data, refetch } = useQuery<Order[]>({
        queryKey: ["orders", pagination],
        queryFn: async () => fetchData(),
    });

    // Fetch dữ liệu từ API
    const fetchData = async () => {
        let url = `?page=${pagination.pageIndex + 1}`;
        if (search.status) {
            url += `&status=${search.status}`;
        }
        if (search.order_date) {
            url += `&order_date=${search.order_date}`;
        }
        if (search.search) {
            url += `&search=${search.search}`;
        }

        try {
            const response = await instance.get(`orders${url}`);
            if (response.status === 200) {
                const result = response.data.data.data;
                setRowCount(response.data.data.total);
                return result;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    function getColorStatus(text: any) {
        switch (text) {
            case "Chờ xử lý":
                return "#FFC107"; // Vàng nhạt (Chờ xử lý)
            case "Đang xử lý":
                return "#FF9800"; // Cam nhạt (Đang xử lý)
            case "Đang giao hàng":
                return "#03A9F4"; // Xanh da trời (Đang giao hàng)
            case "Đã giao hàng":
                return "#4CAF50"; // Xanh lá cây đậm (Đã giao hàng)
            case "Đã xác nhận":
                return "#8BC34A"; // Xanh lá nhạt (Đã xác nhận)
            case "Hoàn thành":
                return "#00BCD4"; // Xanh ngọc (Hoàn thành)
            case "Đã hủy":
                return "#F44336"; // Đỏ (Đã hủy)
            case "Đã hoàn tiền":
                return "#FF5722"; // Cam đậm (Đã hoàn tiền)
            default:
                return "#9E9E9E"; // Xám (Mặc định)
        }
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "order_code",
                header: "Mã đơn hàng",
                Cell: ({ renderedCellValue, row }) => (
                    <Tooltip label="Xem chi tiết">
                        <Badge
                            radius="sm"
                            variant="dot"
                            size="lg"
                            style={{ cursor: "pointer" }}
                            color={
                                renderedCellValue === null ? "red" : "#21d01b"
                            }
                            onDoubleClick={() =>
                                callApiGetData(row.original.id)
                            }
                        >
                            {renderedCellValue === null
                                ? null
                                : renderedCellValue}
                        </Badge>
                    </Tooltip>
                ),
                size: 10,
            },
            {
                accessorKey: "created_at",
                header: "Ngày đặt",
            },
            {
                accessorKey: "final_amount",
                header: "Tổng tiền",
                Cell: ({ cell }) => {
                    const totalAmount = Number(cell.getValue());
                    return !isNaN(totalAmount)
                        ? totalAmount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                          })
                        : "₫0";
                },
            },
            {
                accessorKey: "status",
                header: "Trạng thái đơn hàng",
                Cell: ({ renderedCellValue }) => (
                    <Badge color={getColorStatus(renderedCellValue)}>
                        {renderedCellValue || "Không có"}
                    </Badge>
                ),
            },
            {
                accessorKey: "action",
                header: "Thao tác",
                size: 1,
                Cell: ({ row }) => (
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        {processTaskActionMenu(row)}
                    </Box>
                ),
            },
        ],
        [],
    );
    useEffect(() => {
        refetch();
    }, [search, pagination, refetch]);

    function processTaskActionMenu(row: MRT_Row<any>): any {
        return (
            <>
                <div className="space-x-2">
                    <Tooltip label="Xác nhận đã nhận hàng">
                        <ActionIcon
                            variant="light"
                            aria-label="Settings"
                            color="green"
                            disabled={row.original.status !== "Đã giao hàng"}
                        >
                            <IconCheck
                                size={20}
                                onClick={() => handleCheck(row?.original.id)}
                            />
                        </ActionIcon>
                    </Tooltip>
                    <Popconfirm
                        placement="topRight"
                        title={"Bạn có chắc muốn hủy đơn hàng ko ?"}
                        okText="Có"
                        cancelText="Ko"
                        className="mx-auto"
                        onConfirm={() => handleCancel(row?.original.id)}
                    >
                        <Tooltip label="Hủy đơn hàng">
                            <ActionIcon
                                color="red"
                                variant="light"
                                size="md"
                                aria-label="Settings"
                                disabled={row.original.status !== "Chờ xử lý"}
                            >
                                <IconX size={20} />
                            </ActionIcon>
                        </Tooltip>
                    </Popconfirm>
                </div>
            </>
        );
    }

    const handleCheck = async (id: string) => {
        try {
            await instance.put(`/orders/${id}/complete-status`);
            message.success("Xác nhận đã nhận hàng thành công");
            refetch();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCancel = async (id: string) => {
        try {
            await instance.put(`/orders/${id}/cancel-status`);
            message.success("Hủy đặt hàng thành công");
            refetch();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const callApiGetData = async (id: string | undefined) => {
        try {
            const response = await instance.get(`/orders/${id}`);
            if (response?.data?.data) {
                modals.openConfirmModal({
                    title: "Chi tiết đơn hàng",
                    size: "850px",
                    children: <DetailOrder data={response.data.data} />,
                    confirmProps: { display: "none" },
                    cancelProps: { display: "none" },
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const table = useMantineReactTable({
        columns,
        data: data || [],
        mantineTopToolbarProps: {
            style: {
                borderBottom: "3px solid rgba(128, 128, 128, 0.5)",
                marginBottom: 5,
            },
        },

        initialState: {
            showColumnFilters: false,
            columnPinning: {
                left: ["order_code"],
                right: ["action"],
            },
            columnVisibility: { id: true },
            density: "xs",
        },
        enableRowSelection: false,
        mantineTableContainerProps: {
            style: { maxHeight: height - 100, minHeight: height - 100 },
        },
        enableStickyHeader: true,
        manualFiltering: false,
        manualPagination: true,
        manualSorting: true,
        enableTopToolbar: true,
        rowCount,
        onPaginationChange: setPagination,
        renderTopToolbarCustomActions: ({ table }) => (
            <div ref={headerRef}>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Input
                        style={{ flex: 1, maxWidth: "180px" }}
                        placeholder="Nhập tìm kiếm"
                        leftSection={<IconSearch size={"20"} color="#15aabf" />}
                        onChange={(e) => {
                            handleChangeSearchValue(
                                e.target.value ?? "",
                                "search",
                            );
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                fetchData();
                            }
                        }}
                    />
                    <Select
                        size="sm"
                        placeholder="Trạng thái"
                        searchable
                        clearable
                        data={[
                            { value: "completed", label: "Hoàn thành" },
                            {
                                value: "shipping",
                                label: "Đang giao hàng",
                            },
                            {
                                value: "processing",
                                label: "Đang Xử lý",
                            },
                            {
                                value: "pending",
                                label: "Chờ xử lý",
                            },
                            // {
                            //     value: "pending",
                            //     label: "Đã giao hàng",
                            // },
                            // {
                            //     value: "pending",
                            //     label: "Đã hủy",
                            // },
                        ]}
                        style={{ flex: 1, maxWidth: "180px" }}
                        leftSection={<IconSwitch size={20} color="#15aabf" />}
                        onChange={(value: any) =>
                            handleChangeSearchValue(value ?? "", "status")
                        }
                    />
                    <DateInput
                        size="sm"
                        placeholder="Ngày đặt"
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                        leftSection={<IconCalendar color="#15aabf" />}
                        w={180}
                        clearable
                        onChange={(e) => {
                            handleChangeSearchValue(
                                formatDateNotTimeZone(e) ?? "",
                                "order_date",
                            );
                        }}
                    />
                    <Button
                        color="blue"
                        variant="outline"
                        onClick={async () => {
                            await fetchData();
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
            </div>
        ),
        renderToolbarInternalActions: () => <></>,
        mantineTableBodyCellProps: ({ row }) => ({
            style: {
                fontSize: "11.5px",
                padding: "4px 12px",
            },
        }),
        state: {
            pagination,
        },
        mantinePaginationProps: {
            showRowsPerPage: false,
            withEdges: false,
            rowsPerPageOptions: ["20", "50", "100"],
        },
        paginationDisplayMode: "pages",
        enableColumnPinning: true,
        mantineTableProps: {
            striped: false,
        },
    });

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const handleResize = () => {
            setHeight(window.innerHeight - (263 + headerHeight));
        };

        handleResize(); // Set initial height
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};

export default OrderAll;
