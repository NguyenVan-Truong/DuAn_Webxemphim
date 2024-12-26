import { Text } from "@mantine/core";

const Logo = () => {
    return (
        <>
            <div className="bg-gray-100">
                <Text
                    size="lg"
                    fw={900}
                    variant="gradient"
                    gradient={{
                        from: "rgb(43 ,29 ,82,0.94)",
                        to: "rgb(98 ,0 ,255,0.95)",
                        deg: 0,
                    }}
                    style={{ padding: "5px" }}
                >
                    Morden Home
                </Text>
            </div>
            <Text size="xs">Tổ ấm của người tinh tế</Text>
        </>
    );
};

export default Logo;
