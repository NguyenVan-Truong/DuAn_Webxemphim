import { useState, useEffect, useRef } from "react";
import "./Description.scss";
import { Button } from "@mantine/core";
import DOMPurify from "dompurify";
type Props = {
    data: TypeProductDetail | undefined;
};

const DescriptionProduct = ({ data }: Props) => {
    if (!data) return null;

    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            setShowButton(contentRef.current.scrollHeight > 480);
        }
    }, [data?.detailed_description]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="description-container">
                <div className={`description ${isExpanded ? "expanded" : ""}`}>
                    <h3 className="description-title">Mô tả sản phẩm</h3>
                    <div
                        className="description-content"
                        ref={contentRef}
                        style={{
                            maxHeight: isExpanded ? "none" : "480px",
                            overflow: isExpanded ? "visible" : "hidden",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                data?.detailed_description || "",
                            ),
                        }}
                    />
                </div>

                {showButton && (
                    <div className="description-button">
                        {isExpanded ? (
                            <Button
                                variant="default"
                                className="toggle-button button_description_hiden"
                                onClick={toggleDescription}
                            >
                                Thu gọn
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                className="toggle-button button_description_show"
                                onClick={toggleDescription}
                            >
                                Xem thêm
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default DescriptionProduct;
