import { Box, Flex, LoadingOverlay, Rating, ScrollArea } from "@mantine/core";
import "./Comment.scss";
import { IconCornerDownRightDouble } from "@tabler/icons-react";
import { Image } from "antd";
import { formatDate } from "@/model/_base/Date";
import { AvatarDefault } from "@/assets/img";
type Props = {
    data: any;
    setValueRating: any;
    loadingComment: boolean;
};
const CommentProductDetail = ({
    data,
    setValueRating,
    loadingComment,
}: Props) => {
    const dataComments = data?.reviews.data;
    if (!dataComments) {
        return null;
    }
    return (
        <div className="rating-container">
            <Flex direction="column" gap="md">
                <Flex direction="column" gap="">
                    {/* start-rating-top */}
                    <div className="rating-header">
                        <p>Khách hàng chấm điểm, đánh giá, nhận xét</p>
                    </div>
                    {/* end-rating-top */}

                    <div className="rating-divider">{/* thanh ngang */}</div>

                    {/* start-rating-center */}
                    <Flex gap="sm" className="rating-summary">
                        <div className="flex">
                            <div className="rating-summary-average">
                                <p className="rating-average-score">
                                    {/* {averageRating}/5 */}
                                    {data.average_rating.toFixed(1)}/5
                                </p>
                                <Rating
                                    // Use the actual average rating from the API
                                    defaultValue={data.average_rating}
                                    fractions={10}
                                    size="md"
                                    readOnly
                                    className="average-icon"
                                />
                            </div>
                        </div>

                        <Flex
                            direction="row"
                            className="rating-summary-breakdown"
                        >
                            <div
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(0)}
                                style={{ cursor: "pointer" }}
                            >
                                Tất cả
                            </div>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(5)}
                                style={{ cursor: "pointer" }}
                            >
                                5{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(4)}
                                style={{ cursor: "pointer" }}
                            >
                                4{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(3)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
                            >
                                3{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(2)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
                            >
                                2{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(1)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
                            >
                                1{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* end-rating-center */}

                    <div className="rating-divider">{/* thanh ngang */}</div>

                    {/* start-rating-bottom */}
                    <Flex
                        direction="row"
                        className="rating-details"
                        justify="start"
                        style={{
                            maxHeight: "600px",
                        }}
                    >
                        <div className="mx-auto p-5 border rounded-lg shadow-lg bg-white w-full">
                            <Box>
                                <h2
                                    className="mb-4"
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "20px",
                                    }}
                                >
                                    Đánh giá sản phẩm
                                </h2>
                            </Box>
                            <div>
                                <ScrollArea
                                    // style={{
                                    //     maxHeight: "520px",
                                    // }}
                                    h={520}
                                >
                                    <LoadingOverlay
                                        visible={loadingComment}
                                        zIndex={1000}
                                        overlayProps={{ radius: "sm", blur: 2 }}
                                    />
                                    {dataComments &&
                                    Array.isArray(dataComments) &&
                                    dataComments.length > 0 ? (
                                        dataComments.map((item: any) => {
                                            return (
                                                <Box
                                                    key={item.id}
                                                    style={{
                                                        padding: "20px 0",
                                                        borderBottom:
                                                            "1px solid #E4E0E1",
                                                        borderTop:
                                                            "1px solid #E4E0E1",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Flex
                                                        direction="row"
                                                        gap="sm"
                                                        align={"start"}
                                                        justify={"start"}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {item.user
                                                                .avatar !==
                                                            null ? (
                                                                <>
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .user
                                                                                .avatar
                                                                        }
                                                                        alt=""
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius:
                                                                                "50%",
                                                                        }}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        src={
                                                                            AvatarDefault
                                                                        }
                                                                        alt=""
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius:
                                                                                "50%",
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <div>
                                                                <h5>
                                                                    {
                                                                        item
                                                                            .user
                                                                            .username
                                                                    }
                                                                </h5>
                                                                <Rating
                                                                    value={
                                                                        item.rating
                                                                    }
                                                                    fractions={
                                                                        2
                                                                    }
                                                                    readOnly
                                                                />
                                                                <Flex direction="row">
                                                                    <p
                                                                        style={{
                                                                            color: "#333",
                                                                            fontSize:
                                                                                "12px",
                                                                            marginRight:
                                                                                "2px",
                                                                        }}
                                                                    >
                                                                        {formatDate(
                                                                            item.created_at,
                                                                        )}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            color: "000",
                                                                            width: "2px",
                                                                            height: "100%",
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        |
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            color: "#333",
                                                                            fontSize:
                                                                                "12px",
                                                                        }}
                                                                    >
                                                                        Phân
                                                                        loại
                                                                        hàng:
                                                                        {/* {item?.variant.map(
                                                                            (
                                                                                x: string,
                                                                            ) => {
                                                                                return (
                                                                                    <span
                                                                                        style={{
                                                                                            margin: "0 2px",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            x
                                                                                        }
                                                                                    </span>
                                                                                );
                                                                            },
                                                                        )} */}
                                                                        {item.variant
                                                                            ? (() => {
                                                                                  try {
                                                                                      const parsedVariant =
                                                                                          JSON.parse(
                                                                                              item.variant,
                                                                                          );
                                                                                      return Object.values(
                                                                                          parsedVariant,
                                                                                      ).join(
                                                                                          ", ",
                                                                                      );
                                                                                  } catch (e) {
                                                                                      console.error(
                                                                                          "Invalid JSON:",
                                                                                          e,
                                                                                      );
                                                                                      return "";
                                                                                  }
                                                                              })()
                                                                            : ""}
                                                                    </p>
                                                                </Flex>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    margin: "7px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {
                                                                        item.review
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                {item.images && (
                                                                    <Image
                                                                        width={
                                                                            100
                                                                        }
                                                                        src={
                                                                            item.images
                                                                        }
                                                                        style={{
                                                                            objectFit:
                                                                                "cover",
                                                                            height: "100px",
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                            {item.comments
                                                                .length > 0 ? (
                                                                <Flex
                                                                    direction={
                                                                        "row"
                                                                    }
                                                                    gap={"sm"}
                                                                    style={{
                                                                        padding:
                                                                            "10px",
                                                                        background:
                                                                            "rgb(246 244 244)",
                                                                        marginTop:
                                                                            "3px",
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <IconCornerDownRightDouble color="#c3c3c3" />
                                                                    </div>

                                                                    <div>
                                                                        <p
                                                                            style={{
                                                                                fontWeight:
                                                                                    "500",
                                                                            }}
                                                                        >
                                                                            phản
                                                                            hồi
                                                                            của
                                                                            Người
                                                                            Bán
                                                                        </p>

                                                                        {item.comments.map(
                                                                            (
                                                                                comment: any,
                                                                                index: number,
                                                                            ) => (
                                                                                <p
                                                                                    key={
                                                                                        index
                                                                                    } // Thêm key để tránh cảnh báo React
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        color: "#333",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        comment.comment
                                                                                    }
                                                                                </p>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </Flex>
                                                            ) : null}
                                                        </div>
                                                    </Flex>
                                                </Box>
                                            );
                                        })
                                    ) : (
                                        <div
                                            style={{
                                                height: "50px",
                                            }}
                                        >
                                            <p>Chưa có đánh giá</p>
                                        </div>
                                    )}
                                </ScrollArea>
                            </div>
                        </div>
                    </Flex>
                    {/* end-rating-bottom */}
                </Flex>
            </Flex>
        </div>
    );
};

export default CommentProductDetail;
